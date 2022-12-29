/**
 * Function that removes all HTML Tags from a string.
 * @param {string} text with string containing HTML tags.
 * @return {string}: Without any HTML Tags.
 */
export default function htmlTagCleaner(text: string) {
  return text.replace(new RegExp("(<([^>]+)>)", "g"), "");
}
