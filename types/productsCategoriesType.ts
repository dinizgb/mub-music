export interface ProductsCategoriesType {
  id: string;
  product_category_info: ProductCategoryInfoType;
  slug: string;
  title: string;
}

export interface ProductCategoryInfoType {
  thumbnail: ThumbnailType;
}

export interface ThumbnailType {
  altText: string;
  sourceUrl: string;
}
