"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "4+", label: "Projects" },
  { value: "10+", label: "Technologies" },
  { value: "2+", label: "Years Learning" },
  { value: "∞", label: "Curiosity" },
];

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#F5F3EE] text-[#050505] py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Ink blob decoration */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(5,5,5,0.04) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left label */}
          <div className="lg:col-span-3">
            <RevealText delay={0}>
              <span
                className="text-xs tracking-[0.3em] uppercase text-[#888888]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                About Me
              </span>
            </RevealText>
            <motion.div
              className="mt-4 w-8 h-px bg-[#050505]/30"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

        
            {/* Right content */}
            <div className="lg:col-span-9">
            <RevealText delay={0.1}>
                <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-[#050505] leading-tight mb-8">
                A developer who believes technology should create{" "}
                <em className="italic text-[#555555]">meaningful impact.</em>
                </h2>
            </RevealText>

            <motion.div
                className="space-y-5 text-[#444444] text-base md:text-lg leading-relaxed max-w-2xl"
                style={{ fontFamily: "var(--font-inter)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <p>
                I&apos;m <strong className="text-[#050505] font-medium">Andri Putra</strong>, 
                a developer who is always curious about new technologies and eager to 
                explore how they can be transformed into meaningful solutions.
                </p>

                <p>
                I enjoy learning, experimenting, and building across different areas of
                technology — from web and mobile applications to IoT and AI systems.
                For me, every new technology is an opportunity to discover a better way
                to solve real-world problems.
                </p>

                <p>
                My goal is not simply to build software, but to create systems that are
                useful, accessible, and capable of making a meaningful impact — solutions
                that can help people, simplify their lives, and bring value to the world
                around them.
                </p>
            </motion.div>
```

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-[#050505]/10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                >
                  <div
                    className="font-serif text-5xl md:text-6xl text-[#050505] leading-none mb-2"
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase text-[#888888]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />
    </section>
  );
}
