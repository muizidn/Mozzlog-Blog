import Link from 'next/link';
import React from 'react';

interface BannerProjectProps {
    url: string;
    children: React.ReactNode;
}

const BannerProject: React.FC<BannerProjectProps> = ({url, children}) => {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 border-dashed border-purple-800 rounded-lg p-4 text-white hover:opacity-75"
    >
      {children}
    </Link>
  );
};

export default BannerProject;
