import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContentBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/**
 * Article/product HTML body wrapper with CMS content styles.
 * @param {ContentBodyProps} props Component props.
 * @return {JSX.Element} Content body container.
 */
export function ContentBody({
  className,
  children,
  ...props
}: ContentBodyProps) {
  return (
    <div className={cn("content-body", className)} {...props}>
      {children}
    </div>
  );
}

export default ContentBody;
