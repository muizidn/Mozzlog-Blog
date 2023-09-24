'use client';

import React, { useState } from 'react';

const FileConversionTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleConvertClick = async () => {
    setTimeout(() => {
      const convertedDataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';
      const blob = dataURItoBlob(convertedDataUri);
      const convertedFile = new File([blob], 'converted_file.jpg', { type: 'image/jpeg' });
      setConvertedFile(convertedFile);
    }, 2000);
  };

  return (
    <div className="p-4 space-x-3">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-lg"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={handleConvertClick}
        disabled={!selectedFile}
      >
        Convert
      </button>

      {convertedFile && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Converted File</h2>
          <p>File Name: {convertedFile.name}</p>
          <p>File Type: {convertedFile.type}</p>
          <a
            href={URL.createObjectURL(convertedFile)}
            download={convertedFile.name}
            className="text-blue-500 hover:underline"
          >
            Download Converted File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileConversionTool;

const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeString });
};
