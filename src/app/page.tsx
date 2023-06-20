import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Welcome | Mozzlog',
};

export default function HomePage() {
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        Hello, What Mozz 🤖 Can Help You Today?
      </h1>
      <h2 className="mt-12 text-center text-3xl">
        We find problem. We get some helps. We solve it. We share our learning.
        OK?
      </h2>
      <div className="space-y-4">
        <h3 className="mt-12 text-center text-3xl font-bold">
          Weekly update is a must. Sometimes more.
        </h3>
        <div className="flex space-x-4">
          <input
            className="w-2/5 rounded-full border border-gray-400 px-6 py-3"
            type="text"
            placeholder="Your email address"
          />
          <button className="group relative m-1 inline-flex cursor-pointer items-center justify-center rounded border-b-4 border-l-2 border-purple-700 bg-gradient-to-tr from-purple-600 to-purple-500 px-3.5 py-2 text-white shadow-lg active:border-purple-600 active:shadow-none">
            <span className="relative">Subscribe | Not Implemented Yet</span>
          </button>
        </div>
      </div>
      <Analytics />
    </>
  );
}
