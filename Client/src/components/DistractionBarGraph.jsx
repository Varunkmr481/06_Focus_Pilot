import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";

import getAllDistractionsByYear from "../utils/getAllDistractionsByYear";
import getCurrentMonthDistractions from "../utils/getCurrentMonthDistractions";
import getPreviousMonthDistractions from "../utils/getPreviousMonthDistractions";
import getTodaysDistraction from "../utils/getTodaysDistraction";
import getYearlyMonthlyDistractions from "../utils/getYearlyMonthlyDistractions";
import getYesterdaysDistraction from "../utils/getYesterdaysDistraction";

// const data = [
//   { label: "Mon", distractions: 2 },
//   { label: "Tue", distractions: 5 },
//   { label: "Wed", distractions: 1 },
//   { label: "Thu", distractions: 3 },
//   { label: "Fri", distractions: 4 },
//   { label: "Sat", distractions: 2 },
//   { label: "Sun", distractions: 0 },
// ];

const ChartWrapper = styled.div`
  width: 100%;
  height: 330px;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  background-color: #ffffffff;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); */
  /* border: 1px solid #e5e7eb; */

  @media (min-width: 768px) {
    height: 400px;
  }

  @media (min-width: 1024px) {
    height: 460px;
  }
`;

const StyledH2 = styled.h2`
  position: absolute;
  top: 2%;
  left: 3%;
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
    left: 4%;
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

const DistractionBarGraph = ({
  sessionData,
  distractionData,
  setDistractionData,
  activeFilter,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const data = getAllDistractionsByYear(sessionData);
  //   setDistractionData(data);

  //   console.log("M bar graph se arha hu :", data);
  // }, []);

  useEffect(() => {
    if (activeFilter === "all") {
      setDistractionData(getAllDistractionsByYear(sessionData));
    } else if (activeFilter === "today") {
      setDistractionData(getTodaysDistraction(sessionData));
    } else if (activeFilter === "yesterday") {
      setDistractionData(getYesterdaysDistraction(sessionData));
    } else if (activeFilter === "thisMonth") {
      setDistractionData(getCurrentMonthDistractions(sessionData));
    } else if (activeFilter === "lastMonth") {
      setDistractionData(getPreviousMonthDistractions(sessionData));
    } else if (activeFilter === "thisYear") {
      setDistractionData(getYearlyMonthlyDistractions(sessionData));
    }
  }, [sessionData, activeFilter, setDistractionData]);

  // console.log("M bar graph se arha hu : ", sessionData);

  const CustomTooltip = ({ active, payload, label, coordinate, width }) => {
    if (!active || !payload || !payload.length) return null;

    const style = getTooltipStyle(width);

    const tooltipStyle = {
      backgroundColor: "#111827",
      border: "1px solid #374151",
      color: "#f9fafb",
      fontSize: `${style.fontSize}px`,
      padding: `${style.padding}px`,
      borderRadius: `${style.borderRadius}px`,
      width: `${style.maxWidth}px`,
      position: "absolute",
      left: coordinate?.x + 3 || 0,
      top: coordinate?.y - 50 || 0,
      pointerEvents: "none", // so it doesn’t interfere with hover
      zIndex: 1000,
    };

    return (
      <div style={tooltipStyle}>
        <p
          style={{
            color: "#facc15",
            fontSize: `${style.fontSize + 1}px`,
            margin: 0,
          }}
        >
          {label}
        </p>
        {payload.map((item, index) => (
          <p
            key={index}
            style={{
              margin: 0,
              color: "#e0e7ff",
              fontSize: `${style.fontSize}px`,
            }}
          >
            {`${item.name} : ${item.value}`}
          </p>
        ))}
      </div>
    );
  };

  const getTooltipStyle = () => {
    if (width <= 320) {
      return { fontSize: 3, padding: 4, borderRadius: 6, width: 110 };
    } else if (width <= 375) {
      return { fontSize: 11, padding: 7, borderRadius: 8, maxWidth: 115 };
    } else if (width <= 425) {
      return { fontSize: 12, padding: 8, borderRadius: 8, maxWidth: 120 };
    } else if (width <= 768) {
      return { fontSize: 13, padding: 10, borderRadius: 10, maxWidth: 125 };
    } else if (width <= 1024) {
      return { fontSize: 13.5, padding: 10, borderRadius: 10, maxWidth: 130 };
    } else if (width <= 1440) {
      return { fontSize: 14, padding: 12, borderRadius: 10, maxWidth: 135 };
    } else {
      return { fontSize: 15, padding: 12, borderRadius: 10, maxWidth: 140 };
    }
  };

  return (
    <ChartWrapper>
      <StyledH2>Distractions</StyledH2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distractionData}
          margin={{ top: 40, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#6b7280" }} // Tailwind's gray-500
            axisLine={{ stroke: "#d1d5db" }} // gray-300
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />

          <Tooltip
            content={(props) => <CustomTooltip {...props} />}
            cursor={{ fill: "rgba(147, 197, 253, 0.1)" }}
          />

          <Legend
            iconType="circle"
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              fontSize: 13,
              color: "#6b7280", // gray-500
              paddingTop: "4px",
            }}
          />

          <Bar
            dataKey="distractions"
            fill="#8b5cf6" // Tailwind's violet-500
            radius={[6, 6, 0, 0]}
            barSize={28}
            name="distractions"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default DistractionBarGraph;
