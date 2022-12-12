/**
 * Query to get All Product Subcategories.
 * @return {string}: With the query.
 */
export default function getAllProductSubCategories() {
  const getAllProductSubCategoriesQuery = `
    query getAllProductSubCategories {
      prodSubCategories {
        nodes {
          id
          slug
          title
        }
      }
    }`;
  return getAllProductSubCategoriesQuery;
}
