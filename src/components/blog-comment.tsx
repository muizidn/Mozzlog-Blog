'use client';

import React, { useEffect, useState } from 'react';

import { Comment } from '@/types/comment';
import CommentForm from './comment-form';
import CommentList from './comment-list';

interface BlogCommentsProps {
  slug: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  async function onComment(github_profile: string, comment: string) {
    const resp = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        github_profile: github_profile,
        comment: comment,
        slug: slug,
      }),
    });

    const commentObject = (await resp.json()) as unknown as Comment;

    setComments([commentObject, ...comments]);
  }

  async function fetchComments() {
    const queryParams = new URLSearchParams({ slug: slug });
    const res = await fetch(`/api/comments?${queryParams}`);
    const { comments }: { comments: Comment[] } = await res.json();
    setComments([...comments]);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section className="py-8 antialiased dark:bg-gray-900 lg:py-16 w-full">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
            Discussion ({comments.length})
          </h2>
        </div>
        <CommentForm onComment={onComment} />
        <CommentList comments={comments} />
      </div>
    </section>
  );
};

export default BlogComments;
