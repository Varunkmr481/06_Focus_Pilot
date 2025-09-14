const getDateRange = function (filter) {
  const now = new Date();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const yesterdayEnd = new Date(todayEnd);
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

  //   Sun Jun 01 2025 00:00:00 GMT+0530 (India Standard Time)
  const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // 0 in the day refers last day of the previous month
  const lastDayOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const firstDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const lastDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );

  const firstDayOfThisYear = new Date(now.getFullYear(), 0, 1);

  const lastDayOfThisYear = new Date(
    now.getFullYear(),
    11,
    31,
    23,
    59,
    59,
    999
  );

  // ✅ All time = no filter
  if (filter === "all")
    return {
      start: new Date(0), // epoch time
      end: new Date(), // abhi tak
    };

  if (filter === "thisweek") {
    const firstDayOfWeek = new Date(now);
    const day = now.getDay(); // 0 = Sunday
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
    firstDayOfWeek.setDate(diff);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23, 59, 59, 999);

    return { start: firstDayOfWeek, end: lastDayOfWeek };
  }

  if (filter === "today")
    return {
      start: todayStart,
      end: todayEnd,
    };
  if (filter === "yesterday")
    return {
      start: yesterdayStart,
      end: yesterdayEnd,
    };
  if (filter === "thisMonth")
    return {
      start: firstDayOfThisMonth,
      end: lastDayOfThisMonth,
    };

  if (filter === "lastMonth")
    return {
      start: firstDayOfLastMonth,
      end: lastDayOfLastMonth,
    };

  if (filter === "thisYear")
    return {
      start: firstDayOfThisYear,
      end: lastDayOfThisYear,
    };

  return {};
};

module.exports = getDateRange;
