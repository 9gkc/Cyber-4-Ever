export type View = "dashboard" | "roadmaps" | "labs" | "planner" | "journal" | "portfolio" | "library" | "ethics";

export type Module = {
  id: string;
  title: string;
  duration: string;
  outcome: string;
};

export type LearningTrack = {
  id: string;
  label: string;
  description: string;
  level: string;
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
