import Image from "next/image";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H1, P, A, Span } from "components/Texts/Typographies";
import { ContentBody } from "components/Texts/ContentBody";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
// UTILS
import formatDate from "utils/formatDate";
import { i18n } from "@/i18n";

type LayoutArticlePageProps = {
  articleTitle: string;
  articleExcerpt: string;
  articleSectionName: string;
  articleSectionSlug: string;
  articleCategoryName: string;
  articleCategorySlug: string;
  articleSlug: string;
  articleDate: string;
  articleModifiedDate: string;
  articleAuthor: string;
  articleFeaturedImage: string;
  articleContent: string;
  productsCategories: ProductsCategoriesType[];
};

/**
 * Article Layout Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Article Layout Component.
 */
export default function LayoutArticlePage(props: LayoutArticlePageProps) {
  return (
    <>
      <Header productsCategories={props.productsCategories} />
      <main>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <div className="w-full">
            <div
              className="mt-12.5 grid w-full grid-cols-1 gap-x-2 sm:gap-x-4
                md:grid-cols-12 md:gap-x-6"
            >
              <div className="md:col-span-6">
                <Breadcrumb>
                  <BreadcrumbList
                    className="text-text-2
                      [&>li[role=presentation]]:text-text-2"
                  >
                    <BreadcrumbItem>
                      <A
                        className="text-text-2 hover:text-text-4"
                        fontWeight={500}
                        fontSize={15}
                        lineHeight={24}
                        xsFontSize={15}
                        xsLineHeight={24}
                        href="/"
                      >
                        {i18n.article.breadcrumbHome}
                      </A>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>›</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <A
                        className="text-text-2 hover:text-text-4"
                        fontWeight={500}
                        fontSize={15}
                        lineHeight={24}
                        xsFontSize={15}
                        xsLineHeight={24}
                        href="/news/"
                      >
                        {i18n.article.breadcrumbNews}
                      </A>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>›</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <A
                        className="text-text-2 hover:text-text-4"
                        fontWeight={500}
                        fontSize={15}
                        lineHeight={24}
                        xsFontSize={15}
                        xsLineHeight={24}
                        href={`/news/${props.articleCategorySlug}/`}
                      >
                        {props.articleCategoryName}
                      </A>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <H1
                  className="text-text-4 font-heading"
                  fontWeight={400}
                  fontSize={60}
                  lineHeight={85}
                  xsFontSize={40}
                  xsLineHeight={60}
                >
                  {props.articleTitle}
                </H1>
                <P
                  className="text-text-4 my-7.5"
                  fontWeight={300}
                  fontSize={24}
                  lineHeight={40}
                  xsFontSize={21}
                  xsLineHeight={36}
                >
                  {props.articleExcerpt}
                </P>
                <div
                  className="mt-5 mb-7.5 flex w-full max-sm:mt-5 max-sm:ml-0
                    max-sm:w-[90%]"
                >
                  <Avatar>
                    <AvatarImage
                      alt={i18n.news.authorAvatarAlt}
                      src="/images/mub-avatar.jpg"
                    />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <Span
                    className="text-text-4 hover:text-text-3 mt-1.25 ml-2.5"
                    fontWeight={600}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                  >
                    {i18n.news.authorName}
                  </Span>
                  <Span
                    className="text-text-4 mt-1 ml-1.25"
                    fontWeight={400}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                  >
                    - {formatDate(props.articleDate)}
                  </Span>
                </div>
              </div>
              <div className="md:col-span-6">
                <div
                  className="bg-secondary relative h-full w-full rounded-lg
                    max-md:mx-auto max-md:mt-0 max-md:h-87.5 max-md:w-full
                    [&_img]:rounded-lg"
                >
                  <Image
                    src={props.articleFeaturedImage}
                    alt={props.articleTitle}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="grid w-full grid-cols-1 gap-x-2 sm:gap-x-6
                md:grid-cols-12 md:gap-x-10"
            >
              <div className="mx-auto md:col-span-9">
                <div className="mt-10.25">
                  <ContentBody
                    dangerouslySetInnerHTML={{
                      __html: props.articleContent,
                    }}
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
