import { Post } from '@/types/post';
import fs from 'fs';
import { join } from 'path';

export async function getAllPostsFromNotion() {
  const posts = await readPostsFromDatabase()
  return posts.filter((post) => post.published);
}

export async function getPostWithSlug(slug: string): Promise<Post | undefined> {
  const posts = await readPostsFromDatabase()
  return posts.filter((post) => post.published).find((post) => post.slug === slug);
}

export async function getRelatedPosts(post: Post): Promise<Post[]> {
  const posts = await readPostsFromDatabase()
  const relatedPosts: Post[] = posts.filter(
    (p) =>
      p.slug !== post.slug && p.categories.some((v) => post.categories.includes(v))
  );
  return relatedPosts;
}

export async function readPostsFromDatabase(): Promise<Post[]> {
  const filepath = join(process.env.PWD || '', 'cache/posts.json')
  const contents = fs.readFileSync(filepath, 'utf-8');
  const json = JSON.parse(contents);
  return json as unknown as Post[];
}
