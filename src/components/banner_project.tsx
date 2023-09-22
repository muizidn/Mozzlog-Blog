"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface BannerProjectProps {}

const BannerProject: React.FC<BannerProjectProps> = () => {
  const [banner, setBanner] = useState<{
    url: string;
    marketingCopy: string;
  } | null>(null);

  useEffect(() => {
    setBanner({
      url: "https://tomioai.com/",
      marketingCopy: "Try Free Preview Access to TomioAI! Create a Prompt Library for more productive ChatGPT experience."
    })
  }, []);

  if (!banner) {
    return null;
  }

  return (
    <div className="w-fit rounded-lg border-dashed border-purple-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white hover:opacity-75">
      <Link href={banner.url} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col items-end">
          <div>{banner.marketingCopy} ↩️</div>
          <div>Go to {banner.url}</div>
        </div>
      </Link>
    </div>
  );
};

export default BannerProject;
