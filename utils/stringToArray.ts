/**
 * Function that converts a string or number to an array of the respective type.
 * @param {string} string with strings or numbers separate by some separator.
 * @param {string} separator with the separator that separates the string param.
 * @param {string} convertTo indicates the format of the values of the array. Empty converts to string, 'number' converts to number.
 * @return {array}: If 'convertTo' is empty returns an Array of strings, if 'convertTo' is 'number' returns an Array of numbers.
 */
export default function stringToArray(
  string: string,
  separator: string,
  convertTo?: string
) {
  return convertTo == "number"
    ? string.split(separator).map(Number)
    : string.split(separator);
}
