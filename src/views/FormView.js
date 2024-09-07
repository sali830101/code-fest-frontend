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
import HashtagInput from "../component/hashTag.js";
import axios from "axios";

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

  const API_KEY = "AIzaSyAYv2Xexb60SlUp1MwJKZmBxCdh62KUgsM";
  const convertToGps = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );

      setGPSData(response);
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  // user data
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [gpsData, setGPSData] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [imagefile, setImageFile] = useState("");
  const [startTime, setStartTime] = useState(dayjs("2022-04-17T15:30"));
  const [endTime, setEndTime] = useState(dayjs("2022-04-17T15:30"));

  const summit = JSON.stringify({
    event_id: "event001",
    post_user_id: "member1",
    post_datetime: "%Y-%m-%d %H:%M:%S",
    coordinate: [25.034, 121.5191],
    title: "中正紀念堂自由廣場飲料",
    category: "食物",
    start_date: "2024-09-05T13:00:00",
    end_date: "2024-09-05T16:00:00",
    image: "image5.jpg",
    hashtag: ["中正紀念堂", "自由廣場", "飲料", "五十嵐"],
    post: "中正紀念堂兩廳院廣場有多訂五十嵐20杯，快來拿！",
    comments: [
      {
        comment_id: "01",
        user_id: "member2",
        datetime: "%Y-%m-%d %H:%M:%S",
        comment: "有什麼茶",
      },
      {
        comment_id: "02",
        user_id: "member3",
        datetime: "%Y-%m-%d %H:%M:%S",
        comment: "還有幾杯",
      },
      {
        comment_id: "03",
        user_id: "member1",
        datetime: "%Y-%m-%d %H:%M:%S",
        comment: "四季春, 八冰綠, 還有各5杯",
      },
    ],
    status: "expired",
  });

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
    // convertToGps(event.target.value);
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

  const handleCommentChange = () => {};
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
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  const handleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("mobileData", "123456");
    alert("數據已保存到 localStorage");
    readLocalStorag();
  };

  const readLocalStorag = () => {
    let data = localStorage.getItem("mobileData");
    setTestData(data);
  };

  const [test_data, setTestData] = useState("123");

  useEffect(() => {}, [test_data]);

  const ScrollView = ({ children, height = "100%", width = "100%" }) => {
    return (
      <div
        style={{
          height,
          width,
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "20px",
        }}>
        {children}
      </div>
    );
  };

  return (
    <ScrollView height="100%" width="100%">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700">
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
          // autoFocus={true}
        />
      </div>

      <div>
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
          // autoFocus={true}
        />
      </div>

      <div>
        <text style={{ fontSize: 12 }}>{gpsData}</text>
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
          className="block text-sm font-medium text-gray-700">
          內容
        </label>
        <textarea
          id="comment"
          value={comment === null ? comment : "請輸入完整訊息"}
          onChange={handleCommentChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="請輸入完整訊息"
          rows={10}
          style={{ minHeight: "550px", resize: "vertical" }}
        />
      </div>
      <div>
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
      </div>
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
          }}>
          提交
        </Button>
      </div>
    </ScrollView>
  );
};
export default HomeView;
