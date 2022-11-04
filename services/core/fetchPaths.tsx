/**
 * Function that returns a list of paths to be statically generated.
 * @param {Array} query with the endpoint to be fetched.
 * @param {number} level With the type of paths generated, '1' for Categories routes and '2' for Single routes.
 * @return {array}: returns a array of paths to be statically generated and the fallback strategy.
 */
export async function fetchPaths(query: Array<any>, level: number) {
  const paths = query.map((item) => ({
    params:
      level == 1
        ? {
            category: item.slug,
          }
        : {
            category: item.categories.nodes[0].slug,
            slug: item.slug,
          },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
