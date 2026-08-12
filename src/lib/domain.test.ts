import { describe, expect, it } from "vitest";
import { tracks } from "../data";
import {
  completedStudyMinutes,
  isApprovedTrainingUrl,
  isSafeEvidenceUrl,
  trackCompletion,
  validatePortfolioItem,
} from "./domain";

describe("learning progress", () => {
  it("calculates a completed module percentage within a track", () => {
    const track = tracks[0];
    const completed = {
      [track.modules[0].id]: true,
      [track.modules[1].id]: true,
    };

    expect(trackCompletion(track, completed)).toBe(40);
  });

  it("returns zero when no module is complete", () => {
    expect(trackCompletion(tracks[0], {})).toBe(0);
  });

  it("counts only completed study-task minutes", () => {
    expect(completedStudyMinutes([
      { id: "a", title: "A", track: "web", minutes: 45, completed: true, date: "2026-08-12" },
      { id: "b", title: "B", track: "web", minutes: 30, completed: false, date: "2026-08-12" },
    ])).toBe(45);
  });
});

describe("portfolio evidence safeguards", () => {
  it("accepts HTTPS links as evidence URLs", () => {
    expect(isSafeEvidenceUrl("https://github.com/9gkc/Cyber-4-Ever")).toBe(true);
  });

  it("rejects non-HTTPS and malformed evidence URLs", () => {
    expect(isSafeEvidenceUrl("http://example.com")).toBe(false);
    expect(isSafeEvidenceUrl("not a url")).toBe(false);
  });

  it("requires a reviewable HTTPS link for evidence-linked claims", () => {
    expect(validatePortfolioItem({
      kind: "certificate",
      title: "Cybersecurity foundations",
      summary: "Completed a foundations course and documented the defensive concepts learned.",
      evidenceUrl: "http://invalid.example",
      verified: true,
    })).toContain("Verified claims require an HTTPS evidence link.");
  });
});

describe("training destination safeguards", () => {
  it("accepts only listed official training destinations over HTTPS", () => {
    expect(isApprovedTrainingUrl("https://owasp.org/www-project-juice-shop/")).toBe(true);
    expect(isApprovedTrainingUrl("https://portswigger.net/web-security")).toBe(true);
  });

  it("rejects unlisted, deceptive, and insecure destinations", () => {
    expect(isApprovedTrainingUrl("https://owasp.org.attacker.example/lab")).toBe(false);
    expect(isApprovedTrainingUrl("http://owasp.org/www-project-juice-shop/")).toBe(false);
    expect(isApprovedTrainingUrl("https://example.com/training")).toBe(false);
  });
});
