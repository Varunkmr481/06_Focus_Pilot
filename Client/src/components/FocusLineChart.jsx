import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import getAllYearsFocusData from "../utils/getAllYearsFocusData";
import getCurrentMonthFocusData from "../utils/getCurrentMonthFocusData";
import getLabelLineChart from "../utils/getLabelLineChart";
import getPreviousMonthFocusData from "../utils/getPreviousMonthFocusData";
import getThisYearFocusData from "../utils/getThisYearFocusData";
import getTodayFocusData from "../utils/getTodayFocusData";
import getYesterdayFocusData from "../utils/getYesterdayFocusData";
import Message from "./Message";

// Sample Data
const sampleData = [
  { day: "Mon", focusTime: 120 },
  { day: "Tue", focusTime: 90 },
  { day: "Wed", focusTime: 150 },
  { day: "Thu", focusTime: 170 },
  { day: "Fri", focusTime: 110 },
  { day: "Sat", focusTime: 80 },
  { day: "Sun", focusTime: 130 },
];

// Styled Chart Container
const ChartWrapper = styled.div`
  width: 100%;
  height: 94%;
  /* background: #ffffff; */
  padding: 1.5rem 2rem;
  border-radius: 20px;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); */
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const StyledH2 = styled.h2`
  font-size: 0.75rem; /* ~12px */
  font-weight: 600;
  color: #1f2937; /* text-neutral-800 */

  @media (min-width: 375px) {
    font-size: 0.85rem;
  }

  @media (min-width: 425px) {
    font-size: 0.95rem;
  }

  @media (min-width: 640px) {
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
    font-weight: 700;
  }

  @media (min-width: 1024px) {
    font-size: 1.25rem;
    font-weight: 800;
  }

  @media (min-width: 1280px) {
    font-size: 1.4rem;
  }

  @media (min-width: 1440px) {
    font-size: 1.6rem;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const focus = payload[0].value;
    const unit = focus <= 1 ? "hr" : "hrs";

    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "0.6rem 0.8rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <p style={{ fontSize: "0.85rem", margin: 0, color: "#6b7280" }}>
          {label}
        </p>
        <p style={{ fontWeight: "600", margin: 0, color: "#4f46e5" }}>
          Focus: {focus.toFixed(1)} {unit}
        </p>
      </div>
    );
  }

  return null;
};

const FocusLineChart = ({ sessionData, activeFilter }) => {
  const [lineChartData, setLineChartData] = useState(sampleData);

  useEffect(() => {
    if (activeFilter === "all") {
      setLineChartData(getAllYearsFocusData(sessionData));
    } else if (activeFilter === "today") {
      setLineChartData(getTodayFocusData(sessionData));
    } else if (activeFilter === "yesterday") {
      setLineChartData(getYesterdayFocusData(sessionData));
    } else if (activeFilter === "thisMonth") {
      setLineChartData(getCurrentMonthFocusData(sessionData));
    } else if (activeFilter === "lastMonth") {
      setLineChartData(getPreviousMonthFocusData(sessionData));
    } else if (activeFilter === "thisYear") {
      setLineChartData(getThisYearFocusData(sessionData));
    }
  }, [sessionData, activeFilter]);

  return (
    <ChartWrapper>
      <StyledH2>Focus Time</StyledH2>
      {/* <StyledH2>{`${focusPercentageChange.sign} ${focusPercentageChange.value}`}</StyledH2> */}

      {sessionData.length === 0 ? (
        <Message status="error">
          <span>No sessions found.</span>
          <span>Please try adjusting your search filters.</span>
        </Message>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData} margin={{ top: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={getLabelLineChart(activeFilter)} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend
            // iconType="circle"
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              fontSize: 16,
              color: "#6b7280", // gray-500
              paddingBottom: "6px",
            }}
          /> */}
            <Line
              type="monotone"
              dataKey="focusTime"
              stroke="#4f46e5"
              strokeWidth={2.5}
              dot={{ r: 4, stroke: "#4f46e5", strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartWrapper>
  );
};

export default FocusLineChart;
