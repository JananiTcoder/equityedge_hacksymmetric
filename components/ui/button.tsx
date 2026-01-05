import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-blue-600)] text-white shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)] hover:brightness-110 active:scale-[0.98]",
        secondary:
          "border-[1.5px] border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] hover:border-[var(--color-accent)] active:scale-[0.98]",
        ghost:
          "text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent-hover)]",
        destructive:
          "bg-[var(--color-error)] text-white shadow-sm hover:bg-[#DC2626] active:scale-[0.98]",
        link:
          "text-[var(--color-accent)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-md)]",
        md: "h-11 px-5 text-sm rounded-[var(--radius-lg)]",
        lg: "h-12 px-6 text-base rounded-[var(--radius-lg)]",
        xl: "h-14 px-8 text-lg rounded-[var(--radius-xl)]",
        icon: "h-10 w-10 rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
