import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Monitor,
  Workflow,
} from 'lucide-react';
import { projects } from '../data/portfolio';

const ARCHITECTURE_FLOWS = {
  1: ['Employee / IT Admin', 'Microsoft Entra ID SSO', 'React 19 + Express 5 API', 'PostgreSQL + Vercel Cron SLA'],
  2: ['Corporate Employee', 'Entra ID OAuth2 Token', 'RBAC Policy Engine', '6+ Internal PFIG Web Apps'],
  3: ['Staff Reservation UI', 'Next.js 16 Collision Check', 'SQLite Schedule Store', 'Teams Webhook + SMTP Alert'],
  4: ['Memo Author / Signer', 'HTML5 Signature Canvas', 'HTTP 409 Optimistic Lock', 'Neon Postgres + PDF Engine'],
  5: ['Logistics Quoter', 'IndexedDB Offline Cache', '3,613 Route Matrix Engine', 'Supabase Sync + SheetJS XLSX'],
  6: ['Azure AD Directory', 'MS Graph API + PKCE', 'Supabase Edge Cache', 'Interactive Hierarchy Tree'],
  7: ['Public Rider / Admin', 'Next.js 16 App Router', '43+ Postgres Migrations', 'Side-by-Side Spec Diff UI'],
  8: ['Employee SSO Login', 'BMI & Body Age Engine', 'Supabase Leaderboard DB', 'Live Townhall Ceremony View'],
  9: ['Next.js Booking UI', 'PostgreSQL Time Slot', 'IoT Hardware Controller', 'Room HVAC / Power Relay'],
};

/* ──────────────────────────────────────────────────────────────────────────
   Bespoke App Screen Mockup Renderer for each of the 9 Projects
   ────────────────────────────────────────────────────────────────────────── */
