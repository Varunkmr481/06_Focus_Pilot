import { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const FocusContainer = styled.div`
  filter: ${({ $isDialogEnable }) => {
    return $isDialogEnable ? "blur(3px)" : "blur(0px)";
  }};
  pointer-events: ${({ $isDialogEnable }) => {
    return $isDialogEnable ? "none" : "all";
  }};
  position: relative;
`;

const FocusHeader = styled.div`
  box-sizing: border-box;
  border: 2px solid #5f00d9;
  padding: 1.2rem;
  display: grid;
  grid-template-columns: 1fr;
  /* background-color: aqua; */
  grid-gap: 0.3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media (min-width: 425px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.6rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 0.6rem;
  }
`;

const FocusStatBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-size: 0.9rem;

  @media (min-width: 425px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const FocusStatLabel = styled.div``;

const FocusStatValue = styled.div`
  font-weight: 800;
`;

const FocusBody = styled.div``;

const FocusClock = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  /* background-color: brown; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 50vh;

  @media (min-width: 1024px) {
    height: 52vh;
  }
`;

const ClockSvg = styled.svg`
  /* background-color: chocolate; */
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const ClockCircle = styled.circle`
  fill: transparent;
  stroke: #5f00d9;
  stroke-width: 14;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
`;

const ClockText = styled.text`
  font-size: 2.25rem;
  font-weight: bold;
  fill: black;
  text-anchor: middle;
`;

const ClockTask = styled.text`
  font-size: 0.8rem;
  fill: black;
  text-anchor: middle;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const ClockQuote = styled.i`
  font-size: 0.8rem;
  font-weight: 600;
  animation: ${pulse} 2s infinite;

  @media (min-width: 425px) {
    font-size: 1rem;
  }

  @media (min-width: 425px) {
    font-size: 1.1rem;
  }
`;

const FocusBtnWrapper = styled.div`
  margin-top: 1.5rem;
  /* display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`;

const FocusBtn = styled.button`
  border: unset;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: #5f00d9;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: rgb(129, 45, 240);
    cursor: pointer;
  }
`;

const FocusDistractBtn = styled.button`
  border: unset;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  font-weight: 700;
  background-color: rgb(217, 0, 0);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  grid-column: 1/3;

  &:hover {
    background-color: rgb(240, 45, 45);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    grid-column: 1/5;
  }

  @media (min-width: 1024px) {
    grid-column: 5/6;
    font-size: 0.7rem;
    gap: 0.2rem;
    font-weight: 700;
  }
`;

// SESSION FORM STYLING

const FormContainer = styled.div`
  background-color: rgb(160, 137, 253);
  transform: ${({ $isDialogEnable }) =>
    $isDialogEnable ? "translate(-50%, -50%)" : "translate(-50%, -300%)"};
  opacity: ${({ $isDialogEnable }) => ($isDialogEnable ? "1" : "0")};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  z-index: 9999;
  transition: all 0.3s ease-in;
  padding: 0.8rem;
  border-radius: 1rem;
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

const StartSessionForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
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

const FormField = styled.div`
  /* background-color: lightseagreen; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
`;

const FormFieldCheckBox = styled.div`
  /* background-color: orange; */
  gap: 0.4rem;
  display: flex;
  align-items: flex-start;

  & > .check_wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & > .check_wrapper > label {
    font-size: 1rem;
    font-weight: 600;
  }

  & > .check_wrapper > input {
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid transparent;
    border-radius: 0.2rem;
    outline: none;
    cursor: pointer;
  }
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
`;

const FormInput = styled.input`
  border: 2px solid transparent;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;

  &:focus {
    border: 2px solid #5f00d9;
    outline: none;
  }
`;

const FormSelect = styled.select`
  padding: 0.2rem 0.2rem;

  & > option {
    padding: 2rem 0.2rem;
  }
`;

/* DISTRACTION FORM */

const DistractFormContainer = styled.div`
  background-color: rgb(160, 137, 253);
  transform: ${({ $isDistraction }) => {
    console.log("styled : ", $isDistraction);

    return $isDistraction ? "translate(-50%, -40%)" : "translate(-50%, -300%)";
  }};
  /* transform: translate(-45%, -35%); */

  /* opacity: ${({ $isDistraction }) => ($isDistraction ? "1" : "0")}; */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  z-index: 9999;
  padding: 0.8rem;
  border-radius: 1rem;
  transition: all 0.3s ease-in;
`;

const DistractionForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
`;

const DistractionFormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  /* background-color: aquamarine; */
`;
const DistractionReasonArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
`;

const FocusMode = () => {
  const [isDialogEnable, setIsDialogEnable] = useState(false);
  const [isDistraction, setIsDistraction] = useState(false);
  const [distractionInfo, setDistractionInfo] = useState({ distraction: "" });
  const [taskTitle, setTaskTitle] = useState("");
  const [sessionDuration, setSessionDuration] = useState(180);
  const [breakDuration, setBreakDuration] = useState("10m");
  const [sessionGoal, setSessionGoal] = useState("Deep work");
  const radius = 130; // Bigger radius
  const circumference = 2 * Math.PI * radius;
  const dashoffset = 130;

  const handleStartSession = function () {
    setIsDialogEnable(true);
  };

  const handleCloseSessionForm = function () {
    setIsDialogEnable(false);
  };

  const handleSessionForm = function (e) {
    e.preventDefault();

    const sessionObj = {
      taskTitle,
      sessionDuration,
      breakDuration,
      sessionGoal,
    };

    console.log(sessionObj);

    setIsDialogEnable(false);
  };

  const handleDistractionForm = function (e) {
    e.preventDefault();

    const distractionObj = distractionInfo;

    console.log(distractionObj);
  };

  return (
    <>
      <FocusContainer $isDialogEnable={isDialogEnable}>
        <FocusHeader>
          <FocusStatBlock>
            <FocusStatLabel>Session status : </FocusStatLabel>
            <FocusStatValue>On</FocusStatValue>
          </FocusStatBlock>

          <FocusStatBlock>
            <FocusStatLabel>Streak : </FocusStatLabel>
            <FocusStatValue>2</FocusStatValue>
          </FocusStatBlock>

          <FocusStatBlock>
            <FocusStatLabel>Current level : </FocusStatLabel>
            <FocusStatValue>2</FocusStatValue>
          </FocusStatBlock>

          <FocusStatBlock>
            <FocusStatLabel>XP badge: </FocusStatLabel>
            <FocusStatValue>📛</FocusStatValue>
          </FocusStatBlock>
        </FocusHeader>

        <FocusBody>
          <FocusClock>
            <ClockSvg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
              <ClockCircle
                r={radius}
                cx="150"
                cy="150"
                strokeDasharray={circumference} // 2πr
                strokeDashoffset={dashoffset} // dynamic
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <ClockText x={155} y={160}>
                21:00
              </ClockText>
              <ClockTask x={155} y={190}>
                {/* 📚 Studying React Hooks */}
                {`🥇 ${taskTitle}`}
              </ClockTask>
            </ClockSvg>
            <ClockQuote>💡 "Stay focused, you’re doing great!"</ClockQuote>
          </FocusClock>

          <FocusBtnWrapper>
            <FocusBtn
              onClick={() => {
                handleStartSession();
              }}
            >
              Start Session
            </FocusBtn>
            <FocusBtn>Pause Session</FocusBtn>
            <FocusBtn>End Session</FocusBtn>
            <FocusBtn>Calm music</FocusBtn>
            <FocusDistractBtn onClick={() => setIsDistraction(true)}>
              <span>
                <IoMdWarning />
              </span>
              <span>Got Distraction ? </span>
            </FocusDistractBtn>
          </FocusBtnWrapper>
        </FocusBody>
      </FocusContainer>

      <FormContainer $isDialogEnable={isDialogEnable}>
        <FormCloseContainer>
          <FormCloseBtn
            onClick={() => {
              handleCloseSessionForm();
            }}
          >
            <CloseIcon />
          </FormCloseBtn>
        </FormCloseContainer>

        <StartSessionForm onSubmit={handleSessionForm}>
          <FormField>
            <FormLabel htmlFor="task">Task Title</FormLabel>
            <FormInput
              type="text"
              id="task"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="duration">Session Duration</FormLabel>
            <FormInput
              type="text"
              id="duration"
              value={sessionDuration}
              onChange={(e) => {
                setSessionDuration(e.target.value);
              }}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="break">Break Duration</FormLabel>
            <FormSelect
              id="break"
              value={breakDuration}
              onChange={(e) => {
                setBreakDuration(e.target.value);
              }}
            >
              <option value="5m">5 min</option>
              <option value="10m">10 min</option>
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel htmlFor="goal">Goal for Session</FormLabel>
            <FormSelect
              id="goal"
              value={sessionGoal}
              onChange={(e) => {
                setSessionGoal(e.target.value);
              }}
            >
              <option value="Deep work">Deep work</option>
              <option value="Light task">Light task</option>
              <option value="Revision">Revision</option>
            </FormSelect>
          </FormField>

          {/* <FormFieldCheckBox>
            <div className="check_wrapper">
              <label htmlFor="calm">Enable Calm Music?</label>
              <input type="checkbox" id="calm" />
            </div>
          </FormFieldCheckBox> */}

          <SessionFormBtn type="Submit">Start Session</SessionFormBtn>
        </StartSessionForm>
      </FormContainer>

      {/* DISTRACTION FORM */}
      <DistractFormContainer $isDistraction={isDistraction}>
        <FormCloseContainer>
          <FormCloseBtn
            onClick={() => {
              setIsDistraction(false);
            }}
          >
            <CloseIcon />
          </FormCloseBtn>
        </FormCloseContainer>

        <DistractionForm onSubmit={handleDistractionForm}>
          <DistractionFormField>
            <FormLabel htmlFor="distraction">
              What Disrupted Your Focus? Describe the Distraction in detail
              here.
            </FormLabel>
            <DistractionReasonArea
              id="distraction"
              rows={6}
              value={distractionInfo.distraction}
              onChange={(e) => {
                setDistractionInfo({ distraction: e.target.value });
              }}
            />
          </DistractionFormField>

          <SessionFormBtn type="Submit">Done</SessionFormBtn>
        </DistractionForm>
      </DistractFormContainer>
    </>
  );
};

export default FocusMode;
