import { NavLink } from "react-router";
import styled from "styled-components";
import { IoMdArrowBack } from "react-icons/io";

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
  margin: 0 0.6rem;
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

const BackIcon = styled(IoMdArrowBack)`
  font-size: 2rem;
  /* color: blueviolet; */
  color: black;
`;

const StyledNavBack = styled(NavLink)`
  /* background-color: aqua; */
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    color: #5f00d9;
  }
`;

const AuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 0.5rem;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
`;

const FormBtn = styled.div`
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

const ResetPassword = () => {
  return (
    <AuthWrapper>
      <AuthCard>
        <AuthHeader>
          {/* <StyledNavBack>
            <BackIcon />
          </StyledNavBack> */}
          <AuthTitle>Reset Password</AuthTitle>
          <AuthSubtitle>Enter your new password.</AuthSubtitle>
        </AuthHeader>

        <AuthBody>
          <Form>
            <FormLayout>
              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="password">New Password</label>
                  <input type="password" name="password" id="password" />
                </FormField>
              </FormRow>

              <FormRow>
                <FormField $width="100%">
                  <label htmlFor="repeatpassword">Repeat New Password</label>
                  <input
                    type="password"
                    name="repeatpassword"
                    id="repeatpassword"
                  />
                </FormField>
              </FormRow>
            </FormLayout>

            <ButtonGroup>
              <FormBtn
                $textcolor="black"
                $color="rgb(200, 200, 200)"
                $hovertextclr="white"
                $hovercolor="rgb(132, 45, 247)"
              >
                Reset Password
              </FormBtn>
            </ButtonGroup>
          </Form>
        </AuthBody>
      </AuthCard>
    </AuthWrapper>
  );
};

export default ResetPassword;
