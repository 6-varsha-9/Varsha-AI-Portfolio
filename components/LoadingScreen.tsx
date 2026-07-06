'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aurora-bg">
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-full h-full animate-spin-slow">
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke="rgba(0,212,255,0.15)"
                  strokeWidth="2"
                />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="44 132"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#0066ff" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse-glow" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-xl gradient-text tracking-wide">VARSHA N</p>
              <p className="text-slate-500 text-xs mt-1 tracking-widest uppercase">Initializing Portfolio</p>
            </div>
            <div className="w-48 h-px bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <p className="text-slate-600 text-xs">{Math.min(Math.round(progress), 100)}%</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
