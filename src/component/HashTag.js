import React, { useState, useCallback, useEffect } from "react";
import { Chip, TextField, Box } from "@mui/material";

const HashtagInput = ({ onHashtagsChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (inputValue.trim() && !hashtags.includes(inputValue.trim())) {
          setHashtags((prevHashtags) => [...prevHashtags, inputValue.trim()]);
          setInputValue("");
        }
      }
    },
    [inputValue, hashtags]
  );

  const removeHashtag = useCallback((tagToRemove) => {
    setHashtags((prevHashtags) =>
      prevHashtags.filter((tag) => tag !== tagToRemove)
    );
  }, []);

  useEffect(() => {
    if (onHashtagsChange) {
      onHashtagsChange(hashtags);
    }
  }, [hashtags, onHashtagsChange]);

  return (
    <Box
      sx={{
        mx: "auto",
        borderRadius: 2,
        borderColor: "grey.300",
      }}
    >
      <TextField
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="輸入 hashtag 後按 Enter 或空格"
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {hashtags.map((tag, index) => (
          <Chip
            key={index}
            label={`#${tag}`}
            onDelete={() => removeHashtag(tag)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default HashtagInput;
