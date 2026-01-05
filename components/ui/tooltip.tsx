"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  variant?: "default" | "educational";
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  variant = "default",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  React.useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      let y: number;

      switch (side) {
        case "top":
          y = triggerRect.top - tooltipRect.height - 8;
          break;
        case "bottom":
          y = triggerRect.bottom + 8;
          break;
        case "left":
          x = triggerRect.left - tooltipRect.width - 8;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        case "right":
          x = triggerRect.right + 8;
          y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          break;
        default:
          y = triggerRect.top - tooltipRect.height - 8;
      }

      x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
      y = Math.max(8, y);

      setPosition({ x, y });
    }
  }, [isVisible, side]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            "fixed z-50 animate-in fade-in-0 zoom-in-95 duration-150",
            variant === "default" &&
              "bg-[var(--color-charcoal)] text-white px-3 py-2 rounded-[var(--radius-md)] text-sm max-w-[280px] shadow-lg dark:bg-[var(--color-zinc-100)] dark:text-[var(--color-charcoal)]",
            variant === "educational" &&
              "bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-[var(--radius-xl)] max-w-[360px] shadow-lg",
            className
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}

interface EducationalTooltipProps {
  title: string;
  description: string;
  learnMoreHref?: string;
  children: React.ReactElement;
}

export function EducationalTooltip({
  title,
  description,
  learnMoreHref,
  children,
}: EducationalTooltipProps) {
  return (
    <Tooltip
      variant="educational"
      content={
        <div className="space-y-2">
          <h4 className="font-semibold text-[var(--color-text-primary)]">{title}</h4>
          <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
          {learnMoreHref && (
            <a
              href={learnMoreHref}
              className="text-sm text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
            >
              Learn more →
            </a>
          )}
        </div>
      }
    >
      {children}
    </Tooltip>
  );
}
