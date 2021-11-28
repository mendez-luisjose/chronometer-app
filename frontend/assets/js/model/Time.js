const TimeObjectConstructor = (minutes, seconds, miliseconds) => {
  const time = {
      "minutes": minutes,
      "seconds": seconds,
      "miliseconds": miliseconds
  }

  return time
}

export default TimeObjectConstructor;