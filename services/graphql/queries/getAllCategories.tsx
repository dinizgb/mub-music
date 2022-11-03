/**
 * Query to get All Categories.
 * @return {string}: With the query.
 */
export default function getAllCategories() {
  const getAllCategoriesQuery = `
    query getAllCategories {
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }`;
  return getAllCategoriesQuery;
}
