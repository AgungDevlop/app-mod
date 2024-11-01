import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Post } from "./pages/Post"; // Import Post component

const router = createBrowserRouter([
  {
    path: "/app-mod/",
    element: <Layout />,
    children: [
      {
        path: "/app-mod/",
        element: <Home />,
      },
      {
        path: "/app-mod/contact",
        element: <Contact />,
      },
      {
        path: "/app-mod/apps/:slug", // Dynamic route for Post
        element: <Post />, // Render Post component
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
