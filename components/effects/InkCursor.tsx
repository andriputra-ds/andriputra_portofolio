"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

export default function InkCursor() {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const trailIdRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail
      const id = trailIdRef.current++;
      setTrails((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 600);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isBtn =
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[data-cursor-btn]") !== null;
      const isCard = target.closest("[data-cursor-card]") !== null;
      setIsHoveringButton(isBtn);
      setIsHoveringCard(isCard);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Ink trails */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full bg-[#F5F3EE]"
          style={{
            left: trail.x,
            top: trail.y,
            width: 4,
            height: 4,
            x: -2,
            y: -2,
            opacity: (i / trails.length) * 0.4,
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Outer ring — follows with spring lag */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border border-[#F5F3EE]/50"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHoveringCard ? 64 : isHoveringButton ? 48 : 32,
          height: isHoveringCard ? 64 : isHoveringButton ? 48 : 32,
          borderColor: isHoveringButton
            ? "rgba(245,243,238,0.9)"
            : "rgba(245,243,238,0.4)",
          backgroundColor: isHoveringButton
            ? "rgba(245,243,238,0.08)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Inner dot — snaps to cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-[#F5F3EE]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHoveringButton ? 6 : 5,
          height: isHoveringButton ? 6 : 5,
          opacity: isHoveringCard ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 40 }}
      />
    </>
  );
}
