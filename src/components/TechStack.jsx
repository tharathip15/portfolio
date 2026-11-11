import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Lock,
  ShieldCheck,
  Wifi,
  Globe,
  Code2,
  Layers,
  Terminal,
  Workflow,
  Server,
  Box,
  Database,
  HardDrive,
  Radio,
  Film,
  Zap,
  ArrowRight,
} from 'lucide-react';

const SKILL_DOMAINS = [
  {
    id: 'infra',
    code: 'BUS-01',
    name: 'IT Support & Cloud Identity',
    color: '#38BDF8',
    icon: ShieldCheck,
    desc: 'Enterprise directory, Single Sign-On, Microsoft 365 & office network operations',
    skills: [
      {
        id: 'entra',
        name: 'Microsoft Entra ID (Azure AD)',
        spec: 'OAuth 2.0 / OIDC / PKCE Silent SSO & Custom User Attributes',
        icon: Lock,
        connectedProjects: [
          'PFIG IT Helpdesk',
          'PFIG Portal',
          'HR Organization Chart',
          'PFIG MEMO',
          'PFIG RAKA',
          'PFIG Wellbeing',
        ],
        impact: 'Unified Single Sign-On across 6+ internal company applications',
      },
      {
        id: 'm365',
        name: 'Microsoft 365 Admin Center',
        spec: 'Exchange Online, Teams Channels, SharePoint & License Provisioning',
        icon: ShieldCheck,
        connectedProjects: ['PFIG Portal', 'PFIG Booking', 'PFIG IT Helpdesk'],
        impact: 'Daily administration of corporate communication & mail flow',
      },
      {
        id: 'network',
        name: 'Network & LAN Diagnostics',
        spec: 'Switch Port Isolation, VLAN, DHCP/DNS, Wi-Fi & VPN Bottlenecks',
        icon: Wifi,
        connectedProjects: ['PFIG IT Helpdesk', 'Meeting Room Booking + IoT'],
        impact: 'Resolved office connectivity drops and hardware-layer incidents',
      },
      {
        id: 'msgraph',
        name: 'Microsoft Graph API',
        spec: 'Automated Employee Directory & Reporting Line Synchronization',
        icon: Globe,
        connectedProjects: ['HR Organization Chart', 'PFIG Portal'],
        impact: 'Live sync between IT Active Directory and HR org structure',
      },
    ],
  },
  {
    id: 'frontend',
    code: 'BUS-02',
    name: 'Frontend Engineering',
    color: '#818CF8',
    icon: Code2,
    desc: 'Modern reactive interfaces, SSR platforms & interactive enterprise dashboards',
    skills: [
      {
        id: 'react19',
        name: 'React 19 & Vite',
        spec: 'Component Architecture, Custom Hooks, Canvas Signature & State',
        icon: Code2,
        connectedProjects: [
          'PFIG IT Helpdesk',
          'PFIG Portal',
          'PFIG MEMO',
          'PFIG RAKA',
          'MotoSpec Thailand',
        ],
        impact: 'Primary UI library powering high-speed internal web systems',
      },
      {
        id: 'nextjs16',
        name: 'Next.js 16 (App Router)',
        spec: 'Server Components, TypeScript, NextAuth & API Route Handlers',
        icon: Layers,
        connectedProjects: [
          'PFIG Booking',
          'MotoSpec Thailand',
          'Meeting Room Booking + IoT',
        ],
        impact: 'Full-stack framework for booking and catalog platforms',
      },
      {
        id: 'ts',
        name: 'TypeScript & ES6+ JavaScript',
        spec: 'Strict Schema Validation (Zod), Async Concurrency & DOM APIs',
        icon: Terminal,
        connectedProjects: [
          'PFIG IT Helpdesk',
          'PFIG Booking',
          'MotoSpec Thailand',
          'HR Organization Chart',
        ],
        impact: 'End-to-end type safety from database queries to UI components',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS & Framer Motion',
        spec: 'Responsive Enterprise Layouts, Dark UI & Interactive Transitions',
        icon: Workflow,
        connectedProjects: ['PFIG Booking', 'MotoSpec Thailand', 'PFIG Portal'],
        impact: 'Clean, accessible interfaces across desktop and mobile devices',
      },
    ],
  },
  {
    id: 'backend',
    code: 'BUS-03',
    name: 'Backend & Workflow Automation',
    color: '#34D399',
    icon: Server,
    desc: 'API servers, scheduled SLA cron engines, concurrency locks & webhook dispatchers',
    skills: [
      {
        id: 'node-express',
        name: 'Node.js & Express 5',
        spec: 'RESTful APIs, Role Middleware, Vercel Cron & File Blob Handling',
        icon: Server,
        connectedProjects: ['PFIG IT Helpdesk', 'PFIG MEMO', 'Meeting Room Booking + IoT'],
        impact: 'Powers automated SLA escalation and ticket lifecycle engines',
      },
      {
        id: 'webhooks',
        name: 'Teams Webhooks & Web Push / SMTP',
        spec: 'Instant Channel Adaptive Cards, Nodemailer & Browser Push Alerts',
        icon: Workflow,
        connectedProjects: ['PFIG Booking', 'PFIG IT Helpdesk', 'PFIG MEMO'],
        impact: 'Real-time operational notifications without manual follow-up',
      },
      {
        id: 'docker',
        name: 'Docker, Git & Vercel CI/CD',
        spec: 'Containerized Environments, Version Control & Cloud Deployment',
        icon: Box,
        connectedProjects: ['MotoSpec Thailand', 'PFIG RAKA', 'PFIG IT Helpdesk'],
        impact: 'Reproducible builds and zero-downtime cloud deployments',
      },
      {
        id: 'laravel',
        name: 'PHP & Laravel Framework',
        spec: 'MVC Backend Architecture, Blade Templates & Relational ORM',
        icon: Terminal,
        connectedProjects: ['Enterprise Internal Tools'],
        impact: 'Solid foundation in classic server-side web architecture',
      },
    ],
  },
  {
    id: 'database',
    code: 'BUS-04',
    name: 'Database & Offline Sync',
    color: '#FBBF24',
    icon: Database,
    desc: 'Relational schema design, optimistic locking & offline-first browser storage',
    skills: [
      {
        id: 'postgres',
        name: 'PostgreSQL & Neon Serverless',
        spec: '43+ Schema Migrations, Indexing & HTTP 409 Optimistic Locking',
        icon: Database,
        connectedProjects: [
          'PFIG IT Helpdesk',
          'PFIG MEMO',
          'MotoSpec Thailand',
          'Meeting Room Booking + IoT',
        ],
        impact: 'Prevents race conditions and guarantees enterprise data integrity',
      },
      {
        id: 'supabase',
        name: 'Supabase (Postgres + RLS)',
        spec: 'Row-Level Security Policies, Realtime Sync & Cloud Storage',
        icon: HardDrive,
        connectedProjects: [
          'PFIG RAKA',
          'HR Organization Chart',
          'MotoSpec Thailand',
          'PFIG Wellbeing',
        ],
        impact: 'Rapid, secure backend data layer for corporate and consumer apps',
      },
      {
        id: 'indexeddb',
        name: 'IndexedDB & SheetJS (XLSX)',
        spec: 'Offline-First Browser Caching & Automated Excel Import/Export',
        icon: Layers,
        connectedProjects: ['PFIG RAKA'],
        impact: 'Calculates 3,613 Thai freight routes instantly even when offline',
      },
    ],
  },
  {
    id: 'broadcast',
    code: 'BUS-05',
    name: 'Broadcast Electronics & IoT (KMUTNB)',
    color: '#EC4899',
    icon: Radio,
    desc: 'B.Eng. Broadcast Engineering hardware diagnostics, RF/AV signal chains & IoT',
    skills: [
      {
        id: 'rf-av',
        name: 'Broadcast Signal Flow & Electronics',
        spec: 'Circuit Diagram Interpretation, Measuring Instruments & A/V Setup',
        icon: Radio,
        connectedProjects: ['Conference Room A/V & Broadcast Systems'],
        impact: 'B.Eng. Electronic Engineering Technology (Broadcast) @ KMUTNB',
      },
      {
        id: 'iot-hw',
        name: 'IoT Device & Security Hardware',
        spec: 'Physical Relay Control, Sensor Wiring & On-Site CCTV Systems',
        icon: Cpu,
        connectedProjects: ['Meeting Room Booking + IoT', 'S.A.I Security Systems'],
        impact: 'Bridges web software commands directly to physical hardware relays',
      },
      {
        id: 'media',
        name: 'Premiere Pro, DaVinci Resolve & Blender',
        spec: 'Broadcast Post-Production, Color Grading & 3D Modeling',
        icon: Film,
        connectedProjects: ['Broadcast Media & 3D Visualization'],
        impact: 'Complete multimedia production capability from broadcast training',
      },
    ],
  },
];

