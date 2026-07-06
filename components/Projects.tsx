'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

// ─── AI-themed SVG illustrations ─────────────────────────────────────────────

function SignLanguageIllustration() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" style={{ background: 'transparent' }}>
      {/* Background grid */}
      <defs>
        <pattern id="sl-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="sl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.25)"/>
          <stop offset="100%" stopColor="rgba(0,212,255,0)"/>
        </radialGradient>
        <filter id="sl-blur">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>
      <rect width="400" height="280" fill="url(#sl-grid)"/>
      <ellipse cx="200" cy="140" rx="130" ry="100" fill="url(#sl-glow)"/>

      {/* Hand silhouette - open palm signing "A" */}
      <g transform="translate(120, 40)">
        {/* Palm */}
        <ellipse cx="80" cy="175" rx="42" ry="50" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5"/>
        {/* Thumb */}
        <path d="M 44 165 Q 20 150 18 125 Q 16 105 32 100 Q 48 95 52 120 L 44 165" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5"/>
        {/* Index finger */}
        <rect x="62" y="90" width="18" height="70" rx="9" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5"/>
        {/* Middle finger */}
        <rect x="82" y="75" width="18" height="85" rx="9" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5"/>
        {/* Ring finger */}
        <rect x="102" y="82" width="18" height="80" rx="9" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5"/>
        {/* Pinky */}
        <rect x="122" y="98" width="14" height="65" rx="7" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.45)" strokeWidth="1.5"/>

        {/* MediaPipe landmarks - joint dots */}
        {[
          [71,90],[71,102],[71,114],[71,126],   // index
          [91,75],[91,90],[91,104],[91,118],    // middle
          [111,82],[111,97],[111,111],[111,124], // ring
          [129,98],[129,111],[129,122],[129,133],// pinky
          [36,100],[44,112],[52,125],[60,138],  // thumb
          [80,148],[80,160],[80,172],[68,178],[92,178], // palm base
        ].map(([x,y], idx) => (
          <circle key={idx} cx={x} cy={y} r={idx < 20 ? 3 : 4} fill="#00d4ff" opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.9))' }}/>
        ))}

        {/* Landmark connections */}
        {[
          [[71,90],[71,102]],[[71,102],[71,114]],[[71,114],[71,126]],
          [[91,75],[91,90]],[[91,90],[91,104]],[[91,104],[91,118]],
          [[111,82],[111,97]],[[111,97],[111,111]],[[111,111],[111,124]],
        ].map(([[x1,y1],[x2,y2]], idx) => (
          <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.4)" strokeWidth="1"/>
        ))}
      </g>

      {/* Detection box */}
      <rect x="112" y="32" width="176" height="216" rx="4" fill="none" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" strokeDasharray="6 3"/>
      {/* Corner brackets */}
      {[[112,32],[288,32],[112,248],[288,248]].map(([x,y], i) => {
        const bx = i < 2 ? x : x; const by = y;
        const dx = i % 2 === 0 ? 12 : -12;
        const dy = i < 2 ? 12 : -12;
        return <g key={i}>
          <line x1={bx} y1={by} x2={bx+dx} y2={by} stroke="#00d4ff" strokeWidth="2"/>
          <line x1={bx} y1={by} x2={bx} y2={by+dy} stroke="#00d4ff" strokeWidth="2"/>
        </g>;
      })}

      {/* Label: ISL → TEXT */}
      <rect x="8" y="12" width="88" height="24" rx="4" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
      <text x="52" y="28" textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace" fontWeight="bold">ISL → TEXT</text>

      {/* Sound wave bars on right */}
      {[0,1,2,3,4,5,6].map(i => {
        const h = [20,36,52,64,52,36,20][i];
        return <rect key={i} x={315 + i*9} y={140 - h/2} width="6" height={h} rx="3"
          fill="rgba(0,212,255,0.6)" opacity="0.7 + i*0.04"/>;
      })}
      <text x="349" y="225" textAnchor="middle" fill="rgba(0,212,255,0.7)" fontSize="9" fontFamily="monospace">SPEECH OUT</text>

      {/* AI LIVE label */}
      <circle cx="374" cy="20" r="5" fill="#00d4ff" opacity="0.9" style={{ filter: 'drop-shadow(0 0 6px #00d4ff)' }}/>
      <text x="360" y="15" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace">LIVE</text>

      {/* Gesture class label */}
      <rect x="112" y="252" width="176" height="22" rx="3" fill="rgba(0,212,255,0.08)"/>
      <text x="200" y="267" textAnchor="middle" fill="rgba(0,212,255,0.9)" fontSize="10" fontFamily="monospace">GESTURE CLASS: "HELLO" · 97.4%</text>
    </svg>
  );
}

