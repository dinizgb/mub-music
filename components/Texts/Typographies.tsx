import type {
  CSSProperties,
  HTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  fontType?: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  margin?: string | number;
  padding?: string | number;
  smFontSize?: number;
  smLineHeight?: number;
  xsFontSize?: number;
  xsLineHeight?: number;
  borderBottom?: string;
  className?: string;
  children?: ReactNode;
};

/**
 * Build typography styles via CSS variables for responsive breakpoints.
 * Color comes from Tailwind classes on `className` (e.g. `text-text-4`).
 * @param {TypographyProps} props Typography props.
 * @return {CSSProperties} Inline styles.
 */
function typographyStyle(props: TypographyProps): CSSProperties {
  return {
    fontWeight: props.fontWeight,
    margin: props.margin as CSSProperties["margin"],
    padding: props.padding as CSSProperties["padding"],
    borderBottom: props.borderBottom,
    ["--typo-font-size" as string]: `${props.fontSize}px`,
    ["--typo-line-height" as string]: `${props.lineHeight}px`,
    ["--typo-sm-font-size" as string]: props.smFontSize
      ? `${props.smFontSize}px`
      : undefined,
    ["--typo-sm-line-height" as string]: props.smLineHeight
      ? `${props.smLineHeight}px`
      : undefined,
    ["--typo-xs-font-size" as string]: props.xsFontSize
      ? `${props.xsFontSize}px`
      : undefined,
    ["--typo-xs-line-height" as string]: props.xsLineHeight
      ? `${props.xsLineHeight}px`
      : undefined,
  };
}

const responsiveClass = "typography-responsive";

type HeadingProps = TypographyProps & HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = TypographyProps & HTMLAttributes<HTMLParagraphElement>;
type SpanProps = TypographyProps & HTMLAttributes<HTMLSpanElement>;
type AnchorProps = TypographyProps & AnchorHTMLAttributes<HTMLAnchorElement>;
type EmProps = TypographyProps & HTMLAttributes<HTMLElement>;

/**
 * H1 typography.
 * @param {HeadingProps} props Component props.
 * @return {JSX.Element} Heading element.
 */
export function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(responsiveClass, className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </h1>
  );
}

/**
 * H2 typography.
 * @param {HeadingProps} props Component props.
 * @return {JSX.Element} Heading element.
 */
export function H2({ className, children, fontType, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        responsiveClass,
        fontType === "MainTitle" ? "font-heading" : "font-open",
        className
      )}
      style={typographyStyle({ ...props, fontType })}
      {...omitTypography(props)}
    >
      {children}
    </h2>
  );
}

/**
 * H3 typography.
 * @param {HeadingProps} props Component props.
 * @return {JSX.Element} Heading element.
 */
export function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(responsiveClass, "font-open", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </h3>
  );
}

/**
 * H4 typography.
 * @param {HeadingProps} props Component props.
 * @return {JSX.Element} Heading element.
 */
export function H4({ className, children, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(responsiveClass, "font-open", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </h4>
  );
}

/**
 * Paragraph typography.
 * @param {ParagraphProps} props Component props.
 * @return {JSX.Element} Paragraph element.
 */
export function P({ className, children, ...props }: ParagraphProps) {
  return (
    <p
      className={cn(responsiveClass, "font-open", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </p>
  );
}

/**
 * Span typography.
 * @param {SpanProps} props Component props.
 * @return {JSX.Element} Span element.
 */
export function Span({ className, children, ...props }: SpanProps) {
  return (
    <span
      className={cn(responsiveClass, "font-open", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </span>
  );
}

/**
 * Anchor typography.
 * @param {AnchorProps} props Component props.
 * @return {JSX.Element} Anchor element.
 */
export function A({ className, children, ...props }: AnchorProps) {
  return (
    <a
      className={cn(responsiveClass, "font-open", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </a>
  );
}

/**
 * Favicon / brand emphasis text.
 * @param {EmProps} props Component props.
 * @return {JSX.Element} Emphasized text element.
 */
export function FaviconText({ className, children, ...props }: EmProps) {
  return (
    <em
      className={cn(responsiveClass, "font-heading not-italic", className)}
      style={typographyStyle(props)}
      {...omitTypography(props)}
    >
      {children}
    </em>
  );
}

const TYPO_KEYS = new Set([
  "fontType",
  "fontWeight",
  "fontSize",
  "lineHeight",
  "margin",
  "padding",
  "smFontSize",
  "smLineHeight",
  "xsFontSize",
  "xsLineHeight",
  "borderBottom",
]);

/**
 * Strip typography-only props before spreading onto DOM elements.
 * @param {Record<string, unknown>} props Props object.
 * @return {Record<string, unknown>} DOM-safe props.
 */
function omitTypography(props: Record<string, unknown>) {
  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!TYPO_KEYS.has(key)) next[key] = value;
  }
  return next;
}
