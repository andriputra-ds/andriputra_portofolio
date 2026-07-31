"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Project {
  number: string;
  name: string;
  description: string;
  tech: string[];
  year: string;
  link: string;
  dark: boolean;
  picture?: string;
  gallery?: string[];
}

const projects: Project[] = [
  {
    number: "01",
    name: "Virtual Event Check-In",
    description:
      "Digital attendance system for online events — webinars, workshops, and conferences. Enables organizers to manage participant check-in efficiently with real-time tracking.",
    tech: ["PHP Native", "MySQL", "AJAX", "jQuery", "Bootstrap"],
    year: "2024",
    link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-absensi-peserta-acara-online&id=MjU1NQ==&ta=NQ==&id_tim=Mjg1Mg==",
    dark: true,
    picture: "/vec-sem1.png",
  },
  {
    number: "02",
    name: "Tracer Study Polibatam",
    description:
      "Alumni career tracking web application with dynamic questionnaires, career statistics, and alumni data visualization. Built for Polibatam's institutional research.",
    tech: ["Laravel", "MySQL", "JavaScript", "Tailwind CSS", "Chart.js"],
    year: "2025",
    link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=pengembangan-web-tracer-study-polibatam&id=MzEyNw==&ta=Ng==&id_tim=MzkxNA==",
    dark: false,
    picture: "/Tracer BG.png",
  },
  {
    number: "03",
    name: "Berdikari Talent Cerdas",
    description:
      "Job fair platform for Polibatam with AI-powered job matching. I built the digital check-in/check-out feature for event participants.",
    tech: ["Laravel", "JavaScript", "Bootstrap", "MySQL"],
    year: "2025",
    link: "https://talentcerdas.id",
    dark: true,
    picture: "/berdikari.png",
  },
  {
    number: "04",
    name: "Jobnova",
    description:
      "Mobile job-search app with AI-powered recommendations based on user skills and interests. Connected to talentcerdas.id with a Golang backend.",
    tech: ["Flutter", "Dart", "Golang", "Firebase", "MySQL"],
    year: "2026",
    link: "https://pbl.polibatam.ac.id/pamerin/detail.php?title=aplikasi-pencari-kerja&id=NDQ5OQ==&ta=Nw==&id_tim=NTQwNg==",
    dark: false,
    picture: "/Jobnova.png",
  },
  {
    number: "05",
    name: "Huiz floral",
    description:
"A creative e-commerce platform for handmade flower gifts, featuring unique handcrafted bouquets, custom designs, and a seamless shopping experience.",
    tech: ["React", "Next.js", "MySQL", "Javascript", "Tailwind CSS"],
    year: "2026",
    link: "https://huiz.my.id",
    dark: true,
    picture: "/HUIZ.png",
    gallery: ["/HUIZ-1.png", "/HUIZ-2.png", "/HUIZ-3.png"],
  },
  {
    number: "06",
    name: "Smart Guard Door IoT ",
   description:
"An AI-powered IoT smart door security system developed during a hackathon at Singapore Polytechnic, combining Raspberry Pi 5 and Advantech ADAM-6717 for real-time monitoring, YOLO-based object detection, and intelligent knock classification to distinguish normal knocks from forced entry attempts.",
    tech: ["Raspberry PI5 ", "Next.js", "Golang", "Adam6717", "YOLOv8", "EMQX","MySQL"],
    year: "2026",
    link: "https://github.com/andriputra/smart-guard-door-iot",
    dark: false,
    picture: "/Mehabsen.png",
    gallery: ["/Mehabsen-1.png", "/Mehabsen-2.png", "/Mehabsen-3.png", "/Mehabsen-4.png", "/Mehabsen-5.png", "/Mehabsen-6.png", "/Mehabsen-7.png", "/Mehabsen-8.png"],
  },
  {
    number: "07",
    name: "Smart Attendance Device Multi System (TIKA)",
    description: "A multi-system smart attendance device that integrates facial recognition, RFID, and QR code scanning for efficient and secure attendance tracking in educational institutions and workplaces.",
    tech: ["ESP32", "Next.js", "Golang", "ESP-32-CAM", "MySQL", "EMQX","Face recognition"],
    year: "2026",
    dark: true,
    link: "",
    picture: "/TIKA.png",
    gallery: ["/TIKA-1.png", "/TIKA-2.png", "/TIKA-3.png", "/TIKA-4.png"],
  },
];

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // 🔽 Tambahkan state untuk slider
  const [slide, setSlide] = useState(0);

  const images = project.gallery?.length
    ? project.gallery
    : project.picture
      ? [project.picture, project.picture, project.picture]
      : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Ink spread backdrop */}
        <motion.div
          className="absolute inset-0 bg-[#050505]"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          onClick={onClose}
        />

        {/* Modal content */}
        <motion.div
          className="relative z-10 max-w-7xl w-full max-h-[95vh] overflow-y-auto border border-[#F5F3EE]/10 bg-[#0a0a0a] p-6 md:p-10 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#555555] hover:text-[#F5F3EE] transition-colors cursor-none text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Close ✕
          </button>

          {/* Project gallery slider */}
          {images.length > 0 && (
            <div className="relative w-full h-64 sm:h-96 md:h-[32rem] lg:h-[42rem] mb-10 overflow-hidden rounded-sm bg-[#050505]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex w-full h-full items-center justify-center p-2 md:p-4"
                >
                  <img
                    src={images[slide]}
                    alt={`${project.name} preview ${slide + 1}`}
                    className="h-full w-auto max-w-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSlide((s) => (s - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white text-lg transition-colors hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSlide((s) => (s + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white text-lg transition-colors hover:bg-black/70"
                    aria-label="Next image"
                  >
                    →
                  </button>

                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === slide ? "w-8 bg-white" : "w-2 bg-white/40"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <span
            className="text-[#333333] font-serif text-5xl md:text-6xl leading-none block mb-4"
          >
            {project.number}
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-[#F5F3EE] mb-6 leading-tight pr-10">
            {project.name}
          </h3>

          <p
            className="text-[#666666] text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[#F5F3EE]/10 text-[#555555]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span
              className="text-xs text-[#333333] tracking-widest"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {project.year}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-[#F5F3EE]/70 hover:text-[#F5F3EE] transition-colors cursor-none"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View Project
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </div>


        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isDark = project.dark;

  return (
    <motion.div
      className="relative overflow-hidden cursor-none"
      style={{
        backgroundColor: isDark ? "#050505" : "#F5F3EE",
        color: isDark ? "#F5F3EE" : "#050505",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      data-cursor-card
    >
      {/* Ink spread on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(245,243,238,0.04) 0%, transparent 60%)"
            : "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(5,5,5,0.04) 0%, transparent 60%)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Project image */}
      {project.picture && (
        <motion.div
          className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden border-b"
          style={{
            borderColor: isDark ? "rgba(245,243,238,0.06)" : "rgba(5,5,5,0.06)",
            backgroundColor: isDark ? "#0a0a0a" : "#f0eee9",
          }}
        >
          <div className="relative w-full h-full p-8 md:p-12 flex items-center justify-center">
            <div className="relative w-full h-full max-w-3xl">
              {/* Logo — hidden/samurai by default, appears on hover */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: hovered ? 1 : 0.15,
                  filter: hovered ? "blur(0px)" : "blur(6px)",
                  scale: hovered ? 1 : 0.92,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={project.picture}
                  alt={project.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Hover prompt */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className="text-[10px] tracking-[0.3em] uppercase px-4 py-2 border"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: isDark ? "#888888" : "#666666",
                    borderColor: isDark
                      ? "rgba(245,243,238,0.15)"
                      : "rgba(5,5,5,0.15)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  Hover to reveal
                </span>
              </motion.div>
            </div>
            {/* Image tint overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(to top, #050505 0%, transparent 40%)"
                  : "linear-gradient(to top, #F5F3EE 0%, transparent 40%)",
                opacity: hovered ? 0.4 : 0.8,
              }}
            />
          </div>
        </motion.div>
      )}

      <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end min-h-[280px]">
        {/* Number */}
        <div className="md:col-span-2">
          <motion.span
            className="font-serif text-6xl md:text-7xl leading-none"
            style={{ color: isDark ? "#1a1a1a" : "#e0ddd6" }}
            animate={{ opacity: hovered ? 0.4 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.number}
          </motion.span>
        </div>

        {/* Content */}
        <div className="md:col-span-7">
          <motion.h3
            className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight mb-4"
            animate={{ x: hovered ? 8 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.name}
          </motion.h3>
          <motion.p
            className="text-sm leading-relaxed max-w-lg"
            style={{
              fontFamily: "var(--font-inter)",
              color: isDark ? "#555555" : "#888888",
            }}
            animate={{ opacity: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {project.description.slice(0, 100)}…
          </motion.p>
        </div>

        {/* Meta */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-inter)",
              color: isDark ? "#333333" : "#aaaaaa",
            }}
          >
            {project.year}
          </span>
          <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[9px] tracking-widest uppercase px-2 py-1 border"
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: isDark
                    ? "rgba(245,243,238,0.1)"
                    : "rgba(5,5,5,0.1)",
                  color: isDark ? "#444444" : "#999999",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <motion.span
            className="text-xs tracking-widest uppercase mt-2"
            style={{
              fontFamily: "var(--font-inter)",
              color: isDark ? "#F5F3EE" : "#050505",
            }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            View →
          </motion.span>
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: isDark
            ? "rgba(245,243,238,0.06)"
            : "rgba(5,5,5,0.06)",
        }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="works"
      ref={ref}
      className="relative bg-[#050505] text-[#F5F3EE] py-32 md:py-40 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-24 mb-16">
        <motion.span
          className="text-xs tracking-[0.3em] uppercase text-[#444444] block mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Selected Works
        </motion.span>
        <div className="overflow-hidden">
          <motion.h2
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Projects
          </motion.h2>
        </div>
      </div>

      {/* Project cards */}
      <div className="border-t border-[#F5F3EE]/06">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
