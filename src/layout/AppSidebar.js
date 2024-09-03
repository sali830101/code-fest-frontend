import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Drawer, Toolbar, List, ListItem, Tooltip, IconButton } from "@mui/material";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";

const AppSidebar = () => {
  const navigate = useNavigate();
  const { moduleName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modules, setModules] = useState([
    {
      name: "3D Model Viewer",
      icon: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_BIMs.png" />,
      iconSelected: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_BIMs-over.png" />,
      hover: false,
    },
    {
      name: "Semantic Model Viewer",
      icon: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_Semantic.png" />,
      iconSelected: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_Semantic-over.png" />,
      hover: false,
    },
    {
      name: "Dashboard",
      icon: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_Dashboard.png" />,
      iconSelected: <img height={50} alt="logo" src="assets/icons/EMSD DT layout-v2R1_Dashboard-over.png" />,
      hover: false,
    },
  ]);

  const handleHover = (index, value) => {
    modules[index].hover = value;
    setModules([...modules]);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ backgroundColor: "transparent", "& .MuiDrawer-paper": { borderWidth: 0, backgroundColor: "transparent" } }}
    >
      <Toolbar />
      <Box>
        <List>
          {modules.map((module, index) => (
            <Tooltip key={index} title={module.name} placement="right" arrow>
              <ListItem disablePadding>
                <IconButton
                  onClick={() =>
                    navigate({
                      pathname: `/modules/${module.name}`,
                      search: createSearchParams(searchParams).toString(),
                    })
                  }
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  {moduleName === module.name ? module.iconSelected : module.hover ? module.iconSelected : module.icon}
                </IconButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppSidebar;
