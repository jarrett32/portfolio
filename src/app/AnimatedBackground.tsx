"use client";

import { useEffect, useRef } from "react";

type ExternalAddParticlesOptionsProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  count: number;
};

type GeneratorType = "area" | "spiral";

let externalAddParticles: (
  generatorType: GeneratorType,
  options: ExternalAddParticlesOptionsProps,
) => void;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];

    const maxParticles = 100;

    const updateParticles = () => {
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.size > 0.2) particle.size -= 0.001;

        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });

      if (particles.length < maxParticles) {
        const spiralGen = new SpiralGenerator(
          Math.random() * canvas.width, // Random center X
          Math.random() * canvas.height, // Random center Y
        );
        particles.push(
          ...spiralGen.generateParticles(Math.floor(Math.random() * 20 + 10)),
        );
      }
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    animate();

    // Expose particle addition externally
    externalAddParticles = (
      generatorType: GeneratorType,
      options: ExternalAddParticlesOptionsProps,
    ) => {
      if (generatorType === "area") {
        const areaGen = new AreaGenerator(
          options.x,
          options.y,
          options.width,
          options.height,
        );
        particles.push(...areaGen.generateParticles(options.count));
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 h-full w-full"
    />
  );
}

export class SpiralGenerator {
  constructor(
    private centerX: number,
    private centerY: number,
  ) {}

  generateParticles(count: number) {
    const generatedParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = i * 0.3;
      const radius = angle * 2;
      const size = Math.random() * 4 + 1;
      const speed = 1 / size;

      generatedParticles.push({
        x: this.centerX + radius * Math.cos(angle),
        y: this.centerY + radius * Math.sin(angle),
        size,
        speedX: speed * Math.cos(angle),
        speedY: speed * Math.sin(angle),
      });
    }
    return generatedParticles;
  }
}

export class AreaGenerator {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
  ) {}

  generateParticles(count: number) {
    const randomCount = count + (Math.random() * 20 - 10);
    const generatedParticles = [];
    for (let i = 0; i < randomCount; i++) {
      const size = Math.random() * 4 + 1;
      const speed = 1 / size;

      generatedParticles.push({
        x: this.x + Math.random() * this.width,
        y: this.y + Math.random() * this.height,
        size,
        speedX: Math.random() * speed * 2 - speed,
        speedY: Math.random() * speed * 2 - speed,
      });
    }
    return generatedParticles;
  }
}

// Export the function for external use
export const addAreaParticles = (options: ExternalAddParticlesOptionsProps) => {
  if (externalAddParticles) {
    externalAddParticles("area", options);
  }
};
