import Link from 'next/link';
import React from 'react';

interface BannerProjectProps {
  url: string;
  children: React.ReactNode;
}

const BannerProject: React.FC<BannerProjectProps> = ({ url, children }) => {
  return (
    <div className="w-fit rounded-lg border-dashed border-purple-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white hover:opacity-75">
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </div>
  );
};

export default BannerProject;
