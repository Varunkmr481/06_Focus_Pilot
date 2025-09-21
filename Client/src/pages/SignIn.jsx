// import { useEffect } from "react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { NavLink, useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const AuthWrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-sizing: border-box;
//   position: relative;
//   overflow: hidden;
// `;

// const BackgroundVideo = styled.video`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   z-index: -1;
// `;

// const AuthCard = styled.div`
//   border: 2px solid #5f00d9;
//   border-radius: 1rem;
//   box-shadow: #5f00d9 1px 3px 20px 0.5px;

//   /* height: 70vh; */
//   margin: 0 0.6rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   /* align-items: center; */
//   gap: 1.3rem;
//   /* height: 85%; */
//   height: auto;
//   /* background-color: lightseagreen; */
//   background-color: white;
//   width: 20rem;
//   padding: 1.3rem 1rem;
//   /* padding: 1.5vh 2vh; */
//   width: 100%;

//   @media (min-width: 480px) {
//     width: 425px;
//   }
// `;

// const AuthTitle = styled.div`
//   font-size: 1.5rem;
//   font-weight: 900;
// `;

// const AuthSubtitle = styled.div`
//   font-size: 0.8rem;
//   color: rgb(157, 157, 157);
//   /* color: red; */
// `;

// const AuthBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   /* align-items: center; */
//   gap: 0.5rem;
// `;

// const AuthHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.1rem;
// `;

// const Form = styled.form`
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 22px;
// `;

// const FormLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   justify-content: center;

//   @media (min-width: 768px) {
//     /* gap: 24px; */
//   }
// `;

// const FormRow = styled.div`
//   display: flex;
//   gap: 1.5rem;
// `;

// const FormField = styled.div`
//   display: flex;
//   gap: 0.3rem;
//   flex-direction: column;
//   width: ${({ $width }) => ($width ? $width : "50%")};

//   label {
//     font-size: 1rem;
//     font-weight: 500;
//   }

//   input {
//     height: 2rem;
//   }

//   input,
//   textarea {
//     box-sizing: border-box;
//     border-radius: 0.5rem;
//     padding: 0.3rem 0.7rem;
//     background-color: transparent;
//     border: 2px solid rgba(152, 152, 152, 0.3);
//     width: 100%;
//   }
// `;

// const FormOptions = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   label {
//     font-size: 0.9rem;
//     font-weight: 600;
//   }

//   input[type="checkbox"] {
//     transform: scale(1.3);
//   }

//   #aggrement {
//     color: purple;
//   }

//   @media (min-width: 768px) {
//     font-size: 1rem;
//     gap: 0.8rem;
//   }
// `;

// const CheckboxWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.3rem;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   gap: 0.6rem;
// `;

// const FormBtn = styled.button`
//   border: unset;
//   width: 100%;
//   /* background-color:rgb(181, 181, 181); */
//   background-color: ${({ $color }) => $color && $color};
//   border-radius: 0.6rem;
//   padding: 0.4rem 0.8rem;
//   color: ${({ $textcolor }) => ($textcolor ? $textcolor : "white")};
//   font-size: 1rem;
//   font-weight: 700;
//   text-align: center;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     cursor: pointer;
//     background-color: ${({ $hovercolor }) => $hovercolor && $hovercolor};
//     transform: translate(1px, -1px);
//     color: ${({ $hovertextclr }) => ($hovertextclr ? $hovertextclr : "white")};
//   }

//   @media (min-width: 768px) {
//     /* width: 48%; */
//     padding: 0.6rem 1rem;
//     font-size: 1rem;
//   }
// `;

// const ForgotPasswordLink = styled(NavLink)`
//   text-decoration: none;
//   font-size: 0.85rem;
//   color: rgb(123, 0, 180);
//   font-weight: 600;
// `;

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRememberMe, setIsRememberMe] = useState(false);
//   const navigate = useNavigate();

//   // strict mode m useeffect do baar run hote h
//   useEffect(() => {
//     const verifiedEmailNotification = function () {
//       const query = new URLSearchParams(window.location.search);
//       const status = query.get("status");
//       // console.log("Parameter : ", status);

