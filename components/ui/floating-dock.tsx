"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface DockItem {
  icon: ReactNode;
  label: string;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--color-deep-navy)]/90 backdrop-blur-md border border-white/10 shadow-2xl",
        className
      )}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="group relative flex items-center justify-center p-3 rounded-full text-[var(--color-warm-white)]/70 hover:text-[var(--color-amber-gold)] hover:bg-white/10 transition-all duration-200"
        >
          {item.icon}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[var(--color-deep-navy)] text-[var(--color-warm-white)] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {item.label}
          </span>
        </Link>
      ))}
    </motion.div>
  );
}
