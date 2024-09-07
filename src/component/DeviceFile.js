import React, { useState, useRef } from 'react';

const DeviceContentReader = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentType, setContentType] = useState('');
  const fileInputRef = useRef(null);

  const handleContentSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setContentType(file.type);
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedContent(e.target.result);
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('text/')) {
        reader.readAsText(file);
      } else if (file.type.startsWith('audio/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const renderContent = () => {
    if (!selectedContent) return null;

    if (contentType.startsWith('image/')) {
      return <img src={selectedContent} alt="Selected" className="w-full h-auto rounded-lg shadow-lg" />;
    } else if (contentType.startsWith('text/')) {
      return <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">{selectedContent}</pre>;
    } else if (contentType.startsWith('audio/')) {
      return <audio controls src={selectedContent} className="w-full" />;
    } else {
      return <p>File selected: {contentType}</p>;
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="file"
        onChange={handleContentSelect}
        ref={fileInputRef}
        className="hidden"
        accept="image/*,text/*,audio/*"
      />
      {/* <button
        onClick={handleButtonClick}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
      >
        選擇裝置內容
      </button> */}
      {selectedContent && (
        <div className="mt-4">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default DeviceContentReader;

// // 使用示例
// const App = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen py-8">
//       <h1 className="text-2xl font-bold text-center mb-8">裝置內容讀取器</h1>
//       <DeviceContentReader />
//     </div>
//   );
// };