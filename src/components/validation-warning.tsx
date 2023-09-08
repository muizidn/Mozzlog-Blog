import React from 'react';

const ValidationWarning: React.FC = () => {
  return (
    <div className="group relative inline-block">
      <div className="absolute left-full top-0 hidden rounded bg-yellow-500 p-2 text-sm text-white shadow-md group-hover:block">
        Waiting validation
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-6 w-6 text-yellow-500"
      >
        <path d="M12 9v2m0 4h0"></path>
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    </div>
  );
};

export default ValidationWarning;
