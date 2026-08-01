"use client";

import { useEffect, useRef, useState } from "react";

interface EnsoProps {
  side: "left" | "right";
  isDarkBg: boolean;
  size?: "small" | "medium" | "large";
}

export default function EnsoDecoration({ side, isDarkBg, size = "medium" }: EnsoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  const sizeMap = {
    small: 300,
    medium: 450,
    large: 600,
  };

  const circleRadius = sizeMap[size] / 2;
  const opacity = 0.25; // Increased to 20-25% for proper visibility

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDimensions({ width: 400, height: 400 });
      } else if (width < 1024) {
        setDimensions({ width: 600, height: 600 });
      } else {
        setDimensions({ width: 800, height: 800 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log("Rendering Enso:", { side, isDarkBg, dimensions, radius: circleRadius });

    // Position circle so 50-60% is cropped outside viewport
    // Left side: circle extends from left edge inward
    // Right side: circle extends from right edge inward
    const centerX = side === "left" ? -circleRadius * 0.55 : canvas.width + circleRadius * 0.55;
    const centerY = canvas.height / 2;

    // Main brush stroke layers - multiple passes for authentic dry-brush effect
    const layerCount = 12;
    const baseRadius = circleRadius;

    for (let layer = 0; layer < layerCount; layer++) {
      // Add organic variation to each layer
      const radiusVariation = baseRadius + (Math.random() - 0.5) * 25;
      const offsetX = (Math.random() - 0.5) * 12;
      const offsetY = (Math.random() - 0.5) * 12;
      const strokeWidthVariation = 2.5 + Math.random() * 5.5;

      // Vary opacity per layer for depth
      const layerOpacity = opacity * (0.6 + Math.random() * 0.4);

      ctx.strokeStyle = `rgba(${
        isDarkBg ? "245, 245, 245" : "17, 17, 17"
      }, ${layerOpacity})`;
      ctx.lineWidth = strokeWidthVariation;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Draw arc (40-50% of circle) with organic variation
      ctx.beginPath();
      const arcVariation = (Math.random() - 0.5) * 0.15; // Add slight randomness to arc extent
      const startAngle = side === "left" ? Math.PI * 0.5 : Math.PI * 1.5;
      const endAngle =
        side === "left"
          ? Math.PI * 0.5 + Math.PI * (0.8 + arcVariation)
          : Math.PI * 1.5 + Math.PI * (0.8 + arcVariation);

      ctx.arc(
        centerX + offsetX,
        centerY + offsetY,
        radiusVariation,
        startAngle,
        endAngle,
        false
      );
      ctx.stroke();
    }

    // Add authentic brush fiber texture and imperfections
    const fiberCount = 25;
    for (let i = 0; i < fiberCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = circleRadius * (0.3 + Math.random() * 0.65);
      const fiberX = centerX + Math.cos(angle) * distance;
      const fiberY = centerY + Math.sin(angle) * distance;
      const fiberLength = 3 + Math.random() * 18;
      const fiberAngle = Math.random() * Math.PI * 2;
      const fiberWidth = 0.3 + Math.random() * 0.8;

      ctx.strokeStyle = `rgba(${
        isDarkBg ? "245, 245, 245" : "17, 17, 17"
      }, ${opacity * (0.25 + Math.random() * 0.3)})`;
      ctx.lineWidth = fiberWidth;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(
        fiberX + Math.cos(fiberAngle) * fiberLength,
        fiberY + Math.sin(fiberAngle) * fiberLength
      );
      ctx.lineTo(
        fiberX - Math.cos(fiberAngle) * fiberLength * 0.7,
        fiberY - Math.sin(fiberAngle) * fiberLength * 0.7
      );
      ctx.stroke();
    }

    // Add subtle edge imperfections and paint splatters for handmade feel
    const splatterCount = 8;
    for (let i = 0; i < splatterCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = circleRadius * (0.7 + Math.random() * 0.35);
      const splatterX = centerX + Math.cos(angle) * distance;
      const splatterY = centerY + Math.sin(angle) * distance;
      const splatterSize = 1 + Math.random() * 4;

      ctx.fillStyle = `rgba(${
        isDarkBg ? "245, 245, 245" : "17, 17, 17"
      }, ${opacity * (0.3 + Math.random() * 0.4)})`;
      ctx.beginPath();
      ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add subtle wash/gradient effect at edges for depth
    for (let wash = 0; wash < 3; wash++) {
      const washAngle = Math.random() * Math.PI * 2;
      const washDistance = circleRadius * (0.4 + wash * 0.15);
      const washSize = circleRadius * (0.25 + Math.random() * 0.15);
      const washOpacity = opacity * 0.15;

      const gradient = ctx.createRadialGradient(
        centerX + Math.cos(washAngle) * washDistance,
        centerY + Math.sin(washAngle) * washDistance,
        0,
        centerX + Math.cos(washAngle) * washDistance,
        centerY + Math.sin(washAngle) * washDistance,
        washSize
      );

      gradient.addColorStop(
        0,
        `rgba(${isDarkBg ? "245, 245, 245" : "17, 17, 17"}, ${washOpacity})`
      );
      gradient.addColorStop(
        1,
        `rgba(${isDarkBg ? "245, 245, 245" : "17, 17, 17"}, 0)`
      );

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(washAngle) * washDistance,
        centerY + Math.sin(washAngle) * washDistance,
        washSize,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, [dimensions, side, isDarkBg, circleRadius, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        right: side === "right" ? 0 : "auto",
        left: side === "left" ? 0 : "auto",
        top: 0,
      }}
    />
  );
}
