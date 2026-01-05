'use client';

import { cn } from '@/lib/cn';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 25,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  // Visibility observer - pause animation when not in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
        if (!entries[0].isIntersecting && controlsRef.current) {
          controlsRef.current.pause();
        } else if (entries[0].isIntersecting && controlsRef.current) {
          controlsRef.current.play();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Don't animate if reduced motion is preferred
    if (prefersReducedMotion) return;

    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // Calculate duration based on speed (pixels per second)
    const duration = Math.abs(contentSize / 2) / speed;

    if (isTransitioning) {
      const transitionDuration = Math.abs((translation.get() - to) / (speedOnHover || speed));
      controlsRef.current = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controlsRef.current = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });

      // Start paused if not visible
      if (!isVisible.current && controlsRef.current) {
        controlsRef.current.pause();
      }
    }

    return () => controlsRef.current?.stop();
  }, [
    key,
    translation,
    currentSpeed,
    speed,
    speedOnHover,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    prefersReducedMotion,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  // If reduced motion, just show static content
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={cn('overflow-hidden', className)}>
        <div
          className="flex w-max"
          style={{
            gap: `${gap}px`,
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
