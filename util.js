export const randomRange = (number1, number2) => {
  const minNumber = Math.min(number1, number2);
  const differentNumber = Math.abs(number1 - number2);
  return minNumber + Math.round(Math.random() * differentNumber);
};
