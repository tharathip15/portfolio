import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
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
      style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 2 }}
    >
      <div style={{ maxWidth: '1040px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '14px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyan)',
              letterSpacing: '0.08em',
            }}
          >
            <Briefcase size={14} />
            CAREER TRACK RECORD
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}
          >
            Experience
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            ประสบการณ์ทำงานจริงด้าน IT Infrastructure, IoT Hardware และการพัฒนาระบบเว็บระดับองค์กร
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline Base Line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100%',
              background: 'rgba(148, 163, 184, 0.14)',
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
              style={{ pathLength }}
            />
          </svg>

          <style
            dangerouslySetInnerHTML={{
              __html: `
            .timeline-bg, .timeline-svg {
              display: none;
            }
            .timeline-item {
              width: 100%;
              padding-left: 1.75rem;
              margin-bottom: 1.75rem;
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
                margin-bottom: 1.5rem;
                padding: 0;
              }
              .timeline-item:nth-child(odd) {
                padding-right: 2.5rem;
                margin-left: 0;
              }
              .timeline-item:nth-child(even) {
                padding-left: 2.5rem;
                margin-left: 50%;
              }
              .timeline-item:nth-child(odd) .timeline-node {
                left: auto;
                right: -2.5rem;
                transform: translateX(50%);
              }
              .timeline-item:nth-child(even) .timeline-node {
                left: -2.5rem;
                transform: translateX(-50%);
              }
            }
          `,
            }}
          />

          {experience.map((item, index) => {
            const isCurrent = index === 0;
            return (
              <motion.div
                key={item.id}
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Clean Timeline Node (Only current role has subtle indicator) */}
                <div
                  className="timeline-node"
                  style={{
                    position: 'absolute',
                    top: '1.6rem',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: isCurrent
                      ? 'var(--accent-mint)'
                      : 'var(--accent-cyan)',
                    boxShadow: isCurrent
                      ? '0 0 12px rgba(52, 211, 153, 0.6)'
                      : 'none',
                    zIndex: 2,
                    border: '3px solid var(--bg-primary)',
                  }}
                />

                {/* Compact, High-Craft Card (No looping shimmer slop) */}
                <div
                  style={{
                    background: 'rgba(17, 24, 39, 0.72)',
                    border: `1px solid ${
                      isCurrent
                        ? 'rgba(56, 189, 248, 0.28)'
                        : 'rgba(148, 163, 184, 0.14)'
                    }`,
                    borderRadius: '16px',
                    padding: '1.4rem 1.6rem',
                    position: 'relative',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    textAlign: 'left',
                  }}
                >
                  {/* Top Row: Role & Period Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {item.role}
                    </h3>

                    <span
                      style={{
                        background: isCurrent
                          ? 'rgba(52, 211, 153, 0.12)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${
                          isCurrent
                            ? 'rgba(52, 211, 153, 0.3)'
                            : 'rgba(255, 255, 255, 0.1)'
                        }`,
                        color: isCurrent
                          ? 'var(--accent-mint)'
                          : 'var(--text-muted)',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.73rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.period}
                    </span>
                  </div>

                  {/* Company Name */}
                  <div
                    style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '0.95rem',
                      marginBottom: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.company}
                  </div>

                  {/* Concise Description */}
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Compact Bullet Points */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: '10px 12px',
                      margin: 0,
                      background: 'rgba(11, 15, 23, 0.6)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {item.achievements.slice(0, 4).map((achievement, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.82rem',
                          lineHeight: 1.45,
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          style={{
                            color: 'var(--accent-cyan)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