function PneumoniaIllustration() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" style={{ background: 'transparent' }}>
      <defs>
        <pattern id="px-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16,185,129,0.07)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="px-glow1" cx="35%" cy="50%" r="40%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.2)"/>
          <stop offset="100%" stopColor="rgba(16,185,129,0)"/>
        </radialGradient>
        <radialGradient id="px-glow2" cx="65%" cy="50%" r="40%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.2)"/>
          <stop offset="100%" stopColor="rgba(16,185,129,0)"/>
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#px-grid)"/>

      {/* Chest X-ray: two lung shapes */}
      {/* Left lung */}
      <path d="M 90 50 Q 60 60 52 110 Q 46 160 60 200 Q 80 235 115 230 Q 150 225 160 180 Q 168 140 160 95 Q 148 52 120 48 Z"
        fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" strokeWidth="1.5"/>
      {/* Right lung */}
      <path d="M 310 50 Q 340 60 348 110 Q 354 160 340 200 Q 320 235 285 230 Q 250 225 240 180 Q 232 140 240 95 Q 252 52 280 48 Z"
        fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.55)" strokeWidth="1.5"/>
      {/* Spine/ribcage center */}
      <rect x="190" y="45" width="20" height="190" rx="4" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>

      {/* Rib lines */}
      {[70,95,120,145,168,192,216].map((y,i) => (
        <g key={i}>
          <path d={`M 110 ${y} Q 150 ${y-5} 190 ${y}`} fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1"/>
          <path d={`M 290 ${y} Q 250 ${y-5} 210 ${y}`} fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1"/>
        </g>
      ))}

      {/* CNN heatmap overlays – abnormality regions */}
      {[
        {cx:100,cy:130,r:28,o:0.45,c:'rgba(239,68,68,0.6)'},
        {cx:122,cy:155,r:20,o:0.3,c:'rgba(251,146,60,0.5)'},
        {cx:108,cy:108,r:16,o:0.25,c:'rgba(251,146,60,0.4)'},
        {cx:300,cy:140,r:18,o:0.2,c:'rgba(251,146,60,0.35)'},
      ].map((h,i)=>(
        <circle key={i} cx={h.cx} cy={h.cy} r={h.r} fill={h.c} opacity={h.o} style={{filter:`blur(8px)`}}/>
      ))}

      {/* GradCAM label */}
      <rect x="60" y="92" width="68" height="16" rx="3" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" strokeWidth="1"/>
      <text x="94" y="103" textAnchor="middle" fill="rgba(239,68,68,0.9)" fontSize="9" fontFamily="monospace">PNEUMONIA</text>

      {/* Scanline animation lines */}
      <line x1="52" y1="140" x2="348" y2="140" stroke="rgba(16,185,129,0.15)" strokeWidth="8"/>
      <line x1="52" y1="140" x2="348" y2="140" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>

      {/* Accuracy meter top right */}
      <rect x="308" y="8" width="84" height="52" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>
      <text x="350" y="24" textAnchor="middle" fill="rgba(16,185,129,0.7)" fontSize="8" fontFamily="monospace">CNN ACCURACY</text>
      <text x="350" y="46" textAnchor="middle" fill="#10b981" fontSize="20" fontFamily="monospace" fontWeight="bold">85%</text>

      {/* Diagnosis panel bottom */}
      <rect x="8" y="250" width="384" height="26" rx="4" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
      <text x="200" y="267" textAnchor="middle" fill="rgba(16,185,129,0.8)" fontSize="10" fontFamily="monospace">MODEL: TensorFlow · Keras CNN · Flask Deployment</text>

      {/* AI scan label top left */}
      <rect x="8" y="8" width="72" height="22" rx="4" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.35)" strokeWidth="1"/>
      <text x="44" y="22" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">AI SCAN</text>

      {/* Dashed scan border */}
      <rect x="44" y="38" width="312" height="200" rx="4" fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1" strokeDasharray="4 3"/>
    </svg>
  );
}

