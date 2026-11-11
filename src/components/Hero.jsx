import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Radio, Server, Code2, ArrowUpRight, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import TypeWriter from './TypeWriter';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 22,
      },
    },
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '104px 20px 64px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Architectural Horizon Lines (Replaces floating AI code snippets) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1120px, 92vw)',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.16) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '920px',
          width: '100%',
          zIndex: 10,
        }}
      >
        {/* Top Credentials & Status Pill */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 16px',
            borderRadius: '999px',
            backgroundColor: 'rgba(17, 24, 39, 0.78)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            marginBottom: '28px',
            backdropFilter: 'blur(12px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-mint)',
              boxShadow: '0 0 10px rgba(52, 211, 153, 0.7)',
            }}
          />
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Available for IT Support / Systems Engineer & Full-Stack
          </span>
          <span style={{ color: 'rgba(148, 163, 184, 0.4)' }}>|</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--accent-cyan)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <MapPin size={12} />
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.75rem, 7vw, 5.25rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}
        >
          <span
            style={{
              color: 'var(--text-muted)',
              display: 'block',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              marginBottom: '10px',
            }}
          >
            B.ENG. BROADCAST ELECTRONICS (KMUTNB) • IT & FULL-STACK
          </span>
          <span
            style={{
              background:
                'linear-gradient(135deg, #F8FAFC 0%, #38BDF8 55%, #818CF8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            {personalInfo.name || 'Tharathip Induthai'}
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
            color: 'var(--accent-cyan)',
            marginBottom: '20px',
            height: '2em',
          }}
        >
          <TypeWriter
            texts={[
              'IT Support & Systems Engineer',
              'Full-Stack Enterprise Developer (React & Next.js)',
              'B.Eng. Broadcast Electronics — KMUTNB (มจพ.)',
              'Microsoft 365 & Entra ID SSO Administrator',
            ]}
            typingSpeed={48}
            deletingSpeed={28}
            pauseDuration={1800}
          />
        </motion.div>

        {/* Direct, Concrete Bio Paragraph (Zero AI Slop) */}
        <motion.p
          variants={itemVariants}
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.98rem, 1.6vw, 1.12rem)',
            lineHeight: 1.75,
            maxWidth: '680px',
            marginBottom: '36px',
          }}
        >
          จบวิศวกรรมอิเล็กทรอนิกส์ (แขนงบรอดแคสต์) มจพ. และ ปวส. เทคโนโลยีสารสนเทศ (GPA 3.92) เชี่ยวชาญการวิเคราะห์ปัญหาตั้งแต่ชั้นฮาร์ดแวร์ สัญญาณ ระบบเครือข่าย และ Microsoft 365 / Entra ID ไปจนถึงการเขียนเว็บแอปพลิเคชันระดับองค์กร (6+ Production Systems) เพื่อปิดต้นตอปัญหาไอทีอย่างถาวร
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '48px',
          }}
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('projects')}
            style={{
              background: 'var(--gradient-accent)',
              color: '#060911',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.98rem',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(56, 189, 248, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>Explore 9 Production Systems</span>
            <ArrowUpRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ y: -2, borderColor: 'rgba(56, 189, 248, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            style={{
              background: 'rgba(17, 24, 39, 0.75)',
              backdropFilter: 'blur(12px)',
              color: 'var(--text-primary)',
              padding: '14px 28px',
              borderRadius: '10px',
              border: '1px solid rgba(148, 163, 184, 0.22)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.98rem',
              cursor: 'pointer',
            }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* 3-Pillar Architecture Strip (Replaces floating code clichés with concrete engineering value) */}
        <motion.div
          variants={itemVariants}
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            textAlign: 'left',
          }}
        >
          {[
            {
              icon: Radio,
              badge: 'LAYER 01 • KMUTNB BROADCAST',
              title: 'Hardware, RF & IoT Systems',
              desc: 'Circuit diagnostics, A/V signal chains, CCTV & IoT sensor hardware integration.',
              accent: 'var(--accent-cyan)',
            },
            {
              icon: Server,
              badge: 'LAYER 02 • IT INFRASTRUCTURE',
              title: 'M365, Entra ID & Networking',
              desc: 'Azure AD Single Sign-On, Exchange/Teams admin, and office LAN bottleneck resolution.',
              accent: 'var(--accent-violet)',
            },
            {
              icon: Code2,
              badge: 'LAYER 03 • FULL-STACK CODE',
              title: '6+ Internal Enterprise Apps',
              desc: 'React 19, Next.js 16, Node.js & PostgreSQL systems deployed in real corporate workflows.',
              accent: 'var(--accent-mint)',
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                onClick={() => scrollTo('about')}
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.12)',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: pillar.accent,
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                    }}
                  >
                    {pillar.badge}
                  </span>
                  <Icon size={16} color={pillar.accent} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {pillar.title}
                </div>
                <div
                  style={{
                    fontSize: '0.83rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.desc}
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          marginTop: '36px',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={() => scrollTo('about')}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--text-dim)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color="var(--accent-cyan)" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
