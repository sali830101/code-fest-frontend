import React, { useState, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

const MultiplePhotoUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (event) => {
    setLoading(true);
    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        } else {
          reject(new Error("Not an image file"));
        }
      });
    });

    Promise.all(promises)
      .then((results) => {
        setSelectedImages((prevImages) => [...prevImages, ...results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
        setLoading(false);
        alert(
          "錯誤：無法讀取一個或多個文件。請確保所有選擇的文件都是有效的圖片。"
        );
      });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoSelect}
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
      />
      <Button
        variant="contained"
        startIcon={<PhotoCamera />}
        onClick={handleButtonClick}
      >
        選擇照片
      </Button>
      {loading && <CircularProgress />}
      {selectedImages.length > 0 && (
        <Box sx={{ mt: 2, width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            已選擇的照片：
          </Typography>
          <Grid container spacing={2}>
            {selectedImages.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ position: "relative" }}>
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "rgba(255,255,255,0.7)",
                    }}
                    onClick={() => handleDeleteImage(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MultiplePhotoUploader;
