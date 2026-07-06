'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '@/lib/portfolio-data';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-bold text-5xl md:text-6xl gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" className="section-padding relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Achievements</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            Impact in{' '}
            <span className="gradient-text">Numbers</span>
          </h2>
        </motion.div>

        {/* Counter grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {portfolioData.achievements.map(({ label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
            >
              <AnimatedCounter target={value} suffix={suffix} />
              <p className="text-slate-500 text-sm mt-2">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Honors & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Paper Presentations */}
          <div
            className="rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
            style={{ background: 'rgba(0,212,255,0.03)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,212,255,0.1)' }}
            >
              <span className="text-xl">🏆</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Paper Presentation Awards</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Secured 2nd & 3rd prizes in Paper Presentations on AI/ML innovations, demonstrating deep understanding and communication of advanced research topics.
            </p>
          </div>

          {/* Workshops */}
          <div
            className="rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
            style={{ background: 'rgba(0,102,255,0.03)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(0,102,255,0.1)' }}
            >
              <span className="text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Technical Workshops</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Completed Python Full Stack workshop gaining modern app development & deployment insights, and Ethical Hacking workshop with hands-on information security fundamentals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
