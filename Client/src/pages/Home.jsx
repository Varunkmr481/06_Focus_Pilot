import { IoMdInformationCircle } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuArrowDownToLine, LuArrowUpToLine } from "react-icons/lu";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import styled from "styled-components";
import CurrencyTag from "../components/CurrencyTag";
import IconButton from "../components/IconButton";
import TransactionCard from "../components/TransactionCard";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router";
import StickerOverlayCard from "../components/StickerOverlayCard";
import { FaRegClock } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { LuTrophy } from "react-icons/lu";
import { IoPodiumOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import GoalPieChart from "../components/GoalPieChart";
import DistractionBarGraph from "../components/DistractionBarGraph";
import getFocusPercentageChange from "../utils/getFocusPercentageChange";
import filterSessionWithRange from "../utils/filterSessionWithRange";
import LiveClock from "../components/LiveClock";
import Loader2 from "../components/Loader2";
import FocusLineChart from "../components/FocusLineChart";
import { FaArrowTrendDown } from "react-icons/fa6";
import React from "react";

const Progression = styled.div`
  font-size: 0.7rem;
  display: none;
  align-items: center;
  gap: 0.2rem;
  color: ${({ $sign }) => {
    return $sign === "+" ? "green" : "red";
  }};
`;

export const ClockProgressionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (min-width: 375px) {
    ${Progression} {
      display: flex;
      font-size: 0.8rem;
    }
  }

  @media (min-width: 596px) {
    ${Progression} {
      display: none;
    }
  }

  @media (min-width: 768px) {
    ${Progression} {
      display: flex;
      font-size: 0.9rem;
    }
  }
`;

const TrendUp = styled(FaArrowTrendUp)`
  color: rgba(48, 224, 72, 1);
`;

const TrendDown = styled(FaArrowTrendDown)`
  color: red;
`;

export const Rough = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 70%;
  gap: 0.4rem;
  z-index: 1000;
  color: #1f2937;
  font-weight: 600;
  z-index: 1;

  & button {
    border: none;
    padding: 0.4rem 0.6rem;
    font-weight: 700;
    font-size: 0.5rem;
    border-radius: 0.2rem;
    background-color: #e0e7ff;
    color: #3730a3;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;

    &:hover {
      background-color: #c7d2fe;
      transform: scale(1.05);
    }

    &.active {
      background-color: #a5b4fc;
      transform: scale(0.98);
    }

    /* Tooltip styles */
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -1.8rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: #111827;
      color: #f9fafb;
      padding: 4px 8px;
      font-size: 0.7rem;
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  /* ──────────────── MEDIA QUERIES ──────────────── */

  /* Small Mobile: 320px and above */
  @media (min-width: 320px) {
    & button {
      font-size: 0.5rem;
      padding: 0.2rem 0.4rem;
    }
  }

  /* Medium Mobile: 480px and above */
  @media (min-width: 480px) {
    & button {
      font-size: 0.55rem;
      padding: 0.25rem 0.5rem;
    }
  }

  /* Tablet: 640px and above */
  @media (min-width: 640px) {
    & button {
      font-size: 0.6rem;
      padding: 0.3rem 0.6rem;
    }
  }

  /* Large Tablet / Small Laptop: 768px and above */
  @media (min-width: 768px) {
    & button {
      font-size: 0.65rem;
      padding: 0.35rem 0.65rem;
    }
  }

  /* Laptop: 1024px and above */
  @media (min-width: 1024px) {
    & button {
      font-size: 0.7rem;
      padding: 0.4rem 0.7rem;
    }
  }

  /* Large Laptop: 1280px and above */
  @media (min-width: 1280px) {
    & button {
      font-size: 0.75rem;
      padding: 0.45rem 0.75rem;
    }
  }

  /* Desktop / Full HD: 1536px and above */
  @media (min-width: 1536px) {
    & button {
      font-size: 0.8rem;
      padding: 0.5rem 0.8rem;
    }
  }

  /* 4K Display: 1920px and above */
  @media (min-width: 1920px) {
    & button {
      font-size: 0.85rem;
      padding: 0.55rem 0.9rem;
    }
  }
`;

export const FilterBox = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1.6px solid #5f00d9;
  background: #f9fafb;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 0.6rem 0.9rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 596px) {
    ${Rough} {
      display: none;
    }
  }
`;

export const DropdownWrapper = styled.div`
  display: none;

  @media (max-width: 596px) {
    display: block;
    /* width: 8rem; */
    /* margin-bottom: 1.5rem; */

    select {
      width: 100%;
      padding: 0.4rem;
      font-size: 0.7rem;
      border-radius: 0.5rem;
      border: 1.6px solid #5f00d9;
      background: #f9fafb;
      color: #1f2937;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      outline: none;
    }
  }
