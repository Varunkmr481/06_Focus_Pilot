const getYearlyMonthlyDistractions = (sessions) => {
  const monthlyMap = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i).toLocaleString("en-US", { month: "short" }),
    distractions: 0,
  }));

  sessions.forEach((session) => {
    const date = new Date(session.createdAt);
    const monthIndex = date.getMonth(); // 0 (Jan) to 11 (Dec)

    // Optional: ensure only current year's data is used
    const currentYear = new Date().getFullYear();
    if (date.getFullYear() === currentYear) {
      monthlyMap[monthIndex].distractions += session.distractions?.length || 0;
    }
  });

  return monthlyMap;
};

export default getYearlyMonthlyDistractions;
