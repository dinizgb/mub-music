/**
 * Function to get a Url Parameter Value.
 * @param {string} url with the URL.
 * @param {string} parameter with the parameter.
 * @return {string}: Without the parameter value.
 */
export default function getUrlParameterValue(url: string, parameter: string) {
  const queryString = url.split("?")[1];
  const parameters = queryString.split("&");
  for (let i = 0; i < parameters.length; i++) {
    const parameterValue = parameters[i].split("=");
    if (parameterValue[0] === parameter) {
      return parameterValue[1];
    }
  }
  return null;
}