`;

const SectionHeader = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.03rem;
  text-transform: uppercase;
  padding: 1rem 2rem;
  margin: 0.5rem auto 0.5rem;
  border-radius: 12px;

  /* Glassmorphism Background */
  /* background: rgba(255, 255, 255, 0.15); */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  /* Gradient Text */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(135deg, #5f00d9, #7e4ae6);

  /* Soft Glow */
  text-shadow: 0 4px 12px rgba(37, 117, 252, 0.3);

  /* Smooth fade-in
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  } */
`;

export const GridContent = styled.div`
  display: grid;
  /* for laptops */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10vh 10vh 35vh 30vh 30vh;
  gap: 3vh;
  /* background-color: transparent; */

  .item_1,
  .item_2,
  .item_3,
  .item_4,
  .item_5,
  .item_6,
  .item_7 {
    border-radius: 1rem;
  }

  .item_1 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    /* background-color: lightcoral; */
  }

  .item_2 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    /* background-color: lightgreen; */
  }

  .item_3 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    /* background-color: lightseagreen; */
  }

  .item_4 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    /* background-color: lightskyblue; */
  }

  .item_5 {
    display: flex;
    padding: 0.8rem 0.8rem;
    flex-direction: column;
    gap: 1.5rem;
    /* background-color: yellow; */
    background-color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    grid-column: 1/3;
    height: auto;
    /* min-height: 100%;
    overflow: auto; */
  }

  .item_6 {
    display: flex;
    padding: 0.8rem 0.8rem;
    /* background-color: violet; */
    /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    background-color: white;
    justify-content: space-between;
    flex-direction: column;
    grid-column: 1/3;
    height: auto;
    /* min-height: 100%;
    overflow: auto; */
  }

  .item_7 {
    background-color: white;
    display: flex;
    padding: 0.8rem 0.8rem;
    justify-content: space-between;
    flex-direction: column;
    grid-column: 1/3;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    height: auto;
    /* background-color: aqua; */
    /* min-height: 100%;
    overflow: auto; */
  }

  @media (min-width: 425px) {
    grid-template-rows: 12vh 12vh 35vh 35vh 35vh;
  }

  @media (min-width: 596px) {
    grid-template-rows: 14vh 14vh 45vh 40vh 40vh;
  }

  /* title | duration | distraction | status */

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 14vh 53vh 55vh;

    .item_5 {
      grid-column: 1/3;
    }

    .item_6 {
      grid-column: 3/5;
    }

    .item_7 {
      grid-column: 1/5;
    }
  }
`;

