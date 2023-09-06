'use client';
'use client';

import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Post } from '@/types/post';

const SyncPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [checkedPosts, setCheckedPosts] = useState<string[]>([]); // Track checked posts

  const revalidatePaths = async (
    slugsToRevalidate: string[],
    password: string
  ) => {
    setMessage('Revalidating...');

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${password}`);

    const promises: Promise<Response>[] = [];

    slugsToRevalidate.forEach((slug) => {
      promises.push(fetch(`/api/revalidate?path=/blog/${slug}`, { headers }));
    });

    await Promise.all(promises);
    return true;
  };

  const revalidateGroup = async (password: string) => {
    setMessage('Revalidating...');

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${password}`);

    const promises: Promise<Response>[] = [
      fetch(`/api/revalidate?path=/`, { headers }),
      fetch(`/api/revalidate?path=/sitemap.xml`, { headers }),
      fetch(`/api/revalidate?path=/blog`, { headers }),
    ];

    await Promise.all(promises);

    setMessage('Done');
    return true;
  };

  const sync = async (password: string) => {
    setMessage('Detecting changes');

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${password}`);

    const formattedDate = selectedDate ? selectedDate.toISOString() : '';
    const queryParams = new URLSearchParams({ after: formattedDate });
    const postsRes = await fetch(`/api/posts?${queryParams}`, { headers });

    if (postsRes.status === 403) {
      setMessage('Wrong password');
      return false;
    }
    if (postsRes.status === 500) {
      setMessage('Notion API error, try again later');
      return false;
    }

    const { posts }: { posts: Post[] } = await postsRes.json();

    setPosts(posts);
    return true;
  };

  const handleCheck = (slug: string) => {
    if (checkedPosts.includes(slug)) {
      setCheckedPosts(checkedPosts.filter((item) => item !== slug));
    } else {
      setCheckedPosts([...checkedPosts, slug]);
    }
  };

  const revalidateCheckedPosts = () => {
    if (checkedPosts.length > 0) {
      revalidatePaths(checkedPosts, password).then((revalidated) => {
        if (revalidated) {
          setMessage('Sync Finished!');
        }
      });
    } else {
      setMessage('No posts selected for revalidation');
    }
  };

  function synchronize() {
    if (password) {
      sync(password).then((revalidated) => {
        if (revalidated) {
          setMessage('Sync Finished!');
        }
      });
    }
  }

  useEffect(() => {
    const password = prompt('Enter password');
    setPassword(password || '');
  }, []);

  return (
    <div className="mt-[10vh] text-center">
      <div className="flex items-center space-x-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="dd-MM-yyyy HH:mm:ss"
          timeFormat="HH:mm:ss"
          placeholderText="Select date and time"
          className="mt-4 rounded-lg border border-gray-300 p-2"
        />
        <button
          onClick={synchronize}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Synchronize
        </button>
        {checkedPosts.length > 0 && (
          <button
            onClick={revalidateCheckedPosts}
            className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Revalidate Checked Posts
          </button>
        )}
        {posts.length > 0 && (
          <button
            onClick={() => revalidateGroup(password)}
            className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            Revalidate Group
          </button>
        )}
      </div>
      <p className="text-3xl">{message}</p>
      <div>
        {posts.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="rounded-lg bg-white p-4 shadow-md">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.date}</p>
                <p className="mt-2 text-blue-500">
                  <a href={`/blog/${post.slug}`}>Read more</a>
                </p>
                {/* Add checkbox for each post */}
                <input
                  type="checkbox"
                  onChange={() => handleCheck(post.slug)}
                  checked={checkedPosts.includes(post.slug)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SyncPage;
