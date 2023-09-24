'use client'

import React, { useState } from 'react';

const UnixTimeConverter: React.FC = () => {
  const [unixTime, setUnixTime] = useState<number>(0);
  const [localTime, setLocalTime] = useState<string>('');
  const [utcTime, setUtcTime] = useState<string>('');

  const handleConvertClick = () => {
    if (!isNaN(unixTime)) {
      const localDate = new Date(unixTime * 1000).toLocaleString();
      const utcDate = new Date(unixTime * 1000).toUTCString();
      setLocalTime(localDate);
      setUtcTime(utcDate);
    } else {
      setLocalTime('Invalid Unix Time');
      setUtcTime('Invalid Unix Time');
    }
  };

  return (
    <div className="p-4 space-x-3">
      <input
        type="number"
        placeholder="Enter Unix Time..."
        className="w-1/2 p-2 mb-4 border rounded-lg"
        value={unixTime}
        onChange={(e) => setUnixTime(parseInt(e.target.value))}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleConvertClick}
      >
        Convert
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Local Time</h2>
        <p>{localTime}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">UTC Time</h2>
        <p>{utcTime}</p>
      </div>
    </div>
  );
};

export default UnixTimeConverter;
