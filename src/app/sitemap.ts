import { MetadataRoute } from 'next';

import { getAllPosts } from '@/services/posts';

export default async function sitemap() {
  const allPosts = await getAllPosts();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const post of allPosts) {
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.lastEditedAt),
    });
  }

  return sitemap;
}
