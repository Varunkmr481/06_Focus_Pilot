import { useState } from "react";
import { NavLink } from "react-router";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

const WelcomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .welcome-box {
    border: 2px solid #5f00d9;
    border-radius: 1rem;
    box-shadow: #5f00d9 1px 3px 20px 0.5px;

    margin: 0 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.3rem;
    height: auto;
    background-color: white;
    width: 20rem;
    padding: 0.8rem;
    width: 100%;
  }

  .welcome-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
  }

  .welcome-title {
    font-size: 1.5rem;
    font-weight: 900;
  }

  .welcome-subtitle {
    font-size: 0.8rem;
    color: rgb(157, 157, 157);
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  @media (min-width: 480px) {
    .welcome-box {
      width: 425px;
    }
  }
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
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ContactFormMessage = styled.div`
  font-size: 1rem;
  font-weight: 700;
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

const AgreementWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

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
    gap: 0.6rem;
  }
`;

const FormBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.6rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

const FormBtn = styled.button`
  border: unset;
  width: 100%;
  background-color: #5f00d9;
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgb(132, 45, 247);
    transform: translate(2px, -2px);
  }

  @media (min-width: 768px) {
    /* width: 48%; */
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
`;

const AuthRedirectText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
`;

const StyledNavlink = styled(NavLink)`
  text-decoration: none;
  color: rgb(123, 0, 180);
  font-weight: 600;
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormChecked, setIsFormChecked] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { name, surname, email, password, confirmPassword };
    console.log(data);

    // 1. Check if agree to T&C
    if (!isFormChecked) {
      toast.error("Please agree to T&C");
      return;
    }

    // 2. Check if passwords do not match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      // alert("password do not match");
      return;
    }

    try {
      // 2. Send response with data to backened
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      const result = await response.json();

      // 3. Handle response
      if (response.ok) {
        toast.success("Verification email sent. Please check your inbox.");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong 💥");
    }
  }

  return (
    <WelcomeWrapper>
      <div className="welcome-box">
        <div className="welcome-header">
          <div className="welcome-title">Welcome to Crypto App</div>
          <div className="welcome-subtitle">
            Create a free account by filling data below.
          </div>
        </div>

        <div className="welcome-content">
          <Form onSubmit={handleSubmit}>
            <ContactFormMessage>
              You will receive response within 24 hours of time of submit.
            </ContactFormMessage>

            {/* form */}
            <FormLayout>
              <FormRow>
                <FormField>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </FormField>

                <FormField>
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  ></input>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    autoComplete="new-password"
                    required
                  ></input>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="repeatpass">Repeat Password</label>
                  <input
                    type="password"
                    name="repeatpass"
                    id="repeatpass"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    autoComplete="new-password"
                    required
                  ></input>
                </FormField>
              </FormRow>
            </FormLayout>

            {/* form end */}

            <AgreementWrapper>
              <input
                type="checkbox"
                id="check"
                name="check"
                onChange={() => {
                  setIsFormChecked((prev) => !prev);
                }}
              ></input>

              <label htmlFor="check">
                I agree with <span id="aggrement">Terms & Conditions.</span>
              </label>
            </AgreementWrapper>

            <FormBtnWrapper>
              <FormBtn>Create Account</FormBtn>
            </FormBtnWrapper>
          </Form>

          <AuthRedirectText>
            <span>Already have an account?</span>
            <span>
              <StyledNavlink to="https://www.google.com">Log In</StyledNavlink>
            </span>
          </AuthRedirectText>
        </div>
      </div>

      <Toaster />
    </WelcomeWrapper>
  );
};

export default SignUp;
