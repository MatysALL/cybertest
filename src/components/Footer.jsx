import React from 'react';
import { Terminal, Shield, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-900 bg-slate-950 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="font-semibold text-slate-200">Cybertest.fr</span>
            <span className="text-slate-600">—</span>
            <span className="text-slate-400">Écosystème indépendant de services applicatifs</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Réseau Sécurisé
            </span>
            <span>DNS Anycast</span>
            <span>&copy; {currentYear} Cybertest</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
