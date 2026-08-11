import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GlowCard = ({
  children,
  style = {},
  className = '',
  glowColor = 'var(--accent-cyan, #00F0FF)',
  as: Component = 'div',
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={className}
      style={{
        position: 'relative',
        background: isHovered ? 'var(--bg-surface-hover, rgba(255,255,255,0.08))' : 'var(--glass-bg, rgba(255,255,255,0.04))',
        backdropFilter: 'var(--glass-blur, blur(16px))',
        WebkitBackdropFilter: 'var(--glass-blur, blur(16px))',
        borderRadius: 'var(--radius-lg, 1rem)',
        border: `1px solid ${isHovered ? 'var(--border-glow, rgba(0,240,255,0.3))' : 'var(--glass-border, rgba(255,255,255,0.08))'}`,
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        boxShadow: isHovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glowColor}15`
          : '0 8px 32px rgba(0,0,0,0.2)',
        ...style
      }}
      {...props}
    >
      {/* Primary cursor glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
          opacity: isHovered ? 0.12 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 0,
        }}
      />

      {/* Secondary rim glow on edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}30, transparent 50%)`,
          opacity: isHovered ? 0.2 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 0,
          filter: 'blur(20px)',
        }}
      />

      {/* Shimmer sweep on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: '25%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
            animation: 'shimmer-sweep 1.5s ease-in-out',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      
      {/* Inner content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlowCard;
