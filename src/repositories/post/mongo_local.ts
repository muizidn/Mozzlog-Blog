import { Post } from "@/types/post";
import { MongoClient } from "mongodb";

export default class MongoLocalPostRepository {
    constructor() {
    }

    async loadPosts(): Promise<Post[]> {
        const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {});

        try {
            await mongoClient.connect();
            const db = mongoClient.db(process.env.MONGODB_DBNAME as string);
            const collection = db.collection("posts");
            const posts = await collection.find({}).toArray();

            return posts.map((r) => ({
                id: r.id.toString(),
                slug: r.slug,
                title: r.title,
                categories: r.categories,
                cover: r.cover,
                date: new Date(r.date).toDateString(),
                published: r.published,
                lastEditedAt: r.lastEditedAt,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error(`Error fetching posts`);
        } finally {
            await mongoClient.close();
        }
    }

    async savePosts(posts: Post[]): Promise<void> {
        const mongoClient = new MongoClient(process.env.MONGODB_URI as string, {});

        try {
            await mongoClient.connect();
            const db = mongoClient.db(process.env.MONGODB_DBNAME as string);
            const collection = db.collection("posts");

            for (const post of posts) {
                const postExists = await collection.findOne({ id: post.id });

                if (postExists) {
                    await collection.updateOne(
                        { id: post.id },
                        {
                            $set: {
                                slug: post.slug,
                                title: post.title,
                                cover: post.cover,
                                date: new Date(post.date),
                                published: post.published,
                                lastEditedAt: post.lastEditedAt,
                            },
                        }
                    );
                } else {
                    await collection.insertOne({
                        id: post.id,
                        slug: post.slug,
                        title: post.title,
                        cover: post.cover,
                        categories: post.categories,
                        date: new Date(post.date),
                        published: post.published,
                        lastEditedAt: post.lastEditedAt,
                    });
                }
            }
        } catch (error) {
            console.error("Error saving posts:", error);
            throw new Error(`Error saving posts`);
        } finally {
            await mongoClient.close();
        }
    }
}
