import React from "react";
import { Box, AppBar, Toolbar, Link, Typography, Tooltip, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AppHeader = () => {
  const theme = useTheme();

  return (
    <AppBar position="fixed" sx={{ zIndex: `${theme.zIndex.drawer + 1} !important` }} color="background">
      <Toolbar
        sx={{
          minWidth: 768,
          minHeight: "64px !important",
          boxShadow: "inset 0 -1px 0 rgba(100,121,143,0.122)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display={"flex"} alignItems="center">
          <Link height={50} component={RouterLink} to="/">
            <img height={50} alt="logo" src="logo.png" />
          </Link>
          {/* <Typography variant="h6" mx={3} sx={{ color: theme.palette.common.white }}>
            EMSD Digital Twins Platform
          </Typography> */}
        </Box>
        <Box>
          <Tooltip title="Account" placement="left" arrow>
            <IconButton size="medium">
              <img
                height={30}
                sx={{
                  marginLeft: theme.spacing(1),
                  marginRight: theme.spacing(4),
                }}
                alt="logo"
                src="icons/user.svg"
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
