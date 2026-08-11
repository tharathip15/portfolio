import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, MapPin, Send } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
import { personalInfo, socialLinks } from '../data/portfolio';

const Contact = () => {
  return (
    <section id="contact" style={{
      position: 'relative',
      padding: '120px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.05), transparent)',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateBorder {
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}} />

      {/* Floating Background Shapes */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[
          { w: 80, h: 80, t: 10, l: 15, dur: 7, del: 0, round: true },
          { w: 120, h: 120, t: 70, l: 80, dur: 9, del: 1, round: false },
          { w: 60, h: 60, t: 40, l: 5, dur: 6, del: 0.5, round: true },
          { w: 100, h: 100, t: 85, l: 50, dur: 8, del: 1.5, round: false },
          { w: 70, h: 70, t: 25, l: 90, dur: 10, del: 2, round: true },
        ].map((shape, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${shape.w}px`,
              height: `${shape.h}px`,
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
              opacity: 0.05,
              borderRadius: shape.round ? '50%' : '16px',
              top: `${shape.t}%`,
              left: `${shape.l}%`,
              animation: `float-geometric ${shape.dur}s ease-in-out infinite`,
              animationDelay: `${shape.del}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '64px', position: 'relative' }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface)',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-mint)', boxShadow: '0 0 10px var(--accent-mint)' }} />
          <span style={{ color: 'var(--accent-mint)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>Available for Hire</span>
        </motion.div>
        
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          background: 'var(--gradient-accent)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          marginTop: '24px'
        }}>
          Let's Work Together
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', fontFamily: 'var(--font-body)', maxWidth: '500px', margin: '0 auto' }}>
          I'm currently available for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border-glow)',
          borderRadius: '24px',
          padding: 'clamp(24px, 5vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--glow-cyan)',
          maxWidth: '650px',
          width: '100%',
          marginBottom: '64px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%' }}>

        <Mail size={48} color="var(--accent-cyan)" />
        <motion.div 
          animate={{ textShadow: ['0 0 10px rgba(0, 229, 255, 0.4)', '0 0 20px rgba(0, 229, 255, 0.7)', '0 0 10px rgba(0, 229, 255, 0.4)'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.95rem, 2.8vw, 1.45rem)',
            color: 'var(--accent-cyan)',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {personalInfo.email}
        </motion.div>
        <button
          onClick={() => window.location.href = `mailto:${personalInfo.email}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--gradient-accent)',
            color: '#000',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '9999px',
            fontSize: '1.125rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Send size={20} />
          Send Email
        </button>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
        {[
          { name: 'GitHub', icon: <GithubIcon />, link: socialLinks.find(s => s.name === 'GitHub')?.url || '#', color: 'var(--text-primary)' },
          { name: 'LinkedIn', icon: <LinkedinIcon />, link: socialLinks.find(s => s.name === 'LinkedIn')?.url || '#', color: '#0A66C2' },
          { name: 'Email', icon: <Mail />, link: `mailto:${personalInfo.email}`, color: 'var(--accent-cyan)' },
          { name: personalInfo.phone || '095-667-9573', icon: <Send size={18} />, link: `tel:${personalInfo.phone}`, color: 'var(--accent-mint)' }
        ].map((social, index) => (
          <motion.a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05, borderColor: social.color, boxShadow: `0 0 20px ${social.color}40` }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              padding: '16px 24px',
              borderRadius: '16px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.3s ease'
            }}
          >
            <motion.span whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }} style={{ color: social.color, display: 'inline-flex' }}>{social.icon}</motion.span>
            <span>{social.name}</span>
            <ArrowUpRight size={16} color="var(--text-muted)" />
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', textAlign: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="var(--accent-cyan)" />
          <span>{personalInfo.location || 'Thailand'}</span>
        </div>
        {personalInfo.address && (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '500px' }}>
            {personalInfo.address}
          </span>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;
