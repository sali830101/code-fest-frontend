import React, { useState, useCallback } from 'react';

const HashtagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim() && !hashtags.includes(inputValue.trim())) {
        setHashtags([...hashtags, inputValue.trim()]);
        setInputValue('');
      }
    }
  }, [inputValue, hashtags]);

  const removeHashtag = useCallback((tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  }, [hashtags]);

  return (
    <div className="max-w-md mx-auto mt-5 p-4 border rounded-lg shadow-sm">
      <div className="mb-4">
        {hashtags.map((tag, index) => (
          <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-2">
            #{tag}
            <button 
              onClick={() => removeHashtag(tag)}
              className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="輸入 hashtag 後按 Enter 或空格"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="mt-2 text-sm text-gray-500">
        已添加 {hashtags.length} 個 hashtag
      </p>
    </div>
  );
};

export default HashtagInput;