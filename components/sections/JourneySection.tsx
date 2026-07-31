"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const milestones = [

  {
    year: "2021",
    title: "SMAN 20 Batam",
    description: "Science track. Mathematics and physics sharpened analytical thinking.",
    side: "right",
    image: "/SMAN20.png",
  },
  {
    year: "2024 - NOW",
    title: "Politeknik Negeri Batam",
    description:
      "Software Engineering. First real projects — VEC attendance system, web development.",
    side: "left",
    image: "/poltek.png",
  },
];

function MilestoneItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = milestone.side === "left";

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } md:grid md:grid-cols-[1fr_auto_1fr]`}
    >
      {/* Left content */}
      <div
        className={`hidden md:flex ${
          isLeft ? "justify-end pr-12" : "justify-start pl-12"
        } ${isLeft ? "" : "md:col-start-3"}`}
      >
        {isLeft && (
          <motion.div
            className="max-w-xs text-right"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
          >
            <span
              className="text-xs tracking-widest uppercase text-[#444444] block mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {milestone.year}
            </span>
            <h3 className="font-serif text-xl text-[#F5F3EE] mb-2">
              {milestone.title}
            </h3>
            <p
              className="text-sm text-[#555555] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {milestone.description}
            </p>
            {milestone.image && (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mt-6 ml-auto flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    sizes="(max-width: 768px) 160px, 160px"
                    className="object-contain transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center md:col-start-2">
        <motion.div
          className="relative z-10 w-3 h-3 rounded-full border border-[#F5F3EE]/40 bg-[#050505] flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#F5F3EE]"
            animate={inView ? { scale: [0, 1.3, 1] } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
        </motion.div>
      </div>

      {/* Right content */}
      <div
        className={`hidden md:flex ${
          !isLeft ? "justify-start pl-12" : "justify-end pr-12"
        } ${!isLeft ? "" : "md:col-start-1"}`}
      >
        {!isLeft && (
          <motion.div
            className="max-w-xs"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
          >
            <span
              className="text-xs tracking-widest uppercase text-[#444444] block mb-2"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {milestone.year}
            </span>
            <h3 className="font-serif text-xl text-[#F5F3EE] mb-2">
              {milestone.title}
            </h3>
            <p
              className="text-sm text-[#555555] leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {milestone.description}
            </p>
            {milestone.image && (
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mt-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    sizes="(max-width: 768px) 160px, 160px"
                    className="object-contain transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Mobile layout */}
      <motion.div
        className="md:hidden ml-6 pb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
      >
        <span
          className="text-xs tracking-widest uppercase text-[#444444] block mb-1"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {milestone.year}
        </span>
        <h3 className="font-serif text-lg text-[#F5F3EE] mb-1">
          {milestone.title}
        </h3>
        <p
          className="text-sm text-[#555555] leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {milestone.description}
        </p>
        {milestone.image && (
          <div className="relative w-28 h-28 mt-5 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={milestone.image}
                alt={milestone.title}
                fill
                sizes="(max-width: 768px) 112px, 112px"
                className="object-contain transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function JourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={ref}
      className="relative bg-[#F5F3EE] text-[#050505] py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-[#888888] block mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            The Journey
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-[#050505] leading-tight"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Experience &amp; Education
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated ink stroke line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#050505]/08 -translate-x-1/2 hidden md:block" />
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-[#050505]/40 -translate-x-1/2 hidden md:block"
            style={{ height: lineHeight }}
          />

          {/* Mobile line */}
          <div className="absolute left-1.5 top-0 bottom-0 w-px bg-[#050505]/10 md:hidden" />
          <motion.div
            className="absolute left-1.5 top-0 w-px bg-[#050505]/40 md:hidden"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16 md:space-y-20">
            {milestones.map((m, i) => (
              <MilestoneItem key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
}
