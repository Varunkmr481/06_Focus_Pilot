import { useEffect, useState } from "react";
import LiveClock from "../components/LiveClock";
import { TbAlarmAverage } from "react-icons/tb";
import styled from "styled-components";
import toast from "react-hot-toast";
import GoalPieChart from "../components/GoalPieChart";
import PlannerPieChart from "../components/PlannerPieChart";
import { ClockIcon } from "lucide-react";
import { IoMdHourglass } from "react-icons/io";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import PlannerBarChart from "../components/PlannerBarChart";
import Message from "../components/Message";
import Loader2 from "../components/Loader2";
import ChatbotModal from "../components/ChatBotModal";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaBalanceScale } from "react-icons/fa";
import ImbalanceDetectorModal from "../components/ImbalanceDetectorModal";

const Rough = styled.div`
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
  /* overflow: hidden; */

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

const FilterBox = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  border: 1.6px solid #5f00d9;
  background: #f9fafb;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 0.6rem 0.9rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  /* overflow: hidden; */

  @media (max-width: 596px) {
    ${Rough} {
      display: none;
    }
  }
`;

const Progression = styled.div`
  font-size: 0.7rem;
  display: none;
  align-items: center;
  gap: 0.2rem;
  color: ${({ $sign }) => {
    return $sign === "+" ? "green" : "red";
  }};
`;

const ClockProgressionContainer = styled.div`
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

const DropdownWrapper = styled.div`
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

const GridContent = styled.div`
  /* background-color: lightcoral; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows:
    repeat(1, minmax(6rem, auto)) repeat(1, minmax(30rem, auto))
    repeat(1, minmax(32.5rem, auto));
  gap: 1rem;

  .item_1,
  .item_2,
  .item_3,
  .item_4,
  .item_5,
  .item_6 {
    border-radius: 1rem;
  }

  .item_1 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }

  .item_2 {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    // height: auto;
    /* background-color: lightgreen; */
  }

  .item_3 {
    /* height: auto; */
    /* background-color: lightseagreen; */
    background-color: white;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }

  .item_4 {
    box-sizing: border-box;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    grid-column: 1/4;
    padding: 0 2.8rem 0 1.3rem;
    /* overflow: hidden; */
  }

  .item_5 {
    display: flex;
    height: auto;
    background-color: white;
    grid-column: 1/4;
    width: 100%;
    /* background-color: blueviolet; */
  }
`;

const HourGlassIcon = styled(IoMdHourglass)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const AverageTimeIcon = styled(TbAlarmAverage)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const TopProjectIcon = styled(LiaProjectDiagramSolid)`
  font-size: ${(props) => props.size || "1.3rem"};
  color: ${(props) => props.color || "rgb(3, 105, 161)"};
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: ${(props) => props.extendedsize && props.extendedsize};
  }
`;

const BoxLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;

  .label {
    font-weight: 700;
    color: rgba(124, 123, 123, 1);
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

const ColorIcons = ({ bgColor, icon: Icon, size, color, extendedsize }) => {
  // const DynamicIcon = getStyledIcon(icon);
  // console.log(DynamicIcon);

  return (
    <IconContainer $bgColor={bgColor}>
      <Icon size={size} color={color} extendedsize={extendedsize} />
    </IconContainer>
  );
};

const ClockValue = styled.div`
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

const PieChartContainer = styled.div`
  width: 35%;
`;

const LegendContainer = styled.div`
  width: 65%;
  /* background-color: cadetblue; */
  /* background-color: red; */
  padding: 0.6rem 0.5rem 0.4rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: start;
  justify-content: center;
`;

const LegendInfoContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  gap: 0.8rem;
  width: 100%;

  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateX(6px);
    cursor: pointer;
  }
`;

const LineCat = styled.div`
  display: flex;
  width: 20%;
  justify-content: end;
  font-weight: 500;
  color: #333;
`;

const FullBar = styled.div`
  position: relative;
  border: 1px solid #49494945;
  background-color: #f7f7f7;
  border-radius: 0.8rem;
  height: 1.2rem;
  width: 61%;
  overflow: hidden; // This hides any content that overflows, keeping it within the rounded corners
`;

// The filled part of the bar
const LineBarFill = styled.div`
  height: 100%;
  border-radius: 0.8rem;
  background-color: ${({ $color }) => $color};
  width: ${({ $widthPercentage }) => $widthPercentage}%;
  transition: width 0.4s ease-in-out;
`;

// The text component that shows the percentage
const PercentageText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333; // A dark color for contrast against a light bar
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2; // Ensures the text is on top of the bar fill
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4); // For readability on colored backgrounds
  white-space: nowrap; // Keeps the text from wrapping to a new line
