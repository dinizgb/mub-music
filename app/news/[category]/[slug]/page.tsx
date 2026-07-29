import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutArticlePage from "layouts/LayoutArticlePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getNewsBy from "services/graphql/queries/getNewsBy";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import htmlTagCleaner from "utils/htmlTagCleaner";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = true;

/**
 * Builds static params for news articles.
 * @return {Promise<Array<{category: string, slug: string}>>} Paths.
 */
export async function generateStaticParams() {
  try {
    const getAllNewsParams: QueryParameters = { first: 20 };
    const getAllNewsReq = await fetchQuery(getAllNews(getAllNewsParams));
    if (getAllNewsReq.notFound) return [];

    return getAllNewsReq.props.data.posts.nodes.map(
      (item: {
        categories: { nodes: Array<{ slug: string }> };
        slug: string;
      }) => ({
        category: item.categories.nodes[0].slug,
        slug: item.slug,
      })
    );
  } catch {
    return [];
  }
}

/**
 * Builds metadata for a news article page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const getNewsReq = await fetchQuery(getNewsBy({ slug }));
  if (getNewsReq.notFound || !getNewsReq.props.data.postBy) {
    return { title: slug };
  }
  const newsData = getNewsReq.props.data.postBy;
  return {
    title: newsData.title,
    description: htmlTagCleaner(newsData.excerpt),
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/news/${category}/${slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${newsData.title} | Mub Music`,
      description: htmlTagCleaner(newsData.excerpt),
      images: [newsData.featuredImage?.node?.sourceUrl].filter(Boolean),
      publishedTime: newsData.date,
      modifiedTime: newsData.modified,
    },
  };
}

/**
 * News article page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} Article page.
 */
export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const getNewsReq = await fetchQuery(getNewsBy({ slug }));
  if (getNewsReq.notFound || !getNewsReq.props.data.postBy) notFound();

  const newsData = getNewsReq.props.data.postBy;

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productsCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return (
    <LayoutArticlePage
      articleTitle={newsData.title}
      articleExcerpt={htmlTagCleaner(newsData.excerpt)}
      articleSectionName={"News"}
      articleSectionSlug={"news"}
      articleCategoryName={newsData.categories.nodes[0].name}
      articleCategorySlug={newsData.categories.nodes[0].slug}
      articleSlug={newsData.slug}
      articleDate={newsData.date}
      articleModifiedDate={newsData.modified}
      articleAuthor={newsData.author.name}
      articleFeaturedImage={newsData.featuredImage.node.sourceUrl}
      articleContent={newsData.content}
      productsCategories={productsCategories}
    />
  );
}
