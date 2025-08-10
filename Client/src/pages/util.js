import toast from "react-hot-toast";

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

async function filterSessionWithRange(range, setSessionData) {
  try {
    // 1. Extract the token
    const token = localStorage.getItem("token");

    // 2. Send the api request
    const res = await fetch(
      `http://localhost:8000/session/filter?range=${range}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      if (data.sessions.length === 0) {
        setSessionData(data.sessions);
        toast.error("No sessions found!");
      } else {
        setSessionData(data.sessions);
        toast.success("Session filtered!");
      }
    } else {
      toast.error("Failed to fetch sessions");
    }
  } catch (err) {
    toast.error(err.message);
  }
}

const getTodayFocusData = (sessions) => {
  const now = new Date();
  const todayLabel = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let totalFocus = 0;

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);

    const isToday =
      sessionDate.getDate() === now.getDate() &&
      sessionDate.getMonth() === now.getMonth() &&
      sessionDate.getFullYear() === now.getFullYear();

    if (isToday && session.startTime && session.endTime) {
      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );
      totalFocus += focusMinutes;
    }
  });

  return [
    {
      day: todayLabel,
      focusTime: parseFloat((totalFocus / 60).toFixed(1)), // in hours,
    },
  ];
};

const getYesterdayFocusData = (sessions) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1); // Move to yesterday

  const yesterdayLabel = yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  let totalFocus = 0;

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);

    const isYesterday =
      sessionDate.getDate() === yesterday.getDate() &&
      sessionDate.getMonth() === yesterday.getMonth() &&
      sessionDate.getFullYear() === yesterday.getFullYear();

    if (isYesterday && session.startTime && session.endTime) {
      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );
      totalFocus += focusMinutes;
    }
  });

  return [
    {
      day: yesterdayLabel, // same key used in chart
      focusTime: parseFloat((totalFocus / 60).toFixed(1)), // in hours
    },
  ];
};

const getCurrentMonthFocusData = (sessions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const focusMap = {};

  // Step 1: Initialize all days of the month with 0 focus time
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    focusMap[label] = 0;
  }

  // Step 2: Calculate focus time and map to dates
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isCurrentMonth =
      sessionDate.getMonth() === currentMonth &&
      sessionDate.getFullYear() === currentYear;

    if (isCurrentMonth && session.startTime && session.endTime) {
      const label = sessionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Calculate focus time in minutes
      // const focusMinutes = Math.max(
      //   0,
      //   Math.floor((session.endTime - session.startTime) / 60000)
      // );

      // ✅ Convert minutes to hours (rounded to 2 decimal places)
      const focusHours = Math.max(
        0,
        ((session.endTime - session.startTime) / 3600000).toFixed(2)
      );

      focusMap[label] += parseFloat(focusHours);
    }
  });

  // Step 3: Convert map to array for charting
  return Object.entries(focusMap).map(([day, focusTime]) => ({
    day,
    focusTime,
  }));
};

const getPreviousMonthFocusData = (sessions) => {
  const now = new Date();

  // Calculate previous month and year
  const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const prevYear =
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  const focusMap = {};

  // Step 1: Initialize all days of the previous month with 0
  for (let day = 1; day <= daysInPrevMonth; day++) {
    const date = new Date(prevYear, prevMonth, day);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    focusMap[label] = 0;
  }

  // Step 2: Add actual focus time for previous month sessions
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isPrevMonth =
      sessionDate.getMonth() === prevMonth &&
      sessionDate.getFullYear() === prevYear;

    if (isPrevMonth && session.startTime && session.endTime) {
      const label = sessionDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Calculate focus time in minutes
      // const focusMinutes = Math.max(
      //   0,
      //   Math.floor((session.endTime - session.startTime) / 60000)
      // );

      const focusHours = Math.max(
        0,
        ((session.endTime - session.startTime) / 3600000).toFixed(2)
      );

      focusMap[label] += parseFloat(focusHours);
    }
  });

  // Step 3: Convert object to array for line chart
  return Object.entries(focusMap).map(([day, focusTime]) => ({
    day,
    focusTime,
  }));
};

const getThisYearFocusData = (sessions) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Step 1: Initialize monthly focus time map
  const focusMap = {};
  monthLabels.forEach((month) => {
    focusMap[month] = 0;
  });

  // Step 2: Aggregate focus time for each month of the current year
  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);
    const isThisYear = sessionDate.getFullYear() === currentYear;

    console.log(
      "Session Year:",
      sessionDate.getFullYear(),
      "Current Year:",
      currentYear
    );

    if (isThisYear && session.startTime && session.endTime) {
      const monthIndex = sessionDate.getMonth(); // 0-11
      const monthLabel = monthLabels[monthIndex];

      // Convert focus time to hours

      const focusMinutes = Math.max(
        0,
        Math.floor((session.endTime - session.startTime) / 60000)
      );

      const focusHours = parseFloat((focusMinutes / 60).toFixed(2));

      focusMap[monthLabel] += focusHours;

      // console.log("Month:", monthLabel, "Focus Minutes:", focusMinutes);
    }
  });

  // Step 3: Convert to array for line chart use
  return monthLabels.map((month) => ({
    month,
    focusTime: focusMap[month],
  }));
};

const getAllYearsFocusData = (sessions) => {
  const focusMap = {};

  sessions.forEach((session) => {
    if (!session.startTime || !session.endTime) return;

    const sessionDate = new Date(session.createdAt);
    const year = sessionDate.getFullYear();

    const focusMinutes = Math.max(
      0,
      Math.floor((session.endTime - session.startTime) / 60000)
    );

    if (!focusMap[year]) {
      focusMap[year] = 0;
    }

    focusMap[year] += focusMinutes;
  });

  // Keep focusTime as number
  return Object.entries(focusMap)
    .map(([year, focusMinutes]) => ({
      year: parseInt(year),
      focusTime: parseFloat((focusMinutes / 60).toFixed(1)), // in hours
    }))
    .sort((a, b) => a.year - b.year);
};

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

  // Covers x === y and x === 0 && y === 0
  return { sign: "+", value: 0 };
};

const getLabelLineChart = (activeFilter) => {
  if (activeFilter === "all") {
    return "year";
  } else if (activeFilter === "thisYear") {
    return "month";
  } else {
    return "day";
  }
};

export {
  getAllDistractionsByYear,
  getYearlyMonthlyDistractions,
  getTodaysDistraction,
  getYesterdaysDistraction,
  getCurrentWeekDistractions,
  getCurrentMonthDistractions,
  getPreviousMonthDistractions,
  filterSessionWithRange,
  getTodayFocusData,
  getYesterdayFocusData,
  getCurrentMonthFocusData,
  getPreviousMonthFocusData,
  getThisYearFocusData,
  getAllYearsFocusData,
  getFocusPercentageChange,
  getLabelLineChart,
};
