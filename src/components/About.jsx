import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Radio,
  Server,
  Code2,
  GraduationCap,
  Play,
  Activity,
} from 'lucide-react';
import { education, certificates } from '../data/portfolio';

/* ──────────────────────────────────────────────────────────────────────────
   3 Real-World Scenarios for the Interactive Signal-to-Software Simulator
   Shows how Tharathip combines KMUTNB Broadcast HW + IT Infra + Full-Stack
   ────────────────────────────────────────────────────────────────────────── */
const INCIDENT_SCENARIOS = [
  {
    id: 'network-sla',
    badge: 'SCENARIO 01 // NETWORK & HELPDESK',
    title: 'Office Network Bottleneck & Lost IT Tickets',
    triggerLabel: '1. Network & Ticket Bottleneck',
    color: '#38BDF8',
    freq: 3.2,
    steps: [
      {
        layer: 'U1 • PHYSICAL & CABLING',
        icon: Radio,
        status: 'ISOLATED',
        detail:
          'ตรวจสอบสายสัญญาณ LAN, Access Point และพอร์ต Switch หน้างานด้วยวิธีไล่ Signal Chain เพื่อแยกจุดที่เกิด Packet Loss',
        color: '#38BDF8',
      },
      {
        layer: 'U2 • NETWORK & ENTRA ID',
        icon: Server,
        status: 'CONFIGURED',
        detail:
          'ปรับจูนแบนด์วิดท์ แยกวงเครือข่ายลดคอขวด และผูกสิทธิ์พนักงานเข้ากับ Microsoft Entra ID (Azure AD)',
        color: '#818CF8',
      },
      {
        layer: 'U3 • FULL-STACK AUTOMATION',
        icon: Code2,
        status: 'DEPLOYED',
        detail:
          'สร้างระบบ PFIG IT Helpdesk (React 19 + Express + PostgreSQL) มี Cron Job เช็ค SLA และแจ้งเตือนอัตโนมัติ ปิดปัญหางานตกหล่น 100%',
        color: '#34D399',
      },
    ],
  },
  {
    id: 'av-iot',
    badge: 'SCENARIO 02 // BROADCAST A/V & IOT',
    title: 'Smart Meeting Room & Broadcast A/V Automation',
    triggerLabel: '2. Broadcast A/V & Room IoT',
    color: '#34D399',
    freq: 5.0,
    steps: [
      {
        layer: 'U1 • BROADCAST & IOT RELAY',
        icon: Radio,
        status: 'INTERFACED',
        detail:
          'ใช้ความรู้ วศ.บ. อิเล็กทรอนิกส์ (บรอดแคสต์) มจพ. วางระบบสัญญาณภาพ/เสียงห้องประชุม และเชื่อมวงจรควบคุมอุปกรณ์ฮาร์ดแวร์ IoT',
        color: '#38BDF8',
      },
      {
        layer: 'U2 • TEAMS & M365 SYNC',
        icon: Server,
        status: 'LINKED',
        detail:
          'เชื่อมต่อการแจ้งเตือนตารางใช้งานห้องประชุมเข้ากับช่อง Microsoft Teams ของบริษัทผ่าน Incoming Webhook และ SMTP',
        color: '#818CF8',
      },
      {
        layer: 'U3 • NEXT.JS BOOKING ENGINE',
        icon: Code2,
        status: 'AUTOMATED',
        detail:
          'เขียนเว็บจองห้องประชุม (Next.js + PostgreSQL) บล็อกคิวซ้อนอัตโนมัติ และสั่งเปิด-ปิดอุปกรณ์ IoT ตามเวลาที่จองจริง',
        color: '#34D399',
      },
    ],
  },
  {
    id: 'sso-workflow',
    badge: 'SCENARIO 03 // ENTRA ID SSO & PAPERLESS',
    title: 'Multi-App Password Fatigue & Paper Memo Delays',
    triggerLabel: '3. Corporate SSO & e-Memo',
    color: '#818CF8',
    freq: 2.2,
    steps: [
      {
        layer: 'U1 • ENDPOINT & MOBILE ACCESS',
        icon: Radio,
        status: 'VERIFIED',
        detail:
          'รองรับการเข้าใช้งานและวาดลายเซ็นอิเล็กทรอนิกส์ผ่านหน้าจอสัมผัส (HTML5 Canvas) ทั้งบนพีซีสำนักงานและอุปกรณ์พกพา',
        color: '#38BDF8',
      },
      {
        layer: 'U2 • MICROSOFT ENTRA ID (AZURE AD)',
        icon: Server,
        status: 'UNIFIED SSO',
        detail:
          'ตั้งค่า OAuth2 / PKCE Single Sign-On และดึงผังผู้บังคับบัญชาจาก Microsoft Graph API โดยตรง ลด Ticket รีเซ็ตรหัสผ่าน',
        color: '#818CF8',
      },
      {
        layer: 'U3 • CONCURRENCY-SAFE WEB APPS',
        icon: Code2,
        status: 'LIVE (6+ APPS)',
        detail:
          'พัฒนา PFIG Portal, PFIG MEMO (HTTP 409 Lock + PDF) และ HR Org Chart ให้พนักงานล็อกอินครั้งเดียวใช้งานได้ครบทุกระบบ',
        color: '#34D399',
      },
    ],
  },
];

