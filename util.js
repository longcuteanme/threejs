export const randomRange = (number1, number2, round = true) => {
  const minNumber = Math.min(number1, number2);
  const differentNumber = Math.abs(number1 - number2);
  if (round) {
    return minNumber + Math.round(Math.random() * differentNumber);
  }
  return minNumber + Math.random() * differentNumber;
};

export const randomPositive = () => {
  return Math.random() >= 0.5 ? 1 : -1;
};

export function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}
