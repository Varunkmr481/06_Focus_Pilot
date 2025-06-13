import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import About from "./components/About";
import Support from "./components/Support";
// import Welcome from "./components/Welcome";
import SuccessNotification from "./components/SuccessNotification";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import { Toaster } from "react-hot-toast";
import ExpiredJwt from "./components/ExpiredJwt";
import Profile from "./components/Profile";

// Password Reset Done
/* <SuccessNotification
  icon={<img src="./tick.png" alt="tick" />}
  title="Password Reset Done"
  subtitle="Now you can access you account."
  to="https://www.google.com"
  btntext="Sign In"
/>; */

// Email Verification
/* <SuccessNotification
  icon={<img src="./mail.png" />}
  title="Email Verification"
  subtitle="We have sent you an email verification to  jenny.wilson@gmail.com. If you didn’t receive it, click the button below."
  btntext="Re-Send Email"
/> */

// Successfully Registered
/* <SuccessNotification
  icon={<img src="tick.png" />}
  title="Successfully Registration"
  subtitle="Hurray! You have successfully created your account. Enter the app to explore all it’s features."
  btntext="Enter the App"
/> */

// Password Reset Sent
/* <SuccessNotification
  icon={<img src="tick.png" />}
  title="Successfully Sent"
  subtitle="We have sent instructions on how to reset your password to jenny.wilson@gmail.com. Please follow the instructions from the email."
  btntext="Enter the App"
  btn={false}
/> */

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
  // { path: "/", element: <Navigate to="/signup" /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "transactions", element: <Transactions /> },
      { path: "about", element: <About /> },
      { path: "support", element: <Support /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/expired-jwt",
    element: (
      <ExpiredJwt
        title="Your verification link has expired. Please log in to your account to request a new verification email."
        btntext="Log in"
        to="/login"
      />
    ),
  },
  {
    path: "http://localhost:5173/profile",
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
    <Toaster />
  </>
);
