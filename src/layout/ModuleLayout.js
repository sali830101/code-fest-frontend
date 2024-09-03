import React, { useEffect, useState } from "react";
import { Box, Button, CssBaseline, IconButton, Tooltip } from "@mui/material";
import AppHeader from "./AppHeader.js";
import AppSidebar from "./AppSidebar.js";
import { Outlet, useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import HomeView from "../views/HomeView.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5AB4C5",
    },
    secondary: {
      main: "#F5BA4B",
    },
    error: {
      main: "#D45251",
    },
    warning: {
      main: "#FD853A",
    },
    background: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

const ModuleLayout = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <CssBaseline />
        <AppHeader />
        <Box
          sx={{
            bottom: -64,
            width: "100%",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            width="100%"
            height="100%"
            sx={{
              position: "absolute",
              top: 0,
              backgroundColor: theme.palette.background.default,
              zIndex: `${theme.zIndex.drawer - 1} !important`,
            }}
            padding={3}
          >
            <HomeView />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ModuleLayout;
