const getYesterdayFocusData = (sessions) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1); // Move to yesterday

  const yesterdayLabel = yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let totalFocus = 0;

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);

    const isYesterday =
      sessionDate.getDate() === yesterday.getDate() &&
      sessionDate.getMonth() === yesterday.getMonth() &&
      sessionDate.getFullYear() === yesterday.getFullYear();

    if (isYesterday && session.startTime && session.endTime) {
      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );
      totalFocus += focusMinutes;
    }
  });

  return [
    {
      day: yesterdayLabel, // same key used in chart
      focusTime: parseFloat((totalFocus / 60).toFixed(1)), // in hours
    },
  ];
};

export default getYesterdayFocusData;
