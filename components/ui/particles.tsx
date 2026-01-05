"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "@/lib/cn";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export function Particles({
  className,
  quantity = 30, // Reduced from 50 for better performance
  staticity = 50,
  ease = 50,
  color = "#3B82F6",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const animationRef = useRef<number | null>(null);
  const isVisible = useRef(true);
  const lastMouseUpdate = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dpr = typeof window !== "undefined"
    ? Math.min(window.devicePixelRatio, 2) // Cap DPR at 2 for performance
    : 1;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.15; // Slightly slower movement
    const dy = (Math.random() - 0.5) * 0.15;
    const magnetism = 0.1 + Math.random() * 4;
    return { x, y, translateX: 0, translateY: 0, size, alpha, targetAlpha, dx, dy, magnetism };
  }, []);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  }, [color, dpr]);

  const drawParticles = useCallback(() => {
    circles.current = [];
    // Reduce particles on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? Math.floor(quantity * 0.5) : quantity;

    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [quantity, circleParams, drawCircle]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && context.current) {
      canvasSize.current.w = canvasRef.current.offsetWidth;
      canvasSize.current.h = canvasRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = canvasSize.current.w + "px";
      canvasRef.current.style.height = canvasSize.current.h + "px";
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ) => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = useCallback(() => {
    // Don't animate if not visible or reduced motion is preferred
    if (!isVisible.current || prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }

    circles.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = Math.min(...edge);
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(circle, true);
      }
    });
    animationRef.current = requestAnimationFrame(animate);
  }, [staticity, ease, circleParams, drawCircle, prefersReducedMotion]);

  // Visibility observer - pause animation when not in view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Tab visibility - pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisible.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    const initCanvas = () => {
      resizeCanvas();
      drawParticles();
    };

    initCanvas();
    animate();

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, drawParticles, animate]);

  // Throttled mouse move handler
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Throttle to ~60fps (16ms)
      const now = performance.now();
      if (now - lastMouseUpdate.current < 16) return;
      lastMouseUpdate.current = now;

      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - canvasSize.current.w / 2;
        const y = e.clientY - rect.top - canvasSize.current.h / 2;
        mouse.current = { x, y };
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Don't render if reduced motion is strongly preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
