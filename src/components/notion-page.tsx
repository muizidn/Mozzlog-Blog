'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

import Code from './code';
import CategoryList from '@/components/category-list';
import '@/styles/notion.css';
import { Post } from '@/types/post';

export default function NotionPage({
  post,
  recordMap,
  header,
  footer
}: {
  post: Post;
  recordMap: ExtendedRecordMap;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { theme } = useTheme();

  var lastEditDate = new Date(post.lastEditedAt);

  var year = lastEditDate.toLocaleString('default', { year: 'numeric' });
  var month = lastEditDate.toLocaleString('default', { month: '2-digit' });
  var day = lastEditDate.toLocaleString('default', { day: '2-digit' });

  var lastEditFormatted = year + '-' + month + '-' + day;

  return (
    <NotionRenderer
      darkMode={false}
      recordMap={recordMap}
      fullPage
      forceCustomImages
      showTableOfContents
      disableHeader
      pageHeader={
        <div className="flex flex-col w-full space-y-2 mb-4">
          <CategoryList categories={post.categories} />
          <div>Last updated at {lastEditFormatted}</div>
          {header && header}
        </div>
      }
      pageFooter={
        <div className="flex flex-col items-center space-y-4">
          {/* callout feedback */}
          <div
            className="rounded-b border-t-4 border-blue-500 bg-blue-100 px-4 py-3 text-blue-900 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="mr-4 h-6 w-6 fill-current text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.47 15.88l4.42-4.37L9 12.17l4.42-4.42 1.17 1.17L9 14.5l-1.29-1.29-1.14 1.14zM17 2v10.97l-3.17-3.17L9 13.84l-3.84-3.84L3 12.14V2h14z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">
                  Awesome, thank you for reading the article.
                </p>
                <p className="text-sm">
                  If you find this article needs fixes or updates, please
                  comment. We are glad to receive your feedback!
                </p>
              </div>
            </div>
          </div>
          {/* like button */}
          <div className="flex items-center space-x-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 13l-4 4m0 0l-4-4m4 4V7"
                />
              </svg>
            </button>
          </div>
          {/* footer */}
          { footer && footer}
        </div>
      }
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
        nextLink: Link,
        nextImage: Image,
      }}
    />
  );
}

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false,
  }
);
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  }
);
