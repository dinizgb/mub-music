/**
 * Function to extract LD+JSON from a HTML in a string form.
 * @param {string} htmlString with the HTML string.
 * @return {Array}: With the Product  LD+JSON content.
 */
export default function getProductLdJson(htmlString: string) {
  const scriptContent = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match: any[];
  while ((match = regex.exec(htmlString)) !== null) {
    scriptContent.push(JSON.parse(match[1].trim()));
  }
  return scriptContent.filter((obj) => obj["@type"] === "Product");
}
