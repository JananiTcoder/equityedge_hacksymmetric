"use client";

import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";
import React from "react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        // Base styles - optimized for performance
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
        "rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3",
        // Transition only transform and opacity (GPU accelerated)
        "transition-transform duration-300 ease-out will-change-transform",
        // Right fade gradient
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
        "after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        // Hover styles
        "hover:border-white/20",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Optimized cards - removed grayscale filter (expensive), using opacity instead
  const defaultCards: DisplayCardProps[] = [
    {
      className: cn(
        "[grid-area:stack] hover:-translate-y-10",
        "opacity-60 hover:opacity-100",
        "before:absolute before:inset-0 before:rounded-xl before:bg-background/40",
        "before:transition-opacity before:duration-300 hover:before:opacity-0"
      ),
    },
    {
      className: cn(
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1",
        "opacity-70 hover:opacity-100",
        "before:absolute before:inset-0 before:rounded-xl before:bg-background/30",
        "before:transition-opacity before:duration-300 hover:before:opacity-0"
      ),
    },
    {
      className: cn(
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        "opacity-90 hover:opacity-100"
      ),
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
