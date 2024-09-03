import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeView from "../views/HomeView.js";

const ModuleController = () => {
  const { moduleName } = useParams();

  useEffect(() => {
    /* Fetch data here */
  }, []);

  if (moduleName === "3D Model Viewer") {
    return null;
  } else {
    return <HomeView />; // TODO: Redirect to 404
  }
};

export default ModuleController;
