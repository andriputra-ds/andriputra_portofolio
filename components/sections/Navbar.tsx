"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Home, User, Zap, Briefcase, Map, Mail } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Zap },
  { label: "Works", href: "#works", icon: Briefcase },
  { label: "Journey", href: "#journey", icon: Map },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 items-center justify-between"
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
        <div className="flex items-center gap-8">
          {navItems.slice(1).map((item) => {
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
          className="text-xs tracking-widest uppercase px-5 py-2.5 border border-[#F5F3EE]/20 text-[#F5F3EE]/70 hover:text-[#050505] hover:bg-[#F5F3EE] transition-all duration-400 cursor-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Let&apos;s Talk
        </motion.button>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 py-2 bg-[#050505]/95 backdrop-blur-lg border-t border-[#F5F3EE]/10 flex items-center justify-around gap-1"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {navItems.map((item) => {
          const isActive = active === item.href.replace("#", "");
          const Icon = item.icon;
          return (
            <motion.button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="flex flex-col items-center justify-center py-2 px-2 cursor-none rounded-lg transition-colors relative group"
              style={{
                color: isActive ? "#F5F3EE" : "#555555",
                minWidth: "3.5rem",
                flex: "1",
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ backgroundColor: "rgba(245,243,238,0.05)" }}
              title={item.label}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="text-[8px] tracking-widest uppercase mt-0.5 hidden sm:inline" style={{ fontFamily: "var(--font-inter)" }}>
                {item.label}
              </span>
              {/* Tooltip untuk mobile tanpa label */}
              <span className="sm:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#050505]/95 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ fontFamily: "var(--font-inter)" }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </>
  );
}