//       if (status === "success") {
//         return toast.success(
//           "🎉 Your email has been successfully verified! Please login."
//         );
//       } else if (status === "already") {
//         return toast.success("✔️ Email already verified. Please login.");
//       }
//     };

//     verifiedEmailNotification();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     console.log("SUBMIT HANDLER TRIGGERED");

//     try {
//       const data = { email, password };
//       // console.log(data);
//       // console.log(!email);

//       // 1. Check if all fields entered
//       // if (!email || !password) {
//       //   console.log("enter email pass");
//       //   return toast.error("Please fill in all the required fields.");
//       // }

//       // 2. Send response with data to backened
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       console.log(response);

//       const result = await response.json();

//       // 3. Extracting details of the person who logged in
//       const {
//         name: loggedinUserName,
//         // eslint-disable-next-line no-unused-vars
//         email: loggedInEmail,
//         token: loggedinToken,
//       } = result;
//       console.log("result", result);

//       // 4. Handle response
//       if (response.ok) {
//         toast.success("Logged in successfully");
//         localStorage.setItem("email", loggedInEmail);
//         localStorage.setItem("token", loggedinToken);
//         localStorage.setItem("user", loggedinUserName);
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } else {
//         // console.log("ERROR")
//         toast.error(result.error || result.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("catch err : ", err);
//       toast.error(err.message || "Something went wrong 💥");
//     }
//   }

//   return (
//     <AuthWrapper>
//       <BackgroundVideo autoPlay muted loop>
//         <source src="/login.mp4" type="video/mp4" />
//         Your browser does not support the video
//       </BackgroundVideo>

//       <AuthCard>
//         <AuthHeader>
//           <AuthTitle>Welcome to Crypto App</AuthTitle>
//           <AuthSubtitle>
//             Enter your credentials to access the account.
//           </AuthSubtitle>
//         </AuthHeader>

//         <AuthBody>
//           <Form onSubmit={handleSubmit}>
//             <FormLayout>
//               <FormRow>
//                 <FormField $width="100%">
//                   <label htmlFor="email">
//                     Email <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     id="email"
//                     autoComplete="username"
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                     value={email}
//                   />
//                 </FormField>
//               </FormRow>

//               <FormRow>
//                 <FormField $width="100%">
//                   <label htmlFor="password">
//                     Password <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     autoComplete="current-password"
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                     value={password}
//                   />
//                 </FormField>
//               </FormRow>
//             </FormLayout>

//             <FormOptions>
//               <CheckboxWrapper>
//                 <input
//                   type="checkbox"
//                   id="check"
//                   name="check"
//                   onChange={() => {
//                     setIsRememberMe((prev) => !prev);
//                   }}
//                   checked={isRememberMe}
//                 />
//                 <label htmlFor="check">Remember me</label>
//               </CheckboxWrapper>

//               <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
//             </FormOptions>

//             <ButtonGroup>
//               <FormBtn
//                 $color="#5f00d9"
//                 $hovercolor="rgb(132, 45, 247)"
//                 type="submit"
//               >
//                 Log In
//               </FormBtn>
//             </ButtonGroup>
//           </Form>
//           <ButtonGroup>
//             <FormBtn
//               $textcolor="black"
//               $color="rgb(200, 200, 200)"
//               $hovertextclr="white"
//               $hovercolor="rgb(132, 45, 247)"
//               onClick={() => {
//                 navigate("/signup");
//               }}
//             >
//               Create New Account
//             </FormBtn>
//           </ButtonGroup>
//         </AuthBody>
//       </AuthCard>
//     </AuthWrapper>
//   );
// };

// export default SignIn;

// ----------------------------------------------------
// 2ND DESIGN

// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import toast from "react-hot-toast";

// // --- Styled Components ---

// const AuthWrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-sizing: border-box;
//   background-image: url("/login_back.png");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   position: relative;
//   overflow: hidden;
// `;

// const AuthCard = styled.div`
//   background: rgba(255, 255, 255, 0.15); /* Glassy background */
//   backdrop-filter: blur(14px) saturate(180%);
//   -webkit-backdrop-filter: blur(14px) saturate(180%);
//   border-radius: 1.5rem;
//   border: 1px solid rgba(255, 255, 255, 0.3);
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
//   width: 90%;
//   max-width: 450px;
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   color: white;
// `;

// const AuthHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   text-align: center;
// `;

// const AuthTitle = styled.div`
//   font-size: 2rem;
//   font-weight: 800;
//   color: #ffffff;
//   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
// `;

// const AuthSubtitle = styled.div`
//   font-size: 0.9rem;
//   color: rgba(255, 255, 255, 0.8);
//   font-weight: 500;
// `;

// const AuthBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const Form = styled.form`
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const FormLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const FormRow = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-direction: column;
// `;

// const FormField = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;

//   label {
//     font-size: 0.9rem;
//     font-weight: 600;
//     margin-bottom: 0.3rem;
//     color: rgba(255, 255, 255, 0.9);
//   }

//   input {
//     padding: 0.8rem 1rem;
//     border-radius: 0.75rem;
//     border: 1px solid rgba(255, 255, 255, 0.4);
//     background: rgba(255, 255, 255, 0.1);
//     color: #ffffff;
//     outline: none;
//     transition: all 0.3s ease;
//     font-size: 0.95rem;

//     &:focus {
//       border-color: #ffffff;
//       background: rgba(255, 255, 255, 0.2);
//     }
//     &::placeholder {
//       color: rgba(255, 255, 255, 0.6);
//     }
//   }
// `;

// const FormOptions = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 0.5rem;

//   label {
//     font-size: 0.9rem;
//     font-weight: 500;
//     color: rgba(255, 255, 255, 0.8);
//   }

//   input[type="checkbox"] {
//     transform: scale(1.3);
//     accent-color: #5f00d9;
//     cursor: pointer;
//   }
// `;

// const CheckboxWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const FormBtn = styled.button`
//   width: 100%;
//   padding: 0.9rem 1.5rem;
//   border-radius: 0.75rem;
//   font-size: 1rem;
//   font-weight: 600;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
//   border: ${({ $variant }) =>
//     $variant === "secondary" ? "2px solid rgba(255, 255, 255, 0.4)" : "none"};
//   background-color: ${({ $variant }) =>
//     $variant === "secondary" ? "transparent" : "#5f00d9"};
//   color: ${({ $variant }) => ($variant === "secondary" ? "#fff" : "white")};

//   &:hover {
//     background-color: ${({ $variant }) =>
//       $variant === "secondary"
//         ? "rgba(255, 255, 255, 0.2)"
//         : "rgb(132, 45, 247)"};
//     transform: translateY(-2px);
//     box-shadow: ${({ $variant }) =>
//       $variant === "secondary"
//         ? "0 4px 10px rgba(255, 255, 255, 0.1)"
//         : "0 4px 10px rgba(95, 0, 217, 0.4)"};
//   }
// `;

// const ForgotPasswordLink = styled(NavLink)`
//   text-decoration: none;
//   font-size: 0.85rem;
//   color: rgba(255, 255, 255, 0.8);
//   font-weight: 500;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #fff;
//   }
// `;

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRememberMe, setIsRememberMe] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifiedEmailNotification = function () {
//       const query = new URLSearchParams(window.location.search);
//       const status = query.get("status");
//       if (status === "success") {
//         return toast.success(
//           "🎉 Your email has been successfully verified! Please login."
//         );
//       } else if (status === "already") {
//         return toast.success("✔️ Email already verified. Please login.");
//       }
//     };
//     verifiedEmailNotification();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const data = { email, password };
//       const response = await fetch("http://localhost:8000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
//       const {
//         name: loggedinUserName,
//         email: loggedInEmail,
//         token: loggedinToken,
//       } = result;

//       if (response.ok) {
//         toast.success("Logged in successfully");
//         localStorage.setItem("email", loggedInEmail);
//         localStorage.setItem("token", loggedinToken);
//         localStorage.setItem("user", loggedinUserName);
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       } else {
//         toast.error(result.error || result.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error(err.message || "Something went wrong 💥");
//     }
//   }

//   return (
//     <AuthWrapper>
//       <AuthCard>
//         <AuthHeader>
//           <AuthTitle>Welcome to FocusPilot</AuthTitle>
//           <AuthSubtitle>
//             Enter your credentials to access the account.
//           </AuthSubtitle>
//         </AuthHeader>

//         <AuthBody>
//           <Form onSubmit={handleSubmit}>
//             <FormLayout>
//               <FormRow>
//                 <FormField>
//                   <label htmlFor="email">
//                     Email <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="email"
//                     id="email"
//                     autoComplete="username"
//                     onChange={(e) => setEmail(e.target.value)}
//                     value={email}
//                   />
//                 </FormField>
//               </FormRow>

//               <FormRow>
//                 <FormField>
//                   <label htmlFor="password">
//                     Password <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     autoComplete="current-password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     value={password}
//                   />
//                 </FormField>
//               </FormRow>
//             </FormLayout>

//             <FormOptions>
//               <CheckboxWrapper>
//                 <input
//                   type="checkbox"
//                   id="check"
//                   name="check"
//                   onChange={() => setIsRememberMe((prev) => !prev)}
//                   checked={isRememberMe}
//                 />
//                 <label htmlFor="check">Remember me</label>
//               </CheckboxWrapper>

//               <ForgotPasswordLink to="/forgot-password">
//                 Forgot password?
//               </ForgotPasswordLink>
//             </FormOptions>

//             <FormBtn type="submit" $variant="primary">
//               Log In
//             </FormBtn>
//           </Form>

//           <FormBtn
//             $variant="secondary"
//             onClick={() => {
//               navigate("/signup");
//             }}
//           >
//             Create New Account
//           </FormBtn>
//         </AuthBody>
//       </AuthCard>
//     </AuthWrapper>
//   );
// };

// export default SignIn;

// ----------------------------------------------------
// 3RD DESIGN

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

// Importing icons for form fields and social media (you might need to install react-icons)
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";

// --- Main Wrapper & Layout ---

const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-image: url("login_back.png"); /* Replace with your actual sunset image */
  background-size: cover;
  background-position: center;
  font-family: "Poppins", sans-serif;
  padding: 1rem; /* Added padding for smaller screens */

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const MainContainer = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
  display: flex;
  flex-direction: column;
  height: 90vh; /* Adjust height as needed */
  max-height: 700px;
  width: 95%;
  max-width: 1200px;
  overflow: hidden;
  background-color: white;
  /* visibility: hidden; */

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// --- Left Content Section ---

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1rem;
  border-radius: 2rem;
  justify-content: space-between;
  padding: 2.5rem;
  color: #fff;
  /* background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.2)
  ); // Semi-transparent overlay */
  background-image: url("/login_left_4.png");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  z-index: 20;

  /* Hide on small screens */
  display: none;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    /* background-color: aquamarine; */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    display: flex; /* Show on larger screens */
    flex: 1.5; /* Takes more space on larger screens */
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    height: 30px; /* Adjust logo size */
  }
