"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Building2,
  BookOpen,
  AlertTriangle,
  TrendingDown,
  Lightbulb
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "20+ Indian Companies",
    description: "Access fundamentals for major NSE/BSE listed companies across IT, Banking, FMCG, Pharma, and Auto sectors.",
    color: "var(--color-muted-teal)",
    bgColor: "var(--color-soft-teal)",
  },
  {
    icon: LineChart,
    title: "5-Year Trends",
    description: "See how metrics evolved over time. Spot improving businesses vs. deteriorating ones.",
    color: "var(--color-info)",
    bgColor: "var(--color-info-light)",
  },
  {
    icon: BookOpen,
    title: "Educational Tooltips",
    description: "Every ratio explained in plain English. Learn what it means, how it's calculated, and why it matters.",
    color: "var(--color-amber-gold)",
    bgColor: "var(--color-warning-light)",
  },
  {
    icon: AlertTriangle,
    title: "Red Flag Detection",
    description: "Automatic highlighting of concerning ratios. Know when something needs deeper investigation.",
    color: "var(--color-error)",
    bgColor: "var(--color-error-light)",
  },
  {
    icon: TrendingDown,
    title: "Market Reality Check",
    description: "See the hard data on retail investor losses. Understand why most traders fail—so you don't.",
    color: "var(--color-cool-gray)",
    bgColor: "var(--color-surface-subtle)",
  },
  {
    icon: Lightbulb,
    title: "AI Learning Assistant",
    description: "Ask questions about any concept. Get simple explanations without the financial jargon.",
    color: "var(--color-success)",
    bgColor: "var(--color-success-light)",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--color-canvas)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            className="text-[var(--color-muted-teal)] font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Features
          </motion.span>
          <motion.h2
            className="mt-4 text-[var(--text-display-sm)] font-bold text-[var(--color-deep-navy)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to learn
          </motion.h2>
          <motion.p
            className="mt-4 text-[var(--text-body-lg)] text-[var(--color-cool-gray)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Built for education, not trading. Every feature helps you understand—not speculate.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-surface-muted)] hover:border-[var(--color-muted-teal)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center"
                style={{ backgroundColor: feature.bgColor }}
              >
                <feature.icon
                  className="h-6 w-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="mt-4 text-[var(--text-h4)] font-semibold text-[var(--color-deep-navy)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
