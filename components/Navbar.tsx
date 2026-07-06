'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Download, FileText } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Education', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Expertise', href: '#skills' },
  { label: 'Journey', href: '#internships' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['about', 'skills', 'projects', 'internships', 'certifications', 'hackathons', 'achievements', 'contact'];

const RESUME_URL = '/VARSHA_N_-_RESUME.pdf';

function viewResume() {
  window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
}

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = 'Varsha_N_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Navbar({ onOpenResume }: { onOpenResume?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [clickedSection, setClickedSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      let found = '';
      for (const id of [...SECTION_IDS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    setClickedSection(id);
    setTimeout(() => setClickedSection(''), 2000);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (href: string) => {
    const id = href.replace('#', '');
    return activeSection === id || clickedSection === id;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 5, 14, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display font-black text-lg tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VN
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <motion.button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg tracking-wide uppercase transition-all duration-200"
                    style={{
                      color: active ? '#00d4ff' : 'rgba(148,163,184,0.85)',
                      background: active ? 'rgba(0,212,255,0.08)' : 'transparent',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {/* Glowing arrow */}
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ opacity: 0, x: -6, scale: 0.5 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -6, scale: 0.5 }}
                          transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
                        >
                          <ChevronRight
                            size={12}
                            style={{
                              color: '#00d4ff',
                              filter: 'drop-shadow(0 0 5px rgba(0,212,255,0.9)) drop-shadow(0 0 10px rgba(0,212,255,0.5))',
                            }}
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <span className="relative z-10">{item.label}</span>

                    {/* Bottom glow underline */}
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          layoutId="nav-glow"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          className="absolute bottom-0.5 left-2 right-2 h-px rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                            boxShadow: '0 0 6px rgba(0,212,255,0.8)',
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover glow on inactive */}
                    {!active && (
                      <motion.span
                        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Resume buttons */}
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/8">
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={viewResume}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border tracking-wide"
                  style={{
                    color: 'rgba(148,163,184,0.9)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <FileText size={12} />
                  View
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadResume}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-white tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
                    boxShadow: '0 0 20px rgba(0,212,255,0.25)',
                  }}
                >
                  <Download size={12} />
                  Resume
                </motion.button>
              </div>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/5"
            style={{ background: 'rgba(5, 5, 14, 0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="flex items-center gap-2.5 text-left px-4 py-3 text-sm font-medium rounded-xl transition-all"
                    style={{
                      color: active ? '#00d4ff' : 'rgba(148,163,184,0.85)',
                      background: active ? 'rgba(0,212,255,0.07)' : 'transparent',
                    }}
                  >
                    {active && (
                      <ChevronRight
                        size={14}
                        style={{
                          color: '#00d4ff',
                          filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.9))',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => { setMobileOpen(false); viewResume(); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-white/10 text-slate-300"
                >
                  <FileText size={14} />
                  View Resume
                </button>
                <button
                  onClick={() => { setMobileOpen(false); downloadResume(); }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-white"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
