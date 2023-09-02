import { Post } from "@/types/post";
import { MongoClient } from "mongodb";

export default class MongoLocalPostRepository {
    private mongoClient: MongoClient = new MongoClient(process.env.MONGODB_URI as string, {});
    private db = this.mongoClient.db(process.env.MONGODB_DBNAME as string);

    constructor() {
    }

    async loadPosts(): Promise<Post[]> {
        try {
            await this.mongoClient.connect();
            const collection = this.db.collection("posts");
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
            await this.mongoClient.close();
        }
    }

    async savePosts(posts: Post[]): Promise<void> {

        try {
            await this.mongoClient.connect();
            const collection = this.db.collection("posts");

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
            await this.mongoClient.close();
        }
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            const collection = this.db.collection("posts");
            const filter = { published: true };
            const posts = await collection.find(filter).toArray();

            return posts.map((r) => ({
                id: r._id.toString(),
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
            throw new Error(`Error fetching posts`);
        }
    }

    async getAllPostCategories(): Promise<string[]> {
        try {
            const collection = this.db.collection("posts");
            const pipeline = [
                { $match: { published: true } },
                { $unwind: "$categories" },
                { $group: { _id: "$categories" } },
                { $sort: { _id: 1 } },
            ];
            const result = await collection.aggregate(pipeline).toArray();

            return result.map((r) => r._id);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching post categories`);
        }
    }

    async getAllPostsSlugs(): Promise<string[]> {
        try {
            const collection = this.db.collection("posts");
            const filter = { published: true };
            const result = await collection.find(filter, { projection: { slug: 1, _id: 0 } }).toArray();

            return result.map((r) => r.slug);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error(`Error fetching slugs`);
        }
    }

    async getPostWithSlug(slug: string): Promise<Post | undefined> {
        try {
            const collection = this.db.collection("posts");
            const filter = { published: true, slug: slug };
            const post = await collection.findOne(filter);

            if (post) {
                return {
                    id: post._id.toString(),
                    slug: post.slug,
                    title: post.title,
                    categories: post.categories,
                    cover: post.cover,
                    date: new Date(post.date).toDateString(),
                    published: post.published,
                    lastEditedAt: Number(post.lastEditedAt),
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
            const collection = this.db.collection("posts");
            const filter = {
                published: true,
                slug: { $ne: post.slug },
                categories: { $in: post.categories },
            };
            const posts = await collection.find(filter).toArray();

            return posts.map((r) => ({
                id: r._id.toString(),
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
