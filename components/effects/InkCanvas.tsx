"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetX: number;
  targetY: number;
}

export default function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init blobs
    const count = 8;
    blobsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 80 + Math.random() * 120,
      opacity: 0.04 + Math.random() * 0.06,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      blobsRef.current.forEach((blob, i) => {
        // Drift toward target
        blob.x += (blob.targetX - blob.x) * 0.003 + blob.vx;
        blob.y += (blob.targetY - blob.y) * 0.003 + blob.vy;

        // Occasionally pick new target
        if (frame % (200 + i * 30) === 0) {
          blob.targetX = Math.random() * canvas.width;
          blob.targetY = Math.random() * canvas.height;
        }

        // Mouse attraction (subtle)
        const dx = mouse.x - blob.x;
        const dy = mouse.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          blob.x += dx * 0.0008;
          blob.y += dy * 0.0008;
        }

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;

        // Draw ink blob
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `rgba(245,243,238,${blob.opacity * 1.5})`);
        gradient.addColorStop(0.5, `rgba(200,195,185,${blob.opacity * 0.6})`);
        gradient.addColorStop(1, "rgba(5,5,5,0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Mouse ripple
      if (mouse.x > 0) {
        const ripple = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 120
        );
        ripple.addColorStop(0, "rgba(245,243,238,0.06)");
        ripple.addColorStop(0.4, "rgba(245,243,238,0.02)");
        ripple.addColorStop(1, "rgba(5,5,5,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fillStyle = ripple;
        ctx.fill();
      }

      // Subtle ink veins (SVG-like paths)
      ctx.strokeStyle = "rgba(245,243,238,0.025)";
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        const t = (frame * 0.002 + j * 2) % (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(
          canvas.width * 0.2 + Math.sin(t + j) * 100,
          canvas.height * 0.3 + Math.cos(t * 0.7) * 80
        );
        ctx.bezierCurveTo(
          canvas.width * 0.4 + Math.sin(t * 1.3) * 60,
          canvas.height * 0.5 + Math.cos(t) * 100,
          canvas.width * 0.6 + Math.sin(t * 0.8) * 80,
          canvas.height * 0.4 + Math.cos(t * 1.2) * 60,
          canvas.width * 0.8 + Math.sin(t * 1.1) * 50,
          canvas.height * 0.6 + Math.cos(t * 0.9) * 90
        );
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
