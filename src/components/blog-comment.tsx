'use client';

import { DiscussionEmbed } from 'disqus-react';
import isMobile from 'is-mobile';

import { Post } from '@/types/post';

const BlogComments = ({ post }: { post: Post }) => {
  if (isMobile()) {
    return <></>;
  }
  const disqusShortname = 'mozzlog';
  const disqusConfig = {
    url: `${process.env.SITE_URL}/blog/` + post.slug,
    identifier: post.id, // Single post id
    title: post.title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default BlogComments;
