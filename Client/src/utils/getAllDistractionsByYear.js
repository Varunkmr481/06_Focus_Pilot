const getAllDistractionsByYear = (sessions) => {
  const distractionMap = {};

  sessions.forEach((session) => {
    const year = new Date(session.createdAt).getFullYear();
    const count = session.distractions?.length || 0;

    if (distractionMap[year]) {
      distractionMap[year] += count;
    } else {
      distractionMap[year] = count;
    }
  });

  const result = Object.entries(distractionMap)
    .map(([year, distractions]) => ({
      label: year,
      distractions,
    }))
    .sort((a, b) => a.label - b.label); // sort by year

  return result;
};

export default getAllDistractionsByYear;
