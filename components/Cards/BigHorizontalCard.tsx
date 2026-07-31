import Image from "next/image";
import { H3, H4, Span } from "components/Texts/Typographies";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "utils/formatDate";
import { cn } from "@/lib/utils";

type BigHorizontalCardProps = {
  key: string;
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
  return (
    <a
      href={`/${props.cardSection}/${props.cardCategorySlug}/${props.cardSlug}/`}
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
              className="ml-10 text-text-2"
              fontWeight={500}
              fontSize={15}
              lineHeight={24}
              xsFontSize={15}
              xsLineHeight={24}
            >
              {props.cardCategory}
            </Span>
            <H3
              className="mt-1.25 ml-10 text-text-4"
              fontWeight={400}
              fontSize={21}
              lineHeight={36}
              xsFontSize={21}
              xsLineHeight={36}
            >
              {props.cardTitle}
            </H3>
            <H4
              className="mt-2.5 ml-10 text-text-2"
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
              className="mt-5 mb-7.5 ml-10 flex w-full max-sm:mt-5
                max-sm:ml-0 max-sm:w-[90%]"
            >
              <Avatar>
                <AvatarImage alt="Autor Avatar" src="/images/mub-avatar.jpg" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <Span
                className="mt-1.25 ml-2.5 text-text-4 hover:text-text-3"
                fontWeight={400}
                fontSize={15}
                lineHeight={24}
                xsFontSize={15}
                xsLineHeight={24}
              >
                Mub Music Staff at {formatDate(props.date)}
              </Span>
            </div>
          </div>
          <div
            className="bg-secondary relative my-10 h-70 w-[90%]
              max-sm:mx-auto max-sm:mt-0 max-sm:mb-6.25 max-sm:w-[90%]
              [&_img]:rounded-lg"
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
    </a>
  );
}
