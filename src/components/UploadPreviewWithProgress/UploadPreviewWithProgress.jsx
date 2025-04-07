import React, { useEffect, useState } from 'react';
import { useUpload } from '../../Context/UploadProvider';
import './UploadPreviewWithProgress.css';
const UploadPreviewWithProgress = () => {
  const { file, uploadProgress,fakeUploading } = useUpload();
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);


  //  console.log(allpost)

  const isUploading = file && (uploadProgress > 0 && uploadProgress < 100 || fakeUploading);

if (!isUploading) return null;

  const isImage = file?.type.startsWith('image');
  const isVideo = file?.type.startsWith('video');

  return (
    <div className="p-upload-preview-container">

      <div className="p-preview-media">
        {isImage && <img src={previewUrl} alt="Preview" className="p-preview-img" />}
        {isVideo && <video src={previewUrl}  className="p-preview-video" />}
      </div>

      <div className="p-upload-progress-bar">
        <div
          className="p-upload-progress-fill"
          style={{ width: `${uploadProgress}%` }}
        />
      </div>

      <p className="p-upload-progress-text">
        Uploading... {uploadProgress.toFixed(0)}%
      </p>
    </div>
  );
};

export default UploadPreviewWithProgress;
