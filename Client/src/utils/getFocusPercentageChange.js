const getFocusPercentageChange = (sessions) => {
  const now = new Date();
  const todayDate = now.toDateString();
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(now.getDate() - 1);

  let todayTotal = 0;
  let yesterdayTotal = 0;

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt).toDateString();

    const focusMinutes = Math.max(
      0,
      Math.floor((session.endTime - session.startTime) / 60000)
    );

    if (sessionDate === todayDate) {
      todayTotal += focusMinutes;
    } else if (sessionDate === yesterdayDate.toDateString()) {
      yesterdayTotal += focusMinutes;
    }
  });

  const x = todayTotal;
  const y = yesterdayTotal;

  if (x > y && x > 0 && y > 0) {
    return {
      sign: "+",
      value: Math.round(((x - y) / y) * 100),
    };
  }

  if (x < y && x > 0 && y > 0) {
    return {
      sign: "-",
      value: Math.round(Math.abs((x - y) / y) * 100),
    };
  }

  if (x === 0 && y > 0) {
    return { sign: "-", value: 100 };
  }

  if (x > 0 && y === 0) {
    return { sign: "+", value: 100 };
  }

  if (x == 0 && y == 0) {
    return { sign: "n", value: 0 };
  }

  // Covers x === y and x === 0 && y === 0
  return { sign: "+", value: 0 };
};

export default getFocusPercentageChange;
