'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Download, FileText } from 'lucide-react';

function downloadResume() {
  const link = document.createElement('a');
  link.href = '/VARSHA_N_-_RESUME.pdf';
  link.download = 'Varsha_N_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'varshanandakumar069@gmail.com',
    href: 'mailto:varshanandakumar069@gmail.com',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.1)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/varsha-nandakumar',
    href: 'https://linkedin.com/in/varsha-nandakumar-7713b825a',
    color: '#3b82f6',
    bg: 'rgba(0,102,255,0.1)',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/6-varsha-9',
    href: 'https://github.com/6-varsha-9',
    color: '#94a3b8',
    bg: 'rgba(255,255,255,0.06)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Coimbatore, Tamil Nadu, India',
    href: null,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">
            Let&apos;s Build{' '}
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-xl mx-auto">
            Open to full-time roles, internships, and collaborations in AI, ML, and Data Science.
            Reach out — I respond promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: bg }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-base font-medium group-hover:text-cyan-300 transition-colors">{value}</p>
                  </div>
                </a>
              ) : (
                <div
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/5"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                    <p className="text-white text-base font-medium">{value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <a
            href="mailto:varshanandakumar069@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
              boxShadow: '0 0 40px rgba(0,212,255,0.3)',
            }}
          >
            <Send size={18} />
            Send me a message
          </a>

          {/* Resume CTA in contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <p className="text-slate-500 text-sm w-full sm:w-auto text-center sm:text-right">
              Available for AI, ML &amp; Data Science roles —
            </p>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={downloadResume}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                style={{
                  background: 'rgba(0,212,255,0.07)',
                  borderColor: 'rgba(0,212,255,0.3)',
                  color: '#00d4ff',
                  boxShadow: '0 0 20px rgba(0,212,255,0.1)',
                }}
              >
                <Download size={14} />
                Download Resume
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
