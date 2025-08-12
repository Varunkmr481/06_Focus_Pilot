const getPreviousMonthFocusData = (sessions) => {
  const now = new Date();

  // Calculate previous month and year
  const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const prevYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const focusMap = {};

  // Step 1: Initialize all days of the previous month with 0
  for (let day = 1; day <= daysInPrevMonth; day++) {
    const date = new Date(prevYear, prevMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    focusMap[label] = 0;
  }

  // Step 2: Add actual focus time for previous month sessions
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isPrevMonth =
      sessionDate.getMonth() === prevMonth &&
      sessionDate.getFullYear() === prevYear;

    if (isPrevMonth && session.startTime && session.endTime) {
      const label = sessionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Calculate focus time in minutes
      // const focusMinutes = Math.max(
      //   0,
      //   Math.floor((session.endTime - session.startTime) / 60000)
      // );

      const focusHours = Math.max(
        0,
        ((session.endTime - session.startTime) / 3600000).toFixed(2)
      );

      focusMap[label] += parseFloat(focusHours);
    }
  });

  // Step 3: Convert object to array for line chart
  return Object.entries(focusMap).map(([day, focusTime]) => ({
    day,
    focusTime,
  }));
};

export default getPreviousMonthFocusData;
