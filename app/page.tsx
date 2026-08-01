"use client";

import InkCursor from "@/components/effects/InkCursor";
import InkSplash from "@/components/effects/InkSplash";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JourneySection from "@/components/sections/JourneySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <main
      className="relative"
      style={{
        backgroundColor: "#050505",
        color: "#F5F3EE",
        fontFamily: "var(--font-inter)",
        cursor: "none",
      }}
    >
      {/* Ink splash background effect */}
      <InkSplash />

      {/* Custom ink cursor */}
      <InkCursor />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}