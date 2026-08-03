/**
 * Function to get a Url Parameter Value.
 * @param {string} url with the URL.
 * @param {string} parameter with the parameter.
 * @return {string | null}: The parameter value, or null when missing.
 */
export default function getUrlParameterValue(
  url: string,
  parameter: string
): string | null {
  if (!url) {
    return null;
  }

  const queryString = url.split("?")[1];
  if (!queryString) {
    return null;
  }

  const parameters = queryString.split("&");
  for (let i = 0; i < parameters.length; i++) {
    const parameterValue = parameters[i].split("=");
    if (parameterValue[0] === parameter) {
      return parameterValue[1] ?? null;
    }
  }
  return null;
}
