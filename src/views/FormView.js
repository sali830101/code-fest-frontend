import { useState, useEffect, useRef, useCallback } from "react";
import * as React from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Input,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Map from "../component/Map";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeviceContentReader from "../component/DeviceFile.js";
import HashtagInput from "../component/HashTag.js";
import axios from "axios";
import { Height } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

const selectStyle = {
  height: "40px",
  width: "100%",
};

const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // user data
  const [eventID, setEventID] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [gpsData, setGPSData] = useState([]);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [imagefile, setImageFile] = useState("");
  const [startTime, setStartTime] = useState(dayjs("2024-09-08T10:30"));
  const [endTime, setEndTime] = useState(dayjs("2024-09-08T15:30"));
  const [postTime, setPostTime] = useState("");
  const [currentHashtags, setCurrentHashtags] = useState([]);

  const summit = JSON.stringify({
    event_id: "event" + eventID,
    post_user_id: "member1",
    post_datetime: postTime,
    address: address,
    coordinate: gpsData,
    title: title,
    category: category,
    start_date: startTime,
    end_date: endTime,
    image: "image5.jpg",
    hashtag: currentHashtags,
    post: comment,
    comments: [],
    status: "open",
  });

  const API_KEY = "AIzaSyBkItptRJKeHJmj03NrrFm8Oy-5khTKiow";
  const convertToGps = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
      );
      const location = response.data.results[0].geometry.location;
      setGPSData([
        Number(location.lat.toFixed(4)),
        Number(location.lng.toFixed(4)),
      ]);
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  const handleHashtagsChange = (newHashtags) => {
    setCurrentHashtags(newHashtags);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
    convertToGps(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageButtonClick = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target.result);
    };
    // reader.readAsDataURL(file);

    setImageFile();
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const saveToLocalStorage = () => {
    //建立post time
    //儲存數據
    //跳轉頁面
    const currentTime = new Date();
    setPostTime(formatDate(currentTime));
    localStorage.setItem("data", summit);
    alert("數據已保存到 localStorage");
    readLocalStorag();
  };

  const readLocalStorag = () => {
    let data = localStorage.getItem("data");
    setTestData(data);
  };

  const [test_data, setTestData] = useState("123");

  useEffect(() => {
    const formatEventID = (number) => {
      const positiveInt = Math.max(0, Math.floor(Number(number)));
      return positiveInt.toString().padStart(3, "0");
    };

    const data = localStorage.getItem("data");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        let length = 0;

        if (Array.isArray(parsedData)) {
          length = parsedData.length;
        } else if (typeof parsedData === "object" && parsedData !== null) {
          length = Object.keys(parsedData).length;
        } else {
          length = 1;
        }

        setEventID(formatEventID(length));
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        setEventID("000");
      }
    } else {
      setEventID("000");
    }
  }, []);

  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "2400px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.2)",
          borderRadius: "4px",
        },
      }}
    >
      <div>{summit}</div>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          標題
        </Typography>
        <TextField
          id="title"
          onChange={handleTitle}
          value={title}
          placeholder="請輸入標題"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            sx: {
              height: "40px",
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          地址
        </Typography>
        <TextField
          id="address"
          onChange={handleAddress}
          value={address}
          placeholder="請輸入地址"
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            sx: {
              height: "40px",
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          類別
        </Typography>
        <Select
          style={selectStyle}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="類別"
          onChange={handleCategoryChange}
        >
          <MenuItem value={"food"}>食物</MenuItem>
          <MenuItem value={"item"}>物品</MenuItem>
          <MenuItem value={"help"}>人力 (小幫手)</MenuItem>
        </Select>
      </Box>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Typography
                component="label"
                htmlFor="title"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  color: "text.secondary",
                  width: "60px",
                }}
              >
                開始時間
              </Typography>
              <DateTimePicker
                // label="開始時間"
                value={startTime ? startTime : new Date()}
                onChange={(newValue) => setStartTime(newValue)}
              />
              <div style={{ margin: "10px" }}></div>
              {/* </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            > */}
              <Typography
                component="label"
                htmlFor="title"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  color: "text.secondary",
                  width: "60px",
                }}
              >
                結束時間
              </Typography>
              <DateTimePicker
                // label="結束時間"
                value={endTime ? endTime : new Date()}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <Box sx={{ alignItems: "center", marginTop: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          內容
        </Typography>
        <TextField
          id="comment"
          value={comment}
          onChange={handleCommentChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="請輸入完整訊息"
          multiline
          style={{ Height: "250px", width: "100%" }}
        />
      </Box>
      <Box sx={{ alignItems: "center", marginTop: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          上傳照片
        </Typography>
        <DeviceContentReader />
      </Box>
      <Box sx={{ alignItems: "center", marginTop: 2 }}>
        <Typography
          component="label"
          htmlFor="title"
          sx={{
            fontSize: "0.875rem",
            fontWeight: "medium",
            color: "text.secondary",
            width: "60px",
          }}
        >
          新增HashTag
        </Typography>
        <HashtagInput onHashtagsChange={handleHashtagsChange}></HashtagInput>
      </Box>

      <Box display="flex" justifyContent="center" width="100%" mt={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={saveToLocalStorage}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiButton-startIcon": {
              marginRight: 1,
            },
          }}
        >
          提交
        </Button>
      </Box>
    </Box>
  );
};
export default HomeView;
