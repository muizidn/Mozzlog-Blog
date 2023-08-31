import { Post } from '@/types/post';
import { toUniqueArray } from '@/utils/to-unique-array';
import { sql } from '@vercel/postgres';

export async function getAllPosts() {
  try {
    const result = await sql`SELECT * FROM posts WHERE published = true`;

    return result.rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      categories: r.categories,
      cover: r.cover,
      date: r.date,
      published: r.published,
      lastEditedAt: Number(r.lasteditedat),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(`Error fetching posts`);
  }
}

export async function getAllPostCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();

  const allCategories = toUniqueArray(
    allPosts
      .map((post) => post.categories)
      .flat()
  ).sort();
  return allCategories;
}

export async function getAllPostsSlugs(): Promise<string[]> {
  try {
    const result = await sql`SELECT slug FROM posts WHERE published = true`;

    return result.rows.map((r) => r.slug);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(`Error fetching slugs`);
  }
}

export async function getPostWithSlug(slug: string): Promise<Post | undefined> {
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
        date: r.date,
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

export async function getRelatedPosts(post: Post): Promise<Post[]> {
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
      date: r.date,
      published: r.published,
      lastEditedAt: Number(r.lasteditedat),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(`Error fetching related posts for ${post.slug}`);
  }
}
