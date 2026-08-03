import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ChartWrappersProps = {
  margin?: any;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

/**
 * Default chart surface wrapper.
 * @param {ChartWrappersProps} props Wrapper props.
 * @return {TSX.Element} Chart wrapper element.
 */
export function DefaultChartWrapper({
  margin,
  className,
  children,
  style,
}: ChartWrappersProps) {
  return (
    <div
      className={cn("bg-secondary rounded-lg px-6.25 py-4", className)}
      style={{ margin, ...style }}
    >
      {children}
    </div>
  );
}
