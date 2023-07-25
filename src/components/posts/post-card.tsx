'use client';

import Image from 'next/image';
import Link from 'next/link';

import CategoryList from '@/components/category-list';
import { Post } from '@/types/post';

export default function PostCard({
  number,
  post: { slug, title, date, cover, categories },
}: {
  number: number
  post: Post;
}) {
  let maxCategoryToShow = 2;
  let remaining = Math.max(categories.length - maxCategoryToShow, 0);
  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex">
        <div className="flex h-48 flex-col p-4">
          <p className="h-16 text-6xl font-bold">{number}</p>
        </div>
        <article className="mx-auto flex max-w-[25rem] flex-col overflow-hidden rounded-xl transition-all duration-300">
          <div className="flex h-48 flex-col p-4">
            <h3 className="line-clamp-2 h-16 text-2xl font-bold">{title}</h3>
            <time className="mb-4 mt-2 pl-2 text-sm text-gray-400">{date}</time>
            <CategoryList
              categories={categories
                .slice(0, maxCategoryToShow)
                .concat(remaining == 0 ? [] : ['+' + remaining.toString()])}
            />
          </div>
        </article>
      </div>
    </Link>
  );
}
