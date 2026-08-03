import type { ReactElement } from "react";
import { Star, StarHalf } from "lucide-react";
import separateDecimalNumber from "utils/separateDecimalNumber";
import { cn } from "@/lib/utils";

type StarsConstructorProps = {
  fontSize: number;
  number: number;
  withBackground: boolean;
  className?: string;
};

/**
 * Stars Widget Component.
 * @param {StarsConstructorProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Stars Widget Component.
 */
export default function StarsWidget(props: StarsConstructorProps) {
  let stars: ReactElement[] = [];
  const firstNumber = separateDecimalNumber(props.number, 0);
  const secondNumber = separateDecimalNumber(props.number, 1);
  const remainingNumber = 5 - firstNumber;
  const style = { width: props.fontSize, height: props.fontSize };

  // First Number Loop
  for (let i = 0; i < firstNumber; i++) {
    stars = [
      ...stars,
      <Star
        key={`full-` + i}
        className="fill-current"
        style={style}
        fill="currentColor"
      />,
    ];
  }

  // Second Number Loop
  if (firstNumber != 5 && firstNumber != 0) {
    if (secondNumber > 1) {
      if (remainingNumber > 1) {
        stars = [
          ...stars,
          <StarHalf
            key={`half-0`}
            className="fill-current"
            style={style}
            fill="currentColor"
          />,
        ];
        for (let i = 0; i < remainingNumber - 1; i++) {
          stars = [
            ...stars,
            <Star
              key={`outline-` + i}
              className="fill-none"
              style={style}
              fill="none"
            />,
          ];
        }
      } else {
        for (let i = 0; i < remainingNumber; i++) {
          stars = [
            ...stars,
            <StarHalf
              key={`half-` + i}
              className="fill-current"
              style={style}
              fill="currentColor"
            />,
          ];
        }
      }
    } else {
      for (let i = 0; i < remainingNumber; i++) {
        stars = [
          ...stars,
          <Star
            key={`outline-` + i}
            className="fill-none"
            style={style}
            fill="none"
          />,
        ];
      }
    }
  } else if (firstNumber == 0) {
    stars = [
      <StarHalf
        key={`half-0`}
        className="fill-current"
        style={style}
        fill="currentColor"
      />,
      <Star
        key={`outline-1`}
        className="fill-none"
        style={style}
        fill="none"
      />,
      <Star
        key={`outline-2`}
        className="fill-none"
        style={style}
        fill="none"
      />,
      <Star
        key={`outline-3`}
        className="fill-none"
        style={style}
        fill="none"
      />,
      <Star
        key={`outline-4`}
        className="fill-none"
        style={style}
        fill="none"
      />,
    ];
  }

  return (
    <div
      className={cn(
        "text-primary inline-flex flex-row items-center gap-0.5",
        props.withBackground && "rounded-[50px] bg-black/80 p-1.5",
        props.className
      )}
    >
      {stars}
    </div>
  );
}
