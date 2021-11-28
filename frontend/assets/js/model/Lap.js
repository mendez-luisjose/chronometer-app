const LapObjectConstructor = (number, label, min, sec, miliSec) => {
  const lap = {
      "number": number,
      "label": label,
      "time": `${min} : ${sec} : ${miliSec}`
  }

  return lap
}

export default LapObjectConstructor;
