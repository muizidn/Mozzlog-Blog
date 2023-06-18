import { Post } from '@/types/post';
import { Client } from "@notionhq/client";
import { DbPost } from './db_post';

export async function getAllPostsFromNotion() {
  return getPosts();
}

const apiKey = process.env.NOTION_API_KEY!
const database_id = process.env.NOTION_DATABASE_ID!
const notion = new Client({ auth:  apiKey});

async function getPosts(): Promise<Post[]> {
  const todayStartOfDay = new Date(Date.now());
  todayStartOfDay.setUTCHours(0, 0, 0, 0);
  const response = await notion.databases.query({
    database_id: database_id,
    filter: {
      or: [
        {
          property: 'Last edited time',
          last_edited_time: {
            after: todayStartOfDay.toISOString(),
          },
        },
      ],
    },
    sorts: [
    ],
  });
  const allPosts: Post[] = [];
  for (const post of response.results.map(post => post as unknown as DbPost)) {
    const id = post.id;
    const title = post.properties.Page.title.pop()?.plain_text || '';
    const slug = post.properties.Slug.rich_text.pop()?.plain_text || '';
    const categories = post.properties.Category.multi_select.map(e=>e.name);
    const cover = post.properties.Cover.files.pop()?.external.url || null
    const date = post.properties.Date.date.start
    const published = post.properties.Published.checkbox
    const lastEditedAt = (new Date(post.last_edited_time)).getUTCMilliseconds()
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
      lastEditedAt,
    });
  }
  return allPosts;
}