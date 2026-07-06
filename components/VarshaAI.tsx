'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User, RotateCcw } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  typing?: boolean;
};

const SUGGESTIONS = [
  'Tell me about Varsha',
  'What projects has she built?',
  'What are her AI skills?',
  'Why should I hire her?',
  'Tell me about her autism detection project',
  'What makes her different?',
];

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  const kb = portfolioData.chatbotKnowledge;

  if (q.match(/about|who is|introduce|background|herself/))
    return kb.about;
  if (q.match(/project|built|create|develop|work on/))
    return kb.projects;
  if (q.match(/skill|technology|tech|know|expertise|proficient|language|tool/))
    return kb.skills;
  if (q.match(/intern|experience|work|job|company|pinsphere|codsoft/))
    return kb.internships;
  if (q.match(/cert|certif|qualif|ibm|google|microsoft|coursera|isc|simplilearn|great learning/))
    return kb.certifications;
  if (q.match(/hire|recruit|why|consider|strengths|value|candidate/))
    return kb.whyHire;
  if (q.match(/unique|different|stand out|special|distinguish/))
    return kb.unique;
  if (q.match(/autism|asd|disorder|screening|multimodal|multi.modal/))
    return kb.autism;
  if (q.match(/sign language|isl|gesture|translator|sign/))
    return kb.signLanguage;
  if (q.match(/pneumonia|chest|x.ray|xray|detection|healthcare|medical/))
    return kb.pneumonia;
  if (q.match(/contact|email|phone|linkedin|github|reach|connect/))
    return kb.contact;
  if (q.match(/education|college|degree|university|study|school|cgpa|gpa/))
    return kb.education;
  if (q.match(/hackathon|competition|smart india|drone|iot/))
    return `Varsha participated in 3 hackathons: Smart India Hackathon (Sep 2023) where she built a Women Safety Drone project, IoT & Automation Hackathon on real-time automation systems, and a 24-Hour Hackathon at Dr. N.G.P. Institute of Technology (Jul 2023).`;
  if (q.match(/achievement|award|prize|recognition|presentation/))
    return `Varsha has secured 2nd & 3rd prizes in Paper Presentations on AI/ML innovations. She has completed workshops in Python Full Stack and Ethical Hacking, and participated in 3 hackathons at national level.`;
  if (q.match(/hello|hi|hey|greet|start/))
    return `Hello! I'm Varsha AI, your guide to Varsha Nandakumar's portfolio. I can answer questions about her projects, skills, experience, certifications, and more. What would you like to know?`;
  if (q.match(/python|tensorflow|keras|sklearn|scikit|opencv|mediapipe|flask|docker|nlp|cnn|deep learning|machine learning/))
    return kb.skills;
  if (q.match(/generative|gen ai|llm|gpt|language model/))
    return `Varsha holds a "Generative AI for Data Analysts" certification from Coursera and is deeply enthusiastic about GenAI. Her background in NLP, deep learning, and transformer architectures positions her well for generative AI work. She is an AI & Generative AI Enthusiast always keeping up with latest AI advancements.`;

  return `Great question! While I may not have a specific answer for "${query}", I can tell you that Varsha is a skilled AI & Data Science Engineer with expertise in Machine Learning, Computer Vision, and NLP. Try asking about her projects, skills, certifications, or why you should hire her!`;
}

export default function VarshaAI({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: "Hello! I'm **Varsha AI** — your intelligent guide to Varsha's portfolio. Ask me anything about her projects, skills, experience, or why she'd be a great hire!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || isTyping) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 600));

    const response = getAIResponse(query);
    const aiId = (Date.now() + 1).toString();

    setMessages(prev => [...prev, { id: aiId, role: 'ai', content: '', typing: true }]);

    let i = 0;
    const speed = Math.max(8, 800 / response.length);
    const typeInterval = setInterval(() => {
      i++;
      setMessages(prev =>
        prev.map(m => m.id === aiId ? { ...m, content: response.slice(0, i) } : m)
      );
      if (i >= response.length) {
        clearInterval(typeInterval);
        setMessages(prev => prev.map(m => m.id === aiId ? { ...m, typing: false } : m));
        setIsTyping(false);
      }
    }, speed);
  };

  const renderContent = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 top-20 md:inset-auto md:right-6 md:bottom-6 md:w-[420px] md:h-[620px] z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5, 5, 12, 0.97)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              boxShadow: '0 0 60px rgba(0, 212, 255, 0.15), 0 25px 80px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <div className="relative">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                >
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#05050c]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Varsha AI</p>
                <p className="text-xs text-emerald-400">Online · Powered by portfolio data</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setMessages([{ id: '0', role: 'ai', content: "Hello! I'm **Varsha AI** — your intelligent guide to Varsha's portfolio. Ask me anything about her projects, skills, experience, or why she'd be a great hire!" }])}
                  className="p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/5 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      background: msg.role === 'ai'
                        ? 'linear-gradient(135deg, #00d4ff, #0066ff)'
                        : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {msg.role === 'ai'
                      ? <Bot size={13} className="text-white" />
                      : <User size={13} className="text-slate-300" />
                    }
                  </div>
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed text-slate-200 ${
                      msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
                    }`}
                  >
                    {renderContent(msg.content)}
                    {msg.typing && <span className="typing-cursor ml-0.5" style={{ height: '0.9em' }} />}
                  </div>
                </motion.div>
              ))}
              {isTyping && messages[messages.length - 1]?.role !== 'ai' && (
                <div className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                  >
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="chat-message-ai px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/20 text-cyan-400/80 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about Varsha's skills, projects..."
                  disabled={isTyping}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:bg-white/7 transition-all disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
                >
                  <Send size={15} className="text-white" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
