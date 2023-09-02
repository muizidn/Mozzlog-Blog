import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import BlogComments from '@/components/blog-comment';
import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import SharingButtons from '@/components/share-buttons';
import { getPageRecordMap } from '@/services/page_record_map';
import {
  getAllPostsSlugs,
  getPostWithSlug,
  getRelatedPosts,
} from '@/services/posts';

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostWithSlug(slug);
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
  let recordMap = await getPageRecordMap(post);

  const encodedUrl = encodeURIComponent(
    process.env.NEXT_PUBLIC_SITE_URL + '/blog/' + post.slug
  );
  const text = encodeURIComponent(
    "Hmm, I just read this. I'll repost it to revisit later. You can too!"
  );

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="flex flex-col items-center"
      >
        {/* <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
        <Image
          src={post.cover || "/api/og?title=" + encodeURIComponent(post.title)}
          alt="cover"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div> */}
        <NotionPage
          post={post}
          recordMap={recordMap}
          header={<SharingButtons encodedUrl={encodedUrl} text={text} />}
          footer={<BlogComments/>}
        />
      </article>
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
          title: post.title,
          images: [
            {
              url:
                post.cover ||
                process.env.NEXT_PUBLIC_SITE_URL +
                  '/api/og?title=' +
                  encodeURIComponent(post.title),
              width: 1200,
              height: 630,
            },
          ],
        },
      }
    : {};
}
