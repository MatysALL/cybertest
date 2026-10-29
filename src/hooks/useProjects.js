import { useState, useEffect, useCallback } from 'react';
import { PROJECTS_DATA } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('local'); // 'local' | 'vercel' | 'local-fallback'
  const [lastUpdated, setLastUpdated] = useState(null);

  const isVercelEnabled = import.meta.env.VITE_VERCEL_API_ENABLED === 'true';
  const vercelApiUrl = import.meta.env.VITE_VERCEL_API_URL || '/api/vercel-deployments';

  const fetchVercelData = useCallback(async () => {
    if (!isVercelEnabled) {
      setProjects(PROJECTS_DATA);
      setSource('local');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(vercelApiUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const remoteData = await response.json();

      // remoteData can either be a map of project versions or full project array
      if (Array.isArray(remoteData)) {
        setProjects(remoteData);
      } else if (remoteData && typeof remoteData === 'object') {
        // Merge with local projects data based on id or vercelProjectName
        setProjects((prev) =>
          prev.map((proj) => {
            const remoteInfo = remoteData[proj.id] || remoteData[proj.vercelProjectName];
            if (!remoteInfo) return proj;
            return {
              ...proj,
              version: remoteInfo.version || proj.version,
              status: remoteInfo.status || proj.status,
              lastDeploy: remoteInfo.lastDeploy || proj.lastDeploy,
            };
          })
        );
      }

      setSource('vercel');
      setLastUpdated(new Date().toLocaleTimeString('fr-FR'));
    } catch (err) {
      console.warn('[useProjects] Échec de la synchronisation Vercel, repli sur les données locales :', err.message);
      setError(err.message);
      setSource('local-fallback');
      setProjects(PROJECTS_DATA);
    } finally {
      setLoading(false);
    }
  }, [isVercelEnabled, vercelApiUrl]);

  useEffect(() => {
    fetchVercelData();
  }, [fetchVercelData]);

  return {
    projects,
    loading,
    error,
    source,
    lastUpdated,
    isVercelEnabled,
    refresh: fetchVercelData,
  };
}
