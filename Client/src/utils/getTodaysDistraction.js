const getTodaysDistraction = (sessions) => {
  const today = new Date().toDateString();

  const count = sessions.reduce((acc, session) => {
    return new Date(session.createdAt).toDateString() === today
      ? acc + (session.distractions?.length || 0)
      : acc;
  }, 0);

  const label = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return [{ label, distractions: count }];
};

export default getTodaysDistraction;
