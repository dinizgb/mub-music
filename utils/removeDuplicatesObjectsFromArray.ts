/**
 * Function that removes all duplicates objects from array.
 * @param {Array} array with the objects.
 * @return {Array}: Without any duplicates objects.
 */
export default function removeDuplicatesObjectsFromArray(array: Array<any>) {
  const removingDuplicates = array.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.slug === thing.slug)
  );
  return removingDuplicates;
}
