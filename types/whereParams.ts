import { OffsetPaginationTypes } from "types/offsetPaginationTypes";

export interface whereParams {
  and?: any[];
  brandSlug?: string;
  categoryName?: string;
  catSlug?: string;
  parentCategory?: string;
  priceAverageSlug?: string;
  subCatSlug?: string;
  offsetPagination?: OffsetPaginationTypes;
}
