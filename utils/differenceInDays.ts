/**
 * Function that calculates difference in days between two dates.
 * @param {string} date in ISO (yyyy-MM-dd'T'HH:mm:ss) format.
 * @return {number}: With the difference in Days.
 */
export default function differenceInDays(date: string): number {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference * -1;
}
