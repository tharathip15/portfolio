import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Simple deterministic pseudo-random generator based on index
const pseudoRandom = (seed) => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

const DriftWall = ({ items = [], className = '' }) => {
  const containerRef = useRef(null);

  // Smooth mouse tracking without state re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const enrichedItems = useMemo(() => {
    return items.map((item, i) => {
      const r1 = pseudoRandom(i * 1.1 + 1);
      const r2 = pseudoRandom(i * 2.2 + 2);
      const r3 = pseudoRandom(i * 3.3 + 3);
      const r4 = pseudoRandom(i * 4.4 + 4);

      const layer = i % 3;
      const speed = layer === 0 ? 0.4 : layer === 1 ? 0.7 : 1.0;
      const opacity = layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1.0;
      const scale = layer === 0 ? 0.85 : layer === 1 ? 0.95 : 1.05;

      const cols = Math.ceil(Math.sqrt(items.length * 1.5)) || 1;
      const rows = Math.ceil(items.length / cols) || 1;
      const col = i % cols;
      const row = Math.floor(i / cols);

      const baseX = 12 + (col / Math.max(1, cols - 1)) * 76 + (r1 * 10 - 5);
      const baseY = 12 + (row / Math.max(1, rows - 1)) * 76 + (r2 * 10 - 5);

      const driftRadiusX = 12 + r3 * 18;
      const driftRadiusY = 12 + r4 * 18;
      const duration = 4 + r1 * 5; // 4s to 9s float cycle

      return {
        ...item,
        id: item.name || i,
        speed,
        opacity,
        scale,
        baseX,
        baseY,
        driftRadiusX,
        driftRadiusY,
        duration,
        delay: r2 * 2,
      };
    });
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        minHeight: '70vh',
        width: '100%',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {enrichedItems.map((item) => (
        <DriftItem
          key={item.id}
          item={item}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
};

const DriftItem = ({ item, smoothMouseX, smoothMouseY }) => {
  const xOffset = useTransform(smoothMouseX, val => val * item.speed * -1);
  const yOffset = useTransform(smoothMouseY, val => val * item.speed * -1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      whileInView={{ opacity: item.opacity, scale: item.scale, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ delay: (item.delay % 2) * 0.3, type: "spring", stiffness: 200, damping: 20 }}
      style={{
        position: 'absolute',
        left: `${item.baseX}%`,
        top: `${item.baseY}%`,
        zIndex: Math.floor(item.scale * 10),
        x: xOffset,
        y: yOffset,
      }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{
            x: [
              -item.driftRadiusX,
              item.driftRadiusX * 0.8,
              item.driftRadiusX,
              -item.driftRadiusX * 0.6,
              -item.driftRadiusX,
            ],
            y: [
              -item.driftRadiusY * 0.5,
              item.driftRadiusY,
              -item.driftRadiusY,
              item.driftRadiusY * 0.7,
              -item.driftRadiusY * 0.5,
            ],
            rotate: [-3, 3, -2, 3, -3],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
        <motion.div
          whileHover={{ 
            scale: 1.15, 
            opacity: 1, 
            zIndex: 50,
            boxShadow: `0 0 20px ${item.color || 'var(--accent-cyan)'}`,
            borderColor: item.color || 'var(--accent-cyan)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 22px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {item.icon && <span style={{ fontSize: '1.2em' }}>{item.icon}</span>}
          <span style={{ fontWeight: 500 }}>{item.name}</span>
          {item.level && (
            <span
              style={{
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8em',
                background: 'rgba(0,240,255,0.1)',
                padding: '2px 8px',
                borderRadius: '999px',
                marginLeft: '4px',
              }}
            >
              {item.level}%
            </span>
          )}
        </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DriftWall;
