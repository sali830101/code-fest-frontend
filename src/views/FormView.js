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

const inlineStyle = {
  width: "80%",
  backgroundColor: "lightblue",
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
};

const selectStyle = {
  width: "80%",
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

  const summit = JSON.stringify({
    event_id: "event" + eventID,
    post_user_id: "member1",
    post_datetime: postTime,
    coordinate: gpsData,
    title: title,
    category: category,
    start_date: startTime,
    end_date: endTime,
    image: "image5.jpg",
    hashtag: ["中正紀念堂", "自由廣場", "飲料", "五十嵐"],
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
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          標題
        </label>
        <input
          style={inlineStyle}
          id="title"
          onChange={handleTitle}
          value={title}
          className="mt-1 block w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="請輸入標題"
          type="text"
        />
      </div>

      {/* <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700">
          地址
        </label>
        <TextField
          style={inlineStyle}
          id="address"
          value={address}
          onChange={handleAddress}
          className="mt-1 block w-full"
          placeholder="請輸入地址"
        />
      </div>

      <div>
        <text style={{ fontSize: 12 }}>{setEventID}</text>
      </div>

      <div>
        <InputLabel id="demo-simple-select-label">類別</InputLabel>
        <Select
          style={selectStyle}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="類別"
          onChange={handleCategoryChange}>
          <MenuItem value={"food"}>食物</MenuItem>
          <MenuItem value={"item"}>物資</MenuItem>
          <MenuItem value={"people"}>人力</MenuItem>
        </Select>
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="開始時間"
              value={startTime ? startTime : new Date()}
              onChange={(newValue) => setStartTime(newValue)}
            />
            <DateTimePicker
              label="結束時間"
              value={endTime ? endTime : new Date()}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-300">
          內容
        </label>
        <textarea
          id="comment"
          value={comment === null ? comment : "請輸入完整訊息"}
          onChange={handleCommentChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="請輸入完整訊息"
          rows={10}
          style={{ Height: "250px", width: "100%" }}
        />
      </div> */}
      {/* <div>
        <Button type="submit" className="w-full">
          上傳圖片
        </Button>
      </div>

      <div>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div> */}
      <div>
        <div className="bg-gray-100 min-h-screen py-8">
          <h1 className="text-2xl font-bold text-center mb-8">上傳照片</h1>
          <DeviceContentReader />
        </div>
      </div>
      <div>
        <HashtagInput></HashtagInput>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full"
          onClick={() => {
            saveToLocalStorage();
          }}
        >
          提交
        </Button>
      </div>
    </Box>
  );
};
export default HomeView;