const TERMINAL_COMMANDS = [
  {
    cmd: 'whoami --engineer',
    output: [
      'Name       : Tharathip Induthai (ธราธิป อินทร์อุทัย)',
      'Degree     : B.Eng. Electronic Engineering Technology (Broadcast) @ KMUTNB',
      'Honors     : GPA 3.92 in Information Technology (ปวช. & ปวส.)',
      'Current    : IT Specialist & Full-Stack Developer @ PFIG',
      'Strength   : End-to-end troubleshooting from hardware & LAN to React/Node/SQL',
    ],
  },
  {
    cmd: 'status --production-systems',
    output: [
      '[ONLINE] 01. PFIG IT Helpdesk     — React 19, Express 5, Postgres, Cron SLA',
      '[ONLINE] 02. PFIG Portal          — Entra ID SSO Gateway & RBAC Hub',
      '[ONLINE] 03. PFIG Booking         — Next.js 16, Teams Webhook, SQLite',
      '[ONLINE] 04. PFIG MEMO            — Neon Postgres, HTTP 409 Lock, PDF Sign',
      '[ONLINE] 05. PFIG RAKA            — 3,613 Routes, IndexedDB Offline, SheetJS',
      '[ONLINE] 06. HR Org Chart         — Microsoft Graph API, PKCE Silent SSO',
    ],
  },
  {
    cmd: 'ping --contact-info',
    output: [
      'Location   : Sai Noi, Nonthaburi (Ready for Nonthaburi & Bangkok)',
      'Email      : induthaitharathip@gmail.com',
      'Phone      : 095-667-9573',
      'Availability: Ready for interview & immediate contribution',
    ],
  },
];

