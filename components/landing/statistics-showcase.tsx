"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, Wallet, MessageCircleWarning } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

// Optimized statistics cards - removed expensive grayscale filter
const statistics = [
  {
    value: "89%",
    label: "of retail traders lose money",
    date: "SEBI's harsh reality",
    icon: <TrendingDown className="size-4 text-white" />,
    className:
      "[grid-area:stack] hover:-translate-y-10 opacity-60 hover:opacity-100 before:absolute before:inset-0 before:rounded-xl before:bg-background/40 before:transition-opacity before:duration-300 hover:before:opacity-0",
  },
  {
    value: "15 days",
    label: "Avg holding period",
    date: "vs 3+ years recommended",
    icon: <Clock className="size-4 text-white" />,
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 opacity-70 hover:opacity-100 before:absolute before:inset-0 before:rounded-xl before:bg-background/30 before:transition-opacity before:duration-300 hover:before:opacity-0",
  },
  {
    value: "₹1.8L Cr",
    label: "Lost in FY23",
    date: "Real savings lost",
    icon: <Wallet className="size-4 text-white" />,
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 opacity-80 hover:opacity-100 before:absolute before:inset-0 before:rounded-xl before:bg-background/20 before:transition-opacity before:duration-300 hover:before:opacity-0",
  },
  {
    value: "70%",
    label: "Trade on tips",
    date: "Within 24hrs",
    icon: <MessageCircleWarning className="size-4 text-white" />,
    className:
      "[grid-area:stack] translate-x-36 translate-y-[7.5rem] hover:translate-y-20 opacity-90 hover:opacity-100",
  },
];

export function StatisticsShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-charcoal)] to-[var(--color-obsidian)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Blue glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-blue-500)]/10 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-blue-500)]/10 text-[var(--color-blue-400)] text-sm font-medium mb-4">
              The Reality Check
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Numbers That Should Make You Think
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              Before you follow another tip, understand what's really happening in Indian markets.
              The odds are stacked against the uninformed.
            </p>

            <Link
              href="/market-statistics"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-blue-600)] text-white font-semibold hover:brightness-110 transition-all group shadow-[var(--shadow-button)]"
            >
              See Full Market Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] flex justify-center py-10">
              <DisplayCards
                cards={statistics.map(stat => ({
                  title: stat.value,
                  description: stat.label,
                  date: stat.date,
                  icon: stat.icon,
                  className: stat.className,
                  titleClassName: "text-[var(--color-blue-400)] text-2xl"
                }))}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
