import { Client } from '@notionhq/client';
import getUpdatedOrNewPosts from '@/services/js_getUpdatedOrNewPosts.js';

const apiKey = process.env.NOTION_API_KEY
const database_id = process.env.NOTION_DATABASE_ID
const notion = new Client({ auth: apiKey })

export default function (lastFetch: Date | null) {
    return getUpdatedOrNewPosts(notion, database_id, lastFetch)
}