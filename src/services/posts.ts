import { Post } from '@/types/post';
import { toUniqueArray } from '@/utils/to-unique-array';
import fs from 'fs';
import { join } from 'path';
import getUpdatedOrNewPosts from '@/app/api/posts/getUpdatedOrNewPosts';

export async function getAllPosts() {
  const posts = await readPostsFromDatabase()
  return posts.filter((post) => post.published);
}

export async function getAllPostCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();

  const allCategories = toUniqueArray(
    allPosts
      .map((post) => post.categories)
      .flat()
  ).sort();
  return allCategories;
}

export async function getAllPostsSlugs(): Promise<string[]> {
  const posts = await readPostsFromDatabase()
  return posts.filter((post) => post.published).map((post) => post.slug);
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
  if (process.env.NODE_ENV === 'development') {
    const filepath = join(process.env.PWD || '', 'cache/posts.json')
    const contents = fs.readFileSync(filepath, 'utf-8');
    const json = JSON.parse(contents);
    return json as unknown as Post[];
  } else {
    const posts = await getUpdatedOrNewPosts(null) as Post[]
    return posts
  }
}
