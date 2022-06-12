import React, {useState} from 'react';
import Compressor from 'compressorjs';

const Upload = () => {
  const [compressedFile, setCompressedFile] = useState(null);
  
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.        
        setCompressedFile(res)
      },
    });
  };
  
  return (
      <input
        accept="image/*,capture=camera"
        capture="”camera"
        type="file"
        onChange={(event) => this.handleCompressedUpload(event)}
      />
  );
};

export default Upload;