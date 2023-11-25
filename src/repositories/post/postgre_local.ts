import { Post } from "@/types/post";
import { createClient } from '@supabase/supabase-js';
import { LocalPostRepository } from "./local";
import { supabase } from "@/services/supabase";

export default class PostgreLocalPostRepository implements LocalPostRepository {
    constructor() { }

    async loadPosts(): Promise<Post[]> {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .select('id, title, date, slug, categories, cover, published, lastEditedAt')
                .order('date', { ascending: false })
                .order('lastEditedAt', { ascending: false })
                .limit(100);

            if (error) {
                console.error('Error fetching data:', error);
                throw new Error(`Error fetching posts`);
            }

            const posts = data.map((r: any) => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: new Date(r.date).toDateString(),
                published: r.published,
                lastEditedAt: Number(r.lastEditedAt),
            }));

            return posts;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching posts`);
        }
    }

    async savePosts(posts: Post[]): Promise<void> {
        try {
            for (const post of posts) {
                await this.updateOrCreate(post);
            }
        } catch (error) {
            console.error('Error saving posts:', error);
            throw new Error(`Error saving posts`);
        }
    }

    private async updateOrCreate(post: Post) {
        try {
            const { data: existingPosts, error: existingError } = await supabase
                .from('posts')
                .select('id')
                .eq('id', post.id);

            if (existingError) {
                console.error('Error checking existing posts:', existingError);
                throw new Error('Error checking existing posts');
            }

            const postExists = existingPosts && existingPosts.length > 0;

            if (postExists) {
                await supabase
                    .from('posts')
                    .update({
                        slug: post.slug,
                        title: post.title,
                        cover: post.cover,
                        date: post.date,
                        published: post.published,
                        lastEditedAt: new Date(post.lastEditedAt),
                    })
                    .eq('id', post.id);
            } else {
                await supabase
                    .from('posts')
                    .insert([{
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        cover: post.cover,
                        categories: post.categories,
                        date: post.date,
                        published: post.published,
                        lastEditedAt: new Date(post.lastEditedAt),
                    }]);
            }
        } catch (error) {
            console.error('Error updating or inserting post posts:', error);
            throw new Error(`Error updating or inserting post`);
        }
    }

    async getAllPosts(): Promise<Post[]> {
        return await this.loadPosts();
    }

    async getAllPostCategories(): Promise<string[]> {
        return []
        // try {
        //     const { data, error } = await supabase
        //         .from('posts')
        //         .distinct('categories', { published: true });

        //     if (error) {
        //         console.error('Error fetching data:', error);
        //         throw new Error(`Error fetching post categories`);
        //     }

        //     return data.map((r: any) => r.categories).sort();
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        //     throw new Error(`Error fetching post categories`);
        // }
    }

    async getAllPostsSlugs(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('slug')
                .eq('published', true);

            if (error) {
                console.error('Error fetching data:', error);
                throw new Error(`Error fetching slugs`);
            }

            return data.map((r: any) => r.slug);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching slugs`);
        }
    }

    async getPostWithSlug(slug: string): Promise<Post | undefined> {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .eq('slug', slug);

            if (error) {
                console.error('Error fetching data:', error);
                throw new Error(`Error fetching post with slug ${slug}`);
            }

            if (data.length > 0) {
                const r = data[0];
                return {
                    id: r.id,
                    slug: r.slug,
                    title: r.title,
                    categories: r.categories,
                    cover: r.cover,
                    date: new Date(r.date).toDateString(),
                    published: r.published,
                    lastEditedAt: Number(r.lastEditedAt),
                };
            } else {
                return undefined;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching post with slug ${slug}`);
        }
    }

    async getRelatedPosts(post: Post): Promise<Post[]> {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('published', true)
                .not('slug', 'eq', post.slug)
                .overlaps('categories', post.categories)
                .select('id, title, date, slug, categories, cover, published, lastEditedAt')
                .limit(100)

            if (error) {
                console.error('Error fetching data:', error);
                throw new Error(`Error fetching related posts for ${post.slug}`);
            }

            return data.map((r: any) => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: new Date(r.date).toDateString(),
                published: r.published,
                lastEditedAt: Number(r.lastEditedAt),
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching related posts for ${post.slug}`);
        }
    }
}
