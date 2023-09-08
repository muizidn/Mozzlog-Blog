import { Comment } from '@/types/comment';

export interface LocalCommentRepository {
  loadComments(slug: string): Promise<Comment[]>;
  saveComment(slug: string, comment: Comment): Promise<void>;
}

export default class DefaultLocalCommentRepository implements LocalCommentRepository {
    loadComments(): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    saveComment(slug: string, comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
}