const ProjectScreenPreview = ({ project, tall = false, viewTab = 'ui' }) => {
  const c = project.color || '#38BDF8';
  const height = tall ? 275 : 176;

  const urlMap = {
    1: 'helpdesk.pfig.internal/tickets/sla-queue',
    2: 'portal.pfig.internal/sso-hub',
    3: 'booking.pfig.internal/calendar',
    4: 'memo.pfig.internal/workflow/approve',
    5: 'raka.pfig.internal/freight-calculator',
    6: 'orgchart.pfig.internal/directory-tree',
    7: 'motospec.th/compare/specs',
    8: 'wellbeing.pfig.internal/leaderboard',
    9: 'smartroom.dolly.internal/iot-control',
  };

  const flowNodes = ARCHITECTURE_FLOWS[project.id] || ARCHITECTURE_FLOWS[1];

  return (
    <div
      style={{
        height,
        width: '100%',
        background: '#070B12',
        borderBottom: '1px solid rgba(148, 163, 184, 0.14)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient Screen Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-25%',
          right: '-10%',
          width: '240px',
          height: '190px',
          background: `radial-gradient(circle, ${c}28 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Browser / App Window Top Bar */}
      <div
        style={{
          height: '32px',
          padding: '0 12px',
          background: '#0D131F',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: '300px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '5px',
            padding: '2px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-dim)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          https://{urlMap[project.id] || 'app.internal'}
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            color: c,
            background: `${c}18`,
            border: `1px solid ${c}40`,
            padding: '1px 6px',
            borderRadius: '4px',
          }}
        >
          {viewTab === 'arch' ? 'ARCH DIAGRAM' : 'LIVE UI'}
        </span>
      </div>

      {/* If Architecture Tab is selected inside the Monitor */}
      {viewTab === 'arch' ? (
        <div
          style={{
            flex: 1,
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center' }}>
            END-TO-END SYSTEM DATA & AUTHENTICATION PIPELINE
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {flowNodes.map((node, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(17, 24, 39, 0.92)',
                  border: `1px solid ${idx === 3 ? c : 'rgba(255,255,255,0.12)'}`,
                  borderTop: `2px solid ${c}`,
                  borderRadius: '8px',
                  padding: '12px 8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '9px', color: c, marginBottom: '4px' }}>
                  STEP 0{idx + 1}
                </div>
                <div style={{ fontSize: '10.5px', color: '#F8FAFC', fontWeight: 600, lineHeight: 1.35 }}>
                  {node}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* UI Screen Mockup Viewport */
        <div
          style={{
            flex: 1,
            padding: tall ? '16px 18px' : '11px 13px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 1. PFIG IT Helpdesk */}
          {project.id === 1 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {[
                  { k: 'OPEN TICKETS', v: '12 QUEUED', col: '#38BDF8' },
                  { k: 'SLA ON-TIME', v: '98.4%', col: '#34D399' },
                  { k: 'VERCEL CRON', v: 'AUTO-ESCALATE', col: '#FBBF24' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(17, 24, 39, 0.9)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '6px',
                      padding: '6px 8px',
                    }}
                  >
                    <div style={{ fontSize: '8.5px', color: 'var(--text-dim)' }}>{stat.k}</div>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: stat.col }}>{stat.v}</div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: 'rgba(17, 24, 39, 0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '7px',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {[
                  { id: '#TK-842', title: 'Office VLAN Switch Port Drop (Fl.2)', sla: 'SLA 18m', sc: '#FBBF24' },
                  { id: '#TK-841', title: 'Entra ID MFA & Exchange Mailbox Sync', sla: 'RESOLVED', sc: '#34D399' },
                  { id: '#TK-839', title: 'Conference Room HDMI/SDI Matrix Check', sla: 'IN PROGRESS', sc: '#38BDF8' },
                ].map((row) => (
                  <div
                    key={row.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '9.5px',
                      paddingBottom: '3px',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', minWidth: 0 }}>
                      <span style={{ color: '#38BDF8', fontWeight: 600 }}>{row.id}</span>
                      <span
                        style={{
                          color: '#E2E8F0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '8.5px',
                        color: row.sc,
                        background: `${row.sc}18`,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        flexShrink: 0,
                      }}
                    >
                      {row.sla}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 2. PFIG Portal */}
          {project.id === 2 && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '9.5px',
                }}
              >
                <span style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  Microsoft Entra ID SSO • Authenticated
                </span>
                <span style={{ color: '#34D399' }}>RBAC: IT_ADMIN</span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '6px',
                  flex: 1,
                }}
              >
                {[
                  { name: 'IT Helpdesk', tag: 'Service Desk', col: '#00F0FF' },
                  { name: 'Room Booking', tag: 'Scheduler', col: '#00FF87' },
                  { name: 'Digital MEMO', tag: 'e-Signature', col: '#F59E0B' },
                  { name: 'RAKA Freight', tag: '3,613 Routes', col: '#EC4899' },
                  { name: 'HR Org Chart', tag: 'MS Graph', col: '#06B6D4' },
                  { name: 'Wellbeing', tag: 'Health KPI', col: '#10B981' },
                ].map((app) => (
                  <div
                    key={app.name}
                    style={{
                      background: 'rgba(17, 24, 39, 0.9)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderTop: `2px solid ${app.col}`,
                      borderRadius: '6px',
                      padding: '6px 7px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#F8FAFC' }}>
                      {app.name}
                    </div>
                    <div style={{ fontSize: '8px', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {app.tag}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 3. PFIG Booking */}
          {project.id === 3 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9.5px' }}>
                <span style={{ color: '#00FF87', fontWeight: 700 }}>
                  RESOURCE TIMELINE • ZERO DOUBLE-BOOKING
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', fontSize: '8.5px' }}>
                  Teams Webhook Dispatched
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  background: 'rgba(17, 24, 39, 0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '7px',
                  padding: '8px',
                }}
              >
                {[
                  { room: 'Boardroom A (A/V)', slot: '09:00 - 11:30', dept: 'Executive Sync', w: '62%', left: '8%', col: '#00FF87' },
                  { room: 'Meeting Room B', slot: '13:00 - 15:00', dept: 'IT Infra Review', w: '48%', left: '38%', col: '#38BDF8' },
                  { room: 'Corporate Van #02', slot: '08:30 - 16:30', dept: 'Site Inspection', w: '78%', left: '5%', col: '#818CF8' },
                ].map((r) => (
                  <div
                    key={r.room}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '105px 1fr',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '9px',
                    }}
                  >
                    <span style={{ color: '#CBD5E1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.room}
                    </span>
                    <div style={{ height: '18px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: r.left,
                          width: r.w,
                          top: 2,
                          bottom: 2,
                          background: `${r.col}28`,
                          borderLeft: `2px solid ${r.col}`,
                          borderRadius: '3px',
                          paddingLeft: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#F8FAFC',
                          fontSize: '8px',
                        }}
                      >
                        {r.slot} • {r.dept}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 4. PFIG MEMO */}
          {project.id === 4 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px' }}>
                <span style={{ color: '#F59E0B', fontWeight: 700 }}>
                  MEMO-2026-0194 • MULTI-STAGE APPROVAL
                </span>
                <span style={{ color: '#34D399', background: 'rgba(52,211,153,0.12)', padding: '1px 6px', borderRadius: '4px' }}>
                  HTTP 409 Lock: v4
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '6px',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: '9px', color: '#E2E8F0', fontWeight: 600 }}>
                    Approval Routing Chain
                  </div>
                  {['1. Requester (Signed)', '2. IT Manager (Signed)', '3. Director (Ready for PDF)'].map((st, idx) => (
                    <div key={idx} style={{ fontSize: '8.5px', color: idx < 2 ? '#34D399' : '#F59E0B' }}>
                      ✓ {st}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    border: '1px dashed rgba(245, 158, 11, 0.45)',
                    borderRadius: '6px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="78" height="28" viewBox="0 0 100 36" fill="none">
                    <path
                      d="M8 26 C22 8, 30 30, 46 14 C58 4, 65 26, 92 12"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span style={{ fontSize: '8px', color: 'var(--text-dim)', marginTop: '2px' }}>
                    Canvas Digital Signature + PDF
                  </span>
                </div>
              </div>
            </>
          )}

          {/* 5. PFIG RAKA */}
          {project.id === 5 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                <div style={{ background: 'rgba(17,24,39,0.9)', padding: '5px 7px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '8px', color: 'var(--text-dim)' }}>THAI ROUTES</div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#EC4899' }}>3,613 Routes</div>
                </div>
                <div style={{ background: 'rgba(17,24,39,0.9)', padding: '5px 7px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '8px', color: 'var(--text-dim)' }}>PRESET CLIENTS</div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#38BDF8' }}>111 Clients</div>
                </div>
                <div style={{ background: 'rgba(17,24,39,0.9)', padding: '5px 7px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '8px', color: 'var(--text-dim)' }}>OFFLINE DB</div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#34D399' }}>IndexedDB Sync</div>
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(17, 24, 39, 0.85)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px',
                  padding: '7px 9px',
                  fontSize: '9px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '8px' }}>
                  <span>ROUTE / VEHICLE TYPE</span>
                  <span>FREIGHT + MARGIN</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F8FAFC' }}>
                  <span>Nonthaburi → Rayong (10-Wheel Chemical)</span>
                  <span style={{ color: '#EC4899', fontWeight: 700 }}>฿14,850 • SheetJS Ready</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#CBD5E1' }}>
                  <span>Samut Sakhon → Saraburi (Trailer Bulk)</span>
                  <span style={{ color: '#34D399', fontWeight: 700 }}>฿18,200 • Gross 22.4%</span>
                </div>
              </div>
            </>
          )}

          {/* 6. HR Organization Chart */}
          {project.id === 6 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'rgba(17, 24, 39, 0.8)',
                borderRadius: '7px',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '8px',
              }}
            >
              <div
                style={{
                  background: 'rgba(6, 182, 212, 0.18)',
                  border: '1px solid #06B6D4',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#F8FAFC',
                }}
              >
                Executive Board (Microsoft Graph Sync)
              </div>
              <div style={{ width: '1px', height: '8px', background: '#06B6D4' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
                {[
                  { d: 'IT Infrastructure', h: 'Entra ID / M365' },
                  { d: 'Operations & Logistics', h: 'RAKA / Fleet' },
                  { d: 'Human Resources', h: 'PKCE Silent SSO' },
                ].map((node) => (
                  <div
                    key={node.d}
                    style={{
                      background: 'rgba(11, 15, 23, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '5px',
                      padding: '5px 6px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#06B6D4' }}>{node.d}</div>
                    <div style={{ fontSize: '7.5px', color: 'var(--text-dim)', marginTop: '2px' }}>{node.h}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. MotoSpec Thailand */}
          {project.id === 7 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>
                  SIDE-BY-SIDE SPEC ENGINE (43+ MIGRATIONS)
                </span>
                <span style={{ color: 'var(--text-dim)' }}>Next.js 16 • Supabase</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: 1 }}>
                {[
                  { m: 'Sport 1000RR', hp: '214 HP @ 14,500', w: '92%', col: '#EF4444' },
                  { m: 'Hyper Naked 900', hp: '119 HP @ 10,000', w: '68%', col: '#38BDF8' },
                ].map((bike) => (
                  <div
                    key={bike.m}
                    style={{
                      background: 'rgba(17,24,39,0.9)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '7px 9px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#F8FAFC' }}>{bike.m}</div>
                    <div style={{ fontSize: '8.5px', color: bike.col }}>{bike.hp}</div>
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px' }}>
                      <div style={{ width: bike.w, height: '100%', background: bike.col, borderRadius: '99px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 8. PFIG Wellbeing */}
          {project.id === 8 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px', flex: 1 }}>
              <div
                style={{
                  background: 'rgba(17,24,39,0.9)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '9px', color: '#10B981', fontWeight: 700 }}>
                  DEPARTMENT HEALTH LEADERBOARD
                </div>
                <div style={{ fontSize: '8.5px', color: '#E2E8F0' }}>1. IT & Engineering • -4.2% Avg BMI</div>
                <div style={{ fontSize: '8.5px', color: '#94A3B8' }}>2. Logistics & Fleet • -3.6% Avg BMI</div>
                <div style={{ fontSize: '8.5px', color: '#94A3B8' }}>3. Corporate HR • -2.9% Avg BMI</div>
              </div>
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>21.4 BMI</div>
                <div style={{ fontSize: '8px', color: '#E2E8F0', marginTop: '2px' }}>OPTIMAL HEALTH</div>
                <div style={{ fontSize: '7.5px', color: 'var(--text-dim)', marginTop: '2px' }}>Entra ID Verified</div>
              </div>
            </div>
          )}

          {/* 9. Meeting Room Booking + IoT */}
          {project.id === 9 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                <span style={{ color: '#06B6D4', fontWeight: 700 }}>
                  SMART ROOM + IOT HARDWARE RELAY BUS
                </span>
                <span style={{ color: '#34D399' }}>MQTT / REST ONLINE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', flex: 1 }}>
                {[
                  { dev: 'HVAC / AC Unit', st: 'AUTO-ON (24°C)', col: '#34D399' },
                  { dev: 'A/V Projector', st: 'HDMI READY', col: '#06B6D4' },
                  { dev: 'Smart Door Lock', st: 'BADGE SYNCED', col: '#818CF8' },
                ].map((iot) => (
                  <div
                    key={iot.dev}
                    style={{
                      background: 'rgba(17,24,39,0.9)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '7px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ fontSize: '8.5px', color: '#CBD5E1' }}>{iot.dev}</div>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: iot.col }}>{iot.st}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [monitorTab, setMonitorTab] = useState('ui'); // 'ui' | 'arch'

  const activeProject = projects[featuredIdx] || projects[0];

  const handlePrev = () => {
    setFeaturedIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setFeaturedIdx((prev) => (prev + 1) % projects.length);
  };

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Heading */}
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
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.28)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '14px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-mint)',
              letterSpacing: '0.08em',
            }}
          >
            <Monitor size={14} />
            INTERACTIVE SYSTEM SHOWROOM • 9 DEPLOYMENTS
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 700,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.75rem',
            }}
          >
            Production Systems & Live UI Stage
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            เลือกระบบจากแถบรายการด้านซ้ายเพื่อดูตัวอย่างหน้าจอ UI จริง หรือสลับไปดูผังการไหลของข้อมูล (Architecture Flow) ของแต่ละโปรเจกต์
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────────
           GIMMICK 3: Master-Detail Interactive App Showroom Stage
           Left: 9-System Selector Dock | Right: Live Dual-Mode App Monitor
           ───────────────────────────────────────────────────────────────── */}
        <div className="project-spotlight-stage">
          {/* Left Dock: 9 Production Systems */}
          <div
            style={{
              background: 'rgba(7, 11, 18, 0.9)',
              borderRight: '1px solid rgba(148, 163, 184, 0.14)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-dim)',
                }}
              >
                SELECT DEPLOYMENT ({featuredIdx + 1}/9)
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  aria-label="Next project"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* 9 System Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {projects.map((p, idx) => {
                const isSelected = idx === featuredIdx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setFeaturedIdx(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderRadius: '11px',
                      border: `1px solid ${
                        isSelected ? p.color : 'rgba(255, 255, 255, 0.04)'
                      }`,
                      background: isSelected
                        ? `${p.color}18`
                        : 'rgba(17, 24, 39, 0.45)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: isSelected ? p.color : 'var(--text-dim)',
                        }}
                      >
                        0{p.id}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: isSelected ? '#F8FAFC' : 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {p.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--text-dim)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {p.subtitle}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: isSelected ? p.color : 'transparent',
                        boxShadow: isSelected ? `0 0 8px ${p.color}` : 'none',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Stage: Interactive Dual-Mode Monitor + Detailed Spec */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Monitor Mode Switcher Bar */}
            <div
              style={{
                padding: '12px 22px',
                background: 'rgba(11, 15, 23, 0.9)',
                borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: activeProject.color,
                    background: `${activeProject.color}18`,
                    padding: '3px 10px',
                    borderRadius: '6px',
                  }}
                >
                  SYS-0{activeProject.id} • {activeProject.category.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  {activeProject.title}
                </span>
              </div>

              {/* Toggle between Live UI Screen & Architecture Flow */}
              <div
                style={{
                  display: 'inline-flex',
                  background: 'rgba(7, 11, 18, 0.9)',
                  border: '1px solid rgba(148, 163, 184, 0.16)',
                  borderRadius: '9px',
                  padding: '3px',
                  gap: '4px',
                }}
              >
                {[
                  { id: 'ui', label: 'UI Screen Preview', icon: Monitor },
                  { id: 'arch', label: 'Architecture Flow', icon: Workflow },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = monitorTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setMonitorTab(t.id)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: active
                          ? activeProject.color
                          : 'transparent',
                        color: active ? '#060911' : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.73rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Icon size={13} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animated Monitor Viewport + Engineering Spec */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.id}-${monitorTab}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                {/* Large Interactive Screen Preview */}
                <ProjectScreenPreview
                  project={activeProject}
                  tall
                  viewTab={monitorTab}
                />

                {/* Bottom Spec Panel */}
                <div
                  style={{
                    padding: '22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '18px',
                    flex: 1,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.95rem',
                        color: activeProject.color,
                        fontWeight: 600,
                        marginBottom: '6px',
                      }}
                    >
                      {activeProject.subtitle}
                    </div>
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        marginBottom: '16px',
                      }}
                    >
                      {activeProject.description}
                    </p>

                    {/* 2x2 Highlights Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '8px 14px',
                        background: 'rgba(7, 11, 18, 0.65)',
                        border: '1px solid rgba(148, 163, 184, 0.12)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                      }}
                    >
                      {activeProject.highlights.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            fontSize: '0.84rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{
                              color: activeProject.color,
                              marginTop: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(148, 163, 184, 0.12)',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: 'rgba(17, 24, 39, 0.9)',
                            border: '1px solid rgba(148, 163, 184, 0.18)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.73rem',
                        color: 'var(--accent-mint)',
                      }}
                    >
                      ● PRODUCTION VERIFIED
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Compact Quick-Jump Visual Grid for All 9 Systems */}
        <div style={{ marginTop: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
              }}
            >
              QUICK-JUMP SYSTEM GALLERY (CLICK ANY CARD TO LOAD INTO STAGE)
            </span>
          </div>

          <div className="quick-jump-grid">
            {projects.map((proj, idx) => {
              const isSelected = idx === featuredIdx;
              return (
                <motion.div
                  key={proj.id}
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    setFeaturedIdx(idx);
                    const stageEl = document.querySelector('.project-spotlight-stage');
                    if (stageEl) {
                      stageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  style={{
                    background: 'rgba(13, 19, 31, 0.78)',
                    border: `1px solid ${
                      isSelected ? proj.color : 'rgba(148, 163, 184, 0.14)'
                    }`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isSelected ? `0 0 24px ${proj.color}25` : 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <ProjectScreenPreview project={proj} />
                  <div style={{ padding: '12px 14px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {proj.title}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: proj.color,
                        }}
                      >
                        SYS-0{proj.id}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {proj.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .project-spotlight-stage {
          display: grid;
          grid-template-columns: 320px 1fr;
          background: rgba(13, 19, 31, 0.85);
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(16px);
        }
        .quick-jump-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.15rem;
        }
        @media (max-width: 960px) {
          .project-spotlight-stage {
            grid-template-columns: 1fr;
          }
          .quick-jump-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .quick-jump-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
