'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Zap, Users, Target, Lightbulb, TrendingUp } from 'lucide-react';

const TRAITS = [
  { icon: Brain, label: 'AI Engineer', desc: 'Building intelligent systems with ML, DL, and CV', color: 'cyan' },
  { icon: Lightbulb, label: 'Creative Thinker', desc: 'Turning complex problems into elegant AI solutions', color: 'blue' },
  { icon: Zap, label: 'Fast Learner', desc: 'Quickly mastering new technologies and frameworks', color: 'emerald' },
  { icon: Target, label: 'Problem Solver', desc: 'Data-driven approach to analytical challenges', color: 'cyan' },
  { icon: Users, label: 'Team Player', desc: 'Collaborative contributor in cross-functional teams', color: 'blue' },
  { icon: TrendingUp, label: 'AI Problem Solver', desc: 'Passionate about applying AI, Machine Learning, Computer Vision and emerging technologies to solve real-world challenges through innovative, scalable solutions.', color: 'emerald' },
];

const colorMap: Record<string, string> = {
  cyan: 'rgba(0,212,255,0.15)',
  blue: 'rgba(0,102,255,0.15)',
  emerald: 'rgba(16,185,129,0.15)',
};
const borderMap: Record<string, string> = {
  cyan: 'rgba(0,212,255,0.25)',
  blue: 'rgba(0,102,255,0.25)',
  emerald: 'rgba(16,185,129,0.25)',
};
const iconColorMap: Record<string, string> = {
  cyan: '#00d4ff',
  blue: '#0066ff',
  emerald: '#10b981',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
} as const;
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">About</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Passionate About{' '}
            <span className="gradient-text">Intelligent Systems</span>
          </h2>
          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto">
            AI & Data Science undergraduate building intelligent, data-driven solutions through
            Machine Learning and AI. Strong analytical thinker with a commitment to continuous innovation.
          </p>
        </motion.div>

        {/* Traits grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {TRAITS.map(({ icon: Icon, label, desc, color }) => (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card p-6 rounded-xl cursor-default group"
              style={{
                background: `rgba(255,255,255,0.03)`,
                border: `1px solid ${borderMap[color]}`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: colorMap[color] }}
              >
                <Icon size={20} style={{ color: iconColorMap[color] }} />
              </div>
              <h3 className="font-semibold text-white mb-1.5 text-lg">{label}</h3>
              <p className="text-slate-500 text-base leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Education timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-8 border border-white/5"
        >
          <h3 className="font-display font-semibold text-2xl text-white mb-8 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600" />
            Education
          </h3>
          <div className="space-y-6">
            {[
              {
                degree: 'B Tech — Artificial Intelligence & Data Science',
                institution: 'Dr. N.G.P. Institute of Technology, Coimbatore',
                period: 'May 2026',
                score: 'CGPA: 7.89',
                highlight: true,
              },
              {
                degree: 'Higher Secondary (HSC)',
                institution: 'Vellalar Matriculation Higher Secondary School, Erode',
                period: '2022',
                score: '84%',
                highlight: false,
              },
              {
                degree: 'Secondary School (SSLC)',
                institution: 'Vellalar Matriculation Higher Secondary School, Erode',
                period: '2020',
                score: '72%',
                highlight: false,
              },
            ].map((edu, i) => (
              <div key={i} className={`flex gap-4 ${i < 2 ? 'pb-6 border-b border-white/5' : ''}`}>
                <div className="flex-shrink-0 pt-1">
                  <div
                    className="w-3 h-3 rounded-full border-2 mt-1.5"
                    style={{
                      background: edu.highlight ? '#00d4ff' : 'transparent',
                      borderColor: edu.highlight ? '#00d4ff' : 'rgba(255,255,255,0.2)',
                      boxShadow: edu.highlight ? '0 0 12px rgba(0,212,255,0.6)' : 'none',
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-white text-base">{edu.degree}</h4>
                      <p className="text-slate-500 text-sm mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className="text-sm font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                      >
                        {edu.score}
                      </span>
                      <p className="text-slate-600 text-xs mt-1">{edu.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
