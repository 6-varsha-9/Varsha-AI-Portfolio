'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Download, FileText } from 'lucide-react';

const RESUME_URL = '/VARSHA_N_-_RESUME.pdf';
const RESUME_DOWNLOAD_NAME = 'Varsha_N_Resume.pdf';

const TYPING_PHRASES = [
  'Machine Learning Engineer',
  'AI & Data Scientist',
  'Computer Vision Expert',
  'Deep Learning Engineer',
  'NLP Specialist',
  'Generative AI Enthusiast',
];

function useTypingAnimation(phrases: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx <= current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, charIdx === 0 ? 500 : 60);
    } else if (!deleting && charIdx > current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setCharIdx(c => c - 1);
        setDisplayed(current.slice(0, charIdx - 1));
      }, 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return displayed;
}

function viewResume() {
  window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
}

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = RESUME_DOWNLOAD_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Hero({ onOpenChat }: { onOpenChat: () => void; onOpenResume?: () => void }) {
  const typedText = useTypingAnimation(TYPING_PHRASES);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, #050508 75%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">

        {/* Open-to-work badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-10 border border-cyan-500/20"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-cyan-300 tracking-wide">Open to Work — AI & Data Science Roles</span>
        </motion.div>

        {/* Professional label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.95 }}
          className="mb-5"
        >
          <span
            className="inline-block text-sm sm:text-base font-semibold tracking-[0.3em] uppercase px-5 py-2 rounded-full"
            style={{
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00d4ff',
              letterSpacing: '0.25em',
            }}
          >
            AI Engineer
          </span>
        </motion.div>

        {/* NAME — main visual focus — NO cursor here */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.05 }}
          className="font-display font-black tracking-tight mb-8"
          style={{ lineHeight: 1.0 }}
        >
          <span
            className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] select-none"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2f0ff 30%, #00d4ff 65%, #0066ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.35))',
            }}
          >
            VARSHA N
          </span>
        </motion.h1>

        {/* Typing animation — cursor ONLY here, never near the name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.25 }}
          className="flex items-center justify-center gap-2 mb-5 h-10"
        >
          <span className="text-xl sm:text-2xl text-slate-300 font-light tracking-wide">
            {typedText}
          </span>
          {/* Cursor appears only next to the typed subtitle, never the name */}
          {typedText.length > 0 && <span className="typing-cursor" />}
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-4 font-light"
        >
          AI & Data Science Engineer passionate about{' '}
          <span className="text-slate-200">Machine Learning</span>,{' '}
          <span className="text-slate-200">Deep Learning</span>,{' '}
          <span className="text-slate-200">Computer Vision</span> and{' '}
          <span className="text-slate-200">NLP</span>.
        </motion.p>

        {/* Recruiter microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.55 }}
          className="text-slate-500 text-sm mb-10 tracking-wide"
        >
          Available for AI, Machine Learning, Data Science and Software Engineering opportunities.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 flex-wrap"
        >
          <motion.button
            onClick={onOpenChat}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.3), 0 0 80px rgba(0, 102, 255, 0.12)',
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <div
                className="absolute top-0 left-[-100%] w-[60%] h-full skew-x-[-15deg] animate-beam"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
              />
            </div>
            <Sparkles size={18} className="text-white/90" />
            <span className="text-white relative z-10">Ask Varsha AI</span>
          </motion.button>

          <motion.button
            onClick={viewResume}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base glass-card border border-white/10 text-white hover:border-cyan-500/40 transition-all duration-300"
          >
            <FileText size={18} className="text-cyan-400" />
            <span>View Resume</span>
          </motion.button>

          <motion.button
            id="resume-download-btn"
            onClick={downloadResume}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base border transition-all duration-300"
            style={{
              background: 'rgba(0,212,255,0.06)',
              borderColor: 'rgba(0,212,255,0.25)',
              color: '#00d4ff',
            }}
          >
            <Download size={18} />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.85 }}
          className="flex items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { value: '3+', label: 'AI Projects' },
            { value: '11', label: 'Certifications' },
            { value: '7.89', label: 'CGPA' },
            { value: '3', label: 'Hackathons' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl gradient-text">{stat.value}</div>
              <div className="text-slate-500 text-xs mt-0.5 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
