'use client';

import React, { useState } from 'react';
import FreeTools from '../FreeTools';

export default function ImageCompresser() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [compressProgress, setCompressProgress] = useState<number>(0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // You can also display a preview of the selected image here.
    }
  };

  const handleImageDrop = (files: File[]) => {
    if (files.length > 0) {
      setSelectedImage(files[0]);
      // You can also display a preview of the dropped image here.
    }
  };

  const handleCompress = async () => {
    // Implement image compression logic here
    // Update compressProgress as the compression progresses
    // Set the compressed image when compression is finished
  };

  const handleDownload = () => {
    // Implement logic to allow the user to download the compressed image
  };

  return (
    <div className="p-4">
      {/* Upload Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {/* Drag and Drop */}
      {/* Implement your drag and drop area here, you can use libraries like react-dropzone */}

      {/* Compress Button */}
      <button
        onClick={handleCompress}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Compress
      </button>

      {/* Upload Progress */}
      <div className="mt-4">
        Upload Progress: {uploadProgress}%
      </div>

      {/* Compression Progress */}
      <div className="mt-4">
        Compression Progress: {compressProgress}%
      </div>

      {/* Display Compressed Image */}
      {compressedImage && (
        <div className="mt-4">
          <img src={compressedImage} alt="Compressed" />
        </div>
      )}

      {/* Download Link */}
      {compressedImage && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Download Compressed Image
        </button>
      )}
    </div>
  );
}
