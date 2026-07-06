'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Internships() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="internships" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Experience</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Professional{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Hands-on industry experience building real applications and solving production problems.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.3) 20%, rgba(0,212,255,0.3) 80%, transparent)' }}
          />

          <div className="space-y-8">
            {portfolioData.internships.map((intern, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-7 w-5 h-5 hidden md:flex items-center justify-center -translate-x-1/2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-cyan-400"
                    style={{
                      background: '#050508',
                      boxShadow: '0 0 12px rgba(0,212,255,0.6)',
                    }}
                  />
                </div>

                <div
                  className="rounded-2xl p-6 lg:p-8 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-semibold">{intern.role}</span>
                      </div>
                      <h3 className="font-display font-bold text-xl text-white">{intern.company}</h3>
                      <div className="flex items-center gap-4 mt-1.5">
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <MapPin size={11} /> {intern.location}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 text-xs">
                          <Calendar size={11} /> {intern.period}
                        </span>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                    >
                      Internship
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {intern.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-slate-400 text-base leading-relaxed">
                        <CheckCircle size={14} className="text-cyan-400/60 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
