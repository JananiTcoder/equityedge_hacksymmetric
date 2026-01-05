"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CSSProperties, ReactNode } from "react";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextShimmer({
  children,
  className,
  shimmerWidth = 100,
  as: Component = "p",
}: TextShimmerProps) {
  return (
    <Component
      className={cn(
        "relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-deep-navy)] via-[var(--color-amber-gold)] to-[var(--color-deep-navy)] bg-[length:200%_100%]",
        className
      )}
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
    >
      <motion.span
        className="inline-block"
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-deep-navy) 0%, var(--color-amber-gold) 50%, var(--color-deep-navy) 100%)",
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
