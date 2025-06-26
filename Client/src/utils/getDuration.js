const getDuration = (endTime, startTime) => {
  let time;
  const durationMs = endTime - startTime;
  const hrs = durationMs / (60 * 60 * 1000);
  const mins = durationMs / (60 * 1000);

  const flooredHr = Math.floor(hrs);
  const flooredMin = Math.floor(mins);

  if (flooredHr <= 1 && flooredMin <= 1) {
    time = `${flooredHr} hr ${flooredMin} min`;
  } else if (flooredHr <= 1 && flooredMin > 1) {
    time = `${flooredHr} hr ${flooredMin} mins`;
  } else if (flooredHr > 1 && flooredMin <= 1) {
    time = `${flooredHr} hrs ${flooredMin} min`;
  }

  return { duration: durationMs, flooredtime: time };
};

export default getDuration;
