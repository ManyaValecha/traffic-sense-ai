import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
}

interface Ring {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function ClickPopEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rings, setRings] = useState<Ring[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Direct click coordinates
      const target = e.target as HTMLElement;
      
      // Determine if clicking interactive elements to customize explosion intensity
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "OPTION";

      // Corporate theme colors: Flipkart Blue, Flipkart Amber/Yellow, Astram Emerald, Alert Orange
      const colors = isInteractive
        ? ["#2874f0", "#ffd91a", "#10b981", "#f97316", "#8b5cf6"]
        : ["#2874f0", "#10b981", "#60a5fa", "#34d399"];

      const clickId = Date.now();

      // 1. Create a beautiful expanding outline ring
      const newRing: Ring = {
        id: clickId,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setRings((prev) => [...prev, newRing].slice(-8)); // Caps memory capacity

      // 2. Create micro particle dots radiating outwards
      const particleCount = isInteractive ? 10 : 5;
      const newParticles: Particle[] = Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i * (360 / particleCount) + Math.random() * 45) * (Math.PI / 180);
        // Slightly larger radiation sphere if interactive element clicked
        const distance = isInteractive ? 45 + Math.random() * 45 : 20 + Math.random() * 25;
        const size = isInteractive ? 5 + Math.random() * 5 : 3.5 + Math.random() * 3.5;
        return {
          id: clickId + i,
          x: e.clientX,
          y: e.clientY,
          angle,
          distance,
          color: colors[i % colors.length],
          size,
        };
      });
      setParticles((prev) => [...prev, ...newParticles].slice(-30)); // Caps active dots
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // GC expired animation fragments periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) => prev.filter((p) => now - p.id < 550));
      setRings((prev) => prev.filter((r) => now - r.id < 450));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      <AnimatePresence>
        {/* Dynamic expands */}
        {rings.map((ring) => (
          <motion.div
            key={`ring-${ring.id}`}
            initial={{ opacity: 0.75, scale: 0, x: ring.x, y: ring.y }}
            animate={{
              opacity: 0,
              scale: 2.2,
              transition: { duration: 0.38, ease: "easeOut" },
            }}
            exit={{ opacity: 0 }}
            className="absolute rounded-full border-1.5 -translate-x-1/2 -translate-y-1/2"
            style={{
              borderColor: ring.color,
              width: "32px",
              height: "32px",
            }}
          />
        ))}

        {/* Dynamic bursts */}
        {particles.map((p) => {
          const destX = Math.cos(p.angle) * p.distance;
          const destY = Math.sin(p.angle) * p.distance;
          return (
            <motion.div
              key={`p-${p.id}`}
              initial={{ x: p.x, y: p.y, scale: 1.2, opacity: 1 }}
              animate={{
                x: p.x + destX,
                y: p.y + destY,
                scale: 0,
                opacity: 0,
                transition: { duration: 0.45, ease: [0.1, 0.8, 0.25, 1.0] },
              }}
              exit={{ opacity: 0 }}
              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}aa`,
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
