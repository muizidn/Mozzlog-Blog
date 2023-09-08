// components/Comment.tsx
import Link from 'next/link';
import React from 'react';

import { Comment } from '@/types/comment';
import ValidationWarning from './validation-warning';
import FollowGithub from './follow-github';

const Comment: React.FC<Comment> = ({
  id,
  author,
  avatar,
  date,
  content,
  githubProfile,
}) => {
  return (
    <article className="mb-3 rounded-lg bg-white p-6 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="overflow-hidden inline-flex items-center text-sm text-gray-900 dark:text-white">
            <img
              className="mr-2 h-6 w-6 rounded-full"
              src={avatar}
              alt={author}
            />
            <Link
              className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold decoration-slate-700 hover:underline"
              href={githubProfile}
            >
              <span>{author}</span>
            </Link>
          </span>
          <FollowGithub githubProfile={githubProfile} />
          <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          <time dateTime={date} title={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
          </div>
        </div>
        <button
          id={`dropdown${id}Button`}
          data-dropdown-toggle={`dropdown${id}`}
          className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
        {/* Dropdown menu */}
        <div
          id={`dropdown${id}`}
          className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`dropdown${id}Button`}
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
    </article>
  );
};

export default Comment;
