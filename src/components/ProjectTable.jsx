import React, { useState } from 'react';
import { 
  ExternalLink, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { AvailabilityBadges } from './AvailabilityBadges';

function cleanUrl(rawUrl) {
  if (!rawUrl) return '#';
  const match = rawUrl.match(/\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  if (match) return match[1];
  return rawUrl;
}

export function ProjectTable({ projects = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const hasApk = (project) => {
    return Boolean(
      project.apkUrl ||
      (project.availability && project.availability.some((a) => a.toLowerCase().includes('apk')))
    );
  };

  if (!projects.length) {
    return (
      <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400">
        <Layers className="w-10 h-10 mx-auto text-slate-600 mb-3" />
        <p className="text-base font-medium">Aucun projet trouvé</p>
        <p className="text-sm text-slate-500">Ajustez vos filtres de recherche.</p>
      </div>
    );
  }

  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/80 shadow-2xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/90 bg-slate-900/70 text-slate-400 text-xs uppercase font-mono tracking-wider">
              <th scope="col" className="py-4 pl-6 pr-4 font-semibold">Projet</th>
              <th scope="col" className="py-4 px-4 font-semibold">Domaine / DNS</th>
              <th scope="col" className="py-4 px-4 font-semibold">Version</th>
              <th scope="col" className="py-4 px-4 font-semibold">Statut</th>
              <th scope="col" className="py-4 px-4 font-semibold">Disponibilités</th>
              <th scope="col" className="py-4 pl-4 pr-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850/70">
            {projects.map((project) => {
              const isExpanded = Boolean(expandedRows[project.id]);
              const targetUrl = cleanUrl(project.url);
              const apkTarget = project.apkUrl || targetUrl;
              const apkAvailable = hasApk(project);

              return (
                <React.Fragment key={project.id}>
                  <tr
                    className={`group transition-colors duration-150 cursor-pointer ${
                      isExpanded 
                        ? 'bg-slate-900/75 border-indigo-500/30' 
                        : 'bg-slate-950 hover:bg-slate-900/50'
                    }`}
                    onClick={() => toggleRow(project.id)}
                  >
                    {/* Projet (Nom + tags) */}
                    <td className="py-4 pl-6 pr-4 align-top">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(project.id);
                          }}
                          className="mt-0.5 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
                          title={isExpanded ? "Replier la description" : "Voir la description complète"}
                          aria-label={isExpanded ? "Replier la description" : "Voir la description complète"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-base text-white group-hover:text-indigo-300 transition-colors">
                              {project.name}
                            </span>
                          </div>

                          {/* Preview tags */}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Short description preview if not expanded */}
                          {!isExpanded && project.description && (
                            <p className="text-xs text-slate-400 mt-1.5 line-clamp-1 max-w-sm">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Domaine / DNS */}
                    <td className="py-4 px-4 align-top">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-400 hover:text-indigo-300 hover:underline bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 transition-all hover:border-indigo-500/40"
                      >
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span>{project.dns || targetUrl.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                      </a>
                    </td>

                    {/* Version */}
                    <td className="py-4 px-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 text-indigo-300 border border-slate-800 shadow-sm">
                        v{project.version}
                      </span>
                    </td>

                    {/* Statut */}
                    <td className="py-4 px-4 align-top">
                      <StatusBadge status={project.status} />
                    </td>

                    {/* Disponibilités */}
                    <td className="py-4 px-4 align-top">
                      <AvailabilityBadges items={project.availability} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {apkAvailable && (
                          <a
                            href={apkTarget}
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition shadow-sm"
                            title="Télécharger l'APK"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>APK</span>
                          </a>
                        )}

                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all duration-150 hover:shadow-indigo-500/30"
                        >
                          <span>Accéder</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>

                  {/* Accordéon / Ligne déroulante pour la description complète */}
                  {isExpanded && (
                    <tr className="bg-slate-900/60 border-b border-slate-800/80">
                      <td colSpan={6} className="py-4 pl-14 pr-6">
                        <div className="rounded-xl bg-slate-950/80 border border-slate-800/90 p-4 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <Info className="w-3.5 h-3.5 text-indigo-400" />
                                Description du projet
                              </h4>
                              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                {project.description}
                              </p>
                            </div>

                            <a
                              href={targetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline pt-1"
                            >
                              Ouvrir l'application
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>

                          {/* Détails supplémentaires en bas de carte */}
                          <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
                            <div className="flex items-center gap-4">
                              <span>Identifiant : <code className="text-slate-300">{project.id}</code></span>
                              <span>Protocole : <span className="text-emerald-400">HTTPS / HSTS</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                              {project.tags?.map((t, idx) => (
                                <span key={idx} className="text-slate-500">#{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
