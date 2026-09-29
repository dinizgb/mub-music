import { acfGroupItems } from "utils/acfGroupItems";

type GalleryImage = {
  original: string;
  thumbnail: string;
};

type GallerySlot = {
  image?: {
    sourceUrl?: string | null;
  } | null;
};

/**
 * Converts an ACF product gallery group into image-gallery items.
 * @param {object | null | undefined} group Gallery ACF group.
 * @return {GalleryImage[]} Images that have a source URL.
 */
export function buildProductGallery(group?: object | null): GalleryImage[] {
  return acfGroupItems(group).flatMap((value) => {
    const sourceUrl = (value as GallerySlot).image?.sourceUrl;
    if (!sourceUrl) {
      return [];
    }
    return [{ original: sourceUrl, thumbnail: sourceUrl }];
  });
}
