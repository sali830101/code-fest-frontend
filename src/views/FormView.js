import { useState, useEffect, useRef, useCallback } from "react";
import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Map from "../component/Map";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DateField } from "@mui/x-date-pickers/DateField";
// import { TimeField } from "@mui/x-date-pickers/TimeField";
// import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
// import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro/MultiInputDateRangeField";
// import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
// import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import DeviceContentReader from "../component/DeviceFile.js";
import HashtagInput from "../component/HashTag.js";

const ProSpan = styled("span")({
  display: "inline-block",
  height: "1em",
  width: "1em",
  verticalAlign: "middle",
  marginLeft: "0.3em",
  marginBottom: "0.08em",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(https://mui.com/static/x/pro.svg)",
});

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
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [imagefile, setImageFile] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState(dayjs("2022-04-17T15:30"));
  const [endTime, setEndTime] = useState(dayjs("2022-04-17T15:30"));

  const handleCategoryChange = (event: SelectChangeEvent) => {
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

  const handleCommentChange = (event: SelectChangeEvent) => {
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
        <Input
          style={inlineStyle}
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full"
          placeholder="請輸入標題"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700">
          地址
        </label>
        <Input
          style={inlineStyle}
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full"
          placeholder="請輸入地址"
        />
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
          style={{ minHeight: "150px", resize: "vertical" }}
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
        <Button type="submit" className="w-full">
          提交
        </Button>
      </div>
    </ScrollView>
  );
};
export default HomeView;
