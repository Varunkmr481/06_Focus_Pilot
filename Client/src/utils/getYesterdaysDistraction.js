const getYesterdaysDistraction = (sessions) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const count = sessions.reduce((acc, session) => {
    return new Date(session.createdAt).toDateString() ===
      yesterday.toDateString()
      ? acc + (session.distractions?.length || 0)
      : acc;
  }, 0);

  const label = yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return [{ label, distractions: count }];
};

export default getYesterdaysDistraction;
