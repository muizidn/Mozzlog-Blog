import Link from 'next/link';
import React, { useState } from 'react';

const FollowGithub: React.FC<{ githubProfile: string }> = ({
  githubProfile,
}) => {
  return (
    <div className="group relative inline-block">
      <Link
        href={githubProfile}
        className={`rounded bg-yellow-500 p-2 text-sm text-white shadow-md`}
      >
        Follow
      </Link>
    </div>
  );
};

export default FollowGithub;
