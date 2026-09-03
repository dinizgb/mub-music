/* eslint-disable camelcase */
import { Loader2 } from "lucide-react";
import { H3 } from "components/Texts/Typographies";
import Anchor from "components/Tags/Anchor";
import { ProductType } from "types/productType";
import { AnalyticsEvents } from "lib/analytics/events";

type SearchAutoFillResultListProps = {
  data: ProductType[];
};

/**
 * Search auto fill result list Component.
 * @param {ProductType} props to the component.
 * @return {TSX.Element}: The TSX code for the Search auto fill result list Component.
 */
export default function SearchAutoFillResultList(
  props: SearchAutoFillResultListProps
) {
  return (
    <ul className="m-0 flex w-full flex-col p-0">
      {props.data ? (
        props.data.map(({ title, slug, product_info }) => {
          const url = `/products/${product_info.category.slug}/${product_info.subcategory.slug}/${slug}`;
          return (
            <li key={slug} className="my-1.25 w-full">
              <Anchor
                href={url}
                event={AnalyticsEvents.SEARCH_RESULT_CLICKED}
                properties={{ title, url, slug }}
                className="border-light-line-bottom hover:bg-light-line-bottom
                  relative flex flex-row items-center rounded-none border-b
                  px-3.75 py-3.25 hover:rounded-lg [&_img]:mr-3.75
                  [&_img]:w-[8%] [&_img]:rounded-lg"
              >
                <img src={product_info.thumbnail.sourceUrl} alt={title} />
                <H3
                  className="text-text-1"
                  fontWeight={600}
                  fontSize={18}
                  lineHeight={24}
                  xsFontSize={18}
                  xsLineHeight={24}
                >
                  {title}
                </H3>
              </Anchor>
            </li>
          );
        })
      ) : (
        <li className="my-1.25 w-full">
          <Loader2 className="size-6.25 animate-spin" />
        </li>
      )}
    </ul>
  );
}
