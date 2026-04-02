/**
 * Function that format a date to 'en-GB' format.
 * @param {string} date in raw format.
 * @return {string}: With date in 'en-GB' format.
 */
export default function formatDate(date: string) {
  const d = new Date(date);
  const localeString = d.toLocaleString("en-GB");
  const formattedDate = localeString.replace(", ", " - ");
  return formattedDate;
}
