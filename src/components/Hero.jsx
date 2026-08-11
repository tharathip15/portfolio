import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import TypeWriter from './TypeWriter';

const Hero = () => {
  // Stagger children animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
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
        padding: '0 20px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '900px',
          width: '100%',
          zIndex: 10
        }}
      >
        {/* Status Badge */}
        <motion.div 
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '32px',
            boxShadow: 'var(--glow-cyan)'
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-mint)'
            }}
          />
          <span style={{ 
            color: 'var(--text-primary)', 
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500
          }}>
            Available for Hire
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 1.1,
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}
        >
          <span style={{ 
            color: 'var(--text-muted)', 
            display: 'block', 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '8px'
          }}>
            Hi, I'm
          </span>
          <span style={{
            background: 'var(--gradient-accent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            backgroundSize: '200% auto',
            animation: 'shimmer 4s linear infinite, textPulse 3s ease-in-out infinite'
          }}>
            {personalInfo.name || 'Tharathip'}
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div 
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'var(--accent-cyan)',
            marginBottom: '24px',
            height: '2em' // prevent layout shift
          }}
        >
          <TypeWriter 
            texts={[
              'Full-Stack Developer', 
              'IT Specialist & Engineer', 
              'IoT System Integrator', 
              'React & Next.js Specialist'
            ]} 
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={1500}
          />
        </motion.div>

        {/* Bio Paragraph */}
        <motion.p 
          variants={itemVariants}
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '40px'
          }}
        >
          {personalInfo.bio || 'I build exceptional and accessible digital experiences for the web.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('projects')}
            className="btn-primary"
            style={{
              background: 'var(--gradient-accent)',
              color: '#000',
              padding: '16px 32px',
              borderRadius: '8px',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: 'var(--glow-violet)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo('contact')}
            className="btn-secondary"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              color: 'var(--text-primary)',
              padding: '16px 32px',
              borderRadius: '8px',
              border: '1px solid var(--accent-cyan)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Code Snippets (Decorative) */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          fontSize: '0.875rem',
          zIndex: 1,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          display: 'none',
        }}
        className="hide-on-mobile"
      >
        {'<Developer />'}
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -15, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '12%',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          fontSize: '0.875rem',
          zIndex: 1,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          display: 'none',
        }}
        className="hide-on-mobile"
      >
        {'const passion = true;'}
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -15, 0],
          x: [0, 20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          fontSize: '0.875rem',
          zIndex: 1,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          display: 'none',
        }}
        className="hide-on-mobile"
      >
        {'await buildFuture();'}
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 25, 0],
          x: [0, -10, 0],
          rotate: [0, -8, 8, 0]
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '35%',
          right: '12%',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-dim)',
          fontSize: '0.875rem',
          zIndex: 1,
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          display: 'none',
        }}
        className="hide-on-mobile"
      >
        {'<Innovation />'}
      </motion.div>

      {/* Internal Style for Media Query */}
      <style>
        {`
          @media (min-width: 768px) {
            .hide-on-mobile {
              display: block !important;
            }
          }
          @keyframes scanline {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes textPulse {
            0%, 100% { opacity: 1; filter: brightness(1); }
            50% { opacity: 0.9; filter: brightness(1.2); }
          }
          @keyframes pulseRing {
            0% { transform: scale(0.8); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .btn-primary::after, .btn-secondary::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: skewX(-20deg);
            transition: 0.5s;
          }
          .btn-primary:hover::after, .btn-secondary:hover::after {
            left: 150%;
          }
        `}
      </style>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          marginTop: '32px',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
        onClick={() => scrollTo('projects')}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Scroll
        </span>
        <div style={{
          position: 'relative',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid var(--accent-cyan)',
            animation: 'pulseRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite'
          }} />
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} color="var(--accent-cyan)" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
