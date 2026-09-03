import Image from "next/image";
import { H3, H4, Span } from "components/Texts/Typographies";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "utils/formatDate";
import Anchor from "components/Tags/Anchor";
import { cn } from "@/lib/utils";
import { i18n, t } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

type BigHorizontalCardProps = {
  cardImage: string;
  cardSection: string;
  cardCategory: string;
  cardCategorySlug: string;
  cardTitle: string;
  cardSlug: string;
  cardExcerpt: string;
  date: string;
  className?: string;
};

/**
 * Big horizontal news card.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the card.
 */
export default function BigHorizontalCard(props: BigHorizontalCardProps) {
  const url = `/${props.cardSection}/${props.cardCategorySlug}/${props.cardSlug}/`;

  return (
    <Anchor
      href={url}
      event={AnalyticsEvents.NEWS_CARD_CLICKED}
      properties={{
        title: props.cardTitle,
        url,
        category: props.cardCategory,
      }}
    >
      <div
        className={cn(
          "bg-secondary hover:bg-secondary-hover relative w-full rounded-lg",
          props.className
        )}
      >
        <div
          className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6
            md:gap-8"
        >
          <div
            className="mt-6.25 max-sm:mx-auto max-sm:mt-2.5 max-sm:w-[90%]
              max-sm:[&_h3]:mt-1.5 max-sm:[&_h3]:ml-0 max-sm:[&_h4]:ml-0
              max-sm:[&_span]:ml-0"
          >
            <Span
              className="text-text-2 ml-10"
              fontWeight={500}
              fontSize={15}
              lineHeight={24}
              xsFontSize={15}
              xsLineHeight={24}
            >
              {props.cardCategory}
            </Span>
            <H3
              className="text-text-4 mt-1.25 ml-10"
              fontWeight={400}
              fontSize={21}
              lineHeight={36}
              xsFontSize={21}
              xsLineHeight={36}
            >
              {props.cardTitle}
            </H3>
            <H4
              className="text-text-2 mt-2.5 ml-10"
              fontWeight={400}
              fontSize={16}
              lineHeight={30}
              xsFontSize={16}
              xsLineHeight={30}
              dangerouslySetInnerHTML={{
                __html: props.cardExcerpt,
              }}
            />
            <div
              className="mt-5 mb-7.5 ml-10 flex w-full max-sm:mt-5 max-sm:ml-0
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
                fontWeight={400}
                fontSize={15}
                lineHeight={24}
                xsFontSize={15}
                xsLineHeight={24}
              >
                {t(i18n.news.authorByline, { date: formatDate(props.date) })}
              </Span>
            </div>
          </div>
          <div
            className="bg-secondary relative my-10 h-70 w-[90%] max-sm:mx-auto
              max-sm:mt-0 max-sm:mb-6.25 max-sm:w-[90%] [&_img]:rounded-lg"
          >
            <Image
              src={props.cardImage}
              alt={props.cardTitle}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </Anchor>
  );
}
