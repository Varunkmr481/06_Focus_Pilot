// BarChartComponent.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Message from "./Message";

const CustomLegend = (props) => {
  const { payload } = props; // payload = list of categories/colors from chart

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        // backgroundColor: "red",
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px", // row ke bich thoda spacing
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: entry.color,
              borderRadius: "2px",
            }}
          />
          <span style={{ fontSize: "14px", color: "#333" }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const PlannerBarChart = ({ chartData, data }) => {
  // Transform barChartData for recharts
  // from: [{date:"2025-08-14", categories:[{category:"Read", hours:1.5, color:"#34D399"}]}]
  // to:   [{date:"2025-08-14", Read:1.5, "ReadColor":"#34D399"}]

  const formattedData = data.map((item) => {
    const row = { date: item.date };
    item.categories.forEach((cat) => {
      row[cat.category] = cat.hours;
      row[`${cat.category}Color`] = cat.color;
    });
    return row;
  });

  console.log(formattedData);

  // Extract all categories and their colors
  const categoryColors = {};
  data.forEach((item) => {
    item.categories.forEach((cat) => {
      categoryColors[cat.category] = cat.color; // har category ka ek fixed color store
    });
  });

  // Extract all unique categories
  const allCategories = Object.keys(categoryColors);

  return (
    <>
      {chartData.length === 0 ? (
        <Message status="error">
          <span>No tasks found.</span>
          <span>Start tracking a new task to see your progress here.</span>
        </Message>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={formattedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              label={{ value: "Hours", angle: -90, position: "insideLeft" }}
            />
            <Legend
              content={<CustomLegend />}
              wrapperStyle={{ paddingTop: 30 }}
            />

            <Tooltip
              formatter={(value, name, props) => [
                `${value.toFixed(1)} ${value.toFixed(1) > 1 ? "hrs" : "hr"}`,
                name,
              ]}
            />

            {allCategories.map((cat) => (
              <Bar
                key={cat}
                dataKey={cat}
                stackId="a"
                fill={categoryColors[cat] || "#999"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PlannerBarChart;
