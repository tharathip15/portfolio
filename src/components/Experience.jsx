import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import { experience } from '../data/portfolio';

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      style={{ padding: '6rem 2rem', position: 'relative' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            Experience
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100%',
              background: 'var(--glass-border)',
              display: 'none',
            }}
            className="timeline-bg"
          />
          
          <svg
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100%',
              zIndex: 1,
            }}
            className="timeline-svg"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-violet)" />
              </linearGradient>
            </defs>
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              style={{ pathLength, filter: 'drop-shadow(0 0 8px var(--accent-cyan))' }}
            />
          </svg>

          {/* Fallback CSS for mobile / desktop diff */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .shimmer-bg {
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
              background-size: 200% 100%;
              animation: shimmer 3s infinite linear;
            }
            .timeline-bg, .timeline-svg {
              display: none;
            }
            .timeline-item {
              width: 100%;
              padding-left: 2rem;
              margin-bottom: 3rem;
              position: relative;
            }
            .timeline-node {
              left: 0;
              transform: translateX(-50%);
            }
            @media (min-width: 768px) {
              .timeline-bg, .timeline-svg {
                display: block;
              }
              .timeline-item {
                width: 50%;
                margin-bottom: 2rem;
                padding: 0;
              }
              .timeline-item:nth-child(odd) {
                padding-right: 3rem;
                margin-left: 0;
                text-align: right;
              }
              .timeline-item:nth-child(even) {
                padding-left: 3rem;
                margin-left: 50%;
              }
              .timeline-node {
                left: 50%;
                transform: translateX(-50%);
              }
              .timeline-item:nth-child(odd) .timeline-node {
                left: auto;
                right: -3rem;
                transform: translateX(50%);
              }
              .timeline-item:nth-child(even) .timeline-node {
                left: -3rem;
                transform: translateX(-50%);
              }
              .item-content {
                display: flex;
                flex-direction: column;
              }
              .timeline-item:nth-child(odd) .item-content {
                align-items: flex-end;
              }
              .timeline-item:nth-child(even) .item-content {
                align-items: flex-start;
              }
            }
          `}} />

          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <motion.div
                className="timeline-node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', delay: index * 0.3 + 0.2 }}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--gradient-accent)',
                  boxShadow: 'var(--glow-cyan)',
                  zIndex: 2,
                  border: '4px solid var(--bg-primary)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-cyan)',
                  }}
                />
              </motion.div>

              <div
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  overflow: 'hidden'
                }}
                className="item-content"
              >
                <div 
                  className="shimmer-bg" 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 'auto', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                    style={{
                      background: 'var(--bg-surface-hover)',
                      padding: '0.25rem 1rem',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.period}
                  </motion.div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {item.role}
                </h3>
                <h4
                  style={{
                    color: 'var(--accent-cyan)',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                    fontWeight: 500,
                  }}
                >
                  {item.company}
                </h4>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {item.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  {item.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        color: 'var(--text-dim)',
                        fontSize: '0.95rem',
                      }}
                    >
                      <Award
                        size={16}
                        style={{
                          color: 'var(--accent-mint)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
