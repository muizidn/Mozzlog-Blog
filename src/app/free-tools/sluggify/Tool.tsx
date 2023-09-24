'use client';

import React, { useState } from 'react';

const TextToSlugConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  const handleConvertClick = () => {
    const convertedSlug = inputText
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(convertedSlug);
  };

  return (
    <div className="p-4 space-x-3">
      <input
        type="text"
        placeholder="Enter Text..."
        className="w-1/2 p-2 mb-4 border rounded-lg"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleConvertClick}
      >
        Convert
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Slug</h2>
        <p>{slug}</p>
      </div>
    </div>
  );
};

export default TextToSlugConverter;
