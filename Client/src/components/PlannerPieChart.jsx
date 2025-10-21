import styled from "styled-components";
import React, { useState } from "react";
import { useEffect } from "react";
// import toast from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PlannerPieCustomLegend from "../components/PlannerPieCustomLegend";
import Message from "./Message";
// import filterSessionWithRange from "../utils/filterSessionWithRange";

// Aesthetic modern color palette
// const COLORS = [
//   "#5A4FCF", // Deep work - Indigo
//   "#FFCE56", // Light task - Yellow
//   "#2DD4BF", // Creative task - Teal
//   "#6366F1", // Revision - Indigo Light
//   "#F472B6", // Concept Learning - Pink
//   "#FB923C", // Mock Test - Orange
// ];

const ChartWrapper = styled.div`
  /* background-color: blueviolet; */
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  position: relative;
  /* padding: 3rem; */

  @media (max-width: 768px) {
    height: 300px;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    height: 250px;
    padding: 0.5rem;
  }

  @media (min-width: 1600px) {
    height: 450px;
    padding: 2rem;
  }
`;

const LegendWrapper = styled.div`
  font-size: 8px;
  font-weight: 600;
  padding-left: 4px;

  @media (min-width: 425px) {
    font-weight: 600;
    font-size: 11px;
  }

  @media (min-width: 768px) {
    /* padding-left: 4px; */
    font-size: 11.5px;
    font-weight: 600;
  }

  @media (min-width: 1024px) {
    padding-left: 11px;
    font-size: 13px;
  }

  @media (min-width: 1440px) {
    font-size: 15px;
  }
`;

const Rough = styled.div`
  position: absolute;
  top: 0%;
  right: 1%;
  z-index: 100000;
  color: #1f2937;
  font-weight: 600;
  border: 1.5px solid #d1d5db;
  background: #f9fafb;
  display: flex;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  align-items: center;
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  gap: 0.3rem;

  & button {
    position: relative;
    border: none;
    padding: 0.2rem 0.4rem;
    font-weight: 600;
    font-size: 0.5rem;
    border-radius: 0.2rem;
    background-color: #e0e7ff;
    color: #3730a3;
    cursor: pointer;
    transition: all 0.25s ease;

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

const NoSessionFound = styled.div`
  text-align: center;
  padding: 2rem;
  color: red;
  font-weight: 600;
  font-style: italic;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const hours = data.hours;

    // Convert hours to HH:MM format
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    const formattedTime = `${h}h ${m}m`;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{data.category}</p>
        <p>{`Time: ${formattedTime}`}</p>
      </div>
    );
  }

  return null;
};

const PlannerPieChart = ({ chartData, categoryColorMap }) => {
  const [legendWidth, setLegendWidth] = useState(160);
  const [goalData, setGoalData] = useState([]);

  console.log(chartData);

  useEffect(() => {
    setGoalData(chartData);
  }, [chartData]);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width > 0 && width <= 320) setLegendWidth(95);
      if (width > 320 && width <= 425) setLegendWidth(100);
      else if (width > 425 && width <= 768) setLegendWidth(120);
      else if (width > 768 && width <= 1024) setLegendWidth(130);
      else if (width > 1024 && width <= 1440) setLegendWidth(150);
      else if (width > 1440) setLegendWidth(160);
    }

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 25, left: 30, right: 30, bottom: -80 }}>
          <Pie
            data={goalData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="95%"
            dataKey="count" // ✅ backend se aaya field
            nameKey="category" // ✅ backend se aaya field
          >
            {goalData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={categoryColorMap[entry.category] || "#999999"}
                stroke="#f0f0f0"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            // wrapperStyle={{ outline: "none" }}
            // cursor={false}
          />
          <Legend
            content={<PlannerPieCustomLegend />}
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PlannerPieChart;
