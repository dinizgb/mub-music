"use client";

import { usePathname, useSearchParams } from "next/navigation";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H1, H2, P } from "components/Texts/Typographies";
import PaginationWidget from "components/Widgets/PaginationWidget";
import ProductCardList from "components/Lists/ProductCardList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { PageSeoCopy } from "types/pageSeoCopy";
import { ProductFilterType } from "types/productFilterType";
import { i18n, t } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";
import {
  resolveProductListFilterHref,
  resolveSubcategoryFilterHref,
} from "utils/productListFilters";

type LayoutProductsListProps = {
  productData: any;
  productCategoryData: string;
  productsCategories: ProductsCategoriesType[];
  productSubCategories: Array<ProductFilterType>;
  productSubCategoryData: string | null;
  productBrandsData: Array<ProductFilterType>;
  productPriceAverageData: Array<ProductFilterType>;
  seoData: PageSeoCopy;
  totalCount: number;
  currentPage: number;
};

/**
 * Layout Products List Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Layout Products List Component.
 */
export default function LayoutProductsList(props: LayoutProductsListProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString();
  const hasBrand = searchParams.get("brand");
  const hasPriceAverage = searchParams.get("priceAverage");

  const goTo = (href: string) => {
    window.location.href = href;
  };

  const brandHref = (brand: string): string =>
    resolveProductListFilterHref({
      pathname,
      currentSearch,
      key: "brand",
      value: brand,
      selectedValue: hasBrand,
    });

  const priceAverageHref = (priceAverage: string): string =>
    resolveProductListFilterHref({
      pathname,
      currentSearch,
      key: "priceAverage",
      value: priceAverage,
      selectedValue: hasPriceAverage,
    });

  const subcategoryHref = (slug: string): string =>
    resolveSubcategoryFilterHref(
      props.productCategoryData,
      slug,
      props.productSubCategoryData,
      currentSearch
    );

  const clearSelectedFilter = (
    event: { preventDefault: () => void },
    selectedValue: string | null,
    slug: string,
    href: string
  ) => {
    if (selectedValue !== slug) {
      return;
    }
    event.preventDefault();
    goTo(href);
  };

  return (
    <>
      <Header productsCategories={props.productsCategories} />
      <main>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <div className="w-full">
            <div
              className="grid w-full grid-cols-1 gap-x-2 sm:gap-x-6
                md:grid-cols-12 md:gap-x-10"
            >
              <div className="order-2 md:order-2 md:col-span-9">
                <div
                  className="grid w-full grid-cols-1 gap-x-2 sm:grid-cols-12
                    sm:gap-x-6 md:gap-x-10"
                >
                  <div className="mt-10 sm:col-span-6 md:col-span-8">
                    <H1
                      className="text-text-4"
                      fontWeight={600}
                      fontSize={26}
                      lineHeight={30}
                      xsFontSize={26}
                      xsLineHeight={30}
                    >
                      {props.seoData.pageTitle}
                    </H1>
                    <H2
                      className="text-subtitle mt-1.25 mb-2.5"
                      fontWeight={400}
                      fontSize={16}
                      lineHeight={40}
                      xsFontSize={16}
                      xsLineHeight={36}
                    >
                      {props.seoData.pageExcerpt}
                    </H2>
                  </div>
                  <div className="sm:col-span-6 md:col-span-4">
                    <div
                      className="mt-18.75 text-right max-sm:mt-0 max-sm:mb-5
                        max-sm:text-left"
                    >
                      <P
                        className="text-subtitle mb-3.75"
                        fontWeight={600}
                        fontSize={15}
                        lineHeight={36}
                        xsFontSize={16}
                        xsLineHeight={36}
                      >
                        {t(i18n.products.itemsFound, {
                          count: props.totalCount,
                        })}
                      </P>
                    </div>
                  </div>
                </div>
                <div className="mt-1.5">
                  <ProductCardList productList={props.productData} />
                </div>
                <div className="mt-7.5">
                  <PaginationWidget
                    totalItens={props.totalCount}
                    currentPage={props.currentPage}
                    range={20}
                  />
                </div>
              </div>
              <div className="order-1 md:order-1 md:col-span-3">
                <div className="mt-11.25">
                  <H2
                    className="text-text-4 mb-8.75"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    {i18n.products.filters}
                  </H2>
                </div>
                <div>
                  {props.productCategoryData && props.productData.length ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="subcategories">
                        <AccordionTrigger>
                          {i18n.products.subcategories}
                        </AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="subcategory-group-label"
                            name="subcategory-group"
                            defaultValue={
                              props.productSubCategoryData ?? undefined
                            }
                            onValueChange={(slug) => {
                              trackEvent(AnalyticsEvents.FILTER_APPLIED, {
                                filter_type: "subcategory",
                                value: slug,
                              });
                              goTo(subcategoryHref(slug));
                            }}
                          >
                            {props.productSubCategories.map(
                              ({ count, title, slug }) => {
                                const id = `subcategory-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2
                                      first:mt-[15px]"
                                    onClick={(event) =>
                                      clearSelectedFilter(
                                        event,
                                        props.productSubCategoryData,
                                        slug,
                                        subcategoryHref(slug)
                                      )
                                    }
                                  >
                                    <RadioGroupItem
                                      value={slug}
                                      id={id}
                                      onPointerDown={(event) =>
                                        clearSelectedFilter(
                                          event,
                                          props.productSubCategoryData,
                                          slug,
                                          subcategoryHref(slug)
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={id}
                                      className="text-text-4 cursor-pointer
                                        text-sm"
                                    >
                                      {`${title} (${count})`}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : null}
                  {props.productData.length ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="brands">
                        <AccordionTrigger>
                          {i18n.products.brands}
                        </AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="brand-group-label"
                            defaultValue={hasBrand || undefined}
                            name="brand-group"
                            onValueChange={(slug) => {
                              trackEvent(AnalyticsEvents.FILTER_APPLIED, {
                                filter_type: "brand",
                                value: slug,
                              });
                              goTo(brandHref(slug));
                            }}
                          >
                            {props.productBrandsData.map(
                              ({ count, title, slug }) => {
                                const id = `brand-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2
                                      first:mt-[15px]"
                                    onClick={(event) =>
                                      clearSelectedFilter(
                                        event,
                                        hasBrand,
                                        slug,
                                        brandHref(slug)
                                      )
                                    }
                                  >
                                    <RadioGroupItem
                                      value={slug}
                                      id={id}
                                      onPointerDown={(event) =>
                                        clearSelectedFilter(
                                          event,
                                          hasBrand,
                                          slug,
                                          brandHref(slug)
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={id}
                                      className="text-text-4 cursor-pointer
                                        text-sm"
                                    >
                                      {`${title} (${count})`}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : null}
                  {props.productCategoryData && props.productData.length ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="price-average">
                        <AccordionTrigger>
                          {i18n.products.priceAverage}
                        </AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="price-average-group-label"
                            defaultValue={hasPriceAverage || undefined}
                            name="price-average-group"
                            onValueChange={(slug) => {
                              trackEvent(AnalyticsEvents.FILTER_APPLIED, {
                                filter_type: "price_average",
                                value: slug,
                              });
                              goTo(priceAverageHref(slug));
                            }}
                          >
                            {props.productPriceAverageData.map(
                              ({ count, title, slug }) => {
                                const id = `price-average-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2
                                      first:mt-[15px]"
                                    onClick={(event) =>
                                      clearSelectedFilter(
                                        event,
                                        hasPriceAverage,
                                        slug,
                                        priceAverageHref(slug)
                                      )
                                    }
                                  >
                                    <RadioGroupItem
                                      value={slug}
                                      id={id}
                                      onPointerDown={(event) =>
                                        clearSelectedFilter(
                                          event,
                                          hasPriceAverage,
                                          slug,
                                          priceAverageHref(slug)
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={id}
                                      className="text-text-4 cursor-pointer
                                        text-sm"
                                    >
                                      {`${title} (${count})`}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
