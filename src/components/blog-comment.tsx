import Script from 'next/script';
import React from 'react';

const BlogComments: React.FC = ({}) => {
  return (
    <>
      <Script
        src="https://giscus.app/client.js"
        data-repo={process.env.GISCUS_BLOG_REPO}
        data-repo-id={process.env.GISCUS_BLOG_REPO}
        data-category="Blog"
        data-category-id="blog" // for each post create a discussion title blog/<post.slug>
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="en"
        async
      ></Script>
      <div className="giscus mx-60 items-center w-full"></div>
    </>
  );
};


export default BlogComments;