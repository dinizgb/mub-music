/**
 * Query to get All News Categories.
 * @return {string}: With the query.
 */
export default function getAllNewsCategories() {
  const getAllNewsCategoriesQuery = `
    query getAllNewsCategories {
      categories {
        nodes {
          id
          name
          slug
        }
      }
    }`;
  return getAllNewsCategoriesQuery;
}
