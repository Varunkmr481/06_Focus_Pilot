// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router";
// import styled from "styled-components";
// import toast, { Toaster } from "react-hot-toast";

// const WelcomeWrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-sizing: border-box;

//   .welcome-box {
//     border: 2px solid #5f00d9;
//     border-radius: 1rem;
//     box-shadow: #5f00d9 1px 3px 20px 0.5px;

//     margin: 0 0.2rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 1.3rem;
//     height: auto;
//     background-color: white;
//     width: 20rem;
//     padding: 0.8rem;
//     width: 100%;
//   }

//   .welcome-header {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 0.1rem;
//   }

//   .welcome-title {
//     font-size: 1.5rem;
//     font-weight: 900;
//   }

//   .welcome-subtitle {
//     font-size: 0.8rem;
//     color: rgb(157, 157, 157);
//   }

//   .welcome-content {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 0.5rem;
//   }

//   @media (min-width: 480px) {
//     .welcome-box {
//       width: 425px;
//     }
//   }
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
// `;

// const FormRow = styled.div`
//   display: flex;
//   gap: 1.5rem;
// `;

// const ContactFormMessage = styled.div`
//   font-size: 1rem;
//   font-weight: 700;
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

// const AgreementWrapper = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   align-items: center;

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
//     gap: 0.6rem;
//   }
// `;

// const FormBtnWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: column;
//   gap: 0.6rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//     gap: 0;
//   }
// `;

// const FormBtn = styled.button`
//   border: unset;
//   width: 100%;
//   background-color: #5f00d9;
//   border-radius: 0.6rem;
//   padding: 0.4rem 0.8rem;
//   color: white;
//   font-size: 1rem;
//   font-weight: 700;
//   text-align: center;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     cursor: pointer;
//     background-color: rgb(132, 45, 247);
//     transform: translate(2px, -2px);
//   }

//   @media (min-width: 768px) {
//     /* width: 48%; */
//     padding: 0.6rem 1rem;
//     font-size: 1rem;
//   }
// `;

// const AuthRedirectText = styled.div`
//   font-size: 0.9rem;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.1rem;
// `;

// const StyledNavlink = styled(NavLink)`
//   text-decoration: none;
//   color: rgb(123, 0, 180);
//   font-weight: 600;
// `;

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isFormChecked, setIsFormChecked] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setIsLoading(true);
//       const data = { name, surname, email, password, confirmPassword };
//       console.log(data);

//       // 0. Check if all fields entered
//       if (!name || !email || !password || !confirmPassword) {
//         return toast.error("Please fill in all the required fields.");
//       }

//       // 1. Check if agree to T&C
//       if (!isFormChecked) {
//         return toast.error("Please agree to T&C");
//       }

//       // 2. Check if passwords do not match
//       if (password !== confirmPassword) {
//         return toast.error("Passwords do not match!");
//       }

//       // 3. Send response with data to backened
//       const response = await fetch("http://localhost:8000/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       console.log(response);

//       const result = await response.json();

//       // 4. Handle response
//       if (response.ok) {
//         toast.success("Verification email sent. Please check your inbox.");
//         navigate("/verify-email", {
//           state: { email },
//         });
//       } else {
//         // console.log("ERROR")
//         toast.error(result.error || result.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("catch err : ", err);
//       toast.error(err.message || "Something went wrong 💥");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <WelcomeWrapper>
//       <div className="welcome-box">
//         <div className="welcome-header">
//           <div className="welcome-title">Welcome to Crypto App</div>
//           <div className="welcome-subtitle">
//             Create a free account by filling data below.
//           </div>
//         </div>

//         <div className="welcome-content">
//           <Form onSubmit={handleSubmit}>
//             <ContactFormMessage>
//               You will receive response within 24 hours of time of submit.
//             </ContactFormMessage>

//             {/* form */}
//             <FormLayout>
//               <FormRow>
//                 <FormField>
//                   <label htmlFor="name">
//                     Name <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     onChange={(e) => {
//                       setName(e.target.value);
//                     }}
//                   />
//                 </FormField>

//                 <FormField>
//                   <label htmlFor="surname">Surname</label>
//                   <input
//                     type="text"
//                     name="surname"
//                     id="surname"
//                     onChange={(e) => {
//                       setSurname(e.target.value);
//                     }}
//                   ></input>
//                 </FormField>
//               </FormRow>

//               <FormRow>
//                 <FormField $width="100%">
//                   <label htmlFor="email">
//                     Email <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                   ></input>
//                 </FormField>
//               </FormRow>

//               <FormRow>
//                 <FormField $width="100%">
//                   <label htmlFor="password">
//                     Password{" "}
//                     <span style={{ color: "red", paddingLeft: "2px" }}>*</span>
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                     autoComplete="new-password"
//                   ></input>
//                 </FormField>
//               </FormRow>

