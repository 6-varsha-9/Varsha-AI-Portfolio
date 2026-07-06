'use client';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold gradient-text text-lg">VARSHA N</p>
            <p className="text-slate-600 text-xs mt-0.5">AI Engineer · Data Scientist · ML Engineer</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/6-varsha-9', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/varsha-nandakumar-7713b825a', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:varshanandakumar069@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-slate-600 text-xs text-center md:text-right">
            Designed & built by Varsha N &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
