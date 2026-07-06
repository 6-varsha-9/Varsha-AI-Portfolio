'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Code, Calendar } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Hackathons() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="hackathons" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Hackathons</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Built Under{' '}
            <span className="gradient-text">Pressure</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Competing at national-level hackathons, delivering real solutions within tight constraints.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.25) 20%, rgba(0,212,255,0.25) 80%, transparent)', transform: 'translateX(-50%)' }}
          />

          <div className="space-y-8">
            {portfolioData.hackathons.map((hack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative lg:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'lg:ml-0' : 'lg:ml-auto'}`}
              >
                {/* Connector dot */}
                <div
                  className="hidden lg:block absolute top-8 w-3 h-3 rounded-full border-2 border-cyan-400"
                  style={{
                    [i % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                    background: '#050508',
                    boxShadow: '0 0 12px rgba(0,212,255,0.5)',
                    transform: 'translateX(50%)',
                  }}
                />

                <div
                  className="rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,212,255,0.1)' }}
                    >
                      <Trophy size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{hack.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Calendar size={11} className="text-slate-500" />
                        <span className="text-slate-500 text-xs">{hack.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Code size={12} className="text-cyan-400/60" />
                    <span className="text-cyan-400/80 text-base font-medium">{hack.project}</span>
                  </div>

                  <p className="text-slate-400 text-base leading-relaxed">{hack.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
