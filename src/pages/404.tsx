import Link from 'next/link';
import { useRouter } from 'next/router';

import '@/styles/globals.css';

export default function NotFound() {
  const { asPath, pathname } = useRouter();
  console.log(asPath, pathname);
  return (
    <>
      <div className="mx-auto mt-20 flex w-4/5 flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
        <h4 className="py-10 text-lg font-semibold capitalize text-red-500">
          The Nothingness and Emptiness is here...
        </h4>
        <p>
          Use the search box or the links below to explore our amazing
          application
        </p>
        <input
          className="w-4/5 rounded-full border border-gray-400 px-6 py-3"
          type="search"
          placeholder="Just a dummy search box..."
        />
        <div className="space-x-4">
          <Link
            className="text-blue-600 underline duration-300 hover:text-red-500"
            href="/"
          >
            Homepage
          </Link>
          <Link
            className="text-blue-600 underline duration-300 hover:text-red-500"
            href="/latest"
          >
            Latest Products
          </Link>
          <Link
            className="text-blue-600 underline duration-300 hover:text-red-500"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
