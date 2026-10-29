import React, { useState, useMemo } from 'react';
import { useProjects } from './hooks/useProjects';
import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { FilterBar } from './components/FilterBar';
import { ProjectTable } from './components/ProjectTable';
import { ProjectMobileCards } from './components/ProjectMobileCards';
import { Footer } from './components/Footer';

export function App() {
  const { 
    projects, 
    loading, 
    source, 
    lastUpdated, 
    isVercelEnabled, 
    refresh 
  } = useProjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projects.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet);
  }, [projects]);

  // Filter projects based on search query and selected tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.name?.toLowerCase().includes(query) ||
        project.dns?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.tags?.some((t) => t.toLowerCase().includes(query));

      const matchesTag =
        !selectedTag ||
        project.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background ambient lighting and grid pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-10 w-[500px] h-[300px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          isVercelEnabled={isVercelEnabled}
          source={source}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={refresh}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Quick Metrics Bar */}
          <MetricsBar projects={projects} />

          {/* Section Title & Description */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-850 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                Tableau de Bord des Services
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Surveillance en temps réel des applications et accès directs aux plateformes déployées.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            allTags={allTags}
            totalCount={projects.length}
            filteredCount={filteredProjects.length}
          />

          {/* Desktop Table View (>= 768px) */}
          <ProjectTable projects={filteredProjects} />

          {/* Mobile Card List View (< 768px) */}
          <ProjectMobileCards projects={filteredProjects} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
