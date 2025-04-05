'use client'

import { useState } from 'react';

export default function WaitlistForm(props: { code?: string }) {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY!}`
      },
      body: JSON.stringify({ email, waitlist_project_code: props.code }),
    });

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
        className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600"
      >
        Join Waitlist
      </button>
    </form>
  );
}
