const getDuration = (endTime, startTime) => {
  let time;
  const durationMs = endTime - startTime;
  const hrs = Math.floor(durationMs / (60 * 60 * 1000));
  const mins = Math.floor((durationMs / (60 * 1000)) % 60);

  if (hrs <= 1 && mins <= 1) {
    time = `${hrs} hr ${mins} min`;
  } else if (hrs <= 1 && mins > 1) {
    time = `${hrs} hr ${mins} mins`;
  } else if (hrs > 1 && mins <= 1) {
    time = `${hrs} hrs ${mins} min`;
  }

  return { duration: durationMs, flooredtime: time };
};

export default getDuration;
