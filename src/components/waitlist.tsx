import Script from 'next/script';

export default function Waitlist({code}: {code: string}) {
  return (
    <>
      <Script src="https://getlaunchlist.com/js/widget-diy.js" />

      <form
        className="launchlist-form"
        action={"https://getlaunchlist.com/s/" + code}
        method="POST"
      >
        <div className='space-x-3'>
        <input
          type="email"
          name="email"
          className="w-auto rounded-full border-gray-500 px-5 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
          placeholder="Your email address"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Join Waitlist
        </button>
        </div>
      </form>
    </>
  );
}
