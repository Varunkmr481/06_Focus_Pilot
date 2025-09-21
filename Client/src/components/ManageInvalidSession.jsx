import { IoClose } from "react-icons/io5";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ModalContainer = styled.div`
  z-index: 9999999;
  position: fixed;
  top: 26.8%;
  left: 30%;
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 22rem;
  opacity: ${({ $isDisplay }) => ($isDisplay ? 1 : 0)};
  transition: all 0.4s ease;

  @media (min-width: 1024px) {
    left: 45%;
    padding: 2.5rem;
  }

  @media (min-width: 1440px) {
    left: 47%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: red;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: #f6f6f6;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
  color: #444;
`;

const Value = styled.span`
  color: #666;
  font-size: 0.95rem;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 0.95rem;

  &:focus {
    outline: 2px solid #6a00d9;
    border-color: #6a00d9;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  color: ${({ $type }) => ($type === "cancel" ? "#333" : "#fff")};
  background-color: ${({ $type }) => ($type === "cancel" ? "#ddd" : "#6a00d9")};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${({ $type }) =>
      $type === "cancel" ? "#c7c7c7" : "#7c1fe2"};
    transform: scale(1.05);
  }
`;

const ManageInvalidSession = ({
  isModalEnable,
  setIsModalEnable,
  handleSubmit,
  sessionInfo,
}) => {
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    console.log("Updated isModalEnable:", isModalEnable);
    console.log("Updated session info:", sessionInfo);
  }, [isModalEnable, sessionInfo]);

  const toTitleCase = (str) => {
    if (!str) return str; // Handle empty or null
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!isModalEnable) return null;

  return (
    <ModalPortal>
      <ModalContainer $isDisplay={isModalEnable}>
        <CloseButton onClick={() => setIsModalEnable(null)}>
          <IoClose />
        </CloseButton>

        <Title>Manage Invalid Session</Title>

        <InfoRow>
          <Label>Task</Label>
          <Value>{sessionInfo?.taskTitle}</Value>

          <Label>Start Time</Label>
          <Value>
            {sessionInfo?.startTime
              ? new Date(sessionInfo.startTime).toLocaleString()
              : "--"}
          </Value>

          <Label>Status</Label>
          <Value>{toTitleCase(sessionInfo.status)}</Value>
        </InfoRow>

        <InputRow>
          <Label>Enter Duration (in minutes)</Label>
          <Input
            type="number"
            min="1"
            max="250"
            placeholder="e.g., 45"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </InputRow>

        <ButtonRow>
          <Button $type="cancel" onClick={() => setIsModalEnable(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // if (!duration || +duration <= 0 || +duration > 250) {
              //   return toast.error(
              //     "Duration must be less than equals to 250 mins"
              //   );
              // }

              handleSubmit({
                sessionId: sessionInfo.sessionId,
                duration: +duration,
              });
            }}
          >
            Confirm
          </Button>
        </ButtonRow>
      </ModalContainer>
    </ModalPortal>
  );
};

export default ManageInvalidSession;
