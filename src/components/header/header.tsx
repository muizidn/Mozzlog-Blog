'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLink from '@/components/header/nav-link';
import ThemeToggle from '@/components/theme-toggle';

const NAV_ITEMS = [
  { path: 'blog', name: 'Blog' },
  { path: 'about', name: 'About' },
  { path: 'contact', name: 'Contact' },
  { path: 'projects', name: 'Projects' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-transparent md:border-none ${
        scrolled
          ? 'bg-primary dark:bg-slate-900 shadow-sm md:top-[20px] lg:top-[50px] lg:mx-4 lg:mt-4 lg:rounded-full lg:bg-white/30 lg:dark:bg-slate-900/30 lg:backdrop-blur-md lg:px-6 lg:py-4'
          : 'bg-primary dark:bg-slate-900 md:bg-transparent md:shadow-none md:py-6'
      } transition-all duration-300`}
    >
      <div className="flex flex-col justify-between md:flex-row items-center max-w-full">
        <Link href="/" className="text-3xl font-bold">
          MozzLog
        </Link>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.path}
                className="whitespace-nowrap py-2 text-lg font-medium text-secondary transition-all duration-300 hover:text-primary"
              >
                <NavLink path={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
