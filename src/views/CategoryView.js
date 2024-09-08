import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, useTheme, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const goHomeView = (category) => {
    navigate(`/modules/home?category=${category}`);
  };

  return (
    <Box width="100%" height="100%">
      {!category && (
        <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"} gap={2}>
          <img height={200} alt="logo" src="icons/back01.png" />
          <Box display="flex" justifyContent={"center"}>
            <IconButton onClick={() => goHomeView("help")}>
              <img height={60} alt="logo" src="icons/hands.png" />
            </IconButton>
            <IconButton onClick={() => goHomeView("item")}>
              <img height={60} alt="logo" src="icons/objects.png" />
            </IconButton>
            <IconButton onClick={() => goHomeView("food")}>
              <img height={60} alt="logo" src="icons/foods.png" />
            </IconButton>
          </Box>
          <img width={"100%"} alt="logo" src="background02.png" />
          <img width={"100%"} alt="logo" src="statistics.png" />
        </Box>
      )}
    </Box>
  );
};
export default HomeView;
