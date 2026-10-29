import React from 'react';

export function StatusBadge({ status }) {
  const normalizedStatus = (status || '').toLowerCase();

  let dotColor = 'bg-emerald-400';
  let pingColor = 'bg-emerald-400';
  let badgeClasses = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';

  if (normalizedStatus.includes('maintenance')) {
    dotColor = 'bg-amber-400';
    pingColor = 'bg-amber-400';
    badgeClasses = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
  } else if (normalizedStatus.includes('développement') || normalizedStatus.includes('developpement')) {
    dotColor = 'bg-indigo-400';
    pingColor = 'bg-indigo-400';
    badgeClasses = 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeClasses} backdrop-blur-sm shadow-sm transition-all duration-200`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColor}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`}
        />
      </span>
      <span>{status || 'En ligne'}</span>
    </span>
  );
}
