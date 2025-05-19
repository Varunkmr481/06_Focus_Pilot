import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createGlobalStyle } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
      font-family: "Space Grotesk", sans-serif;
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, path: "/", element: <div>I am home</div> },
      { path: "/about", element: <div>I am about</div> },
      { path: "/support", element: <div>I am support</div> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>
);
