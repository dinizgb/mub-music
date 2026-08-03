import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Branded text input primitive.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `border-line-bottom bg-secondary text-text-4 placeholder:text-subtitle
          focus-visible:ring-primary flex h-10 w-full rounded-md border px-3
          py-2 text-sm focus-visible:ring-2 focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
