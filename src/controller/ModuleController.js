import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeView from "../views/HomeView.js";
import CategoryView from "../views/CategoryView.js";

const ModuleController = () => {
  const { moduleName } = useParams();

  useEffect(() => {
    /* Fetch data here */
  }, []);

  if (moduleName === "home") {
    return <HomeView />;
  } else if (moduleName === "form") {
    return <HomeView />;
  } else {
    return <CategoryView />; // TODO: Redirect to 404
  }
};

export default ModuleController;
