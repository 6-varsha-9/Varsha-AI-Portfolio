'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  company: string;
  designation: string;
  email: string;
  linkedin: string;
  message: string;
};

function getBrowserInfo(): { device: string; browser: string } {
  if (typeof window === 'undefined') return { device: 'Unknown', browser: 'Unknown' };
  const ua = navigator.userAgent;
  const device = /Mobi|Android/i.test(ua) ? 'Mobile' : /Tablet|iPad/i.test(ua) ? 'Tablet' : 'Desktop';
  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';
  return { device, browser };
}

async function trackAndDownload(data: Partial<FormData> & { skipped: boolean }) {
  const { device, browser } = getBrowserInfo();
  await supabase.from('resume_downloads').insert({
    ...data,
    device,
    browser,
  });
  const link = document.createElement('a');
  link.href = '/VARSHA_N_-_RESUME.pdf';
  link.download = 'Varsha_N_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function ResumeModal({ open, onClose }: Props) {
  const [form, setForm] = useState<FormData>({ name: '', company: '', designation: '', email: '', linkedin: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSkip = async () => {
    await trackAndDownload({ skipped: true });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    await trackAndDownload({ ...form, skipped: false });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ name: '', company: '', designation: '', email: '', linkedin: '', message: '' });
      onClose();
    }, 2000);
  };

  const update = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px] z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5, 8, 20, 0.98)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              boxShadow: '0 0 80px rgba(0, 212, 255, 0.1), 0 25px 80px rgba(0,0,0,0.9)',
            }}
          >
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Thank you!</h3>
                  <p className="text-slate-400 text-sm">Your info has been saved. Resume downloading now...</p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Download size={16} className="text-cyan-400" />
                        <h2 className="font-display font-bold text-lg text-white">Download Resume</h2>
                      </div>
                      <p className="text-slate-400 text-xs">Would you like to introduce yourself first?</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {([
                        { key: 'name', label: 'Full Name *', placeholder: 'Jane Smith' },
                        { key: 'company', label: 'Company', placeholder: 'Acme Corp' },
                        { key: 'designation', label: 'Designation', placeholder: 'HR Manager' },
                        { key: 'email', label: 'Email *', placeholder: 'jane@acme.com' },
                      ] as const).map(f => (
                        <div key={f.key}>
                          <label className="text-xs text-slate-400 mb-1.5 block font-medium">{f.label}</label>
                          <input
                            value={form[f.key]}
                            onChange={update(f.key)}
                            placeholder={f.placeholder}
                            required={f.label.includes('*')}
                            className="w-full bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block font-medium">LinkedIn</label>
                      <input
                        value={form.linkedin}
                        onChange={update('linkedin')}
                        placeholder="linkedin.com/in/..."
                        className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1.5 block font-medium">Message (Optional)</label>
                      <textarea
                        value={form.message}
                        onChange={update('message')}
                        placeholder="What role are you hiring for?"
                        rows={2}
                        className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all resize-none"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={handleSkip}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/8 hover:border-white/15 transition-all"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        Skip & Download
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={submitting || !form.name || !form.email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                      >
                        {submitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Submit & Download <ArrowRight size={14} /></>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
