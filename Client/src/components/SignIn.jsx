import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const AuthCard = styled.div`
  border: 2px solid #5f00d9;
  border-radius: 1rem;
  box-shadow: #5f00d9 1px 3px 20px 0.5px;

  /* height: 70vh; */
  margin: 0 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 1.3rem;
  /* height: 85%; */
  height: auto;
  /* background-color: lightseagreen; */
  background-color: white;
  width: 20rem;
  padding: 1.3rem 1rem;
  /* padding: 1.5vh 2vh; */
  width: 100%;

  @media (min-width: 480px) {
    width: 425px;
  }
`;

const AuthTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

const AuthSubtitle = styled.div`
  font-size: 0.8rem;
  color: rgb(157, 157, 157);
  /* color: red; */
`;

const AuthBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 0.5rem;
`;

const AuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
`;

const Form = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  @media (min-width: 768px) {
    /* gap: 24px; */
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FormField = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  width: ${({ $width }) => ($width ? $width : "50%")};

  label {
    font-size: 1rem;
    font-weight: 500;
  }

  input {
    height: 2rem;
  }

  input,
  textarea {
    box-sizing: border-box;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    background-color: transparent;
    border: 2px solid rgba(152, 152, 152, 0.3);
    width: 100%;
  }
`;

const FormOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  input[type="checkbox"] {
    transform: scale(1.3);
  }

  #aggrement {
    color: purple;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    gap: 0.8rem;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

const FormBtn = styled.button`
  border: unset;
  width: 100%;
  /* background-color:rgb(181, 181, 181); */
  background-color: ${({ $color }) => $color && $color};
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;
  color: ${({ $textcolor }) => ($textcolor ? $textcolor : "white")};
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${({ $hovercolor }) => $hovercolor && $hovercolor};
    transform: translate(1px, -1px);
    color: ${({ $hovertextclr }) => ($hovertextclr ? $hovertextclr : "white")};
  }

  @media (min-width: 768px) {
    /* width: 48%; */
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
`;

const ForgotPasswordLink = styled(NavLink)`
  text-decoration: none;
  font-size: 0.85rem;
  color: rgb(123, 0, 180);
  font-weight: 600;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate();

  // strict mode m useeffect do baar run hote h
  useEffect(() => {
    const verifiedEmailNotification = function () {
      const query = new URLSearchParams(window.location.search);
      const status = query.get("status");
      // console.log("Parameter : ", status);

      if (status === "success") {
        return toast.success("🎉 Your email has been successfully verified!");
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
      // console.log(data);
      // console.log(!email);

      // 1. Check if all fields entered
      // if (!email || !password) {
      //   console.log("enter email pass");
      //   return toast.error("Please fill in all the required fields.");
      // }

      // 2. Send response with data to backened
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      const result = await response.json();

      // 3. Extracting details of the person who logged in
      const {
        name: loggedinUserName,
        // eslint-disable-next-line no-unused-vars
        email: loggedInEmail,
        token: loggedinToken,
      } = result;
      console.log("result", result);

      // 4. Handle response
      if (response.ok) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", loggedinToken);
        localStorage.setItem("user", loggedinUserName);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // console.log("ERROR")
        toast.error(result.error || result.message || "Something went wrong");
      }
    } catch (err) {
      console.log("catch err : ", err);
      toast.error(err.message || "Something went wrong 💥");
    }
  }

  return (
    <AuthWrapper>
      <AuthCard>
        <AuthHeader>
          <AuthTitle>Welcome to Crypto App</AuthTitle>
          <AuthSubtitle>
            Enter your credentials to access the account.
          </AuthSubtitle>
        </AuthHeader>

        <AuthBody>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="email">
                    Email <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="username"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="password">
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </FormField>
              </FormRow>
            </FormLayout>

            <FormOptions>
              <CheckboxWrapper>
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  onChange={() => {
                    setIsRememberMe((prev) => !prev);
                  }}
                  checked={isRememberMe}
                />
                <label htmlFor="check">Remember me</label>
              </CheckboxWrapper>

              <ForgotPasswordLink>Forgot password?</ForgotPasswordLink>
            </FormOptions>

            <ButtonGroup>
              <FormBtn
                $color="#5f00d9"
                $hovercolor="rgb(132, 45, 247)"
                type="submit"
              >
                Log In
              </FormBtn>
            </ButtonGroup>
          </Form>
          <ButtonGroup>
            <FormBtn
              $textcolor="black"
              $color="rgb(200, 200, 200)"
              $hovertextclr="white"
              $hovercolor="rgb(132, 45, 247)"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create New Account
            </FormBtn>
          </ButtonGroup>
        </AuthBody>
      </AuthCard>
    </AuthWrapper>
  );
};

export default SignIn;
