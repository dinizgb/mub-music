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
  productGallery: ProductGalleryType;
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

export interface ProductGalleryType {
  id: string;
  productGalleryInfo: ProductGalleryInfoType;
}

export interface ProductGalleryInfoType {
  img1: ImgType;
  img2: ImgType;
  img3: ImgType;
  img4: ImgType;
  img5: ImgType;
  img6: ImgType;
  img7: ImgType;
  img8: ImgType;
  img9: ImgType;
  img10: ImgType;
  img11: ImgType;
  img12: ImgType;
  img13: ImgType;
  img14: ImgType;
  img15: ImgType;
  img16: ImgType;
  img17: ImgType;
}

export interface ImgType {
  colorInfo: {
    code: string;
  };
  image: {
    sourceUrl: string;
  };
}
