const { Client } = require("@notionhq/client")
const fs = require("fs")
const { join } = require("path")
const { config } = require("dotenv")

config(); // load .env

const apiKey = process.env.NOTION_API_KEY
const database_id = process.env.NOTION_DATABASE_ID
const notion = new Client({ auth: apiKey })

async function getUpdatedPostsAfterLastFetch() {
  const filters = []
  const lf = lastFetch()
  if (lf !== null) {
    filters.push({
      property: "Last edited time",
      last_edited_time: {
        after: lf.toISOString()
      }
    })
  }
  const response = await notion.databases.query({
    database_id: database_id,
    filter: {
      or: filters
    },
    sorts: []
  })

  const allPosts = []

  for (const post of response.results.map(post => post)) {
    const id = post.id
    const title = post.properties.Page.title.pop()?.plain_text || ""
    const slug = post.properties.Slug.rich_text.pop()?.plain_text || ""
    const categories = post.properties.Category.multi_select.map(e => e.name)
    const cover = post.properties.Cover.files.pop()?.external.url || null
    const date = post.properties.Date.date.start
    const published = post.properties.Published.checkbox
    const lastEditedAt = new Date(post.last_edited_time).valueOf()
    allPosts.push({
      id,
      title,
      slug,
      categories,
      // Fix 403 error for images.
      // https://github.com/NotionX/react-notion-x/issues/211
      cover,
      date,
      published,
      lastEditedAt
    })
  }
  return allPosts
}

function lastFetch() {
  const filepath = join(process.env.PWD || "", `cache/notion_last_fetch`)
  if (!fs.existsSync(filepath)) {
    return null
  }
  const contents = fs.readFileSync(filepath, "utf-8").trim()
  if (contents === "") { return null;}
  return new Date(contents)
}

function loadCacheOrDefault(file, defaultValue) {
  const filepath = join(process.env.PWD || "", `cache/${file}`)
  if (!fs.existsSync(filepath)) {
    return defaultValue
  }
  const contents = fs.readFileSync(filepath, "utf-8").trim()
  return JSON.parse(contents)
}

function updateLastFetch() {
  const filepath = join(process.env.PWD || "", `cache/notion_last_fetch`)
  fs.writeFileSync(filepath, new Date(Date.now()).toISOString(), {
    flag: "w"
  })
}

function syncWriteFile(data, file) {
  const filepath = join(process.env.PWD || '', `cache/${file}`)
  fs.writeFileSync(filepath, data, {
    flag: 'w',
  });
}

function removeFile(file) {
  const filepath = join(process.env.PWD || '', `cache/notion_records/${file}`)
  if (!fs.existsSync(filepath)) {
    return;
  }
  fs.unlinkSync(filepath);
}

async function run() {
  const freshPosts = await getUpdatedPostsAfterLastFetch()
  updateLastFetch()

  const postIdToIdx = await loadCacheOrDefault("postIdToIdx.json", {});
  const oldPosts = await loadCacheOrDefault("posts.json", []);

  const newPosts = []

  for (var i = 0; i < freshPosts.length; i++) {
    const post = freshPosts[i];
    const idx = postIdToIdx[post.id]
    if (idx !== undefined) {
      oldPosts[idx] = post
    } else {
      newPosts.push(post)
    }

    removeFile(post.id + ".json")
    console.log("Update post " + post.id + " " + post.title)
  }

  const finalPosts = newPosts.concat(oldPosts);
  for (var i = 0; i < finalPosts.length; i++) {
    const post = finalPosts[i];
    postIdToIdx[post.id] = i
  }

  syncWriteFile(JSON.stringify(finalPosts, null, 2), "posts.json")
  syncWriteFile(JSON.stringify(postIdToIdx, null, 2), "postIdToIdx.json")
  console.log("Success write posts to cache")
}
run()