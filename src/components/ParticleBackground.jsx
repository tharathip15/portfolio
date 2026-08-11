import React from 'react';

const ParticleBackground = () => {
  const orbs = [
    { width: '500px', height: '500px', color: 'var(--accent-cyan)', top: '8%', left: '15%', duration: '22s', delay: '0s', opacity: 0.08 },
    { width: '600px', height: '600px', color: 'var(--accent-violet)', top: '45%', left: '55%', duration: '28s', delay: '4s', opacity: 0.07 },
    { width: '350px', height: '350px', color: 'var(--accent-mint)', top: '75%', left: '8%', duration: '24s', delay: '2s', opacity: 0.06 },
    { width: '420px', height: '420px', color: 'var(--accent-amber)', top: '15%', left: '75%', duration: '30s', delay: '6s', opacity: 0.05 },
    { width: '550px', height: '550px', color: 'var(--accent-cyan)', top: '65%', left: '35%', duration: '32s', delay: '10s', opacity: 0.06 },
    { width: '300px', height: '300px', color: 'var(--accent-violet)', top: '35%', left: '85%', duration: '20s', delay: '1s', opacity: 0.07 },
    { width: '250px', height: '250px', color: 'var(--accent-rose)', top: '5%', left: '88%', duration: '18s', delay: '3s', opacity: 0.04 },
    { width: '480px', height: '480px', color: 'var(--accent-teal)', top: '88%', left: '65%', duration: '26s', delay: '8s', opacity: 0.05 },
  ];

  // Floating geometric decorations
  const geometrics = [
    { size: 2, top: '12%', left: '8%', duration: '18s', delay: '0s', color: 'var(--accent-cyan)' },
    { size: 3, top: '25%', left: '92%', duration: '22s', delay: '3s', color: 'var(--accent-violet)' },
    { size: 1.5, top: '55%', left: '5%', duration: '20s', delay: '1s', color: 'var(--accent-mint)' },
    { size: 2.5, top: '72%', left: '88%', duration: '25s', delay: '5s', color: 'var(--accent-amber)' },
    { size: 1, top: '40%', left: '15%', duration: '16s', delay: '2s', color: 'var(--accent-cyan)' },
    { size: 2, top: '85%', left: '45%', duration: '24s', delay: '7s', color: 'var(--accent-violet)' },
    { size: 1.5, top: '18%', left: '55%', duration: '19s', delay: '4s', color: 'var(--accent-rose)' },
    { size: 3, top: '60%', left: '75%', duration: '21s', delay: '6s', color: 'var(--accent-teal)' },
    { size: 1, top: '92%', left: '20%', duration: '17s', delay: '8s', color: 'var(--accent-mint)' },
    { size: 2, top: '8%', left: '42%', duration: '23s', delay: '9s', color: 'var(--accent-cyan)' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -60px) scale(1.08); }
          50% { transform: translate(-30px, 30px) scale(0.95); }
          75% { transform: translate(20px, -20px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes floatDot {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(25px, -40px) scale(1.3); opacity: 0.7; }
          66% { transform: translate(-20px, 20px) scale(0.8); opacity: 0.4; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
      `}</style>

      {/* Ambient gradient orbs */}
      {orbs.map((orb, index) => (
        <div
          key={`orb-${index}`}
          style={{
            position: 'absolute',
            width: orb.width,
            height: orb.height,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(100px)',
            opacity: orb.opacity,
            borderRadius: '50%',
            animation: `floatOrb ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Floating star dots */}
      {geometrics.map((geo, index) => (
        <div
          key={`geo-${index}`}
          style={{
            position: 'absolute',
            top: geo.top,
            left: geo.left,
            width: `${geo.size}px`,
            height: `${geo.size}px`,
            borderRadius: '50%',
            background: geo.color,
            boxShadow: `0 0 ${geo.size * 4}px ${geo.color}`,
            opacity: 0.3,
            animation: `floatDot ${geo.duration} ease-in-out infinite`,
            animationDelay: geo.delay,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.5,
      }} />
    </div>
  );
};

export default ParticleBackground;
