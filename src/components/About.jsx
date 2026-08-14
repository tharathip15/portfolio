import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { education, personalInfo, certificates } from '../data/portfolio';
import { Sparkles, Terminal, Award, Cpu, MapPin, Zap } from 'lucide-react';

/* ─────────────────────────────────────────────
   Block3D — Interactive Holographic 3D Card
   ───────────────────────────────────────────── */
const Block3D = ({ children, scrollYProgress, startAt, endAt, index, isLast }) => {

  // Smooth 3D mouse tilt interaction
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 14, y: -y * 14 });
  };

  const transitionWindow = 0.025;
  const enterStart = startAt;
  const enterEnd   = Math.min(endAt, startAt + transitionWindow);
  const exitStart  = Math.max(startAt, endAt - transitionWindow);
  const exitEnd    = endAt;
  const isFirst    = index === 1;

  const rotateX = useTransform(
    scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [0, 0, -10]
      : isLast
      ? [10, 0, 0]
      : [10, 0, 0, -10]
  );

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [0, 0, -25]
      : isLast
      ? [25, 0, 0]
      : [25, 0, 0, -25]
  );

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [1, 1, 0.96]
      : isLast
      ? [0.96, 1, 1]
      : [0.96, 1, 1, 0.96]
  );

  const pointerEvents = useTransform(
    scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? ['auto', 'auto', 'none']
      : isLast
      ? ['none', 'auto', 'auto']
      : ['none', 'auto', 'auto', 'none']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '32px',
        paddingLeft: 'clamp(16px, 4vw, 48px)',
        paddingRight: 'clamp(16px, 4vw, 48px)',
        rotateX,
        y,
        scale,
        opacity,
        transformOrigin: 'center bottom',
        zIndex: index,
        pointerEvents: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 3D Interactive Card Wrapper */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        animate={{
          rotateY: isHovered ? mousePos.x : 0,
          rotateX: isHovered ? mousePos.y : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          width: '100%',
          maxWidth: 820,
          background: '#0B0F17',
          border: '1px solid rgba(0, 240, 255, 0.28)',
          borderRadius: 28,
          padding: 'clamp(24px, 4vw, 44px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 35px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.12)',
          pointerEvents,
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-violet), transparent)',
          boxShadow: '0 0 15px var(--accent-cyan)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Progress Dots with Interactive Tooltips
   ───────────────────────────────────────────── */
const ProgressDots = ({ total, scrollYProgress, containerRef, labels = [] }) => {
  const activeRange = 0.84;
  const handleDotClick = (index) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
      const blockMid = ((index + 0.5) / total) * activeRange;
      const targetY = containerTop + blockMid * totalScrollableHeight;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      position: 'absolute',
      right: 'clamp(12px, 3vw, 40px)',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      zIndex: 100,
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const blockMid = ((i + 0.5) / total) * activeRange;
        return (
          <DotIndicator
            key={i}
            index={i}
            label={labels[i] || `Step ${i + 1}`}
            scrollYProgress={scrollYProgress}
            blockMid={blockMid}
            onClick={() => handleDotClick(i)}
          />
        );
      })}
    </div>
  );
};

const DotIndicator = ({ label, scrollYProgress, blockMid, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const rawScale = useTransform(
    scrollYProgress,
    [blockMid - 0.08, blockMid, blockMid + 0.08],
    [1, 1.8, 1]
  );
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 });

  const rawBg = useTransform(
    scrollYProgress,
    [blockMid - 0.08, blockMid, blockMid + 0.08],
    ['rgba(148,163,184,0.3)', 'rgba(0,240,255,1)', 'rgba(148,163,184,0.3)']
  );

  const rawShadow = useTransform(
    scrollYProgress,
    [blockMid - 0.08, blockMid, blockMid + 0.08],
    ['0 0 0px rgba(0,240,255,0)', '0 0 16px rgba(0,240,255,0.8)', '0 0 0px rgba(0,240,255,0)']
  );

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          style={{
            position: 'absolute', right: 24, whiteSpace: 'nowrap',
            background: 'rgba(11, 15, 23, 0.9)', border: '1px solid rgba(0, 240, 255, 0.3)',
            color: 'var(--text-primary)', padding: '4px 10px', borderRadius: 6,
            fontSize: 11, fontFamily: 'var(--font-mono)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        >
          {label}
        </motion.div>
      )}
      <motion.div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 10, height: 10, borderRadius: '50%',
          background: rawBg, boxShadow: rawShadow, scale, cursor: 'pointer',
        }}
      />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Single About Section
   ───────────────────────────────────────────── */
