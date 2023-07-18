'use client'

import { Post } from '@/types/post';

import { DiscussionEmbed } from "disqus-react"
const BlogComments = ({ post }: { post: Post}) => {
  const disqusShortname = "mozzlog"
  const disqusConfig = {
    url: "https://mozzlog.com/blog/" + post.slug,
    identifier: post.id, // Single post id
    title: post.title // Single post title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default BlogComments;