const ALL_PROJS = [
  { name: 'PFIG IT Helpdesk', tag: 'SYS-01' },
  { name: 'PFIG Portal', tag: 'SYS-02' },
  { name: 'PFIG Booking', tag: 'SYS-03' },
  { name: 'PFIG MEMO', tag: 'SYS-04' },
  { name: 'PFIG RAKA', tag: 'SYS-05' },
  { name: 'HR Organization Chart', tag: 'SYS-06' },
  { name: 'MotoSpec Thailand', tag: 'SYS-07' },
  { name: 'PFIG Wellbeing', tag: 'SYS-08' },
  { name: 'Meeting Room Booking + IoT', tag: 'SYS-09' },
];

const MARQUEE_ITEMS = [
  'React 19',
  'Next.js 16',
  'TypeScript',
  'Node.js',
  'Express 5',
  'PostgreSQL',
  'Supabase',
  'Microsoft Entra ID (Azure AD)',
  'Microsoft 365 Admin',
  'Microsoft Graph API',
  'IndexedDB Offline Sync',
  'Docker',
  'Broadcast RF & Signal Engineering',
  'IoT Hardware Integration',
  'Network Troubleshooting',
  'SheetJS Excel Engine',
];

const TechStack = () => {
  const [selectedDomainId, setSelectedDomainId] = useState('infra');
  const currentDomain =
    SKILL_DOMAINS.find((d) => d.id === selectedDomainId) || SKILL_DOMAINS[0];
  const [selectedSkill, setSelectedSkill] = useState(currentDomain.skills[0]);

  const handleDomainSelect = (domain) => {
    setSelectedDomainId(domain.id);
    setSelectedSkill(domain.skills[0]);
  };

  return (
    <section
      id="tech"
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.25rem' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(129, 140, 248, 0.1)',
              border: '1px solid rgba(129, 140, 248, 0.28)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '14px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-violet)',
              letterSpacing: '0.08em',
            }}
          >
            <Cpu size={14} />
            INTERACTIVE SKILL-TO-PRODUCTION CIRCUIT MATRIX
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 12px 0',
            }}
          >
            Interactive Architecture & Skill Patchbay
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              maxWidth: '660px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            คลิกเลือกหมวดหมู่และทักษะในแผงวงจรด้านล่าง เพื่อดูว่าแต่ละเทคโนโลยีเชื่อมต่อและขับเคลื่อนระบบจริงตัวไหนในองค์กรบ้าง
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────────
           GIMMICK 2: 3-Column Interactive Hardware/Software Patchbay Console
           Col 1: 5 Engineering Buses | Col 2: Skill Nodes | Col 3: Live Connected Apps
           ───────────────────────────────────────────────────────────────── */}
        <div className="patchbay-console">
          {/* Column 1: 5 Engineering Domain Buses */}
          <div
            style={{
              background: 'rgba(11, 15, 23, 0.85)',
              borderRight: '1px solid rgba(148, 163, 184, 0.14)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}
            >
              01 // SELECT SYSTEM BUS
            </div>

            {SKILL_DOMAINS.map((dom) => {
              const Icon = dom.icon;
              const active = dom.id === selectedDomainId;
              return (
                <button
                  key={dom.id}
                  type="button"
                  onClick={() => handleDomainSelect(dom)}
                  style={{
                    textAlign: 'left',
                    padding: '13px 14px',
                    borderRadius: '14px',
                    border: `1px solid ${
                      active ? dom.color : 'rgba(148, 163, 184, 0.1)'
                    }`,
                    background: active
                      ? `${dom.color}16`
                      : 'rgba(17, 24, 39, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '9px',
                        background: active
                          ? `${dom.color}25`
                          : 'rgba(255,255,255,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: active ? dom.color : 'var(--text-muted)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: active ? dom.color : 'var(--text-dim)',
                        }}
                      >
                        {dom.code}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: active ? '#F8FAFC' : 'var(--text-muted)',
                        }}
                      >
                        {dom.name}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    size={15}
                    style={{
                      color: active ? dom.color : 'transparent',
                      transform: active ? 'translateX(2px)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Column 2: Interactive Skill Nodes inside Selected Bus */}
          <div
            style={{
              padding: '22px',
              borderRight: '1px solid rgba(148, 163, 184, 0.14)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: currentDomain.color,
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                }}
              >
                02 // INSPECT MODULE ({currentDomain.code})
              </div>
              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                  marginBottom: '14px',
                }}
              >
                {currentDomain.desc}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentDomain.skills.map((sk) => {
                  const Icon = sk.icon;
                  const isSelected = selectedSkill?.id === sk.id;
                  return (
                    <motion.div
                      key={sk.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedSkill(sk)}
                      onMouseEnter={() => setSelectedSkill(sk)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '14px',
                        border: `1px solid ${
                          isSelected
                            ? currentDomain.color
                            : 'rgba(148, 163, 184, 0.12)'
                        }`,
                        background: isSelected
                          ? 'rgba(30, 41, 59, 0.8)'
                          : 'rgba(11, 15, 23, 0.55)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          marginBottom: '4px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.98rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <Icon size={16} color={currentDomain.color} />
                          <span>{sk.name}</span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: currentDomain.color,
                            background: `${currentDomain.color}18`,
                            padding: '2px 8px',
                            borderRadius: '99px',
                          }}
                        >
                          {sk.connectedProjects.length} Systems
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.45,
                        }}
                      >
                        {sk.spec}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Live Production Dependency Board (Lights up matching projects!) */}
          <div
            style={{
              padding: '22px',
              background: 'rgba(7, 11, 18, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-mint)',
                  letterSpacing: '0.06em',
                  marginBottom: '6px',
                }}
              >
                03 // CONNECTED PRODUCTION SYSTEMS
              </div>

              <AnimatePresence mode="wait">
                {selectedSkill && (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {selectedSkill.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: currentDomain.color,
                        marginBottom: '16px',
                        lineHeight: 1.5,
                      }}
                    >
                      {selectedSkill.impact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 9-System Matrix that illuminates connected systems */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '7px',
                }}
              >
                {ALL_PROJS.map((proj) => {
                  const isConnected =
                    selectedSkill?.connectedProjects.includes(proj.name);
                  return (
                    <div
                      key={proj.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '9px',
                        border: `1px solid ${
                          isConnected
                            ? currentDomain.color
                            : 'rgba(255, 255, 255, 0.05)'
                        }`,
                        background: isConnected
                          ? `${currentDomain.color}18`
                          : 'rgba(255, 255, 255, 0.015)',
                        opacity: isConnected ? 1 : 0.35,
                        transition: 'all 0.22s ease',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: isConnected
                              ? currentDomain.color
                              : 'rgba(148,163,184,0.3)',
                            boxShadow: isConnected
                              ? `0 0 8px ${currentDomain.color}`
                              : 'none',
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.84rem',
                            fontWeight: isConnected ? 600 : 400,
                            color: isConnected ? '#F8FAFC' : 'var(--text-muted)',
                          }}
                        >
                          {proj.name}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: isConnected
                            ? currentDomain.color
                            : 'var(--text-dim)',
                        }}
                      >
                        {isConnected ? 'ACTIVE LINK' : proj.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                paddingTop: '10px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>HOVER ANY SKILL NODE</span>
              <span style={{ color: 'var(--accent-mint)' }}>VERIFIED PROD</span>
            </div>
          </div>
        </div>

        {/* Kinetic Hardware/Software Spec Ticker (Infinite Smooth Marquee) */}
        <div
          style={{
            marginTop: '2rem',
            background: 'rgba(11, 15, 23, 0.7)',
            border: '1px solid rgba(148, 163, 184, 0.12)',
            borderRadius: '14px',
            padding: '12px 0',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div className="skill-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0 18px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Zap size={12} color="var(--accent-cyan)" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .patchbay-console {
          display: grid;
          grid-template-columns: 0.95fr 1.2fr 1fr;
          background: rgba(13, 19, 31, 0.82);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .skill-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 34s linear infinite;
        }
        .skill-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (max-width: 1024px) {
          .patchbay-console {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
