"use client";

/* eslint-disable new-cap */
import { usePathname, useSearchParams } from "next/navigation";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, H3, P } from "components/Texts/Typographies";
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
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductFilterType } from "types/productFilterType";

type LayoutProductsListProps = {
  productData: any;
  productCategoryData: string;
  productsCategories: ProductsCategoriesType[];
  productSubCategories: Array<ProductFilterType>;
  productSubCategoryData: string | null;
  productBrandsData: Array<ProductFilterType>;
  productPriceAverageData: Array<ProductFilterType>;
  seoData: SEOTagsConstructorTypes;
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
  const hasBrand = searchParams.get("brand");

  // BRAND FILTER
  const brandHandler = (brand: string): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", brand);
    params.delete("page");
    return `${pathname}?${params.toString()}`;
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
              <div className="md:col-span-3">
                <div className="mt-11.25">
                  <H3
                    className="mb-8.75 text-text-4"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    Filters
                  </H3>
                </div>
                <div>
                  {props.productCategoryData && props.productData.length ? (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="subcategories">
                        <AccordionTrigger>Subcategories</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="subcategory-group-label"
                            name="subcategory-group"
                            defaultValue={
                              props.productSubCategoryData
                                ? props.productSubCategoryData
                                : ""
                            }
                            onValueChange={(slug) => {
                              window.location.href = `/products/${props.productCategoryData}/${slug}`;
                            }}
                          >
                            {props.productSubCategories.map(
                              ({ count, title, slug }) => {
                                const id = `subcategory-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2"
                                  >
                                    <RadioGroupItem value={slug} id={id} />
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
                        <AccordionTrigger>Brands</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="brand-group-label"
                            defaultValue={
                              props.productBrandsData.length == 1
                                ? props.productBrandsData[0].slug
                                : hasBrand || undefined
                            }
                            name="brand-group"
                            onValueChange={(slug) => {
                              window.location.href = brandHandler(slug);
                            }}
                          >
                            {props.productBrandsData.map(
                              ({ count, title, slug }) => {
                                const id = `brand-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2"
                                  >
                                    <RadioGroupItem value={slug} id={id} />
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
                        <AccordionTrigger>Price Average</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup
                            aria-labelledby="price-average-group-label"
                            defaultValue={
                              props.productPriceAverageData.length == 1
                                ? props.productPriceAverageData[0].slug
                                : ""
                            }
                            name="price-average-group"
                          >
                            {props.productPriceAverageData.map(
                              ({ count, title, slug }) => {
                                const id = `price-average-${slug}`;
                                return (
                                  <div
                                    key={slug}
                                    className="flex items-center gap-2"
                                  >
                                    <RadioGroupItem value={slug} id={id} />
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
              <div className="md:col-span-9">
                <div
                  className="grid w-full grid-cols-1 gap-x-2 sm:grid-cols-12
                    sm:gap-x-6 md:gap-x-10"
                >
                  <div className="mt-10 sm:col-span-6 md:col-span-8">
                    <H2
                      className="text-text-4"
                      fontWeight={600}
                      fontSize={26}
                      lineHeight={30}
                      xsFontSize={26}
                      xsLineHeight={30}
                      
                    >
                      {props.seoData.pageTitle}
                    </H2>
                    <P
                      className="mt-1.25 mb-2.5 text-subtitle"
                      fontWeight={400}
                      fontSize={16}
                      lineHeight={40}
                      xsFontSize={16}
                      xsLineHeight={36}
                    >
                      {props.seoData.pageExcerpt}
                    </P>
                  </div>
                  <div className="sm:col-span-6 md:col-span-4">
                    <div
                      className="mt-18.75 text-right max-sm:mt-0 max-sm:mb-5
                        max-sm:text-left"
                    >
                      <P
                        className="mb-3.75 text-subtitle"
                        fontWeight={600}
                        fontSize={15}
                        lineHeight={36}
                        xsFontSize={16}
                        xsLineHeight={36}
                      >
                        {`(${props.totalCount} items found)`}
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
