import type { LearningTrack } from "./types";

export const tracks: LearningTrack[] = [
  {
    id: "web",
    label: "Web Application Security",
    description: "Understand how web applications work and review them defensively in authorized labs.",
    level: "Foundations to review",
    accent: "aqua",
    icon: "globe",
    modules: [
      { id: "web-1", title: "How the web and HTTP work", duration: "90m", outcome: "Identify requests, responses, and cookies" },
      { id: "web-2", title: "Authentication and sessions", duration: "120m", outcome: "Understand identity and session defenses" },
      { id: "web-3", title: "OWASP Top 10 foundations", duration: "150m", outcome: "Map risks to preventive controls" },
      { id: "web-4", title: "Reading findings responsibly", duration: "90m", outcome: "Write an actionable finding note" },
      { id: "web-5", title: "Professional lab reporting", duration: "75m", outcome: "Build clear in-scope evidence" },
    ],
  },
  {
    id: "soc",
    label: "Defense & SOC Operations",
    description: "A path for log analysis, alert triage, and incident-response foundations.",
    level: "Detection to response",
    accent: "violet",
    icon: "shield",
    modules: [
      { id: "soc-1", title: "Networks and log basics", duration: "110m", outcome: "Recognize evidence sources" },
      { id: "soc-2", title: "Alert triage", duration: "120m", outcome: "Prioritize alerts calmly" },
      { id: "soc-3", title: "Incident timeline", duration: "90m", outcome: "Create a reviewable evidence timeline" },
      { id: "soc-4", title: "Communication and escalation", duration: "70m", outcome: "Write a clear, safe update" },
    ],
  },
  {
    id: "forensics",
    label: "Digital Forensics",
    description: "Learn evidence preservation, analysis, and reviewable notes without changing the source.",
    level: "Chain of custody to report",
    accent: "amber",
    icon: "database",
    modules: [
      { id: "dfir-1", title: "Evidence integrity and custody", duration: "100m", outcome: "Understand source documentation" },
      { id: "dfir-2", title: "Files and metadata foundations", duration: "105m", outcome: "Read context without altering evidence" },
      { id: "dfir-3", title: "Building a timeline", duration: "125m", outcome: "Connect events in time" },
      { id: "dfir-4", title: "Investigation summary", duration: "80m", outcome: "State conclusions and their limits" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud Security",
    description: "Understand shared responsibility, identity, and safe configuration in a training context.",
    level: "Concepts to controls",
    accent: "blue",
    icon: "cloud",
    modules: [
      { id: "cloud-1", title: "Shared responsibility model", duration: "75m", outcome: "Identify who protects what" },
      { id: "cloud-2", title: "Identity and least privilege", duration: "115m", outcome: "Match access to need" },
      { id: "cloud-3", title: "Secrets and safe configuration", duration: "95m", outcome: "Avoid secret leakage in examples" },
      { id: "cloud-4", title: "Control review", duration: "90m", outcome: "Create a defensive checklist" },
    ],
  },
];

export const conceptCards = [
  { tag: "WEB", title: "Authentication", detail: "Authentication proves identity; authorization decides what that identity may do." },
  { tag: "DFIR", title: "Evidence integrity", detail: "A useful note preserves the source and separates observations from conclusions." },
  { tag: "SOC", title: "Alert triage", detail: "An alert needs context; it does not prove an incident by itself." },
  { tag: "CLOUD", title: "Least privilege", detail: "Grant the minimum access needed for a task and review it regularly." },
];

export const safeLabs = [
  { name: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/", description: "An intentionally vulnerable application for training and awareness only.", tag: "WEB" },
  { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", description: "Browser-based labs designed for authorized web-security learning.", tag: "WEB" },
  { name: "TryHackMe", url: "https://tryhackme.com/", description: "Guided learning rooms; choose educational paths and follow each room's rules.", tag: "GUIDED" },
  { name: "Hack The Box Academy", url: "https://academy.hackthebox.com/", description: "Structured modules for theoretical and practical foundations in a lab context.", tag: "GUIDED" },
];
