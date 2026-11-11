import React, { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 25 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Top architectural radial light (clean, non-rainbow studio depth) */}
      <div
        style={{
          position: 'absolute',
          top: '-22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1100px',
          height: '620px',
          background:
            'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.085) 0%, rgba(129, 140, 248, 0.04) 42%, transparent 72%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Interactive cursor spotlight (subtle ambient follow) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(650px circle at ${mouse.x}% ${mouse.y}%, rgba(56, 189, 248, 0.045), transparent 60%)`,
          transition: 'background 0.15s ease-out',
        }}
      />

      {/* Precision technical grid with radial vignette mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 65% at 50% 35%, #000 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 65% at 50% 35%, #000 30%, transparent 100%)',
        }}
      />

      {/* Subtle secondary micro-grid intersections */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(56, 189, 248, 0.14) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          backgroundPosition: '-0.5px -0.5px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 28%, #000 10%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 28%, #000 10%, transparent 90%)',
          opacity: 0.55,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
