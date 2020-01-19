const floatValveCurve = [
  [0, 100000002004087000000.0],
  [2.0, 10000000000.0],
  [4.0, 100000.0],
  [10.0, 5012.0],
  [20.0, 1202.0],
  [40.0, 250.0],
  [60.0, 50.0],
  [80.0, 10.0],
  [100.0, 2.0]
];

function getValveKValue(
  controlDepth: number,
  range: number,
  currentLevel: number,
  multiplier: number
): number {
  const valveOpenPercent = getValveOpenPercent(
    controlDepth,
    range,
    currentLevel
  );

  const k = floatValveCurve.reduce((prev, curr) => {
    if (prev.length === 1) {
      return prev;
    }
    if (valveOpenPercent === curr[0]) {
      return [curr[1] * multiplier];
    }
    if (valveOpenPercent > curr[0]) {
      return curr;
    }

    const f = (valveOpenPercent - prev[0]) / (curr[0] - prev[0]);

    const calcK =
      Math.pow(curr[1] * multiplier, f) * Math.pow(prev[1] * multiplier, 1 - f);
    return [calcK];
  }, floatValveCurve[0]);

  return k[0];
}

function getValveOpenPercent(
  controlDepth: number,
  range: number,
  currentLevel: number
) {
  if (currentLevel < controlDepth - range) {
    return 100;
  }
  if (currentLevel > controlDepth) {
    return 0;
  }

  return ((controlDepth - currentLevel) / range) * 100;
}

export default getValveKValue;
