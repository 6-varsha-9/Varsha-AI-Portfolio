'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Internships from '@/components/Internships';
import Certifications from '@/components/Certifications';
import Hackathons from '@/components/Hackathons';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ResumeModal from '@/components/ResumeModal';
import VarshaAI from '@/components/VarshaAI';
import CursorGlow from '@/components/CursorGlow';

const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <div className="noise-overlay" />

      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main className="relative z-10">
        <Hero
          onOpenChat={() => setChatOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <About />
        <Skills />
        <Projects />
        <Internships />
        <Certifications />
        <Hackathons />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      <VarshaAI open={chatOpen} onClose={() => setChatOpen(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
            boxShadow: '0 0 40px rgba(0,212,255,0.4)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
        </button>
      )}
    </>
  );
}
