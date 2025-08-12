const getCurrentMonthFocusData = (sessions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const focusMap = {};

  // Step 1: Initialize all days of the month with 0 focus time
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    focusMap[label] = 0;
  }

  // Step 2: Calculate focus time and map to dates
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isCurrentMonth =
      sessionDate.getMonth() === currentMonth &&
      sessionDate.getFullYear() === currentYear;

    if (isCurrentMonth && session.startTime && session.endTime) {
      const label = sessionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Calculate focus time in minutes
      // const focusMinutes = Math.max(
      //   0,
      //   Math.floor((session.endTime - session.startTime) / 60000)
      // );

      // ✅ Convert minutes to hours (rounded to 2 decimal places)
      const focusHours = Math.max(
        0,
        ((session.endTime - session.startTime) / 3600000).toFixed(2)
      );

      focusMap[label] += parseFloat(focusHours);
    }
  });

  // Step 3: Convert map to array for charting
  return Object.entries(focusMap).map(([day, focusTime]) => ({
    day,
    focusTime,
  }));
};

export default getCurrentMonthFocusData;
