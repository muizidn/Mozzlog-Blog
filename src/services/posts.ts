import { Post } from '@/types/post';
import fs from 'fs';
import { join } from 'path';

export async function getAllPostsFromNotion() {
  const posts = await readPostsFromDatabase()
  return posts.filter((post) => post.published);
}

export async function readPostsFromDatabase(): Promise<Post[]> {
  const filepath = join(process.env.PWD || '', 'cache/posts.json')
  const contents = fs.readFileSync(filepath, 'utf-8');
  const json = JSON.parse(contents);
  return json as unknown as Post[];
}
