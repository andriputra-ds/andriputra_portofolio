"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => sections.forEach((s) => obs.unobserve(s));
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,243,238,0.06)" : "none",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center cursor-none"
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/Andri.png"
            alt="Andri Putra"
            width={44}
            height={44}
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md"
            priority
          />
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="relative text-sm tracking-widest uppercase cursor-none group"
                style={{
                  color: isActive ? "#F5F3EE" : "#555555",
                  fontFamily: "var(--font-inter)",
                  transition: "color 0.3s ease",
                }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#F5F3EE] transition-all duration-500"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
                <span className="absolute -bottom-1 left-0 h-px bg-[#F5F3EE] w-0 group-hover:w-full transition-all duration-500" />
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block text-xs tracking-widest uppercase px-5 py-2.5 border border-[#F5F3EE]/20 text-[#F5F3EE]/70 hover:text-[#050505] hover:bg-[#F5F3EE] transition-all duration-400 cursor-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Let&apos;s Talk
        </motion.button>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="block w-6 h-px bg-[#F5F3EE]"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-4 h-px bg-[#F5F3EE]"
            animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-[#F5F3EE]"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-serif text-4xl text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors cursor-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
