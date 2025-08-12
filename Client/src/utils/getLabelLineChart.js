const getLabelLineChart = (activeFilter) => {
  if (activeFilter === "all") {
    return "year";
  } else if (activeFilter === "thisYear") {
    return "month";
  } else {
    return "day";
  }
};

export default getLabelLineChart;
