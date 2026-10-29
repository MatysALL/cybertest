import React from 'react';
import { Server, Activity, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import { SYSTEM_STATUS } from '../data/projects';

export function Header({ isVercelEnabled, source, lastUpdated, loading, onRefresh }) {
  return (
    <header className="relative border-b border-slate-850/80 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-40 transition-all">
      {/* Top subtle glow bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Subtitle */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 via-slate-800 to-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <Server className="w-5 h-5 text-indigo-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-1.5 font-sans">
                  Cybertest<span className="text-indigo-400">.fr</span>
                </h1>
              </div>

              {/* Status Badge Style Serveur */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold">{SYSTEM_STATUS.statusLabel}</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Hub central d'expérimentations, applications web et services indépendants déployés sur l'infrastructure Cybertest.
            </p>
          </div>

          {/* Infrastructure quick info & optional refresh */}
          <div className="flex items-center gap-3 self-start md:self-center">
            {isVercelEnabled && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Radio className={`w-3.5 h-3.5 ${source === 'vercel' ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
                <span>API Vercel : {source === 'vercel' ? 'Synchronisé' : 'Repli Local'}</span>
                {lastUpdated && <span className="text-slate-500">({lastUpdated})</span>}
                <button
                  onClick={onRefresh}
                  disabled={loading}
                  title="Rafraîchir les statuts"
                  className="ml-1 p-1 hover:text-white hover:bg-slate-800 rounded transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
                </button>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/70 border border-slate-800/80 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>TLS / HTTPS Sécurisé</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
