import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Post } from "./pages/Post";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/app-mod/",
    element: <App />,
    children: [
      {
        path:"/app-mod/" , // Menggunakan index agar Home menjadi rute default
        element: <Home />,
      },
      {
        path: "/app-mod/contact",
        element: <Contact />,
      },
      {
        path: "/app-mod/apps/:slug",
        element: <Post />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);