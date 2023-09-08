import { Comment } from "@/types/comment";
import { sql } from "@vercel/postgres";
import { LocalCommentRepository } from "./local";

export default class PostgreLocalCommentRepository implements LocalCommentRepository {
    constructor() { }

    async loadComments(slug: string): Promise<Comment[]> {
        const result = await sql`SELECT * FROM comments WHERE slug = ${slug} ORDER BY date DESC;`;
        return result.rows as Comment[];
    }

    async saveComment(slug: string, comment: Comment): Promise<void> {
        await sql`
      INSERT INTO comments (id, author, avatar, date, content, githubProfile, slug)
      VALUES (${comment.id}, ${comment.author}, ${comment.avatar}, ${comment.date}, ${comment.content}, ${comment.githubProfile}, ${slug})
    `;
    }
}