import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import DriftWall from './DriftWall';
import { techStack } from '../data/portfolio';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Auth'];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = CATEGORIES;

  const filteredItems = useMemo(() => {
    if (!techStack) return [];
    if (activeCategory === 'All') return techStack;
    return techStack.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const stats = CATEGORIES.slice(1).map(cat => ({
    category: cat,
    count: techStack?.filter(item => item.category === cat).length ?? 0
  }));

  return (
    <section id="tech" style={{
      minHeight: '100vh',
      padding: '6rem 2rem',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(0,0,0,0) 60%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'blur(60px)'
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <motion.h2 
          initial={{ opacity: 0, y: 40, rotateX: -45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            transformPerspective: 1200,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 'bold',
            background: 'var(--gradient-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 1rem 0'
          }}
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '1.25rem',
            margin: 0
          }}
        >
          Technologies I work with daily
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem auto'
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              position: 'relative',
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'transparent' : 'var(--border-subtle)',
              background: 'transparent',
              color: activeCategory === cat ? '#000' : 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: activeCategory === cat ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              outline: 'none',
              zIndex: 1
            }}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="tech-filter-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--gradient-accent)',
                  borderRadius: '999px',
                  zIndex: -1
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
          </button>
        ))}
      </motion.div>

      {/* Drift Wall */}
      <div style={{ flex: 1, minHeight: '70vh', position: 'relative', marginBottom: '4rem' }}>
        <DriftWall items={filteredItems} />
      </div>

      {/* Summary Stats Bar */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.category}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: i * 0.1, 
              type: 'spring', 
              stiffness: 300, 
              damping: 15,
              bounce: 0.5 
            }}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '1.5rem',
              minWidth: '150px',
              textAlign: 'center',
              backdropFilter: 'var(--glass-blur)'
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              marginBottom: '0.5rem'
            }}>
              {stat.count}
            </div>
            <div style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem'
            }}>
              {stat.category}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
