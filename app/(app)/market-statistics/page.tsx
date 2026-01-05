"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { StatCard, BehavioralChart } from "@/components/market-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketStatistic, BehavioralPattern } from "@/types";

export default function MarketStatisticsPage() {
  const [statistics, setStatistics] = useState<MarketStatistic[]>([]);
  const [patterns, setPatterns] = useState<BehavioralPattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/market-stats");
        const data = await res.json();
        setStatistics(data.statistics);
        setPatterns(data.patterns);
      } catch (error) {
        console.error("Failed to fetch market stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 text-[var(--color-error)]">
          <AlertTriangle className="h-6 w-6" />
          <span className="font-semibold text-sm uppercase tracking-wider">
            Reality Check
          </span>
        </div>
        <h1 className="mt-4 text-[var(--text-display-sm)] font-bold text-[var(--color-deep-navy)]">
          The Hard Truth About Retail Trading
        </h1>
        <p className="mt-4 text-[var(--text-body-lg)] text-[var(--color-cool-gray)]">
          These aren&apos;t scare tactics—they&apos;re facts from SEBI reports and market research.
          Understanding the reality is the first step to not becoming another statistic.
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="mt-12">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-deep-navy)] mb-6">
          Key Statistics
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statistics.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        )}
      </div>

      {/* Behavioral Patterns */}
      <div className="mt-16">
        <h2 className="text-[var(--text-h2)] font-bold text-[var(--color-deep-navy)] mb-2">
          Behavioral Patterns
        </h2>
        <p className="text-[var(--text-body)] text-[var(--color-cool-gray)] mb-6">
          See how retail investors consistently make the opposite moves of institutions.
        </p>
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {patterns.map((pattern) => (
              <BehavioralChart key={pattern.id} pattern={pattern} />
            ))}
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="mt-16 p-8 rounded-[var(--radius-2xl)] bg-[var(--color-soft-teal)] text-center">
        <h3 className="text-[var(--text-h2)] font-bold text-[var(--color-deep-navy)]">
          Ready to learn instead of gamble?
        </h3>
        <p className="mt-2 text-[var(--text-body)] text-[var(--color-cool-gray)] max-w-2xl mx-auto">
          Start by understanding what makes a company worth investing in.
          Real knowledge beats tips every time.
        </p>
        <a
          href="/company/search"
          className="mt-6 inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius-lg)] bg-[var(--color-muted-teal)] text-white font-semibold hover:bg-[var(--color-muted-teal)]/90 transition-colors"
        >
          Explore Companies
        </a>
      </div>
    </div>
  );
}
