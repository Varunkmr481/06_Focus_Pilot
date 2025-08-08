import React from "react";
import separateDateTime from "../utils/separateDateTime";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import ModalPortal from "./ModalPortal";

const NewFormContainer = styled.div`
  background-color: rgb(160, 137, 253);
  transform: ${({ $isVisible }) => {
    return $isVisible ? "translate(-50%, -40%)" : "translate(-50%, -450%)";
  }};
  position: absolute;
  top: 44%;
  left: 55%;
  width: 25rem;
  z-index: 9999;
  padding: 0.8rem;
  border-radius: 1rem;
  transition: all 0.3s ease-in;
`;

const NewForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
`;

const FormCloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2rem;
`;

const FormCloseBtn = styled.button`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: aliceblue;

  &:hover {
    cursor: pointer;
  }
`;

const CloseIcon = styled(IoCloseCircle)`
  font-size: 2rem;
  color: red;
`;

const SessionFormBtn = styled.button`
  border: unset;
  grid-column: 1/3;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #5f00d9;
  color: white;

  &:hover {
    background-color: rgb(129, 36, 250);
    cursor: pointer;
  }
`;

const DistractionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DistractionCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background-color: #fafafa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const DistractionReason = styled.div`
  font-weight: 600;
  color: #333;
`;

const DistractionTime = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
`;

const NoDistractionPara = styled.p`
  font-style: italic;
  color: #fff;
  text-align: center;
`;

const ShowDistractions = ({
  data,
  index,
  currDisId,
  setCurrDisId,
  //   handleModal,
}) => {
  const handleModal = (e) => {
    e.preventDefault();

    setCurrDisId(null);
  };

  if (currDisId !== index) return null;

  return (
    <ModalPortal>
      <NewFormContainer $isVisible={currDisId === index}>
        <FormCloseContainer>
          <FormCloseBtn
            onClick={() => {
              setCurrDisId(null);
            }}
          >
            <CloseIcon />
          </FormCloseBtn>
        </FormCloseContainer>

        <NewForm onSubmit={handleModal}>
          {data.distractions.length > 0 ? (
            <DistractionWrapper>
              {data.distractions.map((dis, idx) => (
                <DistractionCard key={idx}>
                  <DistractionReason>{dis.reason}</DistractionReason>
                  <DistractionTime
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginTop: "0.25rem",
                    }}
                  >
                    {separateDateTime(dis.time).date} at{" "}
                    {separateDateTime(dis.time).time}
                  </DistractionTime>
                </DistractionCard>
              ))}
            </DistractionWrapper>
          ) : (
            <NoDistractionPara>
              No distractions were recorded.
            </NoDistractionPara>
          )}

          <SessionFormBtn type="Submit">Done</SessionFormBtn>
        </NewForm>
      </NewFormContainer>
    </ModalPortal>
  );
};

export default ShowDistractions;
