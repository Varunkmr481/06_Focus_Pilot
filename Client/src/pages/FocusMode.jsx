import { useEffect, useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdWarning } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import styled, { keyframes } from "styled-components";
import { Badge } from "../components/Milestones";

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
  gap: 0.5rem;
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
  stroke: ${({ $currentPhase }) =>
    $currentPhase === "focus" ? "#5f00d9" : "rgb(0, 221, 30)"};
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
    grid-template-columns: 1fr 1fr 1fr 1.5fr;
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

const FocusMusicBtn = styled.button`
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
  grid-column: 1/3;

  &:hover {
    background-color: rgb(129, 45, 240);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    grid-column: 3/4;
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
    grid-column: 4/5;
  }

  @media (min-width: 1024px) {
    grid-column: 4/6;
    font-size: 0.9rem;
    gap: 0.3rem;
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
  breakDuration: "1",
  sessionGoal: "Deep work",
  distractionInput: "", // for input field
  distractions: [],
  summary: "",
  earlyEndReason: "Got Distracted",
};

const FocusMode = () => {
  const [currSID, setCurrSID] = useState("");
  const [posi, setPosi] = useState({
    currentLevel: "",
    currentBadge: "",
    currentTrophy: "",
    totalSession: 0,
  });
  const [totalSessions, setTotalSessions] = useState(null);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isDialogEnable, setIsDialogEnable] = useState(false);
  const [isDistraction, setIsDistraction] = useState(false);
  const [isEndSession, setIsEndSession] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(initialSessionInfo);
  const [progress, setProgress] = useState(0); // circle

  // Timer Logic
  const [totalTime, setTotalTime] = useState(50);
  const [focusLength, setFocusLength] = useState(2); // One focus session
  const [breakLength, setBreakLength] = useState(1); // Break after focus
  const [currentPhase, setCurrentPhase] = useState("Focus");
  const [timeLeft, setTimeLeft] = useState(0); // in sec
  const [isRunning, setIsRunning] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [sessions, setSessions] = useState([]);
  const distractionsRef = useRef([]);
  const focusAudioRef = useRef(null);
  const breakAudioRef = useRef(null);

  useEffect(() => {
    countSessions();
  }, []);

  useEffect(() => {
    focusAudioRef.current = new Audio("/sounds/focus.wav");
    breakAudioRef.current = new Audio("/sounds/break.wav");

    focusAudioRef.current.loop = true;
    breakAudioRef.current.loop = true;

    return () => {
      focusAudioRef.current.pause();
      breakAudioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 1. Extract token from localstorage
        const token = localStorage.getItem("token");

        // 2. send api call to http://localhost:8000/getUser
        const res = await fetch("http://localhost:8000/getUser", {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        const { currentBadge, currentLevel, currentTrophy } = data.user;

        // console.log("current User : ", data);

        if (currentBadge || currentTrophy || currentLevel) {
          setPosi({ currentBadge, currentTrophy, currentLevel });
        } else {
          setPosi({
            currentBadge: "",
            currentTrophy: "",
            currentLevel: 0,
          });
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (!posi.currentBadge || !posi.currentLevel || !posi.currentTrophy) {
      fetchUserInfo();
    }

    return;
  }, []);

  useEffect(() => {
    if (isRunning && sessions.length > 0) {
      const currentSession = sessions[sessionIndex];
      const phaseTotal = currentSession?.duration;
      const phasePassed = phaseTotal - timeLeft;

      const currentProgress = (phasePassed / phaseTotal) * 100;
      setProgress(currentProgress);
    }
  }, [isRunning, timeLeft, sessionIndex, sessions]);

  useEffect(() => {
    // generate sessions array when inputs change
    const fullCycles = Math.floor(totalTime / focusLength);
    const tempSessions = [];

    for (let i = 0; i < fullCycles; i++) {
      tempSessions.push({ type: "focus", duration: focusLength * 60 });
      if (i < fullCycles - 1) {
        tempSessions.push({ type: "break", duration: breakLength * 60 });
      }
    }

    setSessions(tempSessions);
    console.log("Generated Sessions:", tempSessions); // Debug
  }, [breakLength, focusLength, totalTime]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setSessionIndex((i) => i + 1);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (sessionIndex < sessions.length) {
      const current = sessions[sessionIndex];
      setCurrentPhase(current.type);
      setTimeLeft(current.duration);

      // Debug
      console.log("➡️ Current Phase:", sessions[sessionIndex]?.type);
      console.log("⏳ Time Set:", sessions[sessionIndex]?.duration);
    } else {
      // All sessions done
      setIsRunning(false);
      setCurrentPhase("Done");
      setTimeLeft(0);
    }
  }, [sessionIndex, sessions]);

  useEffect(() => {
    if (sessionIndex < sessions.length) {
      const current = sessions[sessionIndex];

      // Stop all music first
      focusAudioRef.current?.pause();
      focusAudioRef.current.currentTime = 0;
      breakAudioRef.current?.pause();
      breakAudioRef.current.currentTime = 0;

      // 🧠 Add this guard:
      if (isMusicEnabled) {
        if (current.type === "focus") {
          focusAudioRef.current?.play();
        } else if (current.type === "break") {
          breakAudioRef.current?.play();
        }
      } else {
        // Always stop music regardless of toggle
        focusAudioRef.current.pause();
        focusAudioRef.current.currentTime = 0;
        breakAudioRef.current.pause();
        breakAudioRef.current.currentTime = 0;
      }
    }
  }, [isMusicEnabled, sessionIndex, sessions]);

  useEffect(() => {
    if (
      !isRunning &&
      currentPhase === "Done" &&
      sessionIndex >= sessions.length &&
      timeLeft === 0 &&
      sessions.length > 0
    ) {
      SendDistractionToServer();
      resetAfterNaturalEnd();
    }
  }, [isRunning, currentPhase, sessionIndex, sessions, timeLeft]);

  const radius = 130; // Bigger radius
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (progress / 100) * circumference;

  const handleSessionStartForm = (e) => {
    e.preventDefault();

    if (sessions.length > 0) {
      setIsDialogEnable(false);
      setIsRunning(true);
      SendSessionInfoToServer();
    }
  };

  const SendSessionInfoToServer = async function () {
    // e.preventDefault();

    try {
      // 1. Adding new fields for database match
      const token = localStorage.getItem("token");
      const currentTime = Date.now(); // in ms

      // 2. Check if token exists or title is valid
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      if (isNaN(totalTime) || isNaN(breakLength) || breakLength <= 0) {
        throw new Error("Invalid session duration");
      }

      if (!sessionInfo.taskTitle) {
        throw new Error("Task title is required");
      }

      // 2. Create session info object
      const sessionObj = {
        taskTitle: sessionInfo.taskTitle,
        sessionDuration: totalTime * 60,
        breakDuration: breakLength,
        sessionGoal: sessionInfo.sessionGoal,
        startTime: currentTime,
        status: "invalid session",
        endTime: 0,
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
        toast.success("Session saved successfully");
        setCurrSID(data.sessionId);
      } else {
        toast.error(data.message || data.error || "Something went wrong!");
      }
      console.log("Session saved : ", data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDistractionForm = async function (e) {
    e.preventDefault();

    try {
      if (!isRunning) {
        return toast.error(
          "Please start the session before performing this action."
        );
      }

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

  const SendDistractionToServer = async () => {
    try {
      // 1. Send to backend immediately (optional but recommended)
      const token = localStorage.getItem("token");

      // console.log("Form distractions : ", currSID);
      const disObj = {
        distractions: distractionsRef.current,
        endTime: Date.now(),
        status: "completed",
      };

      // 2. Send to backened
      const res = await fetch(
        `http://localhost:8000/session/update/${currSID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(disObj),
        }
      );

      const data = await res.json();

      console.log("Updated data : ", data);
      setPosi({
        currentBadge: data.currentUser.currentBadge,
        currentLevel: data.currentUser.currentLevel,
        currentTrophy: data.currentUser.currentTrophy,
      });
      toast.success("🎉 Session completed successfully!");
    } catch (err) {
      toast.error(err.message);
    }
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
        status: "early end",
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

      if (data.success) {
        // clearInterval(timerInterval);
        resetAfterNaturalEnd();

        console.log("End session :", data);

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

  const countSessions = async () => {
    try {
      // 1. Extract token
      const token = localStorage.getItem("token");

      // 2. Send get req
      const res = await fetch("http://localhost:8000/session/count", {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setTotalSessions(data.totalSessions);
      } else {
        toast.error(data.message || data.error || "Something went wrong!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const resetAfterNaturalEnd = () => {
    setIsRunning(false);
    // setCurrentPhase("Focus"); // Reset to initial phase
    setSessionIndex(0);
    setSessions([]);
    setTimeLeft(0);
    setProgress(0);
    setTotalTime(0);
    setCurrSID(""); // Optional: clear session id
    distractionsRef.current = [];
    setSessionInfo(initialSessionInfo);
    setIsDialogEnable(false);
    setIsDistraction(false);
    setIsEndSession(false);
    focusAudioRef.current.pause();
    focusAudioRef.current.currentTime = 0;
    breakAudioRef.current.pause();
    breakAudioRef.current.currentTime = 0;
    setIsMusicEnabled(false);
    countSessions();
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
            <FocusStatLabel>Sessions Done : </FocusStatLabel>
            <FocusStatValue>{totalSessions}</FocusStatValue>
          </FocusStatBlock>

          <FocusStatBlock>
            <FocusStatLabel>Current level : </FocusStatLabel>
            <FocusStatValue>{posi.currentLevel}</FocusStatValue>
          </FocusStatBlock>

          <FocusStatBlock>
            <FocusStatLabel>XP badge: </FocusStatLabel>
            <FocusStatValue>
              <Badge
                className={posi.currentBadge ? posi.currentBadge : "default"}
              >{`${posi.currentTrophy} ${posi.currentBadge}`}</Badge>
            </FocusStatValue>
          </FocusStatBlock>
        </FocusHeader>

        <FocusBody>
          <FocusClock>
            <ClockSvg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet">
              <ClockCircle
                $currentPhase={currentPhase}
                r={radius}
                cx="150"
                cy="150"
                strokeDasharray={circumference} // 2πr
                strokeDashoffset={dashoffset ? dashoffset : 0} // dynamic
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <ClockText x={155} y={160} $timeLeft={timeLeft}>
                {formatTime(timeLeft)}
              </ClockText>
              <ClockTask x={155} y={190}>
                {sessionInfo.taskTitle}
              </ClockTask>
              <ClockTask x={155} y={210}>
                {isRunning
                  ? `Phase : ${currentPhase} (${sessionIndex + 1}/${
                      sessions.length
                    })`
                  : "Start new Session"}
              </ClockTask>
            </ClockSvg>
            {isRunning && (
              <ClockQuote>💡 "Stay focused, you’re doing great!"</ClockQuote>
            )}
          </FocusClock>

          <FocusBtnWrapper>
            <FocusBtn
              onClick={() => {
                if (isRunning) {
                  return toast.error(
                    "Please stop current session to start new"
                  );
                }

                setIsDialogEnable(true);
              }}
            >
              {isRunning ? "In Progress.." : "Start Session"}
            </FocusBtn>
            <FocusBtn
              onClick={() => {
                if (!isRunning) {
                  return toast.error(
                    "Please start the session before performing this action."
                  );
                }

                setIsEndSession(true);
              }}
            >
              End Session
            </FocusBtn>
            <FocusMusicBtn
              onClick={() => {
                if (!isRunning) {
                  return toast.error("Please start the session to start music");
                }

                setIsMusicEnabled((prev) => !prev);
              }}
            >
              {!isMusicEnabled ? "Start Music" : "Pause Music"}
            </FocusMusicBtn>

            <FocusDistractBtn
              onClick={() => {
                if (!isRunning) {
                  return toast.error(
                    "Please start the session before performing this action."
                  );
                }

                setIsDistraction(true);
              }}
            >
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
              setIsDialogEnable(false);
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
            <FormSelect
              type="text"
              id="duration"
              value={totalTime}
              onChange={(e) => {
                setTotalTime(e.target.value);
              }}
            >
              <option value={2}>2 min</option>
              <option value={50}>50 min</option>
              <option value={100}>100 min</option>
              <option value={150}>150 min</option>
              <option value={200}>200 min</option>
              <option value={250}>250 min</option>
            </FormSelect>
          </FormField>

          <FormField>
            <FormLabel htmlFor="break">Break Duration</FormLabel>
            <FormSelect
              id="break"
              value={breakLength}
              onChange={(e) => {
                setBreakLength(e.target.value);
              }}
            >
              <option value="1">1 min</option>
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
              <optgroup label="Focused Work">
                <option value="Deep work">Deep work</option>
                <option value="Light task">Light task</option>
                <option value="Creative task">Creative task</option>
              </optgroup>

              <optgroup label="Focused Learning">
                <option value="Revision">Revision</option>
                <option value="Concept Learning">Concept Learning</option>
                <option value="Mock Test">Mock Test</option>
              </optgroup>
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
