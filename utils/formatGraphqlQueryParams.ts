/**
 * Function to format an JSON Object for use on Graphql Query Params.
 * @param {object} object in raw format.
 * @return {string}: with formatted object.
 */
export default function formatGraphqlQueryParams(object: object) {
  const jsonString = JSON.stringify(object);
  const firstFormatString = jsonString
    .replace(/{"/, "")
    .replace(/":/g, ": ")
    .replace(/,"/g, ", ")
    .replace(/: {"/g, ": {");

  const lastCurlyBracket = firstFormatString.lastIndexOf("}");
  const replacement = "";
  const formattedObj =
    firstFormatString.substring(0, lastCurlyBracket) +
    replacement +
    firstFormatString.substring(lastCurlyBracket + 1);

  return formattedObj;
}
