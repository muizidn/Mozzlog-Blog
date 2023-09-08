import { Comment } from "@/types/comment";
import { sql } from "@vercel/postgres";
import { LocalCommentRepository } from "./local";

export default class PostgreLocalCommentRepository implements LocalCommentRepository {
    constructor() { }

    async loadComments(slug: string): Promise<Comment[]> {
        const result = await sql`SELECT * FROM comments WHERE slug = ${slug} ORDER BY date DESC;`;
        const comments: Comment[] = result.rows.map(row => ({
            id: row.id,
            author: row.author,
            avatar: row.avatar,
            date: row.date,
            content: row.content,
            githubProfile: row.githubprofile,
            slug: row.slug,
        }))
        return comments;
    }

    async saveComment(slug: string, comment: Comment): Promise<void> {
        await sql`
      INSERT INTO comments (id, author, avatar, date, content, githubProfile, slug)
      VALUES (${comment.id}, ${comment.author}, ${comment.avatar}, ${comment.date}, ${comment.content}, ${comment.githubProfile}, ${slug})
    `;
    }
}