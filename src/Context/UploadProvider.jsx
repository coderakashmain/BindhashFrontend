import React, { createContext, useContext, useState } from 'react';

// Step 1: Create context
const UploadContext = createContext();

// Step 2: Create provider component
export const UploadProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
      const [fakeUploading, setFakeUploading] = useState(false);

  return (
    <UploadContext.Provider value={{ file, setFile, uploadProgress, setUploadProgress,setFakeUploading,fakeUploading }}>
      {children}
    </UploadContext.Provider>
  );
};

// Step 3: Create custom hook for easy access
export const useUpload = () => useContext(UploadContext);
