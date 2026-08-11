import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollExpand = ({ children, expandFrom = 'card', className = '' }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const insetX = useTransform(smoothProgress, [0, 0.6], [15, 0]);
  const insetY = useTransform(smoothProgress, [0, 0.6], [12, 0]);
  const borderRadius = useTransform(smoothProgress, [0, 0.6], [24, 0]);
  
  const clipPath = useTransform(
    [insetX, insetY, borderRadius],
    ([x, y, r]) => `inset(${y}% ${x}% round ${r}px)`
  );

  const scale = useTransform(smoothProgress, [0, 0.6], [0.95, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [0.7, 1]);

  return (
    <div 
      ref={containerRef} 
      style={{ minHeight: '150vh', position: 'relative' }}
      className={className}
    >
      <motion.div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          clipPath, 
          scale, 
          opacity,
          overflow: 'hidden',
          willChange: 'transform, opacity, clip-path'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollExpand;
