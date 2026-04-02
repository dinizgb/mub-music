import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Products.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getProductBy(props: QueryParameters) {
  const query = `
    query getProductBy {
      productBy(${formatGraphqlQueryParams(props)}) {
        id
        slug
        title(format: RENDERED)
        modified
        product_info {
          description
          featureVideo
          specifications
          rating
          price
          brand {
            ... on Brand {
              id
              title(format: RENDERED)
              slug
              brand_info {
                backgroundColor
                thumbnail {
                  altText
                  sourceUrl(size: MEDIUM)
                }
              }
            }
          }
          category {
            ... on ProductCategory {
              id
              title(format: RENDERED)
              slug
            }
          }
          thumbnail {
            sourceUrl(size: LARGE)
            altText
            title
          }
          subcategory {
            ... on ProdSubCategory {
              id
              title(format: RENDERED)
              slug
            }
          }
          priceAverage {
            ... on PriceAverage {
              id
              title(format: RENDERED)
              slug
            }
          }
          productGallery {
            ... on ProductGallery {
              id
              productGalleryInfo {
                img1 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img2 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img3 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img4 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img5 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img6 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img7 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img8 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img9 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img10 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img11 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img12 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img13 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img14 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img15 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
                img16 {
                  color {
                    ... on Color {
                      id
                      colorInfo {
                        code
                      }
                    }
                  }
                  image {
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
          }
          reviews {
            ... on Review {
              id
              reviewInfo {
                reviewer1 {
                  count
                  rate
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                reviewer2 {
                  count
                  rate
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                reviewer3 {
                  count
                  rate
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                reviewer4 {
                  count
                  rate
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                reviewer5 {
                  count
                  rate
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
              }
            }
          }
          offers {
            ... on Offer {
              id
              offersInfo {
                offer1 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                offer2 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                offer3 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                offer4 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                offer5 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
                offer6 {
                  price
                  store {
                    ... on Store {
                      id
                      title(format: RENDERED)
                      storeInfo {
                        logo {
                          sourceUrl(size: THUMBNAIL)
                        }
                      }
                    }
                  }
                  url
                }
              }
            }
          }
        }
      }
    }`;
  return query;
}