`;

const WelcomeContent = styled.div`
  margin-top: auto; /* Push to bottom */
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  span {
    display: block;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  max-width: 400px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  a {
    color: #fff;
    font-size: 1.5rem;
    transition: color 0.3s ease;
    &:hover {
      color: #ae71ffff; /* purple-like hover */
    }
  }
`;

// --- Right Form Section ---

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;
  background: rgba(
    255,
    255,
    255,
    0.8
  ); /* Slightly less transparent for readability */
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 1.5rem; /* Match parent */

  @media (min-width: 768px) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const AuthTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormField = styled.div`
  position: relative;
  margin-bottom: 1rem;

  label {
    position: absolute;
    top: -0.75rem;
    left: 1rem;
    background: #fff;
    padding: 0 0.5rem;
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
    z-index: 1;
  }

  input {
    width: 100%;
    padding: 1rem 1.2rem 1rem 3rem; /* Space for icon */
    border-radius: 0.75rem;
    border: 1px solid #ddd;
    font-size: 1rem;
    color: #333;
    background-color: #f9f9f9;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #5f00d9;
      box-shadow: 0 0 0 2px rgba(95, 0, 217, 0.2);
    }
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.2rem;
  z-index: 2;
`;

const FormOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type="checkbox"] {
    accent-color: #5f00d9; /* Website theme color */
    transform: scale(1.1);
  }

  label {
    font-size: 0.9rem;
    color: #555;
  }
`;

const ForgotPasswordLink = styled(NavLink)`
  text-decoration: none;
  font-size: 0.9rem;
  color: #5f00d9; /* Website theme color */
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #8228f7; /* Lighter shade on hover */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: #5f00d9; /* Primary orange from image */
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7020d9ff; /* Slightly lighter orange on hover */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(132, 0, 255, 0.4);
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #aaa;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  &:not(:empty)::before {
    margin-right: 0.5rem;
  }

  &:not(:empty)::after {
    margin-left: 0.5rem;
  }
`;

const SocialLoginButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const SignUpPrompt = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #555;

  a {
    color: #5f00d9; /* Website theme color */
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #8228f7;
    }
  }
