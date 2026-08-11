import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/portfolio';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.id);
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if element is in the upper part of the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '64px',
      zIndex: 1000,
      background: 'rgba(11, 15, 23, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
      transition: 'box-shadow 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(16px, 4vw, 48px)',
      boxSizing: 'border-box'
    }}>
      <motion.div 
        whileHover={{ 
          textShadow: '0 0 8px var(--accent-cyan), 0 0 12px var(--accent-cyan)',
          scale: 1.05
        }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'var(--accent-cyan)',
          cursor: 'pointer'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        T.
      </motion.div>

      {/* Desktop Menu */}
      <div style={{ display: 'none' }} className="desktop-menu">
        <div style={{ display: 'flex', gap: '32px' }}>
          {navItems.map((item) => (
            <div key={item.id} style={{ position: 'relative' }}>
              <button
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  padding: '8px 0',
                  position: 'relative',
                  zIndex: 1
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) e.target.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) e.target.style.color = 'var(--text-muted)';
                }}
              >
                {item.label}
              </button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent-cyan)',
                    boxShadow: '0 0 8px var(--accent-cyan)',
                    borderRadius: '2px'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-btn"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              width: '100%',
              background: 'rgba(11, 15, 23, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '16px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  transition: 'color 0.2s ease',
                  padding: '8px'
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
