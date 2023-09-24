import React from 'react';

import FreeTools from './FreeTools';
import BannerProject from '@/components/banner_project';

const Page: React.FC = () => {
  return (
    <div className="space-x-3">
      <h1 className="mb-4 text-3xl font-semibold">Free Tools Online</h1>
      <p className="mb-4 text-xl">
        This page list common utilities or tools that you can use just using
        your browser. Some tools are developed by Mozzlog team, while the other
        are links to tools we suggest for you.
      </p>
      <div className="flex justify-center">
        <BannerProject />
      </div>
      <FreeTools title='List Free Tools for You'/>
    </div>
  );
};

export default Page;