//               <FormRow>
//                 <FormField $width="100%">
//                   <label htmlFor="repeatpass">
//                     Repeat Password <span style={{ color: "red" }}>*</span>
//                   </label>
//                   <input
//                     type="password"
//                     name="repeatpass"
//                     id="repeatpass"
//                     onChange={(e) => {
//                       setConfirmPassword(e.target.value);
//                     }}
//                     autoComplete="new-password"
//                   ></input>
//                 </FormField>
//               </FormRow>
//             </FormLayout>

//             {/* form end */}

//             <AgreementWrapper>
//               <input
//                 type="checkbox"
//                 id="check"
//                 name="check"
//                 onChange={() => {
//                   setIsFormChecked((prev) => !prev);
//                 }}
//               ></input>

//               <label htmlFor="check">
//                 I agree with <span id="aggrement">Terms & Conditions.</span>
//               </label>
//             </AgreementWrapper>

//             <FormBtnWrapper>
//               <FormBtn>{isLoading ? "Loading...." : "Create Account"}</FormBtn>
//             </FormBtnWrapper>
//           </Form>

//           <AuthRedirectText>
//             <span>Already have an account?</span>
//             <span>
//               <StyledNavlink to="/login">Log In</StyledNavlink>
//             </span>
//           </AuthRedirectText>
//         </div>
//       </div>

//       <Toaster />
//     </WelcomeWrapper>
//   );
// };

// export default SignUp;

// // -----------------------------------

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

// Importing icons for social media (if you need them)
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// --- Main Wrapper & Layout ---

const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-image: url("/signup_modal_back_4.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: "Poppins", sans-serif;
  padding: 1rem;
`;

const MainContainer = styled.div`
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.3);
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-height: 800px; /* Adjusted height for more fields */
  width: 95%;
  max-width: 1200px;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5rem;
  margin: 1rem;
  border-radius: 2rem;
  color: #fff;
  /* background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.2)
  ); */
  background-image: url("/signup_left.png");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  display: none;
  z-index: 20;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    display: flex;
    flex: 1.5;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WelcomeContent = styled.div`
  margin-top: auto;
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
  color: rgba(255, 255, 255, 1);
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
      color: #ae71ffff;
    }
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  border-radius: 1.5rem;

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

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.4rem;
  }

  input {
    width: 100%;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #1f2937;
    outline: none;
    transition: all 0.2s ease-in-out;
    font-size: 0.95rem;

    &:focus {
      border-color: #5f00d9;
      box-shadow: 0 0 0 3px rgba(95, 0, 217, 0.2);
    }
    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const AgreementWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    transform: scale(1.1);
    accent-color: #5f00d9;
    cursor: pointer;
  }

  label {
    font-size: 0.9rem;
    color: #4b5563;

    span {
      color: #5f00d9;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.5rem;
  background-color: #5f00d9;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(95, 0, 217, 0.2);

  &:hover {
    background-color: #4a00b2;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(95, 0, 217, 0.3);
  }
`;

const AuthRedirectText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  margin-top: 1.5rem;
`;

const StyledNavlink = styled(NavLink)`
  text-decoration: none;
  color: #5f00d9;
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    color: #8228f7;
  }
`;

// --- React Component ---

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormChecked, setIsFormChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = { name, surname, email, password, confirmPassword };

      if (!name || !email || !password || !confirmPassword) {
        return toast.error("Please fill in all the required fields.");
      }

      if (!isFormChecked) {
        return toast.error("Please agree to T&C");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Verification email sent. Please check your inbox.");
        navigate("/verify-email", { state: { email } });
      } else {
        toast.error(result.error || result.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong 💥");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthWrapper>
      <MainContainer>
        <LeftSection>
          <Logo>Focuspilot</Logo>
          <WelcomeContent>
            <WelcomeTitle>
              Start Your Journey
              <span>To Peak Productivity.</span>
            </WelcomeTitle>
            <WelcomeSubtitle>
              Create your free account today to track your focus sessions,
              achieve new milestones, and join our global leaderboard.
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
          <AuthTitle>Create Account</AuthTitle>

          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormField>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter your name"
                />
              </FormField>
              <FormField>
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  placeholder="Enter your surname"
                />
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@company.com"
                />
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="new-password"
                  placeholder="**********"
                />
              </FormField>
              <FormField>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoComplete="new-password"
                  placeholder="**********"
                />
              </FormField>
            </FormRow>

            <AgreementWrapper>
              <input
                type="checkbox"
                id="check"
                name="check"
                onChange={() => setIsFormChecked((prev) => !prev)}
                checked={isFormChecked}
              />
              <label htmlFor="check">
                I agree with{" "}
                <StyledNavlink to="/terms">Terms & Conditions</StyledNavlink>.
              </label>
            </AgreementWrapper>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create Account"}
            </SubmitButton>
          </Form>

          <AuthRedirectText>
            Already have an account?{" "}
            <StyledNavlink to="/login">Log In</StyledNavlink>
          </AuthRedirectText>
        </RightSection>
      </MainContainer>
      <Toaster />
    </AuthWrapper>
  );
};

export default SignUp;
