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

  return {};
};

module.exports = getDateRange;
