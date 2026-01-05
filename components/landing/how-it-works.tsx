"use client";

import { motion } from "framer-motion";
import { Search, BarChart3, GraduationCap, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Companies",
    description:
      "Find any company listed on NSE/BSE. Access real fundamentals—revenue, profit, cash flow—not just stock prices.",
  },
  {
    icon: BarChart3,
    title: "Understand Ratios",
    description:
      "Learn what P/E, ROE, and debt ratios actually mean. Each metric comes with plain-English explanations and context.",
  },
  {
    icon: GraduationCap,
    title: "Build Knowledge",
    description:
      "Every number teaches you something. Understand why a ratio is good or concerning, and what affects it.",
  },
  {
    icon: MessageCircle,
    title: "Ask Questions",
    description:
      "Confused about something? Our AI assistant explains concepts in simple terms—no jargon, no sales pitch.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            className="text-[var(--color-muted-teal)] font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.span>
          <motion.h2
            className="mt-4 text-[var(--text-display-sm)] font-bold text-[var(--color-deep-navy)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From confusion to clarity
          </motion.h2>
          <motion.p
            className="mt-4 text-[var(--text-body-lg)] text-[var(--color-cool-gray)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            No more blindly following tips. Learn to evaluate companies yourself.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[var(--color-surface-muted)] -translate-x-4" />
              )}

              <div className="relative p-6 rounded-[var(--radius-2xl)] bg-[var(--color-canvas)] border border-[var(--color-surface-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--color-amber-gold)] text-[var(--color-deep-navy)] font-bold text-sm flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-[var(--color-soft-teal)] flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-[var(--color-muted-teal)]" />
                </div>

                {/* Content */}
                <h3 className="mt-4 text-[var(--text-h4)] font-semibold text-[var(--color-deep-navy)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[var(--text-body-sm)] text-[var(--color-cool-gray)]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
