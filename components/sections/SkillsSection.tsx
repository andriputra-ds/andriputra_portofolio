"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5, SiCss3, SiJavascript, SiTailwindcss, SiBootstrap,
  SiFlutter, SiPhp, SiLaravel, SiGo, SiReact, SiNextdotjs,
  SiFigma, SiArduino, SiMqtt, SiMysql, SiFirebase,
  SiGit, SiGithub, SiLinux, SiCplusplus,
} from "react-icons/si";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Flutter", icon: SiFlutter },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "PHP", icon: SiPhp },
      { name: "Laravel", icon: SiLaravel },
      { name: "Golang", icon: SiGo },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    name: "IoT",
    skills: [
      { name: "Arduino", icon: SiArduino },
      { name: "C++", icon: SiCplusplus },
      { name: "MQTT", icon: SiMqtt },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux", icon: SiLinux },
    ],
  },
];

function SkillOrb({
  skill,
  index,
  categoryIndex,
}: {
  skill: Skill;
  index: number;
  categoryIndex: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center gap-2 cursor-none group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor-card
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: categoryIndex * 0.05 + index * 0.06,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.12, zIndex: 10 }}
    >
      {/* Ink circle */}
      <motion.div
        className="relative flex items-center justify-center rounded-full border"
        animate={{
          width: hovered ? 80 : 64,
          height: hovered ? 80 : 64,
          borderColor: hovered
            ? "rgba(245,243,238,0.5)"
            : "rgba(245,243,238,0.1)",
          backgroundColor: hovered
            ? "rgba(245,243,238,0.07)"
            : "rgba(245,243,238,0.02)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Ink blob glow */}
        <motion.div
          className="absolute rounded-full bg-[#F5F3EE]"
          animate={{
            width: hovered ? 50 : 0,
            height: hovered ? 50 : 0,
            opacity: hovered ? 0.05 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            color: hovered ? "#F5F3EE" : "rgba(245,243,238,0.35)",
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.25 }}
        >
          <Icon size={24} />
        </motion.div>
      </motion.div>

      {/* Label below */}
      <motion.span
        className="text-[10px] tracking-widest uppercase text-center leading-tight"
        style={{ fontFamily: "var(--font-inter)" }}
        animate={{
          color: hovered ? "#F5F3EE" : "rgba(245,243,238,0.25)",
        }}
        transition={{ duration: 0.25 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative bg-[#050505] text-[#F5F3EE] py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background ink blobs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
            background: `radial-gradient(circle, rgba(245,243,238,0.02) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-[#555555] block mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ink Balance
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-tight"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Skills &amp; Tools
            </motion.h2>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              className="group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: ci * 0.1 }}
            >
              <div className="flex items-start gap-8 md:gap-16">
                {/* Category label */}
                <div className="w-28 md:w-36 shrink-0 pt-5">
                  <button
                    className="text-xs tracking-widest uppercase cursor-none text-left"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color:
                        activeCategory === cat.name ? "#F5F3EE" : "#444444",
                      transition: "color 0.3s",
                    }}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === cat.name ? null : cat.name
                      )
                    }
                  >
                    {cat.name}
                  </button>
                </div>

                {/* Divider */}
                <motion.div
                  className="w-px self-stretch bg-[#F5F3EE]/08 shrink-0"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: ci * 0.1 + 0.2 }}
                  style={{ transformOrigin: "top" }}
                />

                {/* Skill orbs */}
                <div className="flex flex-wrap gap-5 py-2">
                  {cat.skills.map((skill, si) => (
                    <SkillOrb
                      key={skill.name}
                      skill={skill}
                      index={si}
                      categoryIndex={ci}
                    />
                  ))}
                </div>
              </div>

              {/* Horizontal rule */}
              <motion.div
                className="mt-8 h-px bg-[#F5F3EE]/06"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: ci * 0.1 + 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
