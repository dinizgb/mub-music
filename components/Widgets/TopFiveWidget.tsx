/* eslint-disable camelcase */
import type { CSSProperties } from "react";
import { H2 } from "components/Texts/Typographies";
import SmallHorizontalCard from "../Cards/SmallHorizontalCard";
import { cn } from "@/lib/utils";

type TopFiveWidgetWrapperProps = {
  title: string;
  data: any;
  margin?: any;
  xsMargin?: any;
};

/**
 * Top Five Widget Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Top Five Widget Component.
 */
export default function TopFiveWidget(props: TopFiveWidgetWrapperProps) {
  return (
    <div
      className={cn(
        "bg-secondary relative w-full rounded-lg py-5",
        props.xsMargin != null && "max-sm:[margin:var(--xs-margin)]"
      )}
      style={
        {
          margin: props.margin,
          ...(props.xsMargin != null
            ? { ["--xs-margin" as string]: props.xsMargin }
            : {}),
        } as CSSProperties
      }
    >
      <div className="relative mx-auto w-[90%]">
        <H2
          className="text-text-4"
          fontWeight={600}
          fontSize={20}
          lineHeight={21}
          xsFontSize={21}
          xsLineHeight={24}
        >
          {props.title}
        </H2>
        {props.data.map(({ featured_media_url, title, date, link, slug }) => {
          return (
            <SmallHorizontalCard
              key={slug}
              cardTitle={title.rendered}
              cardDate={date}
              cardImage={featured_media_url}
              cardLink={link}
            />
          );
        })}
      </div>
    </div>
  );
}
