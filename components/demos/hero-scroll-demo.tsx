"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

// Example usage with EquityEdge styling
export function EquityEdgeScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-[var(--color-surface)]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-[var(--color-deep-navy)] dark:text-[var(--color-warm-white)]">
              Master Financial Analysis <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-[var(--color-amber-gold)]">
                Like a Pro
              </span>
            </h1>
            <p className="mt-4 text-lg text-[var(--color-cool-gray)] max-w-2xl mx-auto">
              Learn to read company fundamentals, understand financial ratios,
              and make informed investment decisions.
            </p>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80"
          alt="Financial dashboard"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
