const getThisYearFocusData = (sessions) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Step 1: Initialize monthly focus time map
  const focusMap = {};
  monthLabels.forEach((month) => {
    focusMap[month] = 0;
  });

  // Step 2: Aggregate focus time for each month of the current year
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isThisYear = sessionDate.getFullYear() === currentYear;

    console.log(
      "Session Year:",
      sessionDate.getFullYear(),
      "Current Year:",
      currentYear
    );

    if (isThisYear && session.startTime && session.endTime) {
      const monthIndex = sessionDate.getMonth(); // 0-11
      const monthLabel = monthLabels[monthIndex];

      // Convert focus time to hours

      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );

      const focusHours = parseFloat((focusMinutes / 60).toFixed(2));

      focusMap[monthLabel] += focusHours;

      // console.log("Month:", monthLabel, "Focus Minutes:", focusMinutes);
    }
  });

  // Step 3: Convert to array for line chart use
  return monthLabels.map((month) => ({
    month,
    focusTime: focusMap[month],
  }));
};

export default getThisYearFocusData;