`;

const LineBar = styled.div`
  border: 1px solid #49494945;
  background-color: #f7f7f7;
  /* overflow: hidden; */
  width: 61%;
  border-radius: 0.8rem;
  height: 1.2rem;

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $widthPercentage }) => $widthPercentage}%;
    background-color: ${({ $color }) => $color};
    border-radius: 0.8rem;
    // Add a light shadow to the filled part
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: width 0.4s ease-in-out; // Smooth animation on percentage change
  }
`;

const LineTime = styled.div`
  width: 19%;
  font-weight: 400;
  color: #666;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(154, 78, 241, 0.4);
  transition: transform 0.2s ease;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.065);
  }

  /* Tooltip */
  &::after {
    content: "Get your next milestone prediction"; /* tooltip text */
    position: absolute;
    right: 110%; /* move to the left of the button */
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 0.85rem;
    padding: 6px 10px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(-50%) translateX(-4px); /* slight slide-in */
  }
`;

// New Floating Button for the Chatbot
const ChatbotFloatingButton = styled(FloatingButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 14%;

  &::after {
    content: "AI Chatbot"; /* tooltip text */
  }
`;

// Imbalance Floating button
const ImbalanceDetectorButton = styled(FloatingButton)`
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "Activity Imbalance Detector"; /* tooltip text */
  }
`;

const getTimeInHHMMFormat = (time) => {
  const totalMins = Math.round(time * 60);

  const hr = Math.floor(totalMins / 60);
  const min = totalMins % 60;

  const formattedHr = String(hr).padStart(2, "0");
  const formattedMin = String(min).padStart(2, "0");

  const stringTime = `${formattedHr}h ${formattedMin}m`;

  return stringTime;
};

