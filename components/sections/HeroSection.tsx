"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import InkCanvas from "@/components/effects/InkCanvas";

const roles = ["Software Engineer", "Software Developer", "IoT Enthusiast", "Full-stack Developer", "UI/UX Designer"];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Animated ink canvas background */}
      <InkCanvas />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-24"
        style={{ y, opacity }}
      > {/* Photo frame */}
          <div
            className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 overflow-hidden rounded-full border-2 border-[#F5F3EE]/20 shadow-[0_0_80px_rgba(245,243,238,0.15)]"
            data-cursor-card
          >
            <Image
              src="/andri-foto.jpeg"
              alt="Andri Putra"
              fill
              priority
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
              className="object-cover hover:grayscale transition-all duration-700 scale-105 hover:scale-110"
            />
            {/* Ink tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        {/* Left: Text */}
        <div className="flex-1 w-full text-center lg:text-left">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center lg:justify-start gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="w-8 h-px bg-[#F5F3EE]/30" />
          <span
            className="text-xs tracking-[0.3em] uppercase text-[#777777]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Portfolio 2026
          </span>
          <span className="w-8 h-px bg-[#F5F3EE]/30" />
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-serif text-[clamp(3rem,7vw,6.5rem)] text-[#F5F3EE] leading-none tracking-tight"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Andri Putra
          </motion.h1>
        </div>

        {/* Italic subtitle */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="font-serif italic text-[clamp(0.9rem,2vw,1.35rem)] text-[#555555] tracking-wide"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {roles.join(" · ")}
          </motion.p>
        </div>

        {/* Description */}
        <motion.p
          className="text-[#444444] text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12"
          style={{ fontFamily: "var(--font-inter)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
    >
          Crafting digital experiences at the intersection of code, design, and
          hardware. Based in Batam, Indonesia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={() =>
              document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-3.5 bg-[#F5F3EE] text-[#050505] text-sm tracking-widest uppercase overflow-hidden cursor-none"
            style={{ fontFamily: "var(--font-inter)" }}
            data-cursor-btn
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#F5F3EE]">
              Explore My Work
            </span>
            <span className="absolute inset-0 bg-[#050505] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
          </button>

          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group px-8 py-3.5 border border-[#F5F3EE]/20 text-[#F5F3EE]/60 text-sm tracking-widest uppercase hover:text-[#F5F3EE] hover:border-[#F5F3EE]/50 transition-all duration-400 cursor-none"
            style={{ fontFamily: "var(--font-inter)" }}
            data-cursor-btn
          >
            Contact Me
          </button>
        </motion.div>
        </div>
        

        {/* Right: Photo with ink frame */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ink ring decoration */}
          <div className="absolute -inset-6 rounded-full border border-[#F5F3EE]/10 animate-[spin_30s_linear_infinite]" />
          <div className="absolute -inset-10 rounded-full border border-dashed border-[#F5F3EE]/8 animate-[spin_45s_linear_infinite_reverse]" />

          {/* Glow blob behind photo */}
          <div className="absolute inset-0 rounded-full bg-[#F5F3EE]/5 blur-3xl" />

         

        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-[#444444]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#F5F3EE]/30 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-[2] pointer-events-none" />
    </section>
  );
}
