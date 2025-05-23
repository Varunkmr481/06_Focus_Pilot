import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import About from "./components/About";
import Support from "./components/Support";

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
      { index: true, path: "/", element: <Home /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "/about", element: <About /> },
      { path: "/support", element: <Support /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </StrictMode>
);
