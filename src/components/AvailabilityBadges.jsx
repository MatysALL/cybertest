import React from 'react';
import { Globe, Smartphone, Download, Sparkles } from 'lucide-react';

export function AvailabilityBadges({ items = [] }) {
  if (!items || items.length === 0) {
    return <span className="text-xs text-slate-500 italic">Non spécifié</span>;
  }

  const getBadgeConfig = (item) => {
    const lower = item.toLowerCase();
    if (lower.includes('pwa') || lower.includes('mobile')) {
      return {
        icon: Smartphone,
        classes: 'bg-violet-500/10 text-violet-300 border-violet-500/20 hover:border-violet-500/40',
      };
    }
    if (lower.includes('apk') || lower.includes('android')) {
      return {
        icon: Download,
        classes: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:border-emerald-500/40',
      };
    }
    if (lower.includes('web')) {
      return {
        icon: Globe,
        classes: 'bg-sky-500/10 text-sky-300 border-sky-500/20 hover:border-sky-500/40',
      };
    }
    return {
      icon: Sparkles,
      classes: 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600',
    };
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {items.map((item, index) => {
        const config = getBadgeConfig(item);
        const IconComponent = config.icon;
        return (
          <span
            key={index}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors ${config.classes}`}
          >
            <IconComponent className="w-3 h-3" />
            <span>{item}</span>
          </span>
        );
      })}
    </div>
  );
}
