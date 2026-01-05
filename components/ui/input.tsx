import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  "flex w-full rounded-[var(--radius-lg)] text-[var(--text-body)] transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-muted)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-[52px] bg-[var(--color-surface-subtle)] border-[1.5px] border-transparent px-4 focus:bg-[var(--color-surface)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10",
        search:
          "h-12 bg-[var(--color-surface)] border border-[var(--color-border)] pl-12 pr-4 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, type, ...props }, ref) => {
    if (variant === "search") {
      return (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-muted)]" />
          <input
            type={type}
            className={cn(
              inputVariants({ variant, className }),
              error && "border-[var(--color-error)] focus:border-[var(--color-error)]"
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, className }),
          error && "border-[var(--color-error)] focus:border-[var(--color-error)]"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
