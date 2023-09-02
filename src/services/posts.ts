import repo from '@/repositories/post';
import { Post } from '@/types/post';

export async function getAllPosts() {
  return repo.getAllPosts()
}

export async function getAllPostCategories(): Promise<string[]> {
  return repo.getAllPostCategories();
}

export async function getAllPostsSlugs(): Promise<string[]> {
  return repo.getAllPostsSlugs();
}

export async function getPostWithSlug(slug: string): Promise<Post | undefined> {
  return repo.getPostWithSlug(slug)
}

export async function getRelatedPosts(post: Post): Promise<Post[]> {
  return repo.getRelatedPosts(post);
}
