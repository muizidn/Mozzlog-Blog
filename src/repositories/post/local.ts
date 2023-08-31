import { Post } from "@/types/post";
import { sql } from "@vercel/postgres";

export default class PostgreLocalPostRepository {
    constructor() { }

    async loadPosts(): Promise<Post[]> {
        try {
            const result = await sql`SELECT * FROM posts`;

            const posts = result.rows.map(r => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: r.date,
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
}
