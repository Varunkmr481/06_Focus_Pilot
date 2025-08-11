const getCurrentMonthDistractions = (sessions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const map = {};

  // Initialize map with all days of current month = 0 distractions
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    map[label] = 0;
  }

  // Add actual distractions from sessions
  sessions.forEach((session) => {
    const date = new Date(session.createdAt);
    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
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

export default getCurrentMonthDistractions;
