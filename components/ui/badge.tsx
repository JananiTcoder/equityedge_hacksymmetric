import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)]",
        success:
          "bg-[var(--color-success-light)] text-[var(--color-success)]",
        warning:
          "bg-[var(--color-warning-light)] text-[#B45309]",
        error:
          "bg-[var(--color-error-light)] text-[var(--color-error)]",
        info:
          "bg-[var(--color-info-light)] text-[var(--color-info)]",
        blue:
          "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]",
        outline:
          "border border-[var(--color-border)] text-[var(--color-text-muted)]",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
