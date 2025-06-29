import { IoClose } from "react-icons/io5";
import ModalPortal from "./ModalPortal";
import styled from "styled-components";
import { useEffect } from "react";

const ModalContainer = styled.div`
  z-index: 9999999;
  position: fixed;
  top: 43.5%;
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
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1rem 0;
  color: red;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  z-index: 99999999;
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  transition: all 0.2s ease;
  color: ${({ $type }) =>
    $type === "cancel" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)"};

  background-color: ${({ $type }) =>
    $type === "cancel" ? "rgb(223, 223, 223)" : "rgb(95, 0, 217)"};

  &:hover {
    cursor: pointer;
    font-weight: 600;
    background-color: ${({ $type }) =>
      $type === "cancel" ? "rgb(202, 200, 200)" : "rgb(112, 17, 237)"};
    transform: scale(1.1);
  }
`;

const ConfirmDelete = ({ handleSubmit, isModalEnable, setIsModalEnable }) => {
  // useEffect(() => {
  //   console.log("Updated isModalEnable:", isModalEnable);
  // }, [isModalEnable]);

  console.log("HLLLLLO_2");
  console.log("isModalEnable:", isModalEnable);

  if (!isModalEnable) return null;

  return (
    <ModalPortal>
      <ModalContainer $isDisplay={isModalEnable}>
        <CloseButton onClick={() => setIsModalEnable(null)}>
          <IoClose />
        </CloseButton>

        <Title>Are you sure you want to delete this session?</Title>

        <ButtonRow>
          <Button $type="cancel" onClick={() => setIsModalEnable(null)}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Yes, Delete</Button>
        </ButtonRow>
      </ModalContainer>
    </ModalPortal>
  );
};

export default ConfirmDelete;
