export type Locale = "ar" | "en";
export type View = "dashboard" | "roadmaps" | "labs" | "planner" | "journal" | "portfolio" | "library" | "ethics";

export type Bilingual = {
  ar: string;
  en: string;
};

export type Module = {
  id: string;
  title: Bilingual;
  duration: string;
  outcome: Bilingual;
};

export type LearningTrack = {
  id: string;
  label: Bilingual;
  description: Bilingual;
  level: Bilingual;
  accent: string;
  icon: "globe" | "shield" | "database" | "cloud";
  modules: Module[];
};

export type StudyTask = {
  id: string;
  title: string;
  track: string;
  minutes: number;
  completed: boolean;
  date: string;
};

export type JournalEntry = {
  id: string;
  title: string;
  environment: string;
  lesson: string;
  date: string;
};

export type PortfolioItem = {
  id: string;
  kind: "project" | "certificate" | "lab";
  title: string;
  summary: string;
  evidenceUrl: string;
  verified: boolean;
};
