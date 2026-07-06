'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

const ISSUER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'IBM': { bg: 'rgba(0,102,255,0.1)', text: '#3b82f6', border: 'rgba(0,102,255,0.2)' },
  'IBM SkillsBuild': { bg: 'rgba(0,102,255,0.1)', text: '#3b82f6', border: 'rgba(0,102,255,0.2)' },
  'Google': { bg: 'rgba(16,185,129,0.1)', text: '#10b981', border: 'rgba(16,185,129,0.2)' },
  'Microsoft': { bg: 'rgba(0,180,216,0.1)', text: '#0891b2', border: 'rgba(0,180,216,0.2)' },
  'Coursera': { bg: 'rgba(0,212,255,0.1)', text: '#00d4ff', border: 'rgba(0,212,255,0.2)' },
  'ISC2': { bg: 'rgba(239,68,68,0.1)', text: '#f87171', border: 'rgba(239,68,68,0.2)' },
  'Great Learning': { bg: 'rgba(168,85,247,0.1)', text: '#a78bfa', border: 'rgba(168,85,247,0.2)' },
  'Simplilearn': { bg: 'rgba(251,146,60,0.1)', text: '#fb923c', border: 'rgba(251,146,60,0.2)' },
};

const getIssuerStyle = (issuer: string) => {
  return ISSUER_COLORS[issuer] || { bg: 'rgba(0,212,255,0.08)', text: '#00d4ff', border: 'rgba(0,212,255,0.2)' };
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } } as const;
const cardVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
} as const;

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Certifications</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Verified{' '}
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            11 industry certifications from world-class institutions validating AI and data expertise.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {portfolioData.certifications.map((cert, i) => {
            const style = getIssuerStyle(cert.issuer);
            return (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative rounded-2xl p-5 border transition-all duration-300 group overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${style.bg} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: style.bg }}
                    >
                      {cert.icon}
                    </div>
                    <Award size={14} className="text-slate-600 mt-1" />
                  </div>

                  <h3 className="font-medium text-white text-base leading-snug mb-2.5">
                    {cert.name}
                  </h3>

                  <span
                    className="text-sm font-semibold px-2.5 py-1 rounded-full border"
                    style={{ background: style.bg, color: style.text, borderColor: style.border }}
                  >
                    {cert.issuer}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
