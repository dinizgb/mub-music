import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonStyleProps = {
  width?: string;
  fontSize?: number;
  padding?: string;
  margin?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Round primary filter action button.
 * @return {TSX.Element}: The TSX code for the Filter Button Component.
 */
export function FilterButton({
  className,
  margin,
  children,
  style,
  ...props
}: ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        `border-primary bg-primary text-text-1 hover:border-text-1
        hover:bg-text-1 hover:text-text-4 cursor-pointer rounded-full border
        px-[11px] py-2.5 text-center text-xs font-semibold transition-colors`,
        className
      )}
      style={{ margin, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Primary CTA link button.
 * @return {TSX.Element}: The TSX code for the Primary Button Component.
 */
export function PrimaryButton({
  className,
  width,
  fontSize,
  padding,
  margin,
  children,
  style,
  ...props
}: ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        `bg-primary text-text-4 hover:bg-text-4 hover:text-text-1 rounded-lg
        text-center font-semibold transition-colors`,
        className
      )}
      style={
        {
          width,
          fontSize: fontSize ? `${fontSize}px` : undefined,
          padding,
          margin,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * Outlined white CTA link button.
 * @return {TSX.Element}: The TSX code for the White Button Component.
 */
export function WhiteButton({
  className,
  width,
  margin,
  children,
  style,
  ...props
}: ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        `border-text-4 text-text-4 hover:bg-text-4 hover:text-text-1
        border-[3px] py-3.75 text-center text-[21px] font-semibold
        transition-colors`,
        className
      )}
      style={{ width, margin, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </a>
  );
}
