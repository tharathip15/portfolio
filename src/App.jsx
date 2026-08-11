import React from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  const appContainerStyles = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)'
  };

  const currentYear = new Date().getFullYear();

  const footerStyles = {
    textAlign: 'center',
    padding: '40px 24px 32px 24px',
    borderTop: '1px solid var(--border-subtle)',
    color: 'var(--text-muted)',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    background: 'rgba(11, 15, 23, 0.95)',
    position: 'relative',
    zIndex: 10
  };

  return (
    <div style={appContainerStyles}>
      <ParticleBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer style={footerStyles}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer', color: 'var(--accent-cyan)', fontWeight: 600 }}
          >
            T. Portfolio
          </span>
          <span>•</span>
          <span>Full-Stack Developer & IT Engineer</span>
          <span>•</span>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            Back to top ↑
          </span>
        </div>

        <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '13px' }}>
          © {currentYear} Tharathip Induthai. All rights reserved. Crafted with React & Framer Motion.
        </p>
      </footer>
    </div>
  );
}

export default App;
