import { useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
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
  filter: ${({ $isStartDialogEnable, $isDistraction, $isEndSession }) => {
    return $isStartDialogEnable || $isDistraction || $isEndSession
      ? "blur(3px)"
      : "blur(0px)";
  }};
  pointer-events: ${({
    $isStartDialogEnable,
    $isDistraction,
    $isEndSession,
  }) => {
    return $isStartDialogEnable || $isDistraction || $isEndSession
      ? "none"
      : "all";
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
  fill: ${({ $timeLeft }) => {
    if ($timeLeft === null || $timeLeft === 0) return "black"; // not started
    if ($timeLeft <= 120) return "red"; // warning

    return "black"; // default
  }};
  text-anchor: middle;
  /* fill: black; */
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

const NewFormContainer = styled.div`
  background-color: rgb(160, 137, 253);
  transform: ${({ $isVisible }) => {
    return $isVisible ? "translate(-50%, -40%)" : "translate(-50%, -300%)";
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
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

const NewFormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  /* background-color: aquamarine; */
`;

const NewReasonArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
`;

// ******* END SESSION FORM ************

const EndSessionFormContainer = styled.div`
  background-color: rgb(160, 137, 253);
  transform: ${({ $isVisible }) => {
    return $isVisible ? "translate(-50%, -40%)" : "translate(-50%, -300%)";
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  z-index: 9999;
  padding: 0.8rem;
  border-radius: 1rem;
  transition: all 0.3s ease-in;
`;

const EndSessionForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
`;

const SessionFormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  /* background-color: aquamarine; */
  grid-column: 1/3;
`;

const EndSessionSummaryArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
`;

const initialSessionInfo = {
  taskTitle: "",
  sessionDuration: 5,
  breakDuration: "10",
  sessionGoal: "Deep work",
  distractionInput: "", // for input field
  distractions: [],
  summary: "",
  earlyEndReason: "Got Distracted",
};

const FocusMode = () => {
  const [currSID, setCurrSID] = useState("");
  const distractionsRef = useRef([]);
  const [isDialogEnable, setIsDialogEnable] = useState(false);
  const [isDistraction, setIsDistraction] = useState(false);
  const [isEndSession, setIsEndSession] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(initialSessionInfo);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0); // circle
  const [timeLeft, setTimeLeft] = useState(null); // in sec
  const [timerInterval, setTimerInterval] = useState(null); // for clearing interval

  useEffect(() => {
    if (timeLeft !== null && sessionInfo.sessionDuration) {
      const totalSeconds = sessionInfo.sessionDuration * 60;
      const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
      setProgress(progress);
    }
  }, [sessionInfo.sessionDuration, timeLeft]);

  const radius = 130; // Bigger radius
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  const handleStartSession = function () {
    setIsDialogEnable(true);
  };

  const handleSessionStartForm = async function (e) {
    e.preventDefault();

    try {
      // 1. Adding new fields for database match
      const token = localStorage.getItem("token");
      const currentTime = Date.now(); // in ms
      const durationInMinutes = parseInt(sessionInfo.sessionDuration, 10);
      const endTime = currentTime + durationInMinutes * 60 * 1000;

      // 2. Create session info object
      const sessionObj = {
        taskTitle: sessionInfo.taskTitle,
        sessionDuration: durationInMinutes,
        breakDuration: sessionInfo.breakDuration,
        sessionGoal: sessionInfo.sessionGoal,
        startTime: currentTime,
        endTime,
        summary: sessionInfo.summary,
        distractions: sessionInfo.distractions,
        earlyEndReason: sessionInfo.earlyEndReason,
      };

      console.log("Sending Session", sessionObj);

      // 3. Send to server url
      const res = await fetch("http://localhost:8000/session/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(sessionObj),
      });

      // 3. Handling response
      const data = await res.json();

      if (data.success) {
        toast.success("Session saved succesfully");
        // console.log(data.data);

        // Start countdown
        const durationSeconds = durationInMinutes * 60;
        setTimeLeft(durationSeconds);
        setIsRunning(true);
        setCurrSID(data.sessionId);
        const sessionId = data.sessionId;

        const interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev < 1) {
              clearInterval(interval);
              setIsRunning(false);
              // setSessionInfo(initialSessionInfo);

              const handleDistraction = async () => {
                try {
                  // 1. Send to backend immediately (optional but recommended)
                  const token = localStorage.getItem("token");

                  // console.log("Form distractions : ", currSID);
                  const disObj = {
                    distractions: distractionsRef.current,
                  };

                  // 2. Send to backened
                  await fetch(
                    `http://localhost:8000/session/update/${sessionId}`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                      },
                      body: JSON.stringify(disObj),
                    }
                  );
                } catch (err) {
                  toast.err(err.message);
                }
              };

              handleDistraction();
              setSessionInfo(initialSessionInfo);

              return 0;
            }

            return prev - 1;
          });
        }, 1000);

        setTimerInterval(interval); // for future cleanup
      } else {
        toast.error(data.message || data.error || "Something");
      }
      console.log("Session saved : ", data);

      setIsDialogEnable(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCloseSessionForm = function () {
    setIsDialogEnable(false);
  };

  const handleEndSession = () => {
    setIsEndSession(true);
  };

  const handleSessionEnd = async (e) => {
    e.preventDefault();

    try {
      if (!isRunning) {
        return toast.error(
          "Please start the session before performing this action."
        );
      }

      const token = localStorage.getItem("token");
      const endObj = {
        summary: sessionInfo.summary,
        earlyEndReason: sessionInfo.earlyEndReason,
        endTime: Date.now(),
        distractions: distractionsRef.current,
      };
      console.log(endObj);

      // 2. Send request with id to end session
      const res = await fetch(
        `http://localhost:8000/session/update/${currSID}`,
        {
          method: "PATCH",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(endObj),
        }
      );

      // 3. Handle response
      const data = await res.json();

      console.log(data);

      if (data.success) {
        clearInterval(timerInterval);
        setTimeLeft(0);
        setIsRunning(false);
        setIsEndSession(false);
        setSessionInfo(initialSessionInfo);

        toast.success("Session ended successfully!");
      } else {
        toast.error(data.message || data.error || "Error ending session!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formatTime = (seconds) => {
    // ensures that a string is at least targetLength characters long by adding padString at the beginning of the string if needed
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const handleDistractionForm = async function (e) {
    e.preventDefault();

    try {
      // 1. Create a distraction object
      const distractionObj = {
        time: Date.now(),
        reason: sessionInfo.distractionInput,
      };

      console.log("Distraction Obj : ", distractionObj);

      // 2. Push in distraction array
      setSessionInfo((prev) => {
        const updated = {
          ...prev,
          distractions: [distractionObj, ...prev.distractions],
          distractionInput: "",
        };

        distractionsRef.current = updated.distractions;

        return updated;
      });

      setIsDistraction(false);

      // 3. Distraction track updated
      toast.success("Distraction noted successfully!");
    } catch (err) {
      return toast.error(err.message);
    }
  };

  return (
    <>
      <FocusContainer
        $isStartDialogEnable={isDialogEnable}
        $isDistraction={isDistraction}
        $isEndSession={isEndSession}
      >
        <FocusHeader>
          <FocusStatBlock>
            <FocusStatLabel>Session status : </FocusStatLabel>
            <FocusStatValue>{isRunning ? "On" : "Off"}</FocusStatValue>
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
              <ClockText x={155} y={160} $timeLeft={timeLeft}>
                {timeLeft !== null ? formatTime(timeLeft) : "00:00"}
              </ClockText>
              <ClockTask x={155} y={190}>
                {/* 📚 Studying React Hooks */}
                {`🥇 ${sessionInfo.taskTitle}`}
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
            <FocusBtn
              onClick={() => {
                handleEndSession();
              }}
            >
              End Session
            </FocusBtn>
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

        <StartSessionForm onSubmit={handleSessionStartForm}>
          <FormField>
            <FormLabel htmlFor="task">Task Title</FormLabel>
            <FormInput
              type="text"
              id="task"
              value={sessionInfo.taskTitle}
              onChange={(e) => {
                // setTaskTitle(e.target.value);
                setSessionInfo((prev) => {
                  return { ...prev, taskTitle: e.target.value };
                });
              }}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="duration">Session Duration</FormLabel>
            <FormInput
              type="text"
              id="duration"
              value={sessionInfo.sessionDuration}
              onChange={(e) => {
                // setSessionDuration(e.target.value);
                setSessionInfo((prev) => {
                  return { ...prev, sessionDuration: e.target.value };
                });
              }}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="break">Break Duration</FormLabel>
            <FormSelect
              id="break"
              value={sessionInfo.breakDuration}
              onChange={(e) => {
                // setBreakDuration(e.target.value);
                setSessionInfo((prev) => {
                  return { ...prev, breakDuration: e.target.value };
                });
              }}
            >
              <option value="5">5 min</option>
              <option value="10">10 min</option>
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel htmlFor="goal">Goal for Session</FormLabel>
            <FormSelect
              id="goal"
              value={sessionInfo.sessionGoal}
              onChange={(e) => {
                // setSessionGoal(e.target.value);
                setSessionInfo((prev) => {
                  return { ...prev, sessionGoal: e.target.value };
                });
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
      <NewFormContainer $isVisible={isDistraction}>
        <FormCloseContainer>
          <FormCloseBtn
            onClick={() => {
              setIsDistraction(false);
            }}
          >
            <CloseIcon />
          </FormCloseBtn>
        </FormCloseContainer>

        <NewForm onSubmit={handleDistractionForm}>
          <NewFormField>
            <FormLabel htmlFor="distraction">
              What Disrupted Your Focus? Describe the Distraction in detail
              here.
            </FormLabel>
            <NewReasonArea
              id="distraction"
              rows={6}
              value={sessionInfo.distractionInput}
              onChange={(e) => {
                // setDistractionInfo({ distraction: e.target.value });
                setSessionInfo((prev) => {
                  return { ...prev, distractionInput: e.target.value };
                });
              }}
            />
          </NewFormField>

          <SessionFormBtn type="Submit">Done</SessionFormBtn>
        </NewForm>
      </NewFormContainer>

      {/* SESSION END */}
      <EndSessionFormContainer $isVisible={isEndSession}>
        <FormCloseContainer>
          <FormCloseBtn
            onClick={() => {
              setIsEndSession(false);
            }}
          >
            <CloseIcon />
          </FormCloseBtn>
        </FormCloseContainer>

        <EndSessionForm onSubmit={handleSessionEnd}>
          <SessionFormField>
            <FormLabel htmlFor="summary">Describe in detail : </FormLabel>
            <EndSessionSummaryArea
              id="summary"
              rows={4}
              value={sessionInfo.summary}
              onChange={(e) => {
                // setDistractionInfo({ distraction: e.target.value });
                setSessionInfo((prev) => {
                  return { ...prev, summary: e.target.value };
                });
              }}
            />
          </SessionFormField>

          <SessionFormField>
            <FormLabel>Reason for Ending Early :</FormLabel>
            <FormSelect
              value={sessionInfo.earlyEndReason}
              onChange={(e) => {
                setSessionInfo((prev) => {
                  return { ...prev, earlyEndReason: e.target.value };
                });
              }}
            >
              <optgroup label="Valid Work Reasons">
                <option value="Completed Task Early">
                  ✅ Completed Task Early
                </option>
                <option value="Urgent Personal Work">
                  🚨 Urgent Personal Work
                </option>
              </optgroup>

              <optgroup label="Focus Issues">
                <option value="Lost Focus">
                  🌀 Lost Focus / Couldn't concentrate
                </option>
                <option value="Got Distracted">
                  📱 Got Distracted (Phone, Social Media, etc.)
                </option>
                <option value="Unexpected Call/Message">
                  📞 Unexpected Call or Message
                </option>
              </optgroup>

              <optgroup label="Health or Energy">
                <option value="Low Energy">😴 Low Energy / Sleepy</option>
                <option value="Health Issue">
                  🤕 Felt Unwell / Health Issue
                </option>
              </optgroup>

              <option value="Other">❓ Other</option>
            </FormSelect>
          </SessionFormField>

          <SessionFormBtn type="Submit">Done</SessionFormBtn>
        </EndSessionForm>
      </EndSessionFormContainer>
    </>
  );
};

export default FocusMode;
