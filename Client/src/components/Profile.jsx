import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";
import Status from "./Status";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GridContentAbout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vh;
  width: 100%;
  height: 77vh;
`;

const BackgroundImgContainer = styled.div`
  background: url("./grid_bg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 70vw;
  height: 20vh;
  background-color: rgb(109, 17, 230);
  border-radius: 2rem 2rem 0 0;
  position: relative;
`;

const Avatar = styled.div`
  /* width: 6rem; */
  /* height: 6rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  border: unset;
  border-radius: 50%;
  border: 5px solid yellow;
  width: 8rem;
  height: 8rem;
  font-size: 8rem;
  background-color: white;
  position: absolute;
  right: 3%;
  bottom: -35%;
  overflow: hidden;
`;

const ProfileInfoContainer = styled.div`
  width: 70vw;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* border: 1px solid black; */
`;

const LabelValueWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.7rem;
  /* margin-bottom: 1rem; */
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
`;

const Value = styled.div`
  color: #555;
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  gap: 1rem;
`;

const ResetBtn = styled.button`
  border: unset;
  background-color: #5f00d9;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  cursor: pointer;
  width: 11.5rem;

  &:hover {
    background-color: rgb(111, 17, 233);
  }
`;

const VerifyEmailBtn = styled.button`
  border: unset;
  width: 11.5rem;
  background-color: #5f00d9;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(111, 17, 233);
  }
`;

const ResetPassForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;

  label {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const FormField = styled.div`
  display: flex;
  gap: 1rem;
  /* flex-direction: column; */
  /* width: 50%; */

  label {
    font-size: 1.2rem;
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
    width: 30%;
  }
`;

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(null);
  const [userTypedPass, setUserTypedPass] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    function extractLoggedInDetails() {
      const email = localStorage.getItem("email");
      let name = localStorage.getItem("user");
      name = name[0].toUpperCase() + name.slice(1);

      setLoggedUser((prev) => {
        return { ...prev, name: name, email: email };
      });
    }

    extractLoggedInDetails();
  }, []);

  useEffect(() => {
    async function isEmailVerified() {
      // 0. Guard: skip if email is not loaded yet
      if (!loggedUser?.email) return;

      // 1. Get token
      const token = localStorage.getItem("token");

      // 2. NO token found
      if (!token) {
        toast.error("Error! kindly logout & login again");
        return;
      }

      // 3. Send request to /profile
      try {
        const response = await fetch("http://localhost:8000/profile", {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: loggedUser.email }),
        });

        const data = await response.json();
        console.log(data);

        setLoggedUser((prev) => {
          return { ...prev, verified: data.isVerified };
        });
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    }

    isEmailVerified();
  }, [loggedUser.email]);

  const handleVerifyEmail = async () => {
    try {
      // 1. prepare data for sending and add loader
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // 2. Check if token exists or not
      if (!token) {
        toast.error("Error! kindly login again");
        navigate("/login");
        return;
      }

      // 3. send post request to the /resend-verification
      const res = await fetch("http://localhost:8000/resend-verification", {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        // emailBtnRef.current.style.display = "none";
        setIsEmailSent(true);
        return toast.success(data.message);
      } else {
        return toast.error(
          data.error || data.message || "Something went wrong."
        );
      }
    } catch (err) {
      // console.log(err)
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function resetPasswordHandler(e) {
    e.preventDefault();

    try {
      // 1. Extract token from the localstorage
      const token = localStorage.getItem("token");

      // 2. Send token, usertyped current & new password to /reset-password
      const res = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userTypedPass),
      });

      // 3. Receive data from server
      const data = await res.json();

      // 4. Perform response handling
      if (data.success) {
        setUserTypedPass({ currentPassword: "", newPassword: "" });
        toast.success("Password reset successfully 🎉");
        return;
      } else {
        toast.error(data.error || data.message || "Error! Try again later");
        return;
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <GridContentAbout>
      <BackgroundImgContainer>
        <Avatar>
          <MdAccountCircle />
        </Avatar>
      </BackgroundImgContainer>

      <ProfileInfoContainer>
        <LabelValueWrapper>
          <Label>Email : </Label>
          <Value>{loggedUser.email}</Value>
        </LabelValueWrapper>

        <LabelValueWrapper>
          <Label>Name : </Label>
          <Value>{loggedUser.name}</Value>
        </LabelValueWrapper>

        {/* pending */}
        <LabelValueWrapper>
          <Label>Verification : </Label>
          <Value>
            <Status
              statustext={loggedUser?.verified ? "completed" : "pending"}
            />
          </Value>
        </LabelValueWrapper>

        <ButtonWrapper>
          {!loggedUser.verified && !isEmailSent && (
            <VerifyEmailBtn onClick={handleVerifyEmail} disabled={isLoading}>
              {isLoading ? "Loading" : "Verify Email"}
            </VerifyEmailBtn>
          )}
        </ButtonWrapper>

        <ResetPassForm onSubmit={resetPasswordHandler}>
          <FormField>
            <label>Current Password :</label>
            <input
              type="text"
              value={userTypedPass.currentPassword}
              onChange={(e) =>
                setUserTypedPass((prev) => {
                  return { ...prev, currentPassword: e.target.value };
                })
              }
            />
          </FormField>
          <FormField>
            <label>New Password :</label>
            <input
              type="text"
              value={userTypedPass.newPassword}
              onChange={(e) =>
                setUserTypedPass((prev) => {
                  return { ...prev, newPassword: e.target.value };
                })
              }
            />
          </FormField>
          <ResetBtn type="submit">Reset Password</ResetBtn>
        </ResetPassForm>
      </ProfileInfoContainer>
    </GridContentAbout>
  );
};

export default Profile;
