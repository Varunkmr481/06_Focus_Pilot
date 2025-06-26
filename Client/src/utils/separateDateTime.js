function separateDateTime(isoDate) {
  // Parse the ISO date string
  const dateObj = new Date(isoDate);

  const date = dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const dateWithSlashes = date;
  const dateWithDashes = dateWithSlashes.replaceAll("/", "-");

  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  // Return object with date and time
  return { date: dateWithDashes, time };
}

export default separateDateTime;