`;

// --- React Component ---

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifiedEmailNotification = function () {
      const query = new URLSearchParams(window.location.search);
      const status = query.get("status");
      if (status === "success") {
        return toast.success(
          "🎉 Your email has been successfully verified! Please login."
        );
      } else if (status === "already") {
        return toast.success("✔️ Email already verified. Please login.");
      }
    };
    verifiedEmailNotification();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("SUBMIT HANDLER TRIGGERED");
    try {
      const data = { email, password };
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const {
        name: loggedinUserName,
        email: loggedInEmail,
        token: loggedinToken,
      } = result;

      if (response.ok) {
        toast.success("Logged in successfully");
        localStorage.setItem("email", loggedInEmail);
        localStorage.setItem("token", loggedinToken);
        localStorage.setItem("user", loggedinUserName);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(result.error || result.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong 💥");
    }
  }

  return (
    <AuthWrapper>
      <MainContainer>
        <LeftSection>
          <Logo>
            {/* Replace with your logo image */}
            {/* <img src="/your-logo.png" alt="Logo" /> */}
            Focuspilot
          </Logo>
          <WelcomeContent>
            <WelcomeTitle>
              Welcome !<span>Let's Focus Together.</span>
            </WelcomeTitle>
            <WelcomeSubtitle>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, elit,
              temporibus? */}
              Manage your focus sessions, earn badges, and stay on top of your
              game. Your productivity dashboard awaits.
            </WelcomeSubtitle>
            <SocialIcons>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </SocialIcons>
          </WelcomeContent>
        </LeftSection>

        <RightSection>
          <AuthTitle>Sign In</AuthTitle>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <label htmlFor="email">Email</label>
              <IconWrapper>
                <IoMailOutline />
              </IconWrapper>
              <input
                type="email" // Changed type to email
                name="email"
                id="email"
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="amelielourent7622@gmail.com" // Placeholder from image
              />
            </FormField>

            <FormField>
              <label htmlFor="password">Password</label>
              <IconWrapper>
                <IoLockClosedOutline />
              </IconWrapper>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="**********" // Placeholder from image
              />
            </FormField>

            <FormOptions>
              <CheckboxWrapper>
                <input
                  type="checkbox"
                  id="rememberMe" // Changed id for clarity
                  name="rememberMe"
                  onChange={() => setIsRememberMe((prev) => !prev)}
                  checked={isRememberMe}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </CheckboxWrapper>
              <ForgotPasswordLink to="/forgot-password">
                Forgot Password?
              </ForgotPasswordLink>
            </FormOptions>

            <SubmitButton type="submit">Log In</SubmitButton>
          </Form>
          <OrDivider>Or login with</OrDivider>{" "}
          {/* Added "Or login with" divider */}
          <SocialLoginButtons>
            <SocialButton>
              <FaApple /> Apple
            </SocialButton>
            <SocialButton>
              <FcGoogle /> Google
            </SocialButton>
          </SocialLoginButtons>
          <SignUpPrompt>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </SignUpPrompt>
        </RightSection>
      </MainContainer>
    </AuthWrapper>
  );
};

export default SignIn;
