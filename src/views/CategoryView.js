import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const goHomeView = (needHelp) => {
    if (needHelp) {
      navigate(`/modules/form?category=${category}`);
    } else {
      navigate(`/modules/home?category=${category}`);
    }
  };

  return (
    <Box width="100%" height="100%">
      {!category && (
        <Box>
          <Box display="flex">
            <Button
              flex={1}
              onClick={() => {
                setCategory("food");
              }}
            >
              食
            </Button>
            <Button
              flex={1}
              onClick={() => {
                setCategory("item");
              }}
            >
              物
            </Button>
          </Box>
          <Box display="flex">
            <Button
              flex={1}
              onClick={() => {
                setCategory("help");
              }}
            >
              小幫手
            </Button>
          </Box>
        </Box>
      )}
      {category && (
        <Box>
          <Box display="flex">
            <Button
              flex={1}
              onClick={() => {
                goHomeView(0);
              }}
            >
              我要幫忙
            </Button>
            <Button
              flex={1}
              onClick={() => {
                goHomeView(1);
              }}
            >
              我需要幫忙
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default HomeView;
