"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Simplified transforms - removed heavy 3D rotation
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div
      className="min-h-[50rem] md:min-h-[60rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-20 w-full relative">
        <Header translateY={translateY} titleComponent={titleComponent} />
        <Card scale={scale} opacity={opacity}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translateY,
  titleComponent,
}: {
  translateY: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ y: translateY }}
      className="max-w-5xl mx-auto text-center will-change-transform"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  scale,
  opacity,
  children,
}: {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="max-w-5xl mt-8 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
