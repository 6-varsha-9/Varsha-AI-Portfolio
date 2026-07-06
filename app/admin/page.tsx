'use client';
import { useState, useEffect } from 'react';
import { supabase, ResumeDownload } from '@/lib/supabase';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { Lock, Download, Monitor, Globe, Clock, Users, TrendingUp, LogOut, Eye, SkipForward } from 'lucide-react';

const ADMIN_PASSWORD = 'varsha@admin2024';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

const COLORS = ['#00d4ff', '#0066ff', '#10b981', '#f59e0b', '#ef4444', '#a78bfa'];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<ResumeDownload[]>([]);
  const [loading, setLoading] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase.from('resume_downloads').select('*').order('created_at', { ascending: false })
      .then(({ data: rows }) => { setData(rows ?? []); setLoading(false); });
  }, [authed]);

  // Analytics
  const totalDownloads = data.length;
  const withInfo = data.filter(d => !d.skipped).length;
  const skipped = data.filter(d => d.skipped).length;

  const browserData = Object.entries(
    data.reduce<Record<string, number>>((acc, d) => {
      const b = d.browser || 'Unknown';
      acc[b] = (acc[b] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const deviceData = Object.entries(
    data.reduce<Record<string, number>>((acc, d) => {
      const dev = d.device || 'Unknown';
      acc[dev] = (acc[dev] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const dailyData = Object.entries(
    data.reduce<Record<string, number>>((acc, d) => {
      const date = new Date(d.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  ).slice(-10).map(([date, count]) => ({ date, count }));

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4">
        <div
          className="w-full max-w-sm rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,212,255,0.1)' }}
            >
              <Lock size={18} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-500 text-xs">Restricted access</p>
            </div>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Password</label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #0066ff)' }}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b"
        style={{ background: 'rgba(5,5,8,0.9)', backdropFilter: 'blur(24px)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div>
          <h1 className="font-display font-bold text-lg">Admin Dashboard</h1>
          <p className="text-slate-500 text-xs">Varsha N — Portfolio Analytics</p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Download, label: 'Total Downloads', value: totalDownloads, color: '#00d4ff' },
                { icon: Users, label: 'Introduced Themselves', value: withInfo, color: '#10b981' },
                { icon: SkipForward, label: 'Skipped Form', value: skipped, color: '#f59e0b' },
                { icon: TrendingUp, label: 'Conversion Rate', value: totalDownloads > 0 ? `${Math.round((withInfo / totalDownloads) * 100)}%` : '0%', color: '#0066ff' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 border border-white/5"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="font-display font-bold text-2xl text-white">{value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Daily downloads */}
              <div
                className="lg:col-span-2 rounded-2xl p-6 border border-white/5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <h2 className="font-semibold text-white text-sm mb-5">Downloads Over Time</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} />
                    <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12 }}
                      labelStyle={{ color: '#94a3b8' }}
                      itemStyle={{ color: '#00d4ff' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Device breakdown */}
              <div
                className="rounded-2xl p-6 border border-white/5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <h2 className="font-semibold text-white text-sm mb-5">Device Types</h2>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {deviceData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-2">
                  {deviceData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-400 text-xs">{d.name} ({d.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browser breakdown */}
              <div
                className="lg:col-span-3 rounded-2xl p-6 border border-white/5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <h2 className="font-semibold text-white text-sm mb-5">Browser Distribution</h2>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={browserData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} width={70} />
                    <Tooltip
                      contentStyle={{ background: '#0a0a0f', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12 }}
                      itemStyle={{ color: '#00d4ff' }}
                    />
                    <Bar dataKey="value" fill="#00d4ff" radius={[0, 6, 6, 0]}>
                      {browserData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Downloads table */}
            <div
              className="rounded-2xl border border-white/5 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="p-6 border-b border-white/5 flex items-center gap-2">
                <Eye size={16} className="text-cyan-400" />
                <h2 className="font-semibold text-white text-sm">Visitor Log</h2>
                <span
                  className="ml-auto text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                >
                  {totalDownloads} records
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {['Name', 'Company', 'Email', 'Device', 'Browser', 'Date', 'Time', 'Type'].map(h => (
                        <th key={h} className="text-left text-slate-500 text-xs font-medium px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center text-slate-600 text-sm py-12">No downloads yet</td>
                      </tr>
                    ) : (
                      data.map(row => (
                        <tr key={row.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3 text-sm text-white">{row.name || '—'}</td>
                          <td className="px-4 py-3 text-sm text-slate-400">{row.company || '—'}</td>
                          <td className="px-4 py-3 text-sm text-slate-400">{row.email || '—'}</td>
                          <td className="px-4 py-3 text-sm text-slate-400">{row.device || '—'}</td>
                          <td className="px-4 py-3 text-sm text-slate-400">{row.browser || '—'}</td>
                          <td className="px-4 py-3 text-xs text-slate-500">{formatDate(row.created_at)}</td>
                          <td className="px-4 py-3 text-xs text-slate-500">{formatTime(row.created_at)}</td>
                          <td className="px-4 py-3">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: row.skipped ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                                color: row.skipped ? '#f59e0b' : '#10b981',
                              }}
                            >
                              {row.skipped ? 'Skipped' : 'Submitted'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