const About = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const dotLabels = [
    '1. Who I Am',
    '2. Developer Profile',
    '3. ปวช. Education',
    '4. ปวส. Education',
    '5. ป.ตรี Education',
    '6. Stats & Achievements'
  ];

  const blocks = [
    // ── Block 0: Cyberpunk Holographic Hero Title
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 20px auto' }}>
            <div style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet), var(--accent-mint))',
              animation: 'gentle-spin 10s linear infinite', opacity: 0.8,
            }} />
            <div style={{
              position: 'relative', width: '100%', height: '100%', borderRadius: '50%',
              background: 'var(--bg-secondary)', border: '2px solid rgba(0,240,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24,
              color: 'var(--accent-cyan)', boxShadow: 'inset 0 0 15px rgba(0,240,255,0.2)'
            }}>
              TI
            </div>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.3)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 16,
            fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)',
            letterSpacing: '0.08em', boxShadow: '0 0 15px rgba(0,240,255,0.15)'
          }}>
            <Sparkles size={14} />
            ABOUT ME • FULL-STACK & IT ENGINEER
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontFamily: 'var(--font-display)', fontWeight: 700,
            background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 12px 0', lineHeight: 1.1,
          }}>
            Who I Am
          </h2>

          <p style={{
            color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            maxWidth: 560, margin: '0 auto 24px auto', lineHeight: 1.7, fontFamily: 'var(--font-body)',
          }}>
            Bridging hardware & software — from enterprise web platforms to IT infrastructure & IoT automation.
          </p>

          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 600, margin: '0 auto'
          }}>
            {['React 19', 'Next.js 16', 'Node.js', 'PostgreSQL', 'Entra ID SSO', 'IoT Integration', 'Laravel'].map((tech, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                padding: '4px 12px', borderRadius: 8, fontSize: 12, fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: 4
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-mint)' }} />
                {tech}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 24, fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            👇 Scroll down to discover my journey
          </div>
        </div>
      ),
    },

    // ── Block 1: Developer Code Terminal & Key Highlights
    {
      content: (
        <div>
          <div style={{
            background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px 12px 0 0', padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-cyan)',
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <Terminal size={14} />
              developer_profile.ts
            </div>
            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-mint)',
              background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: 4
            }}>
              🟢 Open to Hire
            </div>
          </div>

          <div style={{
            background: 'rgba(5, 10, 20, 0.95)', border: '1px solid rgba(255,255,255,0.08)',
            borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '16px 20px',
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1.4vw, 13px)',
            lineHeight: 1.7, color: 'var(--text-primary)', overflowX: 'auto',
          }}>
            <div><span style={{ color: '#EC4899' }}>interface</span> <span style={{ color: '#00F0FF' }}>DeveloperProfile</span> {'{'}</div>
            <div style={{ paddingLeft: 16 }}>name: <span style={{ color: '#00FF87' }}>"{personalInfo.name}"</span>;</div>
            <div style={{ paddingLeft: 16 }}>role: <span style={{ color: '#00FF87' }}>"{personalInfo.title}"</span>;</div>
            <div style={{ paddingLeft: 16 }}>location: <span style={{ color: '#F59E0B' }}>"{personalInfo.location}"</span>;</div>
            <div style={{ paddingLeft: 16 }}>education: [<span style={{ color: '#8B5CF6' }}>"ปวช."</span>, <span style={{ color: '#8B5CF6' }}>"ปวส. (3.92 GPA)"</span>, <span style={{ color: '#8B5CF6' }}>"ป.ตรี Electronics Eng"</span>];</div>
            <div style={{ paddingLeft: 16 }}>coreFocus: [<span style={{ color: '#00F0FF' }}>"Enterprise Systems"</span>, <span style={{ color: '#00F0FF' }}>"Microsoft Entra ID SSO"</span>, <span style={{ color: '#00F0FF' }}>"IoT Integration"</span>];</div>
            <div>{'}'}</div>
          </div>

          <div style={{
            marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10
            }}>
              <Zap size={18} color="var(--accent-cyan)" />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>6+ Enterprise Systems</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Delivered in production</div>
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10
            }}>
              <Cpu size={18} color="var(--accent-mint)" />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>Hardware + Software</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Electronics Eng & IoT</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ── Block 2: Education 1 — ปวช.
    {
      content: (
        <div>
          <EducationStepper currentStep={1} totalSteps={3} />
          <EducationCard item={education[0]} number={1} />
        </div>
      ),
    },

    // ── Block 3: Education 2 — ปวส.
    {
      content: (
        <div>
          <EducationStepper currentStep={2} totalSteps={3} />
          <EducationCard item={education[1]} number={2} isHonors />
        </div>
      ),
    },

    // ── Block 4: Education 3 — ป.ตรี
    {
      content: (
        <div>
          <EducationStepper currentStep={3} totalSteps={3} />
          <EducationCard item={education[2]} number={3} isFinal />
        </div>
      ),
    },

    // ── Block 5: Stats & Achievement Matrix
    {
      content: (
        <div>
          <h3 style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontFamily: 'var(--font-display)',
            fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0', textAlign: 'center',
          }}>By The Numbers</h3>
          <p style={{
            textAlign: 'center', color: 'var(--text-dim)', fontSize: 13,
            fontFamily: 'var(--font-body)', marginBottom: 20,
          }}>
            Academic excellence & enterprise system engineering track record
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat( auto-fit, minmax(130px, 1fr) )', gap: 12, marginBottom: 20 }}>
            {[
              { value: '9+', label: 'Projects Deployed', sub: 'Enterprise & Web Apps', color: 'var(--accent-cyan)' },
              { value: '3.92', label: 'Vocational GPA', sub: 'Honors Grade', color: 'var(--accent-mint)' },
              { value: '6+', label: 'PFIG Enterprise Apps', sub: 'M365 & Entra ID SSO', color: 'var(--accent-violet)' },
              { value: '28+', label: 'Tech Stack Skills', sub: 'Full-Stack & Hardware', color: 'var(--accent-amber)' },
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '14px', textAlign: 'center', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
                  background: stat.color, borderRadius: 2, boxShadow: `0 0 10px ${stat.color}`
                }} />
                <div style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700,
                  fontFamily: 'var(--font-display)', color: stat.color, marginTop: 4
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Award size={14} /> CERTIFICATES:
            </div>
            {certificates.map((cert, i) => (
              <span key={i} style={{
                fontSize: 11, fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.05)',
                padding: '3px 10px', borderRadius: 6, color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)'
              }}>
                {cert.icon} {cert.name}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const totalBlocks = blocks.length;

  return (
    <section id="about" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: `${Math.round(totalBlocks * 120)}vh`,
          background: 'var(--bg-primary)',
        }}
      >
        <div style={{
          position: 'sticky', top: 0, height: '100vh', width: '100%',
          overflow: 'hidden', perspective: 1200, perspectiveOrigin: 'center 55%',
          background: 'var(--bg-primary)', zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px)',
            backgroundSize: '36px 36px', pointerEvents: 'none',
          }} />

          <ProgressDots total={totalBlocks} scrollYProgress={scrollYProgress} containerRef={containerRef} labels={dotLabels} />

          {blocks.map((block, i) => {
            const activeRange = 0.84;
            const startAt = (i / totalBlocks) * activeRange;
            const endAt = ((i + 1) / totalBlocks) * activeRange;
            return (
              <Block3D
                key={i}
                index={i + 1}
                scrollYProgress={scrollYProgress}
                startAt={startAt}
                endAt={endAt}
                isLast={i === totalBlocks - 1}
              >
                {block.content}
              </Block3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Education Timeline Stepper
   ───────────────────────────────────────────── */
const EducationStepper = ({ currentStep }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
    {[1, 2, 3].map(step => {
      const active = step <= currentStep;
      const current = step === currentStep;
      return (
        <React.Fragment key={step}>
          {step > 1 && (
            <div style={{
              width: 32, height: 2,
              background: active ? 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }} />
          )}
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: current ? 'var(--gradient-accent)' : active ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${current ? 'var(--accent-cyan)' : active ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
            color: current ? '#000' : active ? 'var(--accent-cyan)' : 'var(--text-dim)',
            boxShadow: current ? '0 0 12px rgba(0,240,255,0.6)' : 'none',
          }}>
            {step}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────
   Education Card Component
   ───────────────────────────────────────────── */
const EducationCard = ({ item, isHonors = false, isFinal = false }) => {
  if (!item) return null;
  const accentColor = item.color || 'var(--accent-cyan)';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${accentColor}33`,
      borderRadius: 20,
      padding: 'clamp(18px, 3vw, 24px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: accentColor, boxShadow: `0 0 12px ${accentColor}`
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, paddingLeft: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
          border: `1px solid ${accentColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, flexShrink: 0,
        }}>
          {item.icon}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono)', color: accentColor,
              background: `${accentColor}15`, padding: '3px 10px', borderRadius: 6,
              border: `1px solid ${accentColor}33`
            }}>
              {item.level}
            </span>
            {item.grade && (
              <span style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-mint)',
                background: 'rgba(16,185,129,0.15)', padding: '3px 10px', borderRadius: 6,
                border: '1px solid rgba(16,185,129,0.3)', fontWeight: 600
              }}>
                GPA {item.grade} ⭐
              </span>
            )}
            {isHonors && (
              <span style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)',
                background: 'rgba(245,158,11,0.15)', padding: '3px 10px', borderRadius: 6,
              }}>
                ★ High Honor
              </span>
            )}
            {isFinal && (
              <span style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent-violet)',
                background: 'rgba(139,92,246,0.15)', padding: '3px 10px', borderRadius: 6,
              }}>
                🎓 Bachelor Completed
              </span>
            )}
          </div>

          <h4 style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontFamily: 'var(--font-display)',
            fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0',
          }}>
            {item.degree}
          </h4>

          <div style={{
            fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)', fontFamily: 'var(--font-body)',
            color: 'var(--accent-cyan)', margin: '0 0 6px 0', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <MapPin size={14} />
            {item.institution}
          </div>

          <div style={{
            fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)', margin: 0,
          }}>
            {item.field} {item.period && `• ${item.period}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
