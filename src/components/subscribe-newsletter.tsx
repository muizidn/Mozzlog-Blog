'use client';

import { ChangeEvent, useState } from "react";
import { Mixpanel } from "@/services/mixpanel";

export default function SubscribeNewsletter() {
    const [email, setEmail] = useState('')

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
}

  function subscribe() {
    if (email === '') { return }
    let x = new XMLHttpRequest();
    x.open('POST', '/api/newsletter');
    x.send(JSON.stringify({
        email: email,
    }))
    Mixpanel.track("Subscribe Newsletter")
    x.onload = () => {
      setEmail('');
      alert("Success! You have successfully subscribed")
    }
  }

  return (
    <div className="space-x-4">
      <input
      id="newsletter-email"
        className="w-3/5 rounded-full border border-gray-400 px-6 py-3"
        type="text"
        placeholder="Your email address"
        onChange={handleChange}
        value={email}
      />
      <button
        className="group relative m-1 inline-flex cursor-pointer items-center justify-center rounded border-b-4 border-l-2 border-purple-700 bg-gradient-to-tr from-purple-600 to-purple-500 px-3.5 py-2 text-white shadow-lg active:border-purple-600 active:shadow-none"
        onClick={subscribe}
      >
        <span className="relative">Subscribe</span>
      </button>
    </div>
  );
}
