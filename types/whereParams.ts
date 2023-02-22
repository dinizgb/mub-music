import { OffsetPaginationTypes } from "types/offsetPaginationTypes";

export interface whereParams {
  brandSlug?: string;
  categoryName?: string;
  catSlug?: string;
  parentCategory?: string;
  priceAverageSlug?: string;
  subCatSlug?: string;
  offsetPagination?: OffsetPaginationTypes;
}
