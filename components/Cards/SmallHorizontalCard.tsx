import Image from "next/image";
import { H3, H4 } from "components/Texts/Typographies";
import formatDate from "utils/formatDate";
import { cn } from "@/lib/utils";

type SmallHorizontalCardProps = {
  cardTitle: string;
  cardDate: string;
  cardImage: string;
  cardLink: string;
  className?: string;
};

/**
 * Small Horizontal Card Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Small Horizontal Card Component.
 */
export default function SmallHorizontalCard(props: SmallHorizontalCardProps) {
  return (
    <a href={props.cardLink}>
      <div className={cn("bg-secondary relative w-full", props.className)}>
        <div
          className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2
            md:grid-cols-12 md:gap-2"
        >
          <div
            className="bg-background-contrast relative mt-6.25 h-25
              w-full sm:col-span-1 md:col-span-5 [&_img]:rounded-lg"
          >
            <Image
              src={props.cardImage}
              alt={props.cardTitle}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="sm:col-span-1 md:col-span-7">
            <H3
              className="mt-5 text-text-4"
              fontWeight={600}
              fontSize={16}
              lineHeight={24}
              xsFontSize={16}
              xsLineHeight={24}
            >
              {props.cardTitle}
            </H3>
            <H4
              className="mt-1.25 text-text-2"
              fontWeight={400}
              fontSize={13}
              lineHeight={24}
              xsFontSize={13}
              xsLineHeight={24}
            >
              {formatDate(props.cardDate)}
            </H4>
          </div>
        </div>
      </div>
    </a>
  );
}
