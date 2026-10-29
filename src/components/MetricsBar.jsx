import React from 'react';
import { Layers, Activity, Globe, Cpu } from 'lucide-react';

export function MetricsBar({ projects = [] }) {
  const total = projects.length;
  const onlineCount = projects.filter(
    (p) => (p.status || '').toLowerCase().includes('ligne')
  ).length;

  const uniqueDomains = new Set(projects.map((p) => p.dns)).size;

  const stats = [
    {
      label: 'Projets Déployés',
      value: total,
      subtext: 'Services répertoriés',
      icon: Layers,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Santé Globale',
      value: `${onlineCount}/${total} Opérationnels`,
      subtext: 'Disponibilité 100%',
      icon: Activity,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Noms de domaine',
      value: `${uniqueDomains} sous-domaines`,
      subtext: '*.cybertest.fr',
      icon: Globe,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      label: 'Réseau & Edge',
      value: 'Vercel Edge',
      subtext: 'Routage Anycast DNS',
      icon: Cpu,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-lg border ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-white tracking-tight font-sans">
                {stat.value}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
