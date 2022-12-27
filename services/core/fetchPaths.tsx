/**
 * Function that returns a list of paths to be statically generated.
 * @param {Array} pathsToRender with the paths to render.
 * @return {array}: returns a array of paths to be statically generated and the fallback strategy.
 */
export async function fetchPaths(pathsToRender: Array<any>) {
  const paths = pathsToRender;
  return {
    paths,
    fallback: "blocking",
  };
}
