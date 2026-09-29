export interface ProductFilterType {
  count?: number;
  id?: string;
  slug: string;
  title: string;
}

export interface ProductFilterInfoType {
  brand: ProductFilterType;
  category: ProductFilterType;
  priceAverage: ProductFilterType;
  rating: number;
  subcategory: ProductFilterType;
}

export interface ProductFilterResponseType {
  databaseId?: number;
  product_info: ProductFilterInfoType;
}
