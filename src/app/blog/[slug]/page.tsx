import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BlogComments from '@/components/blog-comment';
import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import { getAllPostsSlugs, getPostWithSlug, getRelatedPosts } from '@/services/posts';
import { getPageRecordMap } from '@/services/page_record_map';

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostWithSlug(slug)
  if (!post) {
    return notFound();
  }

  if (!post.published) {
    return (
      <article
        data-revalidated-at={new Date().getTime()}
        className="mx-auto mt-40 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
        <Link href="/blog">
          <span className="mr-2">&larr;</span>
          <span>Go to list page</span>
        </Link>
      </article>
    );
  }

  const relatedPosts = await getRelatedPosts(post);
  let recordMap = await getPageRecordMap(post)

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="flex flex-col items-center"
      >
      <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
        <Image
          src={post.cover || process.env.SITE_URL + "/api/og?title=" + encodeURIComponent(post.title)}
          alt="cover"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
        <NotionPage post={post} recordMap={recordMap} />
      </article>
      <div className="mx-60 items-center">
        <BlogComments post={post} />
      </div>
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostsSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostWithSlug(slug);

  return post
    ? {
        title: post.title,
        openGraph: {
          images: [
            {
              url: post.cover || process.env.SITE_URL + "/api/og?title=" + encodeURIComponent(post.title),
              width: 400,
              height: 300,
            },
          ],
        },
      }
    : {};
}
