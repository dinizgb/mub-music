import removeDuplicatesObjectsFromArray from "utils/removeDuplicatesObjectsFromArray";
import productInfoObjValueCount from "utils/productInfoObjValueCount";
import sortArrayOfObjects from "utils/sortArrayOfObjects";

/**
 * Function to construct the options of the product filters.
 * @param {Array} productArray with the array to the constructor.
 * @param {string} property with the object property.
 * @param {string} value with the property value.
 * @return {Array}: With the array of objects to the filters.
 */
export default function productFilterConstructor(
  productArray: Array<any>,
  property: string
) {
  let filterArray: Array<any> = [];
  productArray.map(
    (p) =>
      (filterArray = [
        ...filterArray,
        {
          count: productInfoObjValueCount(
            productArray,
            property,
            p.product_info[property].slug
          ),
          title: p.product_info[property].title,
          slug: p.product_info[property].slug,
        },
      ])
  );
  const removeDuplicates = removeDuplicatesObjectsFromArray(filterArray);
  const sortedArray = sortArrayOfObjects(removeDuplicates, "slug", true);
  return removeDuplicatesObjectsFromArray(sortedArray);
}
