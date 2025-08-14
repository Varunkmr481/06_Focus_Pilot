const getCurrentWeekDistractions = (sessions) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get the start (Sunday) and end (Saturday) of the current week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Initialize map with 7 days of the week
  const weeklyMap = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);

    const label = day.toLocaleString("en-US", {
      weekday: "short",
    });

    return {
      label,
      distractions: 0,
    };
  });

  sessions.forEach((session) => {
    const created = new Date(session.createdAt);
    const onlyDate = new Date(
      created.getFullYear(),
      created.getMonth(),
      created.getDate()
    );

    if (onlyDate >= startOfWeek && onlyDate <= endOfWeek) {
      const dayIndex = onlyDate.getDay(); // 0 (Sun) to 6 (Sat)
      weeklyMap[dayIndex].distractions += session.distractions?.length || 0;
    }
  });

  return weeklyMap;
};

export default getCurrentWeekDistractions;
