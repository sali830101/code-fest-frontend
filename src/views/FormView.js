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
  const [eventID, setEventID] = useState("999");
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
  const [eventData, setEventData] = useState(null);

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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatCount = (count) => {
    return count.toString().padStart(3, "0");
  };

  const updateEventDataCount = useCallback(() => {
    const data = localStorage.getItem("data");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          const startNum = 600 + parsedData.length;
          setEventData(formatCount(startNum));
        } else if (typeof parsedData === "object" && parsedData !== null) {
          setEventData("991");
        } else {
          setEventData("992");
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        setEventData("000");
      }
    } else {
      setEventData("000");
    }
  }, []);

  const saveToLocalStorage = useCallback(() => {
    const currentTime = new Date();
    const formattedPostTime = formatDate(currentTime);
    setPostTime(formattedPostTime);

    updateEventDataCount();

    const latestSummit = {
      event_id: "event" + eventID,
      post_user_id: "member1",
      post_datetime: formattedPostTime,
      address: address,
      coordinate: gpsData,
      title: title,
      category: category,
      start_date: startTime.toISOString(),
      end_date: endTime.toISOString(),
      image: "image5.jpg",
      hashtag: currentHashtags,
      post: comment,
      comments: [],
      status: "open",
    };

    const existingData = localStorage.getItem("data");
    let newData;
    if (existingData) {
      try {
        const parsedExistingData = JSON.parse(existingData);
        if (Array.isArray(parsedExistingData)) {
          newData = [...parsedExistingData, latestSummit];
        } else {
          newData = [parsedExistingData, latestSummit];
        }
      } catch (error) {
        console.error("Error parsing existing data:", error);
        newData = [latestSummit];
      }
    } else {
      newData = [latestSummit];
    }

    localStorage.setItem("data", JSON.stringify(latestSummit));
    alert(JSON.stringify(latestSummit));
  }, [
    eventID,
    address,
    gpsData,
    title,
    category,
    startTime,
    endTime,
    currentHashtags,
    comment,
    updateEventDataCount,
  ]);

  useEffect(() => {
    updateEventDataCount();
  }, [
    eventID,
    address,
    gpsData,
    title,
    category,
    startTime,
    endTime,
    currentHashtags,
    comment,
    updateEventDataCount,
  ]);

  const goHomeView = (category) => {
    navigate(`/modules/home?category=${category}`);
  };

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
      <div>{eventID}</div>
      <div>{eventData}</div>
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