function PlannerDashboard() {
  const [activeFilter, setActiveFilter] = useState("today");
  const [chartData, setChartData] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [showImbalanceDetector, setShowImbalanceDetector] = useState(false);

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      try {
        setIsLoading(true);
        // 1. Get the token
        const token = localStorage.getItem("token");

        // 2. Send the request
        const res = await fetch(
          `http://localhost:8000/tasks/stats?filter=${activeFilter}`,
          {
            method: "GET",
            headers: {
              authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setChartData(data);
          setBarChartData(data.barChartData);
          toast.success(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredTasks();
  }, [activeFilter]);

  const totalHrCategory = chartData.pieChartData?.reduce(
    (prev, curr) => prev + curr.hours,
    0
  );

  // console.log("ttttt", totalHrCategory);

  return (
    <>
      {isLoading ? (
        <Loader2 label="Preparing your dashboard..." />
      ) : (
        <>
          {/* Chatbot Floating Button */}
          <ChatbotFloatingButton onClick={() => setShowChatbotModal(true)}>
            <IoChatbubbleOutline />
          </ChatbotFloatingButton>

          {/* Chatbot Modal */}
          {showChatbotModal && (
            <ChatbotModal onClose={() => setShowChatbotModal(false)} />
          )}

          {/* Imbalance detector btn */}
          <ImbalanceDetectorButton
            onClick={() => setShowImbalanceDetector(true)}
          >
            <FaBalanceScale />
          </ImbalanceDetectorButton>

          {/* Imbalance detector modal */}
          {showImbalanceDetector && (
            <ImbalanceDetectorModal
              isModalOpen={showImbalanceDetector}
              onClose={() => setShowImbalanceDetector(false)}
              categoryColorMap={chartData.categoryColorMap}
              pieChartData={chartData.pieChartData}
            />
          )}

          <FilterBox>
            <ClockProgressionContainer>
              <LiveClock />
            </ClockProgressionContainer>
            <DropdownWrapper>
              <select
                defaultValue=""
                onChange={(e) => {
                  const val = e.target.value;
                  setActiveFilter(val);
                  // filterSessionWithRange(val, setSessionData);
                }}
              >
                <option value="" disabled>
                  Select Filter
                </option>
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="thisweek">Current Week</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
              </select>
            </DropdownWrapper>

            <Rough>
              <button
                className={activeFilter === "today" ? "active" : ""}
                data-tooltip="View today’s sessions stats"
                onClick={() => {
                  setActiveFilter("today");
                  // filterSessionWithRange("today", setSessionData);
                }}
              >
                Today
              </button>
              <button
                className={activeFilter === "yesterday" ? "active" : ""}
                data-tooltip="View yesterday’s sessions stats"
                onClick={() => {
                  setActiveFilter("yesterday");
                  // filterSessionWithRange("today", setSessionData);
                }}
              >
                Yesterday
              </button>
              <button
                className={activeFilter === "thisweek" ? "active" : ""}
                data-tooltip="Track this week's stats"
                onClick={() => {
                  setActiveFilter("thisweek");
                  // filterSessionWithRange("yesterday", setSessionData);
                }}
              >
                This Week
              </button>
              <button
                className={activeFilter === "thisMonth" ? "active" : ""}
                data-tooltip="Track this month's stats"
                onClick={() => {
                  setActiveFilter("thisMonth");
                  // filterSessionWithRange("thisMonth", setSessionData);
                }}
              >
                This Month
              </button>
              <button
                className={activeFilter === "lastMonth" ? "active" : ""}
                data-tooltip="Track last month's stats"
                onClick={() => {
                  setActiveFilter("lastMonth");
                  // filterSessionWithRange("thisMonth", setSessionData);
                }}
              >
                Last Month
              </button>
              <button
                className={activeFilter === "thisyear" ? "active" : ""}
                data-tooltip="View this years stats"
                onClick={() => {
                  setActiveFilter("thisyear");
                  // filterSessionWithRange("all", setSessionData);
                }}
              >
                This Year
              </button>
            </Rough>
          </FilterBox>

          <GridContent>
            <div className="item_1">
              <ColorIcons
                icon={HourGlassIcon}
                color="#2563EB"
                bgColor="#DBEAFE"
                extendedsize="1.8rem"
              />

              <BoxLabel>
                <div className="label">Total Time Planned</div>

                <ClockValue>
                  {/* {chartData?.totalTime?.toFixed(2)}{" "}
              {chartData?.totalTime > 1 ? "hrs" : "hr"} */}
                  {getTimeInHHMMFormat(chartData?.totalTime)}
                </ClockValue>
              </BoxLabel>
            </div>

            <div className="item_2">
              <ColorIcons
                icon={TopProjectIcon}
                color="#eb2599ff"
                bgColor="#fedbfcff"
                extendedsize="1.8rem"
              />

              <BoxLabel>
                <div className="label">Top Category</div>

                <ClockValue>
                  {chartData.length === 0 ? (
                    <div>---</div>
                  ) : (
                    chartData?.topProject?.topCategory
                  )}
                </ClockValue>
              </BoxLabel>
            </div>

            <div className="item_3">
              <ColorIcons
                icon={AverageTimeIcon}
                color="#2563EB"
                bgColor="#DBEAFE"
                extendedsize="1.8rem"
              />

              <BoxLabel>
                <div className="label">Average Task Time</div>

                <ClockValue>
                  {chartData?.averageTime?.toFixed(2)}{" "}
                  {chartData?.averageTime > 1 ? "hrs" : "hr"}
                </ClockValue>
              </BoxLabel>
            </div>

            <div className="item_4">
              <PlannerBarChart chartData={chartData} data={barChartData} />
            </div>

            <div className="item_5">
              {chartData?.length === 0 ? (
                <Message status="error">
                  <span>No tasks found.</span>
                  <span>
                    Start tracking a new task to see your progress here.
                  </span>
                </Message>
              ) : (
                <>
                  <PieChartContainer>
                    <PlannerPieChart
                      chartData={chartData.pieChartData}
                      categoryColorMap={chartData.categoryColorMap}
                    />
                  </PieChartContainer>

                  <LegendContainer>
                    {chartData.pieChartData?.map((pie) => {
                      const percentage =
                        totalHrCategory > 0
                          ? (pie.hours / totalHrCategory) * 100
                          : 0;
                      const formattedPercentage = percentage.toFixed(0);

                      return (
                        <LegendInfoContainer>
                          <LineCat>{pie.category}</LineCat>
                          <FullBar>
                            <LineBarFill
                              $color={chartData.categoryColorMap[pie.category]}
                              $widthPercentage={percentage}
                            />
                            <PercentageText>
                              {formattedPercentage}%
                            </PercentageText>
                          </FullBar>
                          <LineTime>{getTimeInHHMMFormat(pie.hours)}</LineTime>
                        </LegendInfoContainer>
                      );
                    })}
                  </LegendContainer>
                </>
              )}
            </div>

            {/* <div className="item_6"></div> */}
          </GridContent>
        </>
      )}
    </>
  );
}

export default PlannerDashboard;
