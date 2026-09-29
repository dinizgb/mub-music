/**
 * Function that format a date to 'en-US' format.
 * @param {string} date in raw format.
 * @return {string}: With date in 'en-US' format.
 */
export default function formatDate(date: string) {
  const d = new Date(date);
  const localeString = d.toLocaleString("en-US");
  const formattedDate = localeString.replace(", ", " - ");
  return formattedDate;
}
