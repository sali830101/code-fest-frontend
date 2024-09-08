import React, { useState, useEffect, useCallback } from "react";

const LocalStorageJSON = () => {
  const [inputText, setInputText] = useState("");
  const [storedData, setStoredData] = useState(null);
  const storageKey = "myAppData";

  // 從 localStorage 加載數據
  useEffect(() => {
    const loadedData = localStorage.getItem(storageKey);
    if (loadedData) {
      setStoredData(JSON.parse(loadedData));
    }
  }, []);

  // 處理輸入變化
  const handleInputChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  // 保存數據到 localStorage
  const handleSave = useCallback(() => {
    const dataToSave = { text: inputText, timestamp: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    setStoredData(dataToSave);
    setInputText(""); // 清空輸入
  }, [inputText]);

  // 清除存儲的數據
  const handleClear = useCallback(() => {
    localStorage.removeItem(storageKey);
    setStoredData(null);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-5 p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">本地數據存儲</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
        placeholder="輸入要保存的文本"
        rows="4"
      />
      <div className="mt-4 space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          保存
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          清除數據
        </button>
      </div>
      {storedData && (
        <div className="mt-4">
          <h3 className="font-bold">存儲的數據：</h3>
          <p>文本：{storedData.text}</p>
          <p>時間戳：{new Date(storedData.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default LocalStorageJSON;
