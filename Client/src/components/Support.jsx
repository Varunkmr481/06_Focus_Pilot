import { IoChatbubble } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import styled from "styled-components";

const ContentSupportContainer = styled.div`
  background-color: plum;
  width: 100%;
`;

const GridSupportContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 25vh 70vh 25vh 25vh;
  row-gap: 5vh;

  .item-1,
  .item-3 {
    background-color: aqua;
  }

  .item-2,
  .item-4 {
    background-color: lightskyblue;
  }

  .item-1 {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    box-sizing: border-box;
  }

  .item-2 {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 22px;
    border: 2px solid red;
    border-radius: 1rem;
    padding: 1.5vh 2vh;
    box-sizing: border-box;
  }

  .item-3 {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    align-items: center;
    text-align: center;
  }

  .item-4 {
    background: linear-gradient(
      to right,
      #a049f7 0%,
      #8149f7 30%,
      #8b49f7 100%
    );
    border-radius: 1rem;
    padding: 0 2vh;
    z-index: 9;
    position: relative;
    box-sizing: border-box;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      mix-blend-mode: multiply;
    }
  }

  @media (min-width: 768px) {
    grid-template-rows: 50vh 20vh;
    grid-template-columns: 40% 60%;
    row-gap: 5vh;

    .item-1,
    .item-3 {
      grid-column: 1/2;
    }

    .item-2,
    .item-4 {
      grid-column: 2/3;
    }

    .item-1 {
      align-items: stretch;
      padding: 0 0.8rem 0 0;
    }

    .item-2 {
      gap: 9px;
    }

    .item-3 {
      align-items: stretch;
      text-align: unset;
      padding: 0 0.8rem 0 0;
    }
  }
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;

  @media (min-width: 768px) {
    /* gap: 24px; */
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MailIcon = styled(MdMail)`
  font-size: 2rem;
  color: #5f00d9;
`;

const HeaderText = styled.div`
  font-size: 1.9rem;
  font-weight: 900;
`;

const SubHeaderText = styled.div`
  font-size: 1rem;
  color: #5a5959;
`;

const ContactFormMessage = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const FormField = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  width: 50%;

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
    font-weight: 700;
  }

  input[type="checkbox"] {
    transform: scale(1.3);
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    gap: 0.8rem;
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

const FormBtn = styled.div`
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
    width: 48%;
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
`;

const MessageIcon = styled(IoChatbubble)`
  font-size: 2rem;
  color: #5f00d9;
`;

const ChatbotWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  .chatbot-sticker {
    background-color: white;
    width: 5rem;
    text-align: center;
    padding: 0.1rem;
    border-radius: 0.8rem;
    color: #5f00d9;
    font-size: 0.9rem;
    font-weight: 700;
  }

  .chatbot-header {
    font-size: 1.5rem;
    color: white;
    font-weight: 500;
  }
`;

const Support = () => {
  return (
    <ContentSupportContainer>
      <GridSupportContainer>
        <div className="item-1">
          <MailIcon />
          <HeaderText>Contact Us</HeaderText>
          <SubHeaderText>
            Have a question or just want to know more? Feel free to reach out to
            us.
          </SubHeaderText>
        </div>

        <form className="item-2">
          <ContactFormMessage>
            You will receive response within 24 hours of time of submit.
          </ContactFormMessage>

          {/* form */}
          <FormLayout>
            <FormRow>
              <FormField>
                <label htmlFor="name">Name</label>
                <input type="text" name="for" id="name" />
              </FormField>
              <FormField>
                <label htmlFor="surname">Surname</label>
                <input type="text" name="surname" id="surname"></input>
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email"></input>
              </FormField>
              <FormField>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows={4}></textarea>
              </FormField>
            </FormRow>
          </FormLayout>

          {/* form end */}

          <AgreementWrapper>
            <input type="checkbox" id="check" name="check"></input>
            <label htmlFor="check">
              I agree with <span>Terms & Conditions.</span>
            </label>
          </AgreementWrapper>

          <FormBtnWrapper>
            <FormBtn>Send a message</FormBtn>
            <FormBtn>Book a meeting</FormBtn>
          </FormBtnWrapper>
        </form>

        <div className="item-3">
          <MessageIcon />
          <HeaderText>Live Chat</HeaderText>
          <SubHeaderText>
            Don’t have time to wait for the answer? Chat with us now.
          </SubHeaderText>
        </div>

        <div className="item-4">
          <img src="/Visual.png"></img>
          <ChatbotWrapper>
            <div className="chatbot-sticker">Chatbot</div>
            <div className="chatbot-header">Chat with us now</div>
          </ChatbotWrapper>
        </div>
      </GridSupportContainer>
    </ContentSupportContainer>
  );
};

export default Support;
