"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const links = [
  { label: "Email", value: "andriputra@email.com", href: "mailto:andriputra@email.com" },
  { label: "GitHub", value: "github.com/andriputra", href: "https://github.com/andriputra-ds" },
  { label: "LinkedIn", value: "linkedin.com/in/andriputra", href: "https://linkedin.com/in/andriputra" },
];

function InkLink({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between py-5 border-b border-[#F5F3EE]/08 cursor-none overflow-hidden"
      whileHover="hover"
    >
      {/* Ink fill on hover */}
      <motion.div
        className="absolute inset-0 bg-[#F5F3EE]"
        variants={{
          hover: { scaleX: 1, originX: 0 },
        }}
        initial={{ scaleX: 0, originX: 0 }}
        transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
      />

      <div className="relative z-10 flex items-center gap-6">
        <span
          className="text-xs tracking-widest uppercase text-[#444444] group-hover:text-[#888888] transition-colors duration-300 w-20"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {label}
        </span>
        <span
          className="font-serif text-xl md:text-2xl text-[#F5F3EE] group-hover:text-[#050505] transition-colors duration-300"
        >
          {value}
        </span>
      </div>

      <motion.span
        className="relative z-10 text-[#444444] group-hover:text-[#050505] transition-colors duration-300"
        variants={{ hover: { x: 6 } }}
        transition={{ duration: 0.3 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section
        id="contact"
        ref={ref}
        className="relative bg-[#050505] text-[#F5F3EE] py-32 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden"
      >
        {/* Ambient ink blobs */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 400,
              height: 400,
              left: i === 0 ? "-10%" : "60%",
              top: i === 0 ? "20%" : "40%",
              background: `radial-gradient(circle, rgba(245,243,238,0.025) 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="mb-20">
            <motion.span
              className="text-xs tracking-[0.3em] uppercase text-[#444444] block mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Get in Touch
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                className="font-serif text-[clamp(2.5rem,7vw,6rem)] leading-none"
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Let the Ink
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-serif italic text-[clamp(2.5rem,7vw,6rem)] leading-none text-[#333333]"
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Flow.
              </motion.h2>
            </div>

            <motion.p
              className="mt-8 text-[#555555] text-base max-w-md leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have a project in mind? Want to collaborate? Or just want to say
              hello — I&apos;m always open to a conversation.
            </motion.p>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="border-t border-[#F5F3EE]/08">
              {links.map((link) => (
                <InkLink key={link.label} {...link} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#050505] border-t border-[#F5F3EE]/06 px-6 md:px-16 lg:px-24 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="font-serif text-[#F5F3EE]/40 text-sm"
          >
            Andri Putra
          </span>

          <div className="flex items-center gap-2">
            {/* Animated ink dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-[#F5F3EE]/20"
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span
              className="text-[#333333] text-xs tracking-widest"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              © 2026
            </span>
            <span
              className="text-[#2a2a2a] text-xs italic"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Built with curiosity.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
