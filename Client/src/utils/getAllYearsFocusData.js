const getAllYearsFocusData = (sessions) => {
  const focusMap = {};

  sessions.forEach((session) => {
    if (!session.startTime || !session.endTime) return;

    const sessionDate = new Date(session.createdAt);
    const year = sessionDate.getFullYear();

    const focusMinutes = Math.max(
      0,
      Math.floor((session.endTime - session.startTime) / 60000)
    );

    if (!focusMap[year]) {
      focusMap[year] = 0;
    }

    focusMap[year] += focusMinutes;
  });

  // Keep focusTime as number
  return Object.entries(focusMap)
    .map(([year, focusMinutes]) => ({
      year: parseInt(year),
      focusTime: parseFloat((focusMinutes / 60).toFixed(1)), // in hours
    }))
    .sort((a, b) => a.year - b.year);
};

export default getAllYearsFocusData;
