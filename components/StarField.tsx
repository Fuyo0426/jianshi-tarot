'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    container.innerHTML = '';
    stars.forEach((star) => {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        border-radius: 50%;
        background: #C4902D;
        opacity: ${star.opacity};
        animation: twinkle ${star.duration}s ease-in-out infinite;
        animation-delay: ${star.delay}s;
        --duration: ${star.duration}s;
        pointer-events: none;
      `;
      container.appendChild(el);
    });

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
