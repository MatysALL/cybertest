/**
 * Métadonnées des projets hébergés et déployés sur Cybertest.fr
 * 
 * Schéma attendu pour chaque projet :
 * - id: Identifiant unique (slug)
 * - name: Nom d'affichage du projet
 * - url: URL complète d'accès
 * - dns: Nom de domaine / sous-domaine associé
 * - version: Version actuelle déployée (ex: "1.5.0")
 * - status: "En ligne" | "Maintenance" | "En développement"
 * - availability: Array de plateformes ex: ["Web", "PWA Mobile (Android)", "APK"]
 * - description: Description complète du projet
 * - tags: Mots-clés / technologies / catégories
 * - apkUrl: (Optionnel) Lien direct de téléchargement APK si disponible
 * - vercelProjectName: (Optionnel) Identifiant du projet Vercel pour synchronisation dynamique
 */

export const PROJECTS_DATA = [
  {
    id: "ecopine",
    name: "Ecopine",
    url: "https://ecopine.cybertest.fr",
    dns: "ecopine.cybertest.fr",
    version: "1.5.0",
    status: "En ligne", // "En ligne" | "Maintenance" | "En développement"
    availability: ["Web", "PWA Mobile (Android)"],
    apkUrl: "https://ecopine.cybertest.fr", // ou lien direct si dispo
    description: "Application Web de gestion d'économie. On peut y renseigner ses comptes bancaires, ses dépenses, qui nous doit de l'argent, des objets que l'on souhaite acheter et créer des projets collaboratifs avec des proches (comptes communs, dettes directes, souhaits partagés). Accessible 100% gratuitement, sans pub, avec thèmes et personnalisation poussée.",
    tags: ["Finance", "Cozy", "React", "Firebase"],
    vercelProjectName: "ecopine"
  },
  {
    id: "brain2graph",
    name: "Brain2Graph",
    url: "https://brain2graph.cybertest.fr",
    dns: "brain2graph.cybertest.fr",
    version: "1.0.0",
    status: "En ligne",
    availability: ["Web"],
    description: "Outil de modélisation, de génération de graphique de type radar, Outil d'aide à la création de JDR.",
    tags: ["Productivité", "Graphes", "Outil"],
    vercelProjectName: "brain2graph"
  }
];

export const SYSTEM_STATUS = {
  isOperational: true,
  statusLabel: "SYSTÈME OPÉRATIONNEL",
  lastCheck: new Date().toISOString(),
  environment: "Production",
  serverRegion: "Europe (CDG / Vercel Edge)"
};
