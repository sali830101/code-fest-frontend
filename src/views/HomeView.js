import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Chip,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import Map from "../component/Map";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const statusOption = [
  { label: "完成", value: "completed" },
  { label: "過期", value: "expired" },
  { label: "取消", value: "cancelled" },
  { label: "開放中", value: "open" },
];

const districtOption = [
  { label: "中正區", value: "中正區" },
  { label: "大同區", value: "大同區" },
  { label: "中山區", value: "中山區" },
  { label: "松山區", value: "松山區" },
  { label: "大安區", value: "大安區" },
  { label: "萬華區", value: "萬華區" },
  { label: "信義區", value: "信義區" },
  { label: "士林區", value: "士林區" },
  { label: "北投區", value: "北投區" },
  { label: "內湖區", value: "內湖區" },
  { label: "南港區", value: "南港區" },
  { label: "文山區", value: "文山區" },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const map = useRef();
  return (
    <Box display="flex" width="100%" height="100%">
      <Box
        width="100%"
        height="50%"
        position="relative"
        sx={{ zIndex: `${theme.zIndex.drawer + 3} !important` }}
      >
        <Map ref={map} lng={121.5151569} lat={25.0554262} zoom={12}></Map>
      </Box>
      <Box
        maxHeight={180}
        sx={{ overflowY: "auto" }}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        {filteredRequests.length > 0 &&
          filteredRequests.map((row) => (
            <Card
              sx={{
                maxWidth: "100%",
                minHeight: 60,
                display: "flex",
                gap: 2,
                alignItems: "center",
                padding: 1,
              }}
              // display="flex"
              key={row.event_id}
              // gap={2}
              // alignItems={"center"}
              onClick={() => {
                navigate(`/modules/event?event_id=${row.event_id}`);
              }}
            >
              {/* <Box
            display="flex"
            key={row.event_id}
            gap={2}
            alignItems={"center"}
            onClick={() => {
              navigate(`/modules/event?event_id=${row.event_id}`);
            }}
          > */}
              <Avatar
                sx={{ bgcolor: theme.palette.primary.main }}
                aria-label="recipe"
              >
                {getUser(row.post_user_id)?.realName.substring(0, 1)}
              </Avatar>
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {row.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {row.post?.length > 10
                    ? `${row.post.substring(0, 10)}...`
                    : row.post}
                </Typography>
              </Box>
              {row.image && (
                <img
                  height="30"
                  width="30"
                  src={`images/${row.image}`}
                  alt="image"
                  style={{ objectFit: "cover" }}
                />
              )}
              {/* </Box> */}
            </Card>
          ))}
      </Box>
      <IconButton
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: theme.palette.primary.main,
        }}
        onClick={() => {
          navigate("/modules/form");
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
export default HomeView;
