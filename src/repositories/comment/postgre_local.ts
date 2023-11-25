import { Comment } from "@/types/comment";
import { supabase } from "@/services/supabase";
import { LocalCommentRepository } from "./local";

export default class PostgreLocalCommentRepository implements LocalCommentRepository {
    constructor() { }

    async loadComments(slug: string): Promise<Comment[]> {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('slug', slug)
                .order('date', { ascending: false });

            if (error) {
                console.error('Error loading comments:', error);
                return [];
            }

            const comments: Comment[] = data?.map((row: any) => ({
                id: row.id,
                author: row.author,
                avatar: row.avatar,
                date: row.date,
                content: row.content,
                githubProfile: row.githubprofile,
                slug: row.slug,
            })) || [];

            return comments;
        } catch (error) {
            console.error('Error loading comments:', error);
            return [];
        }
    }

    async saveComment(slug: string, comment: Comment): Promise<void> {
        try {
            await supabase
                .from('comments')
                .upsert([
                    {
                        id: comment.id,
                        author: comment.author,
                        avatar: comment.avatar,
                        date: comment.date,
                        content: comment.content,
                        githubprofile: comment.githubProfile,
                        slug: slug,
                    },
                ]);

        } catch (error) {
            console.error('Error saving comment:', error);
            throw new Error('Error saving comment');
        }
    }
}