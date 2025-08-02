import { FaCaretDown, FaDownload, FaEye, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Status from "../components/Status";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
// import fakeTransactions from "../data/fakeData";
import TransactionViewRestriction from "../components/TransactionViewRestriction";
import toast from "react-hot-toast";
import separateDateTime from "../utils/separateDateTime";
import getDuration from "../utils/getDuration";
import { IoCloseCircle, IoSettings } from "react-icons/io5";
import ConfirmDelete from "../components/ConfirmDelete";
import { useOutletContext } from "react-router";
import ManageInvalidSession from "../components/ManageInvalidSession";
import ShowDistractions from "../components/ShowDistractions";

// const goalColors = {
//   "Deep work": { bg: "#1e3a8a", text: "#e0f2fe" }, // Rich navy blue with soft sky text
//   "Light task": { bg: "#d4d4d8", text: "#18181b" }, // Warm gray with deep charcoal text
//   "Creative task": { bg: "#f59e0b", text: "#431407" }, // Bright amber with dark brown text
//   Revision: { bg: "#22c55e", text: "#ffffff" }, // Vivid green with dark forest text
//   "Concept Learning": { bg: "#3b82f6", text: "#eff6ff" }, // Bright blue with crisp white text
//   "Mock Test": { bg: "#ef4444", text: "#fef2f2" }, // Bold red with soft pink-white text
// };

const goalColors = {
  "Concept Learning": { bg: "#1e40af", text: "#f1f5f9" }, // Deep blue with light gray text
  "Creative task": { bg: "#f97316", text: "#fef3c7" }, // Vibrant orange with warm yellow text
  "Deep work": { bg: "#a02efeff", text: "#f3e8ff" }, // Rich purple with soft lavender text
  "Light task": { bg: "#ec4899", text: "#fdf4ff" }, // Bright pink with pale pink text
  "Mock Test": { bg: "#14b8a6", text: "#f0fdfa" }, // Teal with light teal text
  Revision: { bg: "#facc15", text: "#451a03" }, // Bright yellow with dark brown text
};

const statusColors = {
  completed: { bg: "green", text: "white" },
  earlyEnd: { bg: "yellow", text: "black" },
  interrupted: { bg: "red", text: "white" },
};

// ✅ Green (Completed), ⚠️ Yellow (Early End), ❌ Red (Interrupted)

const getGoalStyle = (goal) =>
  goalColors[goal] || { bg: "#e5e7eb", text: "#1f2937" }; // default gray

const GridContentTransaction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2vh;
  position: relative;
`;

const ExportBtn = styled.button`
  width: 8rem;
  gap: 0.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: unset;
  outline: unset;
  border-radius: 0.5rem;
  background-color: #5f00d9;
  color: white;
  padding: 1.5vh 0.5vh;
  font-weight: 700;

  @media (min-width: 425px) {
    width: 10rem;
    gap: 0.7vh;
    padding: 1.8vh 0.8vh;
  }

  @media (min-width: 768px) {
    width: 11rem;
    gap: 0.9vh;
    padding: 1.8vh 3vh;
  }
`;

const Table = styled.div`
  width: 100%;
  height: auto;
  background-color: #5f00d9;
  color: white;
  border-radius: 0.9rem 0.9rem 0.9rem 0.9rem;
`;

const TableType = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  border-radius: 0.9rem 0.9rem 0 0;

  /* For laptop, desktop */
  .inputCell {
    margin-left: auto;
    padding: 1.5vh 1vw;
  }
`;

const TableTypeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 3vh 1.5vw;
  font-size: 0.7rem;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;

  &.active {
    background-color: rgb(139, 50, 255);
  }

  &:hover {
    background-color: rgb(139, 50, 255);
    cursor: pointer;
  }
`;

const TableTypeInputCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  padding: 3vh 1vw;
  font-weight: 800;
  border-radius: 0.9rem 0.9rem 0 0;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: white;
  gap: 1vw;
`;

const Input = styled.input`
  outline: unset;
  border: ${({ $inputFocus }) =>
    $inputFocus ? "2px solid violet" : "2px solid white"};
  border-radius: 1rem;
  padding: 0.6rem 0.8rem;
  width: 13rem;
  transition: all 0.3s ease-in-out;
  margin-left: auto;
`;

const TableTypeSticker = styled.div`
  color: rgb(0, 0, 0);
  background-color: rgba(206, 204, 204, 0.8);
  border-radius: 0.7rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.6rem;
  font-weight: 800;
  /* color: #ffffff; */
`;

const TableHeader = styled.div`
  display: grid;
  padding: 0 2rem;
  /* justify-content: space-between; */
  align-items: center;
  /* padding: 0 auto; */
  /* margin: 0 auto; */
  grid-template-columns: 16vw 16vw 15vw 14vw 13vw 11vw;
  /* grid-template-columns: 15vw 15vw 15vw 14vw 13vw 13vw; */
  /* grid-template-columns: 15vw 20vw 20vw 18vw 12vw; */
  border-top: 1px solid rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    grid-template-columns: 12vw 12vw 12vw 12vw 12vw 8vw;
    /* grid-template-columns: 10vw 10vw 10vw 10vw 12vw 8vw; */
  }
`;

const TableHeaderCell = styled.div`
  display: flex;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 900;
  border-radius: 0.9rem 0.9rem 0 0;
  font-size: 0.9rem;
`;

const NoSessionFound = styled.div`
  text-align: center;
  padding: 2rem;
  color: #fff;
  font-style: italic;
`;

const TableBody = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const TableRow = styled.div`
  display: grid;
  /* justify-content: space-between; */
  grid-template-columns: 16vw 16vw 15vw 14vw 13vw 11vw;
  /* grid-template-columns: 15vw 15vw 15vw 14vw 13vw 13vw; */
  /* grid-template-columns: 15vw 20vw 20vw 18vw 12vw; */
  padding: 0 2rem;

  &:not(:last-child) > * {
    border-bottom: 0.5px solid rgb(92, 91, 91, 0.3);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 12vw 12vw 12vw 12vw 12vw 8vw;
    /* grid-template-columns: 10vw 10vw 10vw 10vw 12vw 8vw; */
  }
`;

const TableRowCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding: 2vh 0;
  font-weight: 900;
  font-size: 0.9rem;
`;

const LightShadeSpan = styled.span`
  /* color: rgba(91, 90, 90, 0.4); */
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  font-size: 0.9rem;
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  background-color: ${({ $goal }) => {
    const { bg } = getGoalStyle($goal);

    return bg;
  }};
  color: ${({ $goal }) => {
    const { text } = getGoalStyle($goal);

    return text;
  }};
  width: fit-content;
  padding: 0.1rem 0.27rem;
  border-radius: 1rem;

  @media (min-width: 1024px) {
    padding: 0.2rem 0.6rem;
  }
`;

const SessionStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $reason, $endTime }) => {
    let prop;
    if (!$reason && $endTime === 0) {
      prop = "0.58rem";
    } else {
      prop = "0.7rem";
    }

    return prop;
  }};
  font-weight: 700;
  background-color: ${({ $reason, $endTime }) => {
    let prop;
    if (!$reason && $endTime === 0) {
      prop = statusColors["interrupted"];
    } else if ($reason && $endTime) {
      prop = statusColors["earlyEnd"];
    } else {
      prop = statusColors["completed"];
    }

    return prop.bg;
  }};
  color: ${({ $reason, $endTime }) => {
    let prop;
    if (!$reason && $endTime === 0) {
      prop = statusColors["interrupted"];
    } else if ($reason) {
      prop = statusColors["earlyEnd"];
    } else {
      prop = statusColors["completed"];
    }

    return prop.text;
  }};
  width: fit-content;
  padding: 0.1rem 0.27rem;
  border-radius: 1rem;

  @media (min-width: 1024px) {
    padding: 0.2rem 0.5rem;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InvalidSessionBtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1rem;
`;

const EyeBtn = styled(FaEye)`
  &:hover {
    cursor: pointer;
  }
`;

const ManageBtn = styled(IoSettings)`
  &:hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled(MdDelete)`
  &:hover {
    cursor: pointer;
  }
`;

// MODAL BOX

const onSearchFocus = function (inputRef) {
  inputRef.current.focus();
};

const Transactions = () => {
  const [inputFocus, setInputFocus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef(null);
  const {
    currDeleteSessionId,
    setCurrDeleteSessionId,
    currManageSessionId,
    setCurrManageSessionId,
    currDisId,
    setCurrDisId,
    sessionData,
    setSessionData,
  } = useOutletContext();

  useEffect(() => {
    async function updateSession() {
      // 1. Extract token id
      const token = localStorage.getItem("token");

      // 2. Send http request
      const res = await fetch("http://localhost:8000/session/currAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      // 3. Get data
      const data = await res.json();

      // console.log("Transaction se arha hu bhai : ", data);
      setSessionData(data.sessions);
    }

    updateSession();
  }, [setSessionData]);

  useEffect(() => {
    function checkScreenSize() {
      // console.log(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    }

    // checkscreensize
    checkScreenSize();

    window.addEventListener("resize", () => checkScreenSize());

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const deleteInvalidSessions = async () => {
      try {
        // 1. extract token
        const token = localStorage.getItem("token");

        // 2. send api req
        const res = await fetch("http://localhost:8000/session/delete-broken", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        const data = await res.json();

        if (data.succes) {
          console.log(data);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    // deleteInvalidSessions();
  }, []);

  // Yeh koi function nahi hai.
  const filteredSessionsWithInput = useMemo(() => {
    return sessionData.filter((session) => {
      const query = searchQuery.toLowerCase();

      return (
        session.taskTitle.toLowerCase().includes(query) ||
        session.sessionGoal.toLowerCase().includes(query) ||
        session.status?.toLowerCase()?.includes(query)
      );
    });
  }, [searchQuery, sessionData]);

  async function filterSessionWithRange(range) {
    try {
      // 1. Extract the token
      const token = localStorage.getItem("token");

      // 2. Send the api request
      const res = await fetch(
        `http://localhost:8000/session/filter?range=${range}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        if (data.sessions.length === 0) {
          setSessionData(data.sessions);
          toast.error("No sessions found!");
        } else {
          setSessionData(data.sessions);
          toast.success("Session filtered!");
        }
      } else {
        toast.error("Failed to fetch sessions");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleDeleteInvalidSession = async (e) => {
    e.preventDefault();

    // 1. Extract token
    const token = localStorage.getItem("token");

    // 2. Send api request
    const res = await fetch(
      `http://localhost:8000/session/delete/${currDeleteSessionId}`,
      {
        method: "DELETE",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    console.log("Helo", data.message, data.id);
    setSessionData((prev) => prev.filter((s) => s._id !== currDeleteSessionId));
    setCurrDeleteSessionId(null);
  };

  const handleInvalidSession = async (InData) => {
    try {
      // 1. Extract the token
      const token = localStorage.getItem("token");
      const id = InData.sessionId;
      const durationMs = InData.duration * 60 * 1000;
      console.log(id, durationMs);

      // 2. Send request
      const res = await fetch(
        `http://localhost:8000/session/manageinvalid/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ durationMs: durationMs }),
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Session successfully updated!");
        console.log(data.updatedSession);

        setSessionData((prev) => {
          return prev.map((s) => {
            return s._id === id && data.updatedSession
              ? data.updatedSession
              : s;
          });
        });
      } else {
        toast.error(data.message || "Failed to update session");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setCurrManageSessionId(null);
    }
  };

  return (
    <GridContentTransaction>
      <ExportBtn>
        <FaDownload />
        <span>Export CSV</span>
      </ExportBtn>

      {isMobile ? (
        <TransactionViewRestriction />
      ) : (
        <Table>
          {/* FILTER DATA */}
          <TableType>
            <TableTypeCell
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => {
                setActiveFilter("all");
                filterSessionWithRange("all");
              }}
            >
              <span>All</span>
            </TableTypeCell>

            <TableTypeCell
              className={activeFilter === "today" ? "active" : ""}
              onClick={() => {
                setActiveFilter("today");
                filterSessionWithRange("today");
              }}
            >
              <span>Today</span>
            </TableTypeCell>

            <TableTypeCell
              className={activeFilter === "yesterday" ? "active" : ""}
              onClick={() => {
                setActiveFilter("yesterday");
                filterSessionWithRange("yesterday");
              }}
            >
              <span>Yesterday</span>
            </TableTypeCell>

            <TableTypeCell
              className={activeFilter === "thisMonth" ? "active" : ""}
              onClick={() => {
                setActiveFilter("thisMonth");
                filterSessionWithRange("thisMonth");
              }}
            >
              <span>This Month</span>
            </TableTypeCell>

            <TableTypeCell
              className={activeFilter === "lastMonth" ? "active" : ""}
              onClick={() => {
                setActiveFilter("lastMonth");
                filterSessionWithRange("lastMonth");
              }}
            >
              <span>Last Month</span>
            </TableTypeCell>

            <TableTypeInputCell className="inputCell">
              <InputContainer>
                <FaSearch onClick={() => onSearchFocus(inputRef)} />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by task, goal, or status"
                  onFocus={() => {
                    setInputFocus(true);
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onBlur={() => setInputFocus(false)}
                  $inputFocus={inputFocus}
                ></Input>
              </InputContainer>
            </TableTypeInputCell>
          </TableType>

          {/* TABLE HEADER */}
          <TableHeader>
            <TableHeaderCell>Task</TableHeaderCell>
            <TableHeaderCell>Date & Time</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Distraction</TableHeaderCell>
            <TableHeaderCell>Goal</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableHeader>

          {/* TABLE DATA */}
          <TableBody>
            {filteredSessionsWithInput.length === 0 ? (
              <NoSessionFound>
                No sessions found. Try adjusting your filters.
              </NoSessionFound>
            ) : (
              filteredSessionsWithInput.map((data, index) => {
                const { date, time } = separateDateTime(data.createdAt);
                const { duration, flooredtime } = getDuration(
                  data.endTime,
                  data.startTime
                );

                return (
                  <React.Fragment key={data._id}>
                    <TableRow>
                      <TableRowCell>
                        <span>{data?.taskTitle}</span>
                      </TableRowCell>

                      <TableRowCell>
                        <span>{date}</span>
                        <LightShadeSpan>{time}</LightShadeSpan>
                      </TableRowCell>

                      <TableRowCell>
                        {duration > 0 ? flooredtime : "--"}
                      </TableRowCell>

                      <TableRowCell>
                        <StyledDiv>
                          <span>{data.distractions.length}</span>

                          <EyeBtn
                            onClick={() => {
                              console.log("Hey");
                              // setIsDialogEnable(true);
                              setCurrDisId(index);
                            }}
                          />
                        </StyledDiv>
                      </TableRowCell>

                      {/* type */}
                      <TableRowCell>
                        <Type $goal={data.sessionGoal}>
                          {data.sessionGoal}{" "}
                        </Type>
                      </TableRowCell>

                      {/* status */}
                      <TableRowCell>
                        <SessionStatus
                          $reason={data?.earlyEndReason}
                          $endTime={data.endTime}
                        >
                          {data.endTime
                            ? data.earlyEndReason
                              ? "Early end"
                              : "Completed"
                            : "Invalid Session"}
                        </SessionStatus>

                        <InvalidSessionBtnsWrapper>
                          {data.status.toLowerCase() === "invalid session" && (
                            <ManageBtn
                              onClick={() => {
                                setCurrManageSessionId(data._id);
                              }}
                            />
                          )}

                          {data.status.toLowerCase() === "invalid session" && (
                            <DeleteBtn
                              onClick={() => {
                                // setCurrDeleteId(data._id);
                                setCurrDeleteSessionId(data._id);
                              }}
                            />
                          )}
                        </InvalidSessionBtnsWrapper>
                      </TableRowCell>
                    </TableRow>

                    {/* Distraction Modal */}
                    {currDisId === index && (
                      <ShowDistractions
                        data={data}
                        index={index}
                        currDisId={currDisId}
                        setCurrDisId={setCurrDisId}
                      />
                    )}

                    {/* Invalid Session confirm delete Modal */}
                    {data._id === currDeleteSessionId && (
                      <ConfirmDelete
                        isModalEnable={data._id === currDeleteSessionId}
                        setIsModalEnable={setCurrDeleteSessionId}
                        handleSubmit={handleDeleteInvalidSession}
                      />
                    )}

                    {/* Manage Invalid Session Modal */}
                    {data._id === currManageSessionId && (
                      <ManageInvalidSession
                        isModalEnable={data._id === currManageSessionId}
                        setIsModalEnable={setCurrManageSessionId}
                        handleSubmit={handleInvalidSession}
                        sessionInfo={{
                          sessionId: data._id,
                          taskTitle: data.taskTitle,
                          startTime: data.startTime,
                          status: data.status,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      )}
    </GridContentTransaction>
  );
};

export default Transactions;
