const getPreviousMonthDistractions = (sessions) => {
  const now = new Date();
  let prevMonth = now.getMonth() - 1;
  let year = now.getFullYear();

  if (prevMonth < 0) {
    prevMonth = 11;
    year -= 1;
  }

  const daysInMonth = new Date(year, prevMonth + 1, 0).getDate();
  const map = {};

  // Initialize map with all days of previous month = 0 distractions
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, prevMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    map[label] = 0;
  }

  // Add actual distractions from sessions
  sessions.forEach((session) => {
    const date = new Date(session.createdAt);
    if (date.getMonth() === prevMonth && date.getFullYear() === year) {
      const label = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      map[label] += session.distractions?.length || 0;
    }
  });

  return Object.entries(map).map(([label, distractions]) => ({
    label,
    distractions,
  }));
};

export default getPreviousMonthDistractions;
