async function getUpdatedOrNewPosts(notion,database_id,lastFetch) {
  const filters = []
  if (lastFetch !== null) {
    filters.push({
      property: "Last edited time",
      last_edited_time: {
        after: lastFetch.toISOString()
      }
    })
  }

  filters.push({
    property: "Date",
    date: {
      is_not_empty: true
    }
  })

  filters.push({
    property: "Published",
    checkbox: {
      equals: true
    }
  })

  console.log(filters)

  const response = await notion.databases.query({
    database_id: database_id,
    filter: {
      and: filters
    },
    sorts: []
  })

  const allPosts = []

  for (const post of response.results.map(post => post)) {
    const id = post.id
    const title = post.properties.Page.title.pop()?.plain_text || ""
    const slug = post.properties.Slug.rich_text.pop()?.plain_text || ""
    const categories = post.properties.Category.multi_select.map(e => e.name)
    const cover = null
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

module.exports = getUpdatedOrNewPosts;