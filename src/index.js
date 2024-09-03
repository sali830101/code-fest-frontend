import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate } from "react-router-dom";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import ModuleLayout from "./layout/ModuleLayout.js";
import ModuleController from "./controller/ModuleController.js";

const router = createHashRouter([
  {
    path: "/",
    element: <ModuleLayout />,
    children: [
      { path: "", element: <ModuleController /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "modules/:moduleName",
    element: <ModuleLayout />,
    children: [
      { path: "", element: <ModuleController /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  { path: "*", element: <Navigate to="/404" /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
