'use client'

import { useState } from 'react';

export default function WaitlistForm(props: { project: string }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY!}`
      },
      body: JSON.stringify({ email, waitlist_project: props.project }),
    });

    setLoading(false);

    if (res.ok) {
      alert('🎉 Thank you! You’ve been added to the waitlist.');
      setEmail('');
    } else {
      alert('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-auto rounded-full border-gray-500 px-5 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="relative inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-70"
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          'Join Waitlist'
        )}
      </button>
    </form>
  );
}