function AutismIllustration() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" style={{ background: 'transparent' }}>
      <defs>
        <pattern id="au-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="0.5"/>
        </pattern>
        <radialGradient id="au-glow" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.25)"/>
          <stop offset="100%" stopColor="rgba(59,130,246,0)"/>
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#au-grid)"/>
      <ellipse cx="200" cy="128" rx="140" ry="110" fill="url(#au-glow)"/>

      {/* Face outline */}
      <ellipse cx="200" cy="130" rx="72" ry="88" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5"/>

      {/* Eyes */}
      <ellipse cx="175" cy="112" rx="12" ry="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
      <ellipse cx="225" cy="112" rx="12" ry="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5"/>
      {/* Pupils */}
      <circle cx="175" cy="112" r="4" fill="#3b82f6" opacity="0.8" style={{filter:'drop-shadow(0 0 4px rgba(59,130,246,0.9))'}}/>
      <circle cx="225" cy="112" r="4" fill="#3b82f6" opacity="0.8" style={{filter:'drop-shadow(0 0 4px rgba(59,130,246,0.9))'}}/>

      {/* Eye gaze tracking lines */}
      <line x1="175" y1="112" x2="80" y2="85" stroke="rgba(59,130,246,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="80" cy="85" r="5" fill="none" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
      <circle cx="80" cy="85" r="2" fill="#3b82f6" opacity="0.8"/>

      <line x1="225" y1="112" x2="320" y2="88" stroke="rgba(59,130,246,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="320" cy="88" r="5" fill="none" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
      <circle cx="320" cy="88" r="2" fill="#3b82f6" opacity="0.8"/>

      {/* Facial landmark dots */}
      {[
        [200,44],[173,70],[227,70],       // top
        [200,95],                          // nose bridge
        [175,112],[225,112],              // eyes
        [200,140],[182,158],[218,158],    // nose/cheeks
        [175,175],[200,182],[225,175],    // mouth
        [200,218],                         // chin
        [130,100],[270,100],[128,145],[272,145], // side
        [150,58],[250,58],
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#3b82f6" opacity="0.85"
          style={{filter:'drop-shadow(0 0 4px rgba(59,130,246,0.8))'}}/>
      ))}

      {/* Body pose skeleton lines - stick figure below face */}
      <line x1="200" y1="218" x2="200" y2="260" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5"/>
      <line x1="200" y1="230" x2="170" y2="255" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5"/>
      <line x1="200" y1="230" x2="230" y2="255" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5"/>

      {/* Neural network nodes on left */}
      {[[30,80],[30,120],[30,160],[30,200]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.2"/>
          <circle cx={x} cy={y} r="3" fill="#3b82f6" opacity="0.7"/>
        </g>
      ))}
      {[[65,100],[65,140],[65,180]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
          <circle cx={x} cy={y} r="2.5" fill="#3b82f6" opacity="0.6"/>
        </g>
      ))}
      {/* Left NN connections */}
      {[[30,80],[30,120],[30,160],[30,200]].flatMap(([x1,y1])=>
        [[65,100],[65,140],[65,180]].map(([x2,y2],j)=>(
          <line key={`${x1}${y1}${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(59,130,246,0.2)" strokeWidth="0.8"/>
        ))
      )}

      {/* Neural nodes on right */}
      {[[370,80],[370,120],[370,160],[370,200]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.2"/>
          <circle cx={x} cy={y} r="3" fill="#3b82f6" opacity="0.7"/>
        </g>
      ))}
      {[[335,100],[335,140],[335,180]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" strokeWidth="1"/>
          <circle cx={x} cy={y} r="2.5" fill="#3b82f6" opacity="0.6"/>
        </g>
      ))}

      {/* Labels */}
      <rect x="8" y="8" width="108" height="22" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
      <text x="62" y="22" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace" fontWeight="bold">CNN-TRANSFORMER</text>

      <rect x="284" y="8" width="108" height="22" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
      <text x="338" y="22" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace" fontWeight="bold">EXPLAINABLE AI</text>

      {/* Bottom panel */}
      <rect x="8" y="250" width="384" height="26" rx="4" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
      <text x="200" y="267" textAnchor="middle" fill="rgba(59,130,246,0.8)" fontSize="10" fontFamily="monospace">MULTI-MODAL · Grad-CAM · SHAP · BiGRU · ST-GCN</text>
    </svg>
  );
}

const PROJECT_ILLUSTRATIONS = [SignLanguageIllustration, PneumoniaIllustration, AutismIllustration];

// ─────────────────────────────────────────────────────────────────────────────

const colorConfig = {
  cyan: {
    gradient: 'from-cyan-500/20 to-cyan-900/5',
    border: 'border-cyan-500/20',
    tech: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    badge: 'text-cyan-400',
    glow: 'shadow-cyan-500/10',
    dot: '#00d4ff',
  },
  emerald: {
    gradient: 'from-emerald-500/20 to-emerald-900/5',
    border: 'border-emerald-500/20',
    tech: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    badge: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
    dot: '#10b981',
  },
  blue: {
    gradient: 'from-blue-500/20 to-blue-900/5',
    border: 'border-blue-500/20',
    tech: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    badge: 'text-blue-400',
    glow: 'shadow-blue-500/10',
    dot: '#3b82f6',
  },
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Projects</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            AI Systems{' '}
            <span className="gradient-text">That Matter</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Each project solves a real-world problem using cutting-edge AI and deep learning.
          </p>
        </motion.div>

        <div className="space-y-6">
          {portfolioData.projects.map((project, i) => {
            const cfg = colorConfig[project.color as keyof typeof colorConfig];
            const isExpanded = expanded === i;
            const Illustration = PROJECT_ILLUSTRATIONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`group rounded-2xl border overflow-hidden transition-all duration-500 hover:shadow-2xl ${cfg.border} ${cfg.glow}`}
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-5 ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Illustration panel */}
                  <div
                    className={`relative overflow-hidden lg:col-span-2 ${i % 2 === 1 ? 'lg:col-start-4' : ''} bg-[#050510]`}
                    style={{ minHeight: '200px' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} z-10 pointer-events-none`} />
                    <div className="relative z-20 w-full h-48 lg:h-full transition-transform duration-700 group-hover:scale-105 origin-center">
                      <Illustration />
                    </div>
                    {/* Project number */}
                    <div className="absolute top-4 left-4 z-30">
                      <span
                        className="text-5xl font-display font-bold opacity-20 select-none"
                        style={{ color: cfg.dot }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-3 p-6 lg:p-8 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.dot }} />
                      <span className={`text-xs font-medium ${cfg.badge}`}>AI Project</span>
                      <span className="text-slate-600 text-xs">·</span>
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Calendar size={11} /> {project.period}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-white mb-3 leading-tight group-hover:text-slate-100 transition-colors">
                      {project.title}
                    </h3>

                    <p className={`text-slate-400 text-base leading-relaxed mb-4 transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {project.description}
                    </p>

                    <button
                      onClick={() => setExpanded(isExpanded ? null : i)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mb-4 transition-colors"
                    >
                      {isExpanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Read more</>}
                    </button>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.highlights.map(h => (
                        <span
                          key={h}
                          className="text-xs font-medium px-2.5 py-1 rounded-full border"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.08)',
                            color: '#94a3b8',
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map(tech => (
                        <span
                          key={tech}
                          className={`text-xs font-medium px-2.5 py-1 rounded-md border ${cfg.tech}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                      <a
                        href="https://github.com/6-varsha-9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <Github size={14} /> View Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
