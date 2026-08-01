"use client";

import React from "react";
import EnsoDecoration from "@/components/effects/EnsoDecoration";

interface SectionWithEnsoProps {
  children: React.ReactNode;
  isDarkBg?: boolean;
  sectionIndex: number;
  size?: "small" | "medium" | "large";
}

export default function SectionWithEnso({
  children,
  isDarkBg = true,
  sectionIndex,
  size = "medium",
}: SectionWithEnsoProps) {
  // Alternate between left and right
  const side = sectionIndex % 2 === 0 ? "left" : "right";

  return (
    <div className="relative w-full overflow-hidden">
      {/* Enso decoration - positioned absolutely behind content */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <EnsoDecoration side={side} isDarkBg={isDarkBg} size={size} />
      </div>

      {/* Content */}
      <div className="relative w-full" style={{ zIndex: 10 }}>{children}</div>
    </div>
  );
}
