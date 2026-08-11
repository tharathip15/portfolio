import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);
import { projects } from '../data/portfolio';
import GlowCard from './GlowCard';

const FILTERS = ['All', 'Enterprise', 'Consumer', 'Data'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(
    (project) => activeFilter === 'All' || project.category === activeFilter
  );

  return (
    <section id="projects" style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              display: 'inline-block'
            }}
          >
            {"Projects".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, type: 'spring' }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Real-world systems I've built and deployed
          </p>
        </motion.div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {FILTERS.map((filter) => (
            <div key={filter} style={{ position: 'relative' }}>
              {activeFilter === filter && (
                <motion.div
                  layoutId="project-filter-pill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    background: 'var(--gradient-accent)',
                    zIndex: 0,
                  }}
                />
              )}
              <button
                onClick={() => setActiveFilter(filter)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '0.5rem 1.5rem',
                  borderRadius: '9999px',
                  background:
                    activeFilter === filter
                      ? 'transparent'
                      : 'var(--glass-bg)',
                  border: `1px solid ${
                    activeFilter === filter
                      ? 'transparent'
                      : 'var(--glass-border)'
                  }`,
                  color:
                    activeFilter === filter
                      ? '#000'
                      : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: activeFilter === filter ? 600 : 400,
                }}
              >
                {filter}
              </button>
            </div>
          ))}
        </div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '2rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                transition={{ 
                  opacity: { duration: 0.35, delay: index * 0.1 },
                  scale: { type: 'spring', damping: 15, delay: index * 0.1 },
                  layout: { type: 'spring', damping: 25, stiffness: 200 }
                }}
                whileHover={{ y: -8 }}
                style={{ height: '100%' }}
              >
                <GlowCard glowColor={project.color}>
                  <div
                    style={{
                      height: '4px',
                      background: project.color,
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      padding: '2rem',
                      borderLeft: `3px solid ${project.color}80`,
                      height: 'calc(100% - 4px)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.5rem',
                          color: 'var(--text-primary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        {project.subtitle}
                      </p>
                    </div>

                    <p
                      style={{
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        marginBottom: '1.5rem',
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 1.5rem 0',
                      }}
                    >
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem',
                            color: 'var(--text-dim)',
                            fontSize: '0.95rem',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: project.color,
                              marginTop: '8px',
                              marginRight: '0.75rem',
                              flexShrink: 0,
                            }}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      <a
                        href={project.link || '#'}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: project.color,
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          gap: '0.25rem',
                        }}
                      >
                        Learn More <ChevronRight size={16} />
                      </a>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <GithubIcon size={18} />
                          </a>
                        )}
                        {project.external && (
                          <a
                            href={project.external}
                            style={{ color: 'var(--text-muted)' }}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
