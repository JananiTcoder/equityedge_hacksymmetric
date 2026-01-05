"use client";

import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FinancialRatio } from "@/types";
import { cn } from "@/lib/cn";

interface RatioCardProps {
  ratio: FinancialRatio;
  onLearnMore: (ratio: FinancialRatio) => void;
}

const interpretationColors: Record<FinancialRatio["interpretation"], string> = {
  excellent: "success",
  good: "success",
  neutral: "default",
  concerning: "warning",
  "red-flag": "error",
};

export function RatioCard({ ratio, onLearnMore }: RatioCardProps) {
  const badgeVariant = interpretationColors[ratio.interpretation] as "success" | "warning" | "error" | "default";

  // Calculate position on scale (0-100)
  const { min, max } = ratio.education.goodRange;
  const scaleMin = min * 0.5;
  const scaleMax = max * 1.5;
  const position = Math.min(
    100,
    Math.max(0, ((ratio.value - scaleMin) / (scaleMax - scaleMin)) * 100)
  );

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[var(--text-h4)] font-semibold text-[var(--color-deep-navy)]">
              {ratio.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onLearnMore(ratio)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[var(--text-body-xs)] text-[var(--color-cool-gray)]">
            {ratio.fullName}
          </p>
        </div>
        <Badge variant={badgeVariant}>{ratio.interpretationLabel}</Badge>
      </div>

      {/* Value */}
      <div className="mt-4">
        <div className="text-3xl font-bold text-[var(--color-deep-navy)]">
          {ratio.formatted}
        </div>
        <p className="text-[var(--text-body-xs)] text-[var(--color-cool-gray)]">
          Industry avg: {ratio.industryAvg.toFixed(2)}
        </p>
      </div>

      {/* Scale visualization */}
      <div className="mt-4">
        <div className="relative h-2 rounded-full bg-gradient-to-r from-[var(--color-error)] via-[var(--color-warning)] to-[var(--color-success)]">
          {/* Good range indicator */}
          <div
            className="absolute top-0 h-full bg-[var(--color-success)]/30 rounded-full"
            style={{
              left: `${((min - scaleMin) / (scaleMax - scaleMin)) * 100}%`,
              width: `${((max - min) / (scaleMax - scaleMin)) * 100}%`,
            }}
          />
          {/* Current value marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-deep-navy)] border-2 border-white shadow-md"
            style={{ left: `calc(${position}% - 8px)` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[var(--text-body-xs)] text-[var(--color-cool-gray)]">
          <span>Low</span>
          <span className="text-[var(--color-success)]">
            Good: {min}-{max}
          </span>
          <span>High</span>
        </div>
      </div>

      {/* Quick summary */}
      <p className="mt-4 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
        {ratio.education.summary}
      </p>
    </Card>
  );
}
