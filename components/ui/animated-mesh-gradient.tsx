"use client";

import { cn } from "@/lib/cn";

interface AnimatedMeshGradientProps {
  className?: string;
  /** Primary color for the gradient */
  color?: string;
  /** Animation speed in seconds (default: 20) */
  speed?: number;
  /** Opacity of the effect (0-1) */
  opacity?: number;
}

/**
 * Performant animated mesh gradient using CSS animations.
 * Replaces heavy WebGL plasma effect with GPU-accelerated CSS.
 */
export function AnimatedMeshGradient({
  className,
  color = "#3b82f6",
  speed = 20,
  opacity = 0.6,
}: AnimatedMeshGradientProps) {
  // Generate complementary colors from base color
  const baseHue = hexToHsl(color)[0];
  const colors = {
    c1: `hsl(${baseHue}, 80%, 60%)`,
    c2: `hsl(${(baseHue + 40) % 360}, 70%, 50%)`,
    c3: `hsl(${(baseHue + 80) % 360}, 75%, 55%)`,
    c4: `hsl(${(baseHue - 30 + 360) % 360}, 85%, 45%)`,
  };

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
      style={{ opacity }}
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${colors.c1}40, transparent 70%),
            radial-gradient(ellipse 60% 70% at 80% 20%, ${colors.c2}35, transparent 60%),
            radial-gradient(ellipse 70% 60% at 60% 80%, ${colors.c3}30, transparent 65%),
            radial-gradient(ellipse 50% 80% at 30% 70%, ${colors.c4}25, transparent 55%)
          `,
        }}
      />

      {/* Animated floating orbs */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          animation: `meshFloat1 ${speed}s ease-in-out infinite`,
        }}
      >
        <div
          className="absolute w-[60%] h-[60%] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.c1}50, transparent 70%)`,
            top: '10%',
            left: '20%',
          }}
        />
      </div>

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          animation: `meshFloat2 ${speed * 1.3}s ease-in-out infinite`,
        }}
      >
        <div
          className="absolute w-[50%] h-[50%] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.c2}45, transparent 70%)`,
            top: '40%',
            right: '10%',
          }}
        />
      </div>

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          animation: `meshFloat3 ${speed * 0.9}s ease-in-out infinite`,
        }}
      >
        <div
          className="absolute w-[55%] h-[55%] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.c3}40, transparent 70%)`,
            bottom: '20%',
            left: '30%',
          }}
        />
      </div>

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10%, 15%) scale(1.1);
          }
          50% {
            transform: translate(-5%, 10%) scale(0.95);
          }
          75% {
            transform: translate(15%, -10%) scale(1.05);
          }
        }

        @keyframes meshFloat2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-15%, 10%) scale(1.08);
          }
          66% {
            transform: translate(10%, -15%) scale(0.92);
          }
        }

        @keyframes meshFloat3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(8%, -12%) scale(1.05);
          }
          40% {
            transform: translate(-10%, 8%) scale(0.98);
          }
          60% {
            transform: translate(12%, 10%) scale(1.02);
          }
          80% {
            transform: translate(-8%, -8%) scale(0.95);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes meshFloat1, meshFloat2, meshFloat3 {
            0%, 100% {
              transform: none;
            }
          }
        }
      `}</style>
    </div>
  );
}

/** Convert hex color to HSL */
function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [220, 80, 50]; // Default blue

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
