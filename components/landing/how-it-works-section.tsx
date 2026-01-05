"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, LineChart, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedMeshGradient } from "@/components/ui/animated-mesh-gradient";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const steps = [
  {
    icon: Search,
    title: "Search Any Company",
    description: "Look up any listed Indian company and get instant access to fundamentals that matter.",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
    link: "/company/search",
  },
  {
    icon: BookOpen,
    title: "Learn Key Metrics",
    description: "Understand P/E, ROE, and Debt-to-Equity with plain English explanations.",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
    link: "/company/search",
  },
  {
    icon: LineChart,
    title: "Analyze Trends",
    description: "See 5-year revenue, profit, and cash flow trends. Spot red flags early.",
    spotlightColor: "rgba(16, 185, 129, 0.15)",
    link: "/market-statistics",
  },
  {
    icon: Bot,
    title: "Ask AI Assistant",
    description: "Get complex concepts explained in simple terms. It teaches, never recommends.",
    spotlightColor: "rgba(249, 115, 22, 0.15)",
    link: "/ai-assistant",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 bg-black relative overflow-hidden antialiased">
      {/* Animated gradient background - performant CSS replacement for Plasma */}
      <div className="absolute inset-0 z-0">
        <AnimatedMeshGradient
          color="#3b82f6"
          speed={25}
          opacity={0.5}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
              Your Learning Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Master the Markets <br className="hidden md:block" /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">EquityEdge</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              We've simplified the path from beginner to pro. Follow these steps to build your confidence and portfolio.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={step.link} className="block h-full group">
                  <SpotlightCard
                    className="h-full p-8"
                    spotlightColor={step.spotlightColor}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 rounded-lg bg-neutral-800 flex items-center justify-center mb-6 group-hover:bg-neutral-700 transition-colors">
                          <Icon className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
                        </div>

                        <span className="text-sm font-mono text-neutral-500 mb-2 block">0{index + 1}</span>
                        <h3 className="text-xl font-bold text-neutral-100 mb-2 group-hover:text-white transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
