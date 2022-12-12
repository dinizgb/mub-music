/**
 * Query to get All Product Categories.
 * @return {string}: With the query.
 */
export default function getAllProductCategories() {
  const getAllProductCategoriesQuery = `
    query getAllProductCategories {
      productCategories {
        nodes {
          id
          slug
          title
        }
      }
    }`;
  return getAllProductCategoriesQuery;
}