const About = () => {
  const [activeScenarioId, setActiveScenarioId] = useState('network-sla');
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const waveCanvasRef = useRef(null);

  const currentScenario =
    INCIDENT_SCENARIOS.find((s) => s.id === activeScenarioId) ||
    INCIDENT_SCENARIOS[0];

  // Auto-advance the signal step every 2.8s so the diagram feels alive
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % 3);
    }, 2800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, activeScenarioId]);

  // Live Oscilloscope / Signal Wave Canvas in the Simulator Header
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const renderWave = () => {
      animId = requestAnimationFrame(renderWave);
      t += 0.045;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Subtle grid line
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Primary carrier wave
      ctx.beginPath();
      ctx.strokeStyle = currentScenario.color;
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const nx = x / w;
        const envelope = Math.sin(nx * Math.PI);
        const y =
          h / 2 +
          Math.sin(nx * Math.PI * currentScenario.freq * 2 - t * 2.2) *
            (h * 0.34) *
            envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [currentScenario]);

  return (
    <section
      id="about"
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Heading */}
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
            <Activity size={14} />
            INTERACTIVE SIGNAL-TO-SOFTWARE DIAGNOSTIC LAB
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
              lineHeight: 1.15,
            }}
          >
            From Broadcast Signal Chain to Full-Stack Code
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.98rem, 1.6vw, 1.08rem)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            ลองกดจำลองสถานการณ์ด้านล่าง เพื่อดูวิธีคิดแบบวิศวกรอิเล็กทรอนิกส์ (บรอดแคสต์) มจพ. ในการไล่ปัญหาตั้งแต่ฮาร์ดแวร์และระบบเครือข่าย ไปจนถึงการเขียนซอฟต์แวร์แก้ปัญหาถาวร
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────────
           GIMMICK 1: Interactive Signal-to-Software Pipeline Simulator
           ───────────────────────────────────────────────────────────────── */}
        <div
          style={{
            background: 'rgba(13, 19, 31, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            marginBottom: '2rem',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Top Simulator Control Bar + Live Oscilloscope Canvas */}
          <div
            style={{
              padding: '16px 24px',
              background: 'rgba(7, 11, 18, 0.9)',
              borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Scenario Selector Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {INCIDENT_SCENARIOS.map((sc) => {
                const active = sc.id === activeScenarioId;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                      setActiveStepIdx(0);
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: `1px solid ${
                        active ? sc.color : 'rgba(148, 163, 184, 0.16)'
                      }`,
                      background: active
                        ? `${sc.color}18`
                        : 'rgba(17, 24, 39, 0.6)',
                      color: active ? '#F8FAFC' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: active ? sc.color : 'rgba(148,163,184,0.4)',
                        boxShadow: active ? `0 0 8px ${sc.color}` : 'none',
                      }}
                    />
                    {sc.triggerLabel}
                  </button>
                );
              })}
            </div>

            {/* Live Mini Oscilloscope Trace */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(17, 24, 39, 0.85)',
                border: '1px solid rgba(148, 163, 184, 0.14)',
                borderRadius: '10px',
                padding: '6px 12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                <div style={{ color: 'var(--text-dim)' }}>SIGNAL TRACE</div>
                <div style={{ color: currentScenario.color, fontWeight: 700 }}>
                  LOCKED 75Ω
                </div>
              </div>
              <canvas
                ref={waveCanvasRef}
                width={140}
                height={32}
                style={{ width: '140px', height: '32px', display: 'block' }}
              />
            </div>
          </div>

          {/* 3-Stage Animated Signal Pipeline (U1 -> U2 -> U3) */}
          <div style={{ padding: '28px 24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '22px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.73rem',
                    color: currentScenario.color,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  {currentScenario.badge}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {currentScenario.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsAutoPlaying((p) => !p)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: isAutoPlaying ? 'var(--accent-mint)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Play size={12} />
                {isAutoPlaying ? 'Auto-Signal Pulse: ON' : 'Auto-Signal: PAUSED'}
              </button>
            </div>

            {/* 3 Connected Pipeline Nodes */}
            <div className="signal-pipeline-grid">
              {currentScenario.steps.map((st, idx) => {
                const Icon = st.icon;
                const isCurrentStep = activeStepIdx === idx;
                return (
                  <motion.div
                    key={st.layer}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveStepIdx(idx);
                    }}
                    whileHover={{ y: -3 }}
                    style={{
                      background: isCurrentStep
                        ? 'rgba(30, 41, 59, 0.75)'
                        : 'rgba(11, 15, 23, 0.65)',
                      border: `1px solid ${
                        isCurrentStep ? st.color : 'rgba(148, 163, 184, 0.14)'
                      }`,
                      borderRadius: '16px',
                      padding: '20px',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: isCurrentStep
                        ? `0 12px 32px rgba(0,0,0,0.4), 0 0 24px ${st.color}22`
                        : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {/* Animated Top Progress Highlight */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 16,
                        right: 16,
                        height: 2,
                        background: isCurrentStep ? st.color : 'transparent',
                        boxShadow: isCurrentStep ? `0 0 10px ${st.color}` : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    />

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '9px',
                            background: `${st.color}18`,
                            border: `1px solid ${st.color}40`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: st.color,
                          }}
                        >
                          <Icon size={17} />
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.73rem',
                            fontWeight: 700,
                            color: st.color,
                          }}
                        >
                          {st.layer}
                        </span>
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: isCurrentStep ? '#060911' : st.color,
                          background: isCurrentStep ? st.color : `${st.color}15`,
                          padding: '2px 8px',
                          borderRadius: '99px',
                          fontWeight: 700,
                        }}
                      >
                        {st.status}
                      </span>
                    </div>

                    <p
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {st.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
           Bottom Row: Left (Interactive CLI Terminal) + Right (Education Stepper)
           ───────────────────────────────────────────────────────────────── */}
        <div className="about-bottom-split">
          {/* Interactive Executable Terminal */}
          <div
            style={{
              background: '#070B12',
              border: '1px solid rgba(148, 163, 184, 0.18)',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
            }}
          >
            {/* Terminal Window Header */}
            <div
              style={{
                padding: '12px 16px',
                background: '#0D131F',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Terminal size={13} color="var(--accent-cyan)" />
                tharathip@kmutnb-console ~
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-mint)',
                }}
              >
                INTERACTIVE CLI
              </span>
            </div>

            {/* Clickable Command Buttons */}
            <div
              style={{
                padding: '10px 16px',
                background: 'rgba(17, 24, 39, 0.65)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              {TERMINAL_COMMANDS.map((item, i) => {
                const active = activeCmdIdx === i;
                return (
                  <button
                    key={item.cmd}
                    type="button"
                    onClick={() => setActiveCmdIdx(i)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: `1px solid ${
                        active
                          ? 'rgba(56, 189, 248, 0.4)'
                          : 'rgba(255, 255, 255, 0.08)'
                      }`,
                      background: active
                        ? 'rgba(56, 189, 248, 0.14)'
                        : 'rgba(255, 255, 255, 0.02)',
                      color: active ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.73rem',
                      cursor: 'pointer',
                    }}
                  >
                    $ {item.cmd}
                  </button>
                );
              })}
            </div>

            {/* Terminal Output Viewport */}
            <div
              style={{
                padding: '18px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.8,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCmdIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                >
                  <div style={{ color: 'var(--accent-mint)', marginBottom: '8px' }}>
                    ➜ ~ $ {TERMINAL_COMMANDS[activeCmdIdx].cmd}
                  </div>
                  {TERMINAL_COMMANDS[activeCmdIdx].output.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      style={{
                        color: '#E2E8F0',
                        paddingLeft: '10px',
                        borderLeft: '2px solid rgba(56, 189, 248, 0.25)',
                        marginBottom: '4px',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Certificates Footer inside Terminal */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ color: 'var(--accent-amber)', fontSize: '0.72rem' }}>
                  CERTIFIED:
                </span>
                {certificates.map((c, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education Progression Ladder (ปวช. 3.92 -> ปวส. 3.92 -> วศ.บ. มจพ.) */}
          <div
            style={{
              background: 'rgba(13, 19, 31, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.16)',
              borderRadius: '20px',
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} color="var(--accent-cyan)" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  Academic Progression
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-mint)',
                }}
              >
                IT Honors → KMUTNB B.Eng.
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[...education].reverse().map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    background: 'rgba(7, 11, 18, 0.75)',
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    borderLeft: `3px solid ${edu.color}`,
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '2px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: edu.color,
                          fontWeight: 700,
                        }}
                      >
                        [{edu.level}]
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.96rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {edu.degree} — {edu.field}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {edu.institution}
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color:
                        parseFloat(edu.grade) >= 3.5
                          ? 'var(--accent-mint)'
                          : 'var(--accent-cyan)',
                      background: 'rgba(255,255,255,0.04)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}
                  >
                    GPA {edu.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .signal-pipeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .about-bottom-split {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 960px) {
          .signal-pipeline-grid,
          .about-bottom-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
