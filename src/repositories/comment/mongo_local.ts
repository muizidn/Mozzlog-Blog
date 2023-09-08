import { Comment } from "@/types/comment";
import { MongoClient } from "mongodb";
import { LocalCommentRepository } from "./local";

export default class MongoLocalCommentRepository implements LocalCommentRepository {
    private mongoClient: MongoClient = new MongoClient(process.env.MONGODB_URI as string, {});
    private db = this.mongoClient.db(process.env.MONGODB_DBNAME as string);

    constructor() {
    }

    async loadComments(slug: string): Promise<Comment[]> {
        const collection = this.db.collection(`comments/${slug}`);
        const comments = await collection
        .find({})
        .sort({ date: -1 })
        .toArray();
        return comments.map(comment => ({
            id: comment.id,
            author: comment.author,
            avatar: comment.avatar,
            date: comment.date,
            content: comment.content,
            githubProfile: comment.githubProfile,
        }));
    }

    async saveComment(slug: string, comment: Comment): Promise<void> {
        const collection = this.db.collection(`comments/${slug}`);
        await collection.insertOne(comment);
    }
}
