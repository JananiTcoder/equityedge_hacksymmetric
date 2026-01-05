"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/cn";

const testimonials = [
  {
    quote: "I used to follow stock tips blindly. After using EquityEdge, I finally understand why I was losing money. Now I actually read annual reports!",
    author: "Priya M.",
    role: "Retail Investor, Mumbai",
    avatar: "P",
  },
  {
    quote: "The AI assistant explained P/E ratio in a way no YouTube video ever could. Simple, clear, and actually useful.",
    author: "Rahul K.",
    role: "Software Engineer, Bangalore",
    avatar: "R",
  },
  {
    quote: "Finally, a platform that teaches instead of selling. I've recommended it to my entire family.",
    author: "Ananya S.",
    role: "CA, Delhi",
    avatar: "A",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-sm font-medium mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            From Tip-Followers to Informed Investors
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-card)]",
                index === 1 && "md:-mt-4"
              )}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[var(--color-accent)]/20" />

              <p className="text-[var(--color-text-primary)] leading-relaxed mb-6 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-blue-600)] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
