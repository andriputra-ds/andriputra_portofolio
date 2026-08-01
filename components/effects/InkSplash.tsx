"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

export default function InkSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
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

    // Create ink splash on mouse move
    const createSplash = (x: number, y: number, intensity: number = 3) => {
      for (let i = 0; i < intensity; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 1 + Math.random() * 3;
        const size = 2 + Math.random() * 8;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          size,
          opacity: 0.8 + Math.random() * 0.2,
        });
      }
    };

    // Random splashes across the viewport
    const createRandomSplash = () => {
      const randomX = Math.random() * canvas.width;
      const randomY = Math.random() * canvas.height;
      createSplash(randomX, randomY, 2);
    };

    // Interval for random splashes
    const splashInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createRandomSplash();
      }
    }, 800);

    // Mouse move splashes
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        createSplash(e.clientX, e.clientY, 1);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.98; // friction

        // Fade out
        const lifeProgress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - lifeProgress);

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size
        );
        gradient.addColorStop(0, `rgba(245, 243, 238, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(245, 243, 238, ${alpha * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          p.x - p.size,
          p.y - p.size,
          p.size * 2,
          p.size * 2
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(splashInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
