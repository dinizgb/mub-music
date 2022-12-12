/**
 * Function to separate a Decimal number (0.0).
 * @param {number} number in raw format.
 * @param {number} position 0 for the first number, 1 for the second.
 * @return {number}: With the selected Number.
 */
export default function separateDecimalNumber(
  number: number,
  position: number
) {
  const decimalStr = number.toString().split(".")[position];
  return Number(decimalStr);
}
