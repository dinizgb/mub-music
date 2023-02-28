import { ThumbnailType } from "types/productsCategoriesType";
import { ProductFilterType } from "types/productFilterType";

export interface ProductType {
  id: string;
  slug: string;
  title: string;
  product_info: ProductInfoType;
}

export interface ProductInfoType {
  brand: BrandType;
  category: ProductFilterType;
  colors: Array<string>;
  description: string;
  featureVideo: string;
  price: number;
  priceAverage: ProductFilterType;
  rating: number;
  slug: string;
  specifications: string;
  subcategory: ProductFilterType;
  thumbnail: ThumbnailType;
  title: string;
}

export interface BrandType {
  brand_info: BrandInfoType;
  id: string;
  slug: string;
  title: string;
}

export interface BrandInfoType {
  backgroundColor: string;
  id: string;
  slug: string;
  thumbnail: ThumbnailType;
  title: string;
}
