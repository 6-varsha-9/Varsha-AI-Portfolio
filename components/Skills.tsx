'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILL_GROUPS = [
  {
    category: 'Programming',
    color: 'cyan',
    skills: ['Python', 'SQL', 'Java'],
    icon: '{ }',
  },
  {
    category: 'Machine Learning',
    color: 'blue',
    skills: ['TensorFlow', 'Keras', 'Scikit-Learn', 'Deep Learning', 'Feature Engineering', 'Model Evaluation'],
    icon: '⚙',
  },
  {
    category: 'Computer Vision',
    color: 'teal',
    skills: ['OpenCV', 'MediaPipe', 'CNN', 'Image Processing'],
    icon: '◉',
  },
  {
    category: 'NLP',
    color: 'emerald',
    skills: ['NLTK', 'spaCy', 'Text Processing'],
    icon: '✦',
  },
  {
    category: 'Data Science & Analytics',
    color: 'cyan',
    skills: ['NumPy', 'Pandas', 'Data Visualisation', 'Power BI'],
    icon: '▲',
  },
  {
    category: 'Deployment & Tools',
    color: 'blue',
    skills: ['Flask', 'Docker', 'Jupyter Notebook', 'Google Colab'],
    icon: '▶',
  },
];

const colorStyles: Record<string, { bg: string; border: string; text: string; badgeBg: string }> = {
  cyan: {
    bg: 'rgba(0,212,255,0.06)',
    border: 'rgba(0,212,255,0.2)',
    text: '#00d4ff',
    badgeBg: 'rgba(0,212,255,0.08)',
  },
  blue: {
    bg: 'rgba(0,102,255,0.06)',
    border: 'rgba(0,102,255,0.2)',
    text: '#3b82f6',
    badgeBg: 'rgba(0,102,255,0.08)',
  },
  teal: {
    bg: 'rgba(0,180,216,0.06)',
    border: 'rgba(0,180,216,0.2)',
    text: '#0891b2',
    badgeBg: 'rgba(0,180,216,0.08)',
  },
  emerald: {
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.2)',
    text: '#10b981',
    badgeBg: 'rgba(16,185,129,0.08)',
  },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } } as const;
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} as const;

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Skills</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Technical{' '}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            A comprehensive toolkit for building production-grade AI systems.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SKILL_GROUPS.map(({ category, color, skills, icon }) => {
            const styles = colorStyles[color];
            return (
              <motion.div
                key={category}
                variants={cardVariant}
                whileHover={{ y: -4, scale: 1.01 }}
                className="relative rounded-2xl p-6 overflow-hidden transition-all duration-300 group"
                style={{ background: styles.bg, border: `1px solid ${styles.border}` }}
              >
                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none"
                  style={{ background: styles.text }}
                />
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ background: styles.badgeBg, color: styles.text }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-semibold text-white text-base">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-200 cursor-default"
                      style={{
                        background: styles.badgeBg,
                        color: styles.text,
                        border: `1px solid ${styles.border}`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
