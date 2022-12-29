/**
 * Function to format pagination Offset value.
 * @param {string} page with page number as a string.
 * @return {number}: with the pagination Offset value.
 */
export default function paginationOffsetFormatter(page: string) {
  const formattedNumberString = `${page}0`;
  return parseInt(formattedNumberString);
}
