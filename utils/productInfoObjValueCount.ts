/**
 * Function that counts the number of times a value appears on a object.
 * @param {Array<Object>} array with the objects.
 * @param {string} property with the object property.
 * @param {string} value with the property value.
 * @return {Number}: With the count number.
 */
export default function productInfoObjValueCount(
  array: Array<any>,
  property: string,
  value: string
) {
  return array.reduce(
    (acc, obj) => (obj.product_info[property].slug === value ? acc + 1 : acc),
    0
  );
}
