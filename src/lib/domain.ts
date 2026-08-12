import type { LearningTrack, PortfolioItem, StudyTask } from "../types";

export function trackCompletion(track: LearningTrack, completedModules: Record<string, boolean>) {
  if (track.modules.length === 0) return 0;
  const completed = track.modules.filter((module) => completedModules[module.id]).length;
  return Math.round((completed / track.modules.length) * 100);
}

export function completedStudyMinutes(tasks: StudyTask[]) {
  return tasks.filter((task) => task.completed).reduce((total, task) => total + task.minutes, 0);
}

export function validatePortfolioItem(item: Omit<PortfolioItem, "id">) {
  const errors: string[] = [];
  if (item.title.trim().length < 3) errors.push("A title of at least 3 characters is required.");
  if (item.summary.trim().length < 12) errors.push("Write a clear learning-oriented summary.");
  if (item.verified && !isSafeEvidenceUrl(item.evidenceUrl)) {
    errors.push("Verified claims require an HTTPS evidence link.");
  }
  return errors;
}

export function isSafeEvidenceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isApprovedTrainingUrl(value: string) {
  try {
    const url = new URL(value);
    const approvedHosts = new Set([
      "owasp.org",
      "portswigger.net",
      "tryhackme.com",
      "academy.hackthebox.com",
      "pwn.college",
      "cyberdefenders.org",
      "learn.microsoft.com",
      "aws.amazon.com",
    ]);
    return url.protocol === "https:" && approvedHosts.has(url.hostname);
  } catch {
    return false;
  }
}
