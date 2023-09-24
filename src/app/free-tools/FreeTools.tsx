import Link from 'next/link';
import React from 'react';

import BannerProject from '@/components/banner_project';

const freeToolsData = [
  {
    name: 'Chat GPT Online from TomioAI',
    description:
      'Enhanced ChatGPT UI to make your work with ChatGPT model easier. It supports Prompt Library and the developer is keep adding more features',
    link: 'https://tomioai.com/',
  },
  {
    name: 'Learn more about other ChatGPT alternatives',
    description: 'You can use Bard, Claude, PI, and many more',
    link: '/free-tools/chatbot',
  },
  {
    name: 'Json Beautifier and Formatter Online',
    description:
      'This tool helps you beautify and format your JSON data',
    link: '/free-tools/json-beautify',
  },
  {
    name: 'File Convert Online',
    description:
      'This tool helps you convert file online',
    link: '/free-tools/file-convert',
  },
  {
    name: 'Unix Timestamp to UTC and Local Date Converter',
    description:
      'This tool helps you convert unix timestamp to UTC and local date',
    link: '/free-tools/unix-time',
  },
  {
    name: 'Image Compression',
    description:
      'Easy and fast image compression with Rust',
    link: '/free-tools/image-compress',
  },
  {
    name: 'Text Sluggify Online',
    description:
      'This tool helps you turn text into a slug for blog url or any other purposes',
    link: '/free-tools/sluggify',
  },
];

const FreeTools: React.FC<{title?:string}> = ({title}) => {
  return (
    <div className="container mx-auto mt-8 space-y-3">
      <h2 className="text-3xl font-bold">{title || "Try Other Free Tools"}</h2>
      <ul>
        {freeToolsData.map((tool, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-xl font-semibold hover:underline hover:text-indigo-500">
              <Link href={tool.link} target="_blank" rel="noopener noreferrer">
                {tool.name} 🚀
              </Link>
            </h2>
            <p className="text-gray-600">{tool.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreeTools;
