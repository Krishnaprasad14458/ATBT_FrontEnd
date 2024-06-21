// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB chunks

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate a preview URL for images
    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);
  };

  const uploadChunk = async (chunk, chunkNumber, totalChunks) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkNumber', chunkNumber);
    formData.append('totalChunks', totalChunks);

    const response = await axios.post('YOUR_SERVER_UPLOAD_ENDPOINT', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (chunkNumber / totalChunks) * 100 + (progressEvent.loaded / progressEvent.total) * (100 / totalChunks);
        setUploadProgress(progress);
      },
    });

    return response;
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setIsUploading(true);
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let chunkNumber = 0;

    for (let start = 0; start < file.size; start += CHUNK_SIZE) {
      const chunk = file.slice(start, start + CHUNK_SIZE);
      await uploadChunk(chunk, chunkNumber, totalChunks);
      chunkNumber += 1;
    }

    setIsUploading(false);
    alert('File uploaded successfully!');
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="File preview" style={{ width: '100px', marginTop: '10px' }} />}
      <button onClick={handleFileUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
      {isUploading && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
    </div>
  );
};

export default FileUpload;
