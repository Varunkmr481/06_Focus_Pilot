const getTodayFocusData = (sessions) => {
  const now = new Date();
  const todayLabel = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let totalFocus = 0;

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);

    const isToday =
      sessionDate.getDate() === now.getDate() &&
      sessionDate.getMonth() === now.getMonth() &&
      sessionDate.getFullYear() === now.getFullYear();

    if (isToday && session.startTime && session.endTime) {
      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );
      totalFocus += focusMinutes;
    }
  });

  return [
    {
      day: todayLabel,
      focusTime: parseFloat((totalFocus / 60).toFixed(1)), // in hours,
    },
  ];
};

export default getTodayFocusData;
