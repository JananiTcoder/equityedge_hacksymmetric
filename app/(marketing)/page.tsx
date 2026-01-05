import dynamic from "next/dynamic";
import { HeroSection } from "@/components/landing";

// Lazy load below-fold sections for better performance
const AIShowcaseScroll = dynamic(
  () => import("@/components/landing").then((mod) => mod.AIShowcaseScroll),
  {
    loading: () => <SectionSkeleton height="60rem" />,
  }
);

const StatisticsShowcase = dynamic(
  () => import("@/components/landing").then((mod) => mod.StatisticsShowcase),
  {
    loading: () => <SectionSkeleton height="32rem" />,
  }
);

const HowItWorksSection = dynamic(
  () => import("@/components/landing").then((mod) => mod.HowItWorksSection),
  {
    loading: () => <SectionSkeleton height="40rem" />,
  }
);

const CTASection = dynamic(
  () => import("@/components/landing").then((mod) => mod.CTASection),
  {
    loading: () => <SectionSkeleton height="24rem" />,
  }
);

// Simple skeleton loader for sections
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      className="w-full bg-gradient-to-b from-[var(--color-charcoal)] to-[var(--color-obsidian)] animate-pulse"
      style={{ minHeight: height }}
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="h-8 w-48 bg-white/5 rounded-full mx-auto mb-6" />
        <div className="h-12 w-96 bg-white/5 rounded-lg mx-auto mb-4" />
        <div className="h-6 w-72 bg-white/5 rounded-lg mx-auto" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Hero section loads immediately - it's above the fold */}
      <HeroSection />

      {/* Below-fold sections are lazy loaded */}
      <AIShowcaseScroll />
      <StatisticsShowcase />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
