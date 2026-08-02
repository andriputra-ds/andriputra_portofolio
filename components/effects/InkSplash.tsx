"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function InkSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Add new trail point when mouse moves
      if (mouse.active) {
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only add point if mouse actually moved
        if (dist > 1) {
          // Speed determines trail thickness (slower = thicker brush stroke)
          const speed = Math.min(dist, 30);
          const size = 6 + Math.min(speed * 0.3, 8);

          pointsRef.current.push({
            x: mouse.x,
            y: mouse.y,
            life: 0,
            maxLife: 70 + Math.random() * 30,
            size,
          });

          // Interpolate intermediate points for smooth continuous stroke
          if (dist > 8) {
            const steps = Math.min(Math.floor(dist / 4), 8);
            for (let i = 1; i < steps; i++) {
              const t = i / steps;
              pointsRef.current.push({
                x: mouse.lastX + dx * t,
                y: mouse.lastY + dy * t,
                life: 0,
                maxLife: 70 + Math.random() * 30,
                size: size * (1 - t * 0.4),
              });
            }
          }

          // Limit trail points
          if (pointsRef.current.length > 400) {
            pointsRef.current.splice(0, pointsRef.current.length - 400);
          }
        }
      }

      // Draw trail with brush-like rendering
      // Use a persistent stroke style - draw each point as soft circle
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        p.life++;

        if (p.life >= p.maxLife) {
          pointsRef.current.splice(i, 1);
          i--;
          continue;
        }

        const lifeProgress = p.life / p.maxLife;
        const alpha = Math.pow(1 - lifeProgress, 1.5) * 0.5;
        const size = p.size * (1 - lifeProgress * 0.5);

        // Soft brush stroke circle
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          size
        );
        gradient.addColorStop(0, `rgba(245, 243, 238, ${alpha})`);
        gradient.addColorStop(0.6, `rgba(245, 243, 238, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(245, 243, 238, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting stroke between recent points for continuous brush line
      if (pointsRef.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const recent = pointsRef.current.slice(-30);
        for (let i = 1; i < recent.length; i++) {
          const a = recent[i - 1];
          const b = recent[i];

          if (a.life > 80 || b.life > 80) continue;

          const alpha = 0.28 * (1 - Math.max(a.life, b.life) / 90);
          ctx.strokeStyle = `rgba(245, 243, 238, ${alpha})`;
          ctx.lineWidth = ((a.size + b.size) / 2) * 0.6;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 hidden md:block"
      style={{ mixBlendMode: "difference" }}
    />
  );
}
