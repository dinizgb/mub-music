import Image from "next/image";
import { H3, Span } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";
import Anchor from "components/Tags/Anchor";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

type ProductCardProps = {
  cardTitle: string;
  cardImage: string;
  cardBrandLogo: string;
  cardBrandLogoBgColor: string;
  cardLink: string;
  cardRating: number;
  cardPrice: number;
  className?: string;
};

/**
 * Product Card Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Product Card Component.
 */
export default function ProductCard(props: ProductCardProps) {
  return (
    <Anchor
      href={props.cardLink}
      event={AnalyticsEvents.PRODUCT_CARD_CLICKED}
      properties={{
        title: props.cardTitle,
        url: props.cardLink,
        price: props.cardPrice,
        rating: props.cardRating,
      }}
    >
      <div
        className={cn(
          `bg-secondary hover:bg-secondary-hover relative h-full w-full
          rounded-lg`,
          "[&_span]:text-[13px] [&_span_strong]:text-[18.5px]",
          props.className
        )}
      >
        <div className="w-full">
          <div className="bg-secondary relative h-50 w-full rounded-t-lg">
            <Image
              src={props.cardImage}
              alt={props.cardTitle}
              fill
              className="rounded-t-lg object-cover"
            />
            <div className="absolute top-2.5 left-2.5">
              <StarsWidget
                fontSize={12}
                number={props.cardRating}
                withBackground={true}
              />
            </div>
            <div
              className="absolute top-43.75 right-6.25 h-13.5 w-13.5
                overflow-hidden rounded-full"
              style={{ background: props.cardBrandLogoBgColor }}
            >
              <Image
                src={props.cardBrandLogo}
                alt={props.cardTitle}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="px-6.25">
            <H3
              className="text-text-4 mt-11.25"
              fontWeight={400}
              fontSize={16}
              lineHeight={24}
              xsFontSize={16}
              xsLineHeight={24}
            >
              {props.cardTitle}
            </H3>
            <Span
              className="text-primary hover:text-primary"
              fontWeight={400}
              fontSize={16}
              lineHeight={52}
              xsFontSize={16}
              xsLineHeight={52}
            >
              {i18n.products.from} <strong>${props.cardPrice}</strong>
            </Span>
          </div>
        </div>
      </div>
    </Anchor>
  );
}
