"use client";

import { useEffect, useRef } from "react";

interface Shard {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRotation: number;
  size: number;
  opacity: number;
  points: { x: number; y: number }[];
}

export default function GlassShards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create glass shards
    const createShard = (spread: boolean): Shard => {
      // Sharp angular polygon (broken glass piece)
      const size = 10 + Math.random() * 36;
      const edges = 4 + Math.floor(Math.random() * 4);
      const points: { x: number; y: number }[] = [];
      const baseAngle = Math.random() * Math.PI * 2;
      for (let i = 0; i < edges; i++) {
        const angle = baseAngle + (i / edges) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const r = size * (0.5 + Math.random() * 0.7);
        points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }

      return {
        x: spread ? Math.random() * width : width * (0.5 + Math.random() * 0.5),
        y: spread ? Math.random() * height : -20 - Math.random() * height * 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: 0.15 + Math.random() * 0.45,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.02,
        size,
        opacity: 0.35 + Math.random() * 0.4,
        points,
      };
    };

    const shardCount = 22;
    const shards: Shard[] = Array.from({ length: shardCount }, () => createShard(true));

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      shards.forEach((shard, i) => {
        // Movement
        shard.x += shard.vx;
        shard.y += shard.vy;
        shard.rotation += shard.vRotation;

        // Gentle sway
        shard.vx += Math.sin(frame * 0.01 + i) * 0.001;

        // Reset when out of bounds
        if (shard.y > height + 40) {
          Object.assign(shard, createShard(false));
        }
        if (shard.x < -40) shard.x = width + 20;
        if (shard.x > width + 40) shard.x = -20;

        // Draw glass shard (translucent angular polygon)
        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.rotate(shard.rotation);

        const alpha = shard.opacity;

        // Glass body with gradient
        const grad = ctx.createLinearGradient(
          -shard.size, -shard.size,
          shard.size, shard.size
        );
        grad.addColorStop(0, `rgba(245,243,238,${alpha})`);
        grad.addColorStop(0.5, `rgba(245,243,238,${alpha * 0.55})`);
        grad.addColorStop(1, `rgba(245,243,238,${alpha * 0.2})`);

        ctx.beginPath();
        shard.points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();

        // Sharp edge highlight (glass refraction)
        ctx.strokeStyle = `rgba(245,243,238,${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      style={{ display: "block" }}
    />
  );
}
