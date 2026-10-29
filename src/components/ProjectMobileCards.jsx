import React from 'react';
import { ExternalLink, Download, ArrowUpRight, Globe, Layers } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { AvailabilityBadges } from './AvailabilityBadges';

function cleanUrl(rawUrl) {
  if (!rawUrl) return '#';
  const match = rawUrl.match(/\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  if (match) return match[1];
  return rawUrl;
}

export function ProjectMobileCards({ projects = [] }) {
  const hasApk = (project) => {
    return Boolean(
      project.apkUrl ||
      (project.availability && project.availability.some((a) => a.toLowerCase().includes('apk')))
    );
  };

  if (!projects.length) {
    return (
      <div className="md:hidden text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
        <Layers className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="text-sm font-medium">Aucun projet trouvé</p>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-4">
      {projects.map((project) => {
        const targetUrl = cleanUrl(project.url);
        const apkTarget = project.apkUrl || targetUrl;
        const apkAvailable = hasApk(project);

        return (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg space-y-4 transition-all"
          >
            {/* Header: Name, Version, Status */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    v{project.version}
                  </span>
                </div>
                
                {/* DNS Domain */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1 text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  <Globe className="w-3 h-3 text-slate-500" />
                  <span>{project.dns || targetUrl.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <StatusBadge status={project.status} />
              </div>
            </div>

            {/* Description complète */}
            <p className="text-sm text-slate-300 leading-relaxed font-normal bg-slate-950/60 p-3.5 rounded-xl border border-slate-850">
              {project.description}
            </p>

            {/* Disponibilités */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Disponibilités :
              </span>
              <AvailabilityBadges items={project.availability} />
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-750"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-800/80">
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                <span>Accéder au projet</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {apkAvailable && (
                <a
                  href={apkTarget}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition shadow-sm active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger APK</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
