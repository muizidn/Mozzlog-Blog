import { Post } from '@/types/post';
import { Client } from "@notionhq/client";
import { DbPost } from './db_post';
import fs from 'fs';
import { join } from 'path';

export async function getAllPostsFromNotion() {
  return readPostsFromDatabase();
}

export async function readPostsFromDatabase(): Promise<Post[]> {
  const filepath = join(process.env.PWD || '', 'cache/posts.json')
  const contents = fs.readFileSync(filepath, 'utf-8');
  const json = JSON.parse(contents);
  return json as unknown as Post[];
}
