import { BrandType } from "types/productType";

export interface ProductFilterType {
  count?: number;
  id?: string;
  slug: string;
  title: string;
}

export interface ProductFilterResponseType {
  brand: BrandType;
  category: ProductFilterType;
  priceAverage: ProductFilterType;
  rating: number;
  subcategory: ProductFilterType;
}
