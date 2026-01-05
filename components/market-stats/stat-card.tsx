"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarketStatistic } from "@/types";

interface StatCardProps {
  stat: MarketStatistic;
}

export function StatCard({ stat }: StatCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      variant="elevated"
      className="overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        {/* Main stat */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl font-bold text-[var(--color-error)]">
              {stat.value}
            </div>
            <p className="mt-2 text-[var(--text-body)] text-[var(--color-deep-navy)]">
              {stat.description}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-[var(--color-cool-gray)]" />
          </motion.div>
        </div>

        {/* Source */}
        <div className="mt-4 flex items-center gap-2 text-[var(--text-body-xs)] text-[var(--color-cool-gray)]">
          <span>Source: {stat.source}</span>
          {stat.sourceUrl && (
            <a
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[var(--color-muted-teal)]"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-[var(--color-surface-muted)]">
                {/* Why this matters */}
                <div className="mb-4">
                  <h4 className="font-semibold text-[var(--color-deep-navy)] mb-2">
                    Why this matters
                  </h4>
                  <p className="text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
                    {stat.explanation.why}
                  </p>
                </div>

                {/* What you can do */}
                <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-soft-teal)]">
                  <h4 className="font-semibold text-[var(--color-muted-teal)] mb-2">
                    What you can do
                  </h4>
                  <p className="text-[var(--text-body-sm)] text-[var(--color-deep-navy)]">
                    {stat.explanation.whatYouCanDo}
                  </p>
                </div>

                {/* Learn more */}
                {stat.explanation.learnMoreLink && (
                  <Button
                    variant="link"
                    className="mt-4 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn more about this →
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
