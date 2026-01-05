"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "89%", label: "of retail traders lose in F&O" },
  { value: "15 days", label: "avg. holding period" },
  { value: "₹1.8L Cr", label: "lost by retail in FY23" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-canvas)] to-[var(--color-surface)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--color-soft-teal)] opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[var(--color-amber-gold)] opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-soft-teal)] text-[var(--color-muted-teal)] text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              Education-first investing platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-8 text-[var(--text-display-lg)] sm:text-6xl lg:text-7xl font-extrabold text-[var(--color-deep-navy)] leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Learn to Read{" "}
            <span className="text-[var(--color-amber-gold)]">Companies</span>,
            <br />
            Not Tips
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-[var(--text-body-lg)] text-[var(--color-cool-gray)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stop chasing tips. Start understanding fundamentals. EquityEdge helps
            Indian retail investors build real financial literacy—so you can make
            confident decisions based on data, not speculation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="xl">
              <Link href="/company/search">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="/market-statistics">
                See Market Reality
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-8 text-[var(--color-cool-gray)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[var(--color-success)]" />
              <span className="text-sm">No investment advice</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[var(--color-muted-teal)]" />
              <span className="text-sm">Real market data</span>
            </div>
          </motion.div>
        </div>

        {/* Stats preview */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-[var(--radius-2xl)] bg-[var(--color-canvas)] border border-[var(--color-surface-muted)] shadow-[var(--shadow-card)]"
            >
              <div className="text-3xl font-bold text-[var(--color-error)]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-[var(--color-cool-gray)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
