const { Client } = require("@notionhq/client")
const fs = require("fs")
const { join } = require("path")
const { config } = require("dotenv")
const getUpdatedOrNewPosts = require('../src/services/js_getUpdatedOrNewPosts')

config(); // load .env

const apiKey = process.env.NOTION_API_KEY
const database_id = process.env.NOTION_DATABASE_ID
const notion = new Client({ auth: apiKey })

function createCacheDirectory() {
  const cacheDir = join(process.env.PWD || "", "cache");

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }
}

function lastFetch() {
  const filepath = join(process.env.PWD || "", `cache/notion_last_fetch`)
  if (!fs.existsSync(filepath)) {
    return null
  }
  const contents = fs.readFileSync(filepath, "utf-8").trim()
  if (contents === "") { return null; }
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
  const _lastFetch = lastFetch()
  const freshPosts = await getUpdatedOrNewPosts(notion, database_id, _lastFetch)
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

createCacheDirectory()
run()