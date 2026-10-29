import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  allTags = [],
  totalCount,
  filteredCount,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un projet, tag ou mot-clé..."
          className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-900/90 text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/50 transition-all font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
            title="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tags Quick Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedTag === null
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
          }`}
        >
          Tous ({totalCount})
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
