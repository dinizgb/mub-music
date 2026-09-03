import { H3 } from "components/Texts/Typographies";
import Anchor from "components/Tags/Anchor";
import { AnalyticsEvents } from "lib/analytics/events";

type BackgroundCardProps = {
  backgroundCardThumbnail: string;
  backgroundCardUrl: string;
  backgroundCardTitle: string;
};

/**
 * Background Card Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Background Card Component.
 */
export default function BackgroundCard(props: BackgroundCardProps) {
  return (
    <div
      className="flex min-h-50 w-full flex-row rounded-md bg-cover"
      style={{ backgroundImage: `url(${props.backgroundCardThumbnail})` }}
    >
      <Anchor
        href={props.backgroundCardUrl}
        event={AnalyticsEvents.CATEGORY_CARD_CLICKED}
        properties={{
          title: props.backgroundCardTitle,
          url: props.backgroundCardUrl,
        }}
        className="flex w-full items-end bg-black/50 px-3.75 py-5
          hover:bg-black/30"
      >
        <H3
          fontWeight={700}
          fontSize={20}
          lineHeight={24}
          xsFontSize={24}
          xsLineHeight={24}
          className="text-text-4 mt-11.25 uppercase"
        >
          {props.backgroundCardTitle}
        </H3>
      </Anchor>
    </div>
  );
}
