'use client';

import React, { useState } from 'react';

const JsonBeautifier: React.FC = () => {
  const [inputJSON, setInputJSON] = useState<string>('');
  const [outputJSON, setOutputJSON] = useState<string>('');

  const handleBeautifyClick = () => {
    try {
      const parsedJSON = JSON.parse(inputJSON);
      const beautifiedJSON = JSON.stringify(parsedJSON, null, 2);
      setOutputJSON(beautifiedJSON);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setOutputJSON('Invalid JSON');
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full h-40 p-2 mb-4 border rounded-lg"
        placeholder="Enter JSON here..."
        value={inputJSON}
        onChange={(e) => setInputJSON(e.target.value)}
      ></textarea>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleBeautifyClick}
      >
        Beautify
      </button>

      <textarea
        className="w-full h-40 p-2 border rounded-lg"
        placeholder="Beautified JSON will appear here..."
        value={outputJSON}
        readOnly
      ></textarea>
    </div>
  );
};

export default JsonBeautifier;
