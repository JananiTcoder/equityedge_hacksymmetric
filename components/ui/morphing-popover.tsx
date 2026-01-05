"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";

interface MorphingPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function MorphingPopover({
  trigger,
  children,
  className,
}: MorphingPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Popover */}
            <motion.div
              ref={popoverRef}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 10,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 w-[90vw] max-w-md bg-[var(--color-canvas)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)] border border-[var(--color-surface-muted)] overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-[var(--color-surface-subtle)] text-[var(--color-cool-gray)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-5">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
