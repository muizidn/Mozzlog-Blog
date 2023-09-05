import { Post } from '@/types/post';

export interface LocalPostRepository {
  loadPosts(): Promise<Post[]>;
  savePosts(posts: Post[]): Promise<void>;
  getAllPosts(): Promise<Post[]>;
  getAllPostCategories(): Promise<string[]>;
  getAllPostsSlugs(): Promise<string[]>;
  getPostWithSlug(slug: string): Promise<Post | undefined>;
  getRelatedPosts(post: Post): Promise<Post[]>;
}

export default class DefaultLocalPostRepository implements LocalPostRepository {
    loadPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    savePosts(posts: Post[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllPosts(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    getAllPostCategories(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getAllPostsSlugs(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getPostWithSlug(slug: string): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    getRelatedPosts(post: Post): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
}