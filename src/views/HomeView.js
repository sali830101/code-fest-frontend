import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Map from "../component/Map";
import Bluetooth from "../component/BlueTooth";


const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const map = useRef();
  return (
    <Box display="flex" width="100%" height="100%">
      <Box width="100%" height="100%" position="relative" sx={{ zIndex: `${theme.zIndex.drawer + 3} !important` }}>
        <Map ref={map} lng={121.5151569} lat={25.0554262} zoom={12}></Map>
        {/* <Bluetooth></Bluetooth> */}
      </Box>
    </Box>
  );
};
export default HomeView;