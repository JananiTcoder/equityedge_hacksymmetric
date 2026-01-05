"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ChatComponent, { ChatConfig, UiConfig } from "@/components/ui/chat-interface";

// ==========================================
// UI CONFIGURATION - EquityEdge Theme
// ==========================================
const uiConfig: UiConfig = {
  // Container dimensions
  containerWidth: 550,
  containerHeight: 450,
  backgroundColor: '#0a1628', // Dark blue background matching EquityEdge

  // Auto-restart settings
  autoRestart: true,
  restartDelay: 3000,

  // Loading indicator
  loader: {
    dotColor: '#3b82f6' // Blue accent
  },

  // Link badges styling
  linkBubbles: {
    backgroundColor: '#1e3a5f',
    textColor: '#60a5fa',
    iconColor: '#60a5fa',
    borderColor: '#2563eb'
  },

  // Left side chat bubbles (AI)
  leftChat: {
    backgroundColor: '#1e293b',
    textColor: '#e2e8f0',
    borderColor: '#334155',
    showBorder: true,
    nameColor: '#60a5fa'
  },

  // Right side chat bubbles (User)
  rightChat: {
    backgroundColor: '#1d4ed8',
    textColor: '#ffffff',
    borderColor: '#2563eb',
    showBorder: false,
    nameColor: '#93c5fd'
  }
};

// ==========================================
// CHAT CONFIGURATION
// ==========================================
const chatConfig: ChatConfig = {
  // Chat participants
  leftPerson: {
    name: "EquityEdge AI",
    avatar: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop&crop=faces"
  },
  rightPerson: {
    name: "You",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
  },

  // Message sequence - Financial education conversation
  messages: [
    {
      id: 1,
      sender: 'right',
      type: 'text',
      content: 'What is P/E ratio and why does it matter for investing?',
      maxWidth: 'max-w-sm',
      loader: {
        enabled: true,
        delay: 500,
        duration: 1500
      }
    },
    {
      id: 2,
      sender: 'left',
      type: 'text',
      content: 'The P/E (Price-to-Earnings) ratio compares a company\'s stock price to its earnings per share. It tells you how much investors are willing to pay for each rupee of profit.',
      maxWidth: 'max-w-md',
      loader: {
        enabled: true,
        delay: 1000,
        duration: 2000
      }
    },
    {
      id: 3,
      sender: 'left',
      type: 'text-with-links',
      content: 'A P/E of 20 means investors pay ₹20 for every ₹1 of earnings. Lower P/E might indicate undervaluation, while higher P/E suggests growth expectations.',
      maxWidth: 'max-w-md',
      links: [
        { text: 'Learn More' },
        { text: 'Compare Stocks' }
      ],
      loader: {
        enabled: true,
        delay: 500,
        duration: 1800
      }
    },
    {
      id: 4,
      sender: 'right',
      type: 'text',
      content: 'How do I know if a company has too much debt?',
      maxWidth: 'max-w-sm',
      loader: {
        enabled: true,
        delay: 1000,
        duration: 1200
      }
    },
    {
      id: 5,
      sender: 'left',
      type: 'text-with-links',
      content: 'Look at the Debt-to-Equity ratio! It shows how much debt a company uses vs shareholder equity.\n\n• Below 1: Conservative, less risky\n• 1-2: Moderate leverage\n• Above 2: Higher debt, more risk\n\nAlso check Interest Coverage Ratio to see if profits cover interest payments.',
      maxWidth: 'max-w-md',
      links: [
        { text: 'Debt Analysis' },
        { text: 'Risk Metrics' }
      ],
      loader: {
        enabled: true,
        delay: 800,
        duration: 2200
      }
    },
  ]
};

export function AIShowcaseScroll() {
  return (
    <section className="bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)]">
      <ContainerScroll
        titleComponent={
          <>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] text-sm font-medium mb-4"
            >
              AI-Powered Learning
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Learn Financial Concepts <br />
              <span className="text-[var(--color-accent)]">
                Like Never Before
              </span>
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-2">
              Our AI assistant explains complex financial concepts in simple terms.
              Ask anything, learn everything—no jargon, just clarity.
            </p>
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:underline"
            >
              Try the AI Assistant
              <Sparkles className="w-4 h-4" />
            </Link>
          </>
        }
      >
        <div className="flex items-center justify-center h-full w-full bg-[#0a1628] rounded-lg overflow-hidden">
          <ChatComponent config={chatConfig} uiConfig={uiConfig} />
        </div>
      </ContainerScroll>
    </section>
  );
}
