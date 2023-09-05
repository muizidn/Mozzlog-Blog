import { Post } from "@/types/post";
import { sql } from "@vercel/postgres";
import { LocalPostRepository } from "./local";

export default class PostgreLocalPostRepository implements LocalPostRepository {
    constructor() { }

    async loadPosts(): Promise<Post[]> {
        try {
            const result = await sql`SELECT * FROM posts ORDER BY date DESC, lasteditedat DESC`;

            const posts = result.rows.map(r => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: (r.date as Date).toDateString(),
                published: r.published,
                lastEditedAt: Number(r.lasteditedat)
            }));
            return posts;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching posts`);
        } finally {
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
        } finally {
        }
    }

    private async updateOrCreate(post: Post) {
        try {
            const { rows } = await sql`SELECT COUNT(*) FROM posts WHERE id = ${post.id}`;
            const postExists = parseInt(rows[0].count) > 0;

            if (postExists) {
                await sql`UPDATE posts SET slug = ${post.slug}, title = ${post.title}, cover = ${post.cover}, date = ${post.date}, published = ${post.published}, lastEditedAt = ${post.lastEditedAt} WHERE id = ${post.id}`;
            } else {
                await sql`INSERT INTO posts (id, slug, title, cover, categories, date, published, lastEditedAt) VALUES (${post.id}, ${post.slug}, ${post.title}, ${post.cover}, ${`{${post.categories.join(',')}}`}, ${post.date}, ${post.published}, ${post.lastEditedAt})`;
            }
        } catch (error) {
            console.error('Error updating or inserting post posts:', error);
            throw new Error(`Error updating or inserting post`);
        }
    }

    // FIX ME

    async getAllPosts() {
        try {
            const result = await sql`SELECT * FROM posts WHERE published = true ORDER BY date DESC, lasteditedat DESC`;

            return result.rows.map((r) => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: (r.date as Date).toDateString(),
                published: r.published,
                lastEditedAt: Number(r.lasteditedat),
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching posts`);
        }
    }

    async getAllPostCategories(): Promise<string[]> {
        try {
            const result = await sql`
                SELECT DISTINCT UNNEST(categories) as category
                FROM posts
                WHERE published = true
            `;

            return result.rows.map((r) => r.category).sort();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching post categories`);
        }
    }

    async getAllPostsSlugs(): Promise<string[]> {
        try {
            const result = await sql`SELECT slug FROM posts WHERE published = true`;

            return result.rows.map((r) => r.slug);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching slugs`);
        }
    }

    async getPostWithSlug(slug: string): Promise<Post | undefined> {
        try {
            const result = await sql`SELECT * FROM posts WHERE published = true AND slug = ${slug}`;

            if (result.rows.length > 0) {
                const r = result.rows[0];
                return {
                    id: r.id,
                    slug: r.slug,
                    title: r.title,
                    categories: r.categories,
                    cover: r.cover,
                    date: (r.date as Date).toDateString(),
                    published: r.published,
                    lastEditedAt: Number(r.lasteditedat),
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
            const result = await sql`
                  SELECT * FROM posts
                  WHERE published = true
                  AND slug != ${post.slug}
                  AND categories && ${`{${post.categories.join(',')}}`}
              `;

            return result.rows.map((r) => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: (r.date as Date).toDateString(),
                published: r.published,
                lastEditedAt: Number(r.lasteditedat),
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching related posts for ${post.slug}`);
        }
    }
}