export const ClockValue = styled.div`
  font-size: 0.8rem;
  font-weight: 900;

  @media (min-width: 425px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const BadgeValue = styled.div`
  font-size: 0.8rem;
  font-weight: 900;

  @media (min-width: 425px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const TrophyValue = styled.div`
  font-size: 1.3rem;
  font-weight: 900;

  @media (min-width: 425px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LevelValue = styled.div`
  font-size: 1.1rem;
  font-weight: 900;

  @media (min-width: 425px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1.45rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 2.6rem;
  width: 2.6rem;
  background-color: ${({ $bgColor }) => {
    return $bgColor ? $bgColor : "rgb(190, 226, 250)";
  }};

  @media (min-width: 425px) {
    height: 3rem;
    width: 3rem;
  }

  @media (min-width: 768px) {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

const ClockIcon = styled(FaRegClock)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const BadgeIcon = styled(SlBadge)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const TrophyIcon = styled(LuTrophy)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const PodiumIcon = styled(IoPodiumOutline)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => {
      return props.extendedsize && props.extendedsize;
    }};
  }
`;

export const ColorIcons = ({
  bgColor,
  icon: Icon,
  size,
  color,
  extendedsize,
}) => {
  // const DynamicIcon = getStyledIcon(icon);
  // console.log(DynamicIcon);

  return (
    <IconContainer $bgColor={bgColor}>
      <Icon size={size} color={color} extendedsize={extendedsize} />
    </IconContainer>
  );
};

const Home = () => {
  const { sessionData, setSessionData } = useOutletContext();
  const [userHr, setUserHr] = useState(null);
  const [userBadge, setUserBadge] = useState("");
  const [userTrophy, setUserTrophy] = useState("");
  const [userLevel, setUserLevel] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [distractionData, setDistractionData] = useState({});
  const [focusPercentageChange, setFocusPercentageChange] = useState(
    getFocusPercentageChange(sessionData)
  );
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setFocusPercentageChange(getFocusPercentageChange(sessionData));
  }, [sessionData]);

  useEffect(() => {
    const getCurrentUser = async function () {
      try {
        setIsLoading(true);

        // 1. Get the token
        const token = localStorage.getItem("token");

        // 2. Send http request
        const res = await fetch("http://localhost:8000/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        const data = await res.json();

        console.log("home se data aarha h hato : ", data.user);
        setUserHr(data.user.totalHours);
        setUserLevel(data.user.currentLevel);
        setUserTrophy(data.user.currentTrophy);
        setUserBadge(data.user.currentBadge);
      } catch (err) {
        return toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // console.log(sessionData);

  return (
    <>
      {isLoading ? (
        <Loader2 label="Preparing your dashboard..." />
      ) : (
        <>
          <FilterBox>
            <ClockProgressionContainer>
              <LiveClock />

              <Progression $sign={focusPercentageChange.sign}>
                {focusPercentageChange.sign === "+" ? (
                  <TrendUp />
                ) : (
                  <TrendDown />
                )}

                <span>
                  <span>
                    {focusPercentageChange.sign === "n"
                      ? ""
                      : focusPercentageChange.sign}
                  </span>
                  <span>{focusPercentageChange.value}%</span>
                </span>
              </Progression>
            </ClockProgressionContainer>

            <DropdownWrapper>
              <select
                defaultValue="all"
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveFilter(val);
                  filterSessionWithRange(val, setSessionData);
                }}
              >
                {/* <option value="" disabled>
              Select Filter
            </option> */}
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="thisYear">This Year</option>
              </select>
            </DropdownWrapper>

            <Rough>
              <button
                className={activeFilter === "all" ? "active" : ""}
                data-tooltip="View all sessions stats from all time"
                onClick={() => {
                  setActiveFilter("all");
                  filterSessionWithRange("all", setSessionData);
                }}
              >
                All
              </button>
              <button
                className={activeFilter === "today" ? "active" : ""}
                data-tooltip="View today’s sessions stats"
                onClick={() => {
                  setActiveFilter("today");
                  filterSessionWithRange("today", setSessionData);
                }}
              >
                Today
              </button>
              <button
                className={activeFilter === "yesterday" ? "active" : ""}
                data-tooltip="Track yesterday stats"
                onClick={() => {
                  setActiveFilter("yesterday");
                  filterSessionWithRange("yesterday", setSessionData);
                }}
              >
                Yesterday
              </button>
              <button
                className={activeFilter === "thisMonth" ? "active" : ""}
                data-tooltip="Track this months stats"
                onClick={() => {
                  setActiveFilter("thisMonth");
                  filterSessionWithRange("thisMonth", setSessionData);
                }}
              >
                This Month
              </button>
              <button
                className={activeFilter === "lastMonth" ? "active" : ""}
                data-tooltip="Last month’s stats"
                onClick={() => {
                  setActiveFilter("lastMonth");
                  filterSessionWithRange("lastMonth", setSessionData);
                }}
              >
                Last Month
              </button>
              <button
                className={activeFilter === "thisYear" ? "active" : ""}
                data-tooltip="Yearly stats"
                onClick={() => {
                  setActiveFilter("thisYear");
                  filterSessionWithRange("thisYear", setSessionData);
                }}
              >
                This Year
              </button>
            </Rough>
          </FilterBox>

          {/* <div>FOCUSMODE</div> */}

          <GridContent>
            <div className="item_1">
              <ColorIcons
                icon={ClockIcon}
                color="#2563EB"
                bgColor="#DBEAFE"
                extendedsize="1.8rem"
              />
              <ClockValue>
                {userHr?.toFixed(2)} {userHr > 1 ? "hrs" : "hr"}
              </ClockValue>
            </div>
            <div className="item_2">
              <ColorIcons
                icon={BadgeIcon}
                size="1.6rem"
                bgColor="#DCFCE7"
                color="#16A34A"
                extendedsize="2rem"
              />
              <BadgeValue>{userBadge}</BadgeValue>
            </div>
            <div className="item_3">
              <ColorIcons
                icon={TrophyIcon}
                size="1.6rem"
                bgColor="#EDE9FE "
                color="#9333EA"
                extendedsize="2rem"
              />
              <TrophyValue>{userTrophy}</TrophyValue>
            </div>
            <div className="item_4">
              <ColorIcons
                icon={PodiumIcon}
                size="1.6rem"
                bgColor="#FEF3C7 "
                color="#F59E0B"
                extendedsize="2rem"
              />
              <LevelValue>{userLevel}</LevelValue>
            </div>
            <div className="item_5">
              <DistractionBarGraph
                sessionData={sessionData}
                distractionData={distractionData}
                setDistractionData={setDistractionData}
                activeFilter={activeFilter}
              />
            </div>
            <div className="item_6">
              <GoalPieChart
                sessionData={sessionData}
                setSessionData={setSessionData}
              />
            </div>
            <div className="item_7">
              <FocusLineChart
                sessionData={sessionData}
                activeFilter={activeFilter}
              />
            </div>
          </GridContent>
        </>
      )}
    </>
  );
};

export default Home;
