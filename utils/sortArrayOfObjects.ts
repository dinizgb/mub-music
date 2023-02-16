/**
 * Function that sort alphabetically objects from array.
 * @param {Array} array with the objects.
 * @param {string} property with the property to be filter.
 * @param {string} toDesc 'true' for Descendent 'false' for ascending.
 * @return {Array}: With the sorted array.
 */
export default function sortArrayOfObjects(
  array: Array<any>,
  property: string,
  toDesc: boolean
) {
  array.sort(function (a, b) {
    const direction1: number = toDesc ? -1 : 1;
    const direction2: number = toDesc ? 1 : -1;
    const nameA: string = a[property].toUpperCase();
    const nameB: string = b[property].toUpperCase();
    if (nameA < nameB) {
      return direction1;
    }
    if (nameA > nameB) {
      return direction2;
    }
    return 0;
  });
  return array;
}
