import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Bot,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  Compass,
  Database,
  Download,
  FileText,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Moon,
  Network,
  NotebookPen,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  Upload,
  X,
} from "lucide-react";
import { conceptCards, safeLabs, tracks } from "./data";
import { completedStudyMinutes, isApprovedTrainingUrl, trackCompletion, validatePortfolioItem } from "./lib/domain";
import { useStoredState } from "./lib/storage";
import type { JournalEntry, Locale, PortfolioItem, StudyTask, View } from "./types";

const copy = {
  ar: {
    appName: "Cyber 4 Ever",
    motto: "سايبر إلى الأبد",
    private: "خاص على جهازك",
    dashboard: "لوحة التعلم",
    roadmaps: "المسارات",
    labs: "المختبرات الآمنة",
    planner: "المخطط الدراسي",
    journal: "دفتر المختبر",
    portfolio: "Portfolio الطالب",
    library: "مكتبة المفاهيم",
    ethics: "الممارسة المسؤولة",
    welcome: "ابنِ مسارك بثقة، وتدرّب ضمن نطاق آمن.",
    subtitle: "منصة عربية أولاً لتنظيم تعلم الأمن السيبراني، مختبراتك القانونية، وأدلة إنجازك الحقيقية.",
    begin: "ابدأ المسار",
    review: "راجع خطة اليوم",
    progress: "تقدمك الكلي",
    minutes: "دقيقة تعلم مكتملة",
    completed: "وحدات مكتملة",
    active: "مسارات نشطة",
    noData: "لم تبدأ سجلك الشخصي بعد",
    localOnly: "تُحفظ هذه البيانات محلياً في متصفحك. لا تُرسل المنصة ملاحظاتك أو أدلتك إلى خادم.",
  },
  en: {
    appName: "Cyber 4 Ever",
    motto: "Cybersecurity, forever",
    private: "Private on this device",
    dashboard: "Learning dashboard",
    roadmaps: "Roadmaps",
    labs: "Safe labs",
    planner: "Study planner",
    journal: "Lab journal",
    portfolio: "Student portfolio",
    library: "Concept library",
    ethics: "Responsible practice",
    welcome: "Build your path with confidence. Practice within safe boundaries.",
    subtitle: "An Arabic-first home for cybersecurity study, authorized labs, and real learning evidence.",
    begin: "Start a path",
    review: "Review today’s plan",
    progress: "Your overall progress",
    minutes: "completed learning minutes",
    completed: "completed modules",
    active: "active tracks",
    noData: "Your personal learning record starts here",
    localOnly: "Your data stays in this browser. The platform does not send your notes or evidence to a server.",
  },
} as const;

const nav = [
  ["dashboard", LayoutDashboard],
  ["roadmaps", Compass],
  ["labs", ShieldCheck],
  ["planner", CalendarCheck],
  ["journal", NotebookPen],
  ["portfolio", Award],
  ["library", BookOpen],
  ["ethics", LockKeyhole],
] as const;

function localized(locale: Locale, value: { ar: string; en: string }) {
  return value[locale];
}

function displayDate(locale: Locale, date = new Date()) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-IQ" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [locale, setLocale] = useStoredState<Locale>("c4e-locale", "ar");
  const [view, setView] = useStoredState<View>("c4e-view", "dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [completedModules, setCompletedModules] = useStoredState<Record<string, boolean>>("c4e-modules", {});
  const [tasks, setTasks] = useStoredState<StudyTask[]>("c4e-tasks", []);
  const [journal, setJournal] = useStoredState<JournalEntry[]>("c4e-journal", []);
  const [portfolio, setPortfolio] = useStoredState<PortfolioItem[]>("c4e-portfolio", []);
  const [expandedTrack, setExpandedTrack] = useState("web");
  const t = copy[locale];
  const completedCount = Object.values(completedModules).filter(Boolean).length;
  const totalModules = tracks.reduce((sum, track) => sum + track.modules.length, 0);
  const overallProgress = Math.round((completedCount / totalModules) * 100);
  const currentTrack = tracks.find((track) => trackCompletion(track, completedModules) < 100) ?? tracks[0];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  function navigate(next: View) {
    setView(next);
    setMobileOpen(false);
  }

  const content = {
    dashboard: <Dashboard locale={locale} t={t} currentTrack={currentTrack} completedModules={completedModules} overallProgress={overallProgress} completedCount={completedCount} totalModules={totalModules} tasks={tasks} journal={journal} onNavigate={navigate} />,
    roadmaps: <Roadmaps locale={locale} expandedTrack={expandedTrack} setExpandedTrack={setExpandedTrack} completedModules={completedModules} setCompletedModules={setCompletedModules} />,
    labs: <SafeLabs locale={locale} onNavigate={navigate} />,
    planner: <Planner locale={locale} tasks={tasks} setTasks={setTasks} />,
    journal: <Journal locale={locale} journal={journal} setJournal={setJournal} />,
    portfolio: <Portfolio locale={locale} portfolio={portfolio} setPortfolio={setPortfolio} />,
    library: <Library locale={locale} onNavigate={navigate} />,
    ethics: <Ethics locale={locale} />,
  }[view];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`} aria-label="Primary navigation">
        <div className="brand-block">
          <div className="brand-mark"><Network size={23} strokeWidth={2.3} /></div>
          <div><strong>Cyber 4 Ever</strong><span>{t.motto}</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <nav className="side-nav">
          {nav.map(([item, Icon]) => (
            <button key={item} onClick={() => navigate(item)} className={`nav-item ${view === item ? "nav-item--active" : ""}`}>
              <Icon size={18} /><span>{t[item]}</span>{view === item && <ChevronLeft size={16} className="nav-arrow" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="privacy-card"><LockKeyhole size={17} /><div><strong>{t.private}</strong><span>{locale === "ar" ? "لا حسابات. لا تتبع." : "No accounts. No tracking."}</span></div></div>
          <a href="https://github.com/9gkc/Cyber-4-Ever" target="_blank" rel="noreferrer" className="source-link"><span>GitHub</span><ArrowUpRight size={15} /></a>
        </div>
      </aside>
      {mobileOpen && <button className="backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <div className="crumb"><span className="eyebrow">CYBER 4 EVER /</span><strong>{t[view]}</strong></div>
          <div className="top-actions">
            <div className="privacy-chip"><ShieldCheck size={15} />{t.private}</div>
            <button className="language-switch" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>{locale === "ar" ? "EN" : "ع"}</button>
          </div>
        </header>
        <div className="content-wrap">{content}</div>
      </main>
    </div>
  );
}

function Dashboard({ locale, t, currentTrack, completedModules, overallProgress, completedCount, totalModules, tasks, journal, onNavigate }: {
  locale: Locale; t: typeof copy[Locale]; currentTrack: typeof tracks[number]; completedModules: Record<string, boolean>; overallProgress: number; completedCount: number; totalModules: number; tasks: StudyTask[]; journal: JournalEntry[]; onNavigate: (view: View) => void;
}) {
  const nextModule = currentTrack.modules.find((module) => !completedModules[module.id]) ?? currentTrack.modules[0];
  const currentTrackProgress = trackCompletion(currentTrack, completedModules);
  return <>
    <section className="hero-grid">
      <div className="hero-copy">
        <div className="date-line"><span className="pulse-dot" />{displayDate(locale)}</div>
        <h1>{t.welcome}</h1>
        <p>{t.subtitle}</p>
        <div className="hero-actions"><button className="button button--primary" onClick={() => onNavigate("roadmaps")}>{t.begin}<ChevronLeft size={17} /></button><button className="button button--quiet" onClick={() => onNavigate("planner")}>{t.review}<CalendarCheck size={17} /></button></div>
      </div>
      <div className="radar-card" aria-label={`${overallProgress}% progress`}>
        <div className="radar-grid" />
        <div className="radar-orbit orbit-1" /><div className="radar-orbit orbit-2" /><div className="radar-line" />
        <div className="radar-core"><span>{overallProgress}%</span><small>{locale === "ar" ? "تقدم" : "progress"}</small></div>
        <div className="radar-label label-a">WEB</div><div className="radar-label label-b">SOC</div><div className="radar-label label-c">DFIR</div>
      </div>
    </section>
    <section className="stat-grid" aria-label="Learning summary">
      <article className="stat-card"><div className="stat-icon aqua"><TimerReset size={20} /></div><strong>{completedStudyMinutes(tasks)}</strong><span>{t.minutes}</span></article>
      <article className="stat-card"><div className="stat-icon violet"><Check size={20} /></div><strong>{completedCount}<small>/{totalModules}</small></strong><span>{t.completed}</span></article>
      <article className="stat-card"><div className="stat-icon amber"><Compass size={20} /></div><strong>{tracks.length}</strong><span>{t.active}</span></article>
      <article className="stat-card stat-card--mini"><div className="mini-profile"><div className="avatar"><GraduationCap size={21} /></div><div><strong>{locale === "ar" ? "طالب واعٍ" : "Responsible learner"}</strong><span>{locale === "ar" ? "الخصوصية أولاً" : "Privacy first"}</span></div></div></article>
    </section>
    <section className="dashboard-grid">
      <article className="panel current-panel">
        <div className="panel-heading"><div><span className="eyebrow">{locale === "ar" ? "الآن في مسارك" : "NOW ON YOUR PATH"}</span><h2>{localized(locale, currentTrack.label)}</h2></div><span className={`track-dot ${currentTrack.accent}`} /></div>
        <div className="current-module"><div className="module-order">01</div><div><strong>{localized(locale, nextModule.title)}</strong><p>{localized(locale, nextModule.outcome)}</p></div><span className="duration">{nextModule.duration}</span></div>
        <div className="progress-meta"><span>{locale === "ar" ? "إتقان المسار" : "Path mastery"}</span><strong>{currentTrackProgress}%</strong></div>
        <div className="progress-line"><span style={{ width: `${currentTrackProgress}%` }} /></div>
        <button className="text-button" onClick={() => onNavigate("roadmaps")}>{locale === "ar" ? "استكشف الوحدات" : "Explore modules"}<ArrowUpRight size={16} /></button>
      </article>
      <article className="panel activity-panel">
        <div className="panel-heading"><div><span className="eyebrow">{locale === "ar" ? "سجل التعلم" : "LEARNING RECORD"}</span><h2>{locale === "ar" ? "لحظاتك المهمة" : "Your key moments"}</h2></div><button className="ghost-round" onClick={() => onNavigate("journal")}><Plus size={18} /></button></div>
        {journal.length === 0 ? <div className="empty-record"><NotebookPen size={24} /><p>{t.noData}</p><button className="text-button" onClick={() => onNavigate("journal")}>{locale === "ar" ? "افتح دفتر المختبر" : "Open lab journal"}<ChevronLeft size={16} /></button></div> : <div className="entry-list">{journal.slice(0, 3).map((entry) => <div className="entry-row" key={entry.id}><div className="entry-mark" /><div><strong>{entry.title}</strong><span>{entry.environment}</span></div><time>{entry.date}</time></div>)}</div>}
      </article>
    </section>
    <section className="principle-banner"><div className="principle-icon"><ShieldCheck size={21} /></div><div><span className="eyebrow">{locale === "ar" ? "مبدأ المنصة" : "PLATFORM PRINCIPLE"}</span><strong>{locale === "ar" ? "تعلّم بفضول؛ مارس بتصريح؛ وثّق بصدق." : "Learn with curiosity; practice with authorization; document honestly."}</strong></div><button onClick={() => onNavigate("ethics")} className="text-button">{locale === "ar" ? "اقرأ الحدود" : "Read boundaries"}<ArrowUpRight size={16} /></button></section>
  </>;
}

function Roadmaps({ locale, expandedTrack, setExpandedTrack, completedModules, setCompletedModules }: {
  locale: Locale; expandedTrack: string; setExpandedTrack: (value: string) => void; completedModules: Record<string, boolean>; setCompletedModules: (value: Record<string, boolean>) => void;
}) {
  return <section className="page-section">
    <div className="page-heading"><span className="eyebrow">{locale === "ar" ? "مسارات مبنية لأدوار حقيقية" : "PATHS BUILT FOR REAL ROLES"}</span><h1>{locale === "ar" ? "تعلّم بالترتيب، لا بالتشتت." : "Learn in sequence, not in fragments."}</h1><p>{locale === "ar" ? "ابدأ بالأساسيات، نفّذ التدريب في بيئة مصرح بها، ثم وثّق ما فهمته. كل علامة إتمام محفوظة على جهازك فقط." : "Start with foundations, train in an authorized environment, then document what you learned. Every completion mark stays on your device."}</p></div>
    <div className="track-list">{tracks.map((track, index) => {
      const isOpen = expandedTrack === track.id; const progress = trackCompletion(track, completedModules);
      const Icon = track.icon === "globe" ? Globe2 : track.icon === "shield" ? ShieldCheck : track.icon === "database" ? Database : Cloud;
      return <article className={`track-card track-card--${track.accent} ${isOpen ? "track-card--open" : ""}`} key={track.id}>
        <button className="track-summary" onClick={() => setExpandedTrack(isOpen ? "" : track.id)} aria-expanded={isOpen}>
          <div className="track-index">0{index + 1}</div><div className="track-symbol"><Icon size={22} /></div><div className="track-intro"><div className="track-title-row"><h2>{localized(locale, track.label)}</h2><span>{localized(locale, track.level)}</span></div><p>{localized(locale, track.description)}</p></div><div className="track-progress"><strong>{progress}%</strong><span>{locale === "ar" ? "مكتمل" : "complete"}</span></div><div className="expand-icon">{isOpen ? <ChevronLeft size={21} /> : <ChevronRight size={21} />}</div>
        </button>
        {isOpen && <div className="modules-panel"><div className="module-list">{track.modules.map((module, moduleIndex) => <label className="module-row" key={module.id}><input type="checkbox" checked={Boolean(completedModules[module.id])} onChange={() => setCompletedModules({ ...completedModules, [module.id]: !completedModules[module.id] })} /><span className="custom-check"><Check size={13} /></span><span className="module-number">{String(moduleIndex + 1).padStart(2, "0")}</span><span className="module-body"><strong>{localized(locale, module.title)}</strong><small>{localized(locale, module.outcome)}</small></span><span className="duration">{module.duration}</span></label>)}</div><div className="track-footer"><div><span>{locale === "ar" ? "قاعدة التعلّم" : "Learning rule"}</span><strong>{locale === "ar" ? "افهم الضابط الدفاعي قبل أي تجربة." : "Understand the defensive control before any experiment."}</strong></div><div className="progress-ring"><svg viewBox="0 0 36 36"><path className="ring-bg" d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0-31.831" /><path className="ring-value" strokeDasharray={`${progress}, 100`} d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0-31.831" /></svg><span>{progress}</span></div></div></div>}
      </article>;
    })}</div>
  </section>;
}

function SafeLabs({ locale, onNavigate }: { locale: Locale; onNavigate: (view: View) => void }) {
  const approvedLabs = safeLabs.filter((lab) => isApprovedTrainingUrl(lab.url));
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">{locale === "ar" ? "تعلم عملي لكن مسؤول" : "PRACTICAL, BUT RESPONSIBLE"}</span><h1>{locale === "ar" ? "مختبرات مصممة للتعلّم، لا أهداف حقيقية." : "Labs made for learning, not real-world targets."}</h1><p>{locale === "ar" ? "توصلك المنصة فقط ببيئات تدريبية مخصصة، وتذكّرك دائماً بأن النطاق والتصريح ليسا خياراً." : "The platform points only to purpose-built training environments and keeps authorization non-negotiable."}</p></div>
    <div className="authorization-callout"><div className="callout-seal"><LockKeyhole size={24} /></div><div><strong>{locale === "ar" ? "قبل فتح أي مختبر" : "Before opening any lab"}</strong><p>{locale === "ar" ? "تأكد أنك تقرأ قواعد المختبر، تستخدم حسابك الشخصي، ولا تعيد توجيه أي تجربة نحو موقع أو شبكة حقيقية." : "Read the lab rules, use your own account, and never redirect an exercise toward a real site or network."}</p></div><button className="button button--quiet" onClick={() => onNavigate("ethics")}>{locale === "ar" ? "سياسة الاستخدام" : "Usage policy"}<ArrowUpRight size={16} /></button></div>
    <div className="lab-grid">{approvedLabs.map((lab, index) => <article className="lab-card" key={lab.name}><div className="lab-top"><span className="lab-tag">{lab.tag}</span><span className="lab-number">0{index + 1}</span></div><div className="lab-symbol"><Bot size={26} /></div><h2>{lab.name}</h2><p>{locale === "ar" ? lab.ar : lab.en}</p><div className="lab-rule"><Check size={15} />{locale === "ar" ? "بيئة تدريب موصى بها" : "Recommended training environment"}</div><a className="text-button" href={lab.url} target="_blank" rel="noreferrer">{locale === "ar" ? "فتح المرجع الرسمي" : "Open official resource"}<ArrowUpRight size={16} /></a></article>)}</div>
    <div className="lab-journal-bridge"><div><span className="eyebrow">{locale === "ar" ? "بعد كل جلسة" : "AFTER EACH SESSION"}</span><h2>{locale === "ar" ? "حوّل التجربة إلى معرفة قابلة للتذكر." : "Turn the session into knowledge you can retain."}</h2><p>{locale === "ar" ? "سجل البيئة، ما الذي لاحظته، ولماذا ينجح الضابط الدفاعي. لا تحفظ كلمات مرور أو بيانات حساسة في ملاحظاتك." : "Record the environment, what you observed, and why the defensive control works. Do not store passwords or sensitive data in notes."}</p></div><button className="button button--primary" onClick={() => onNavigate("journal")}>{locale === "ar" ? "افتح دفتر المختبر" : "Open lab journal"}<NotebookPen size={17} /></button></div>
  </section>;
}

function Planner({ locale, tasks, setTasks }: { locale: Locale; tasks: StudyTask[]; setTasks: (value: StudyTask[]) => void }) {
  const [title, setTitle] = useState(""); const [track, setTrack] = useState("web"); const [minutes, setMinutes] = useState(45);
  const today = new Date().toISOString().slice(0, 10); const todayTasks = tasks.filter((task) => task.date === today); const completed = todayTasks.filter((task) => task.completed).length;
  function addTask(event: React.FormEvent) { event.preventDefault(); if (title.trim().length < 3) return; setTasks([{ id: crypto.randomUUID(), title: title.trim(), track, minutes, completed: false, date: today }, ...tasks]); setTitle(""); }
  return <section className="page-section"><div className="page-heading inline-heading"><div><span className="eyebrow">{locale === "ar" ? "خطة صغيرة، تقدم مستمر" : "SMALL PLAN, STEADY PROGRESS"}</span><h1>{locale === "ar" ? "صمّم جلسة اليوم." : "Design today’s session."}</h1><p>{locale === "ar" ? "لا تحتاج لساعات طويلة. اختر مهمة محددة، وقتاً واقعياً، وسجّل ما أنجزته." : "You do not need long hours. Choose one bounded task, a realistic time, and record what you complete."}</p></div><div className="today-tile"><span>{displayDate(locale)}</span><strong>{completed}/{todayTasks.length || 0}</strong><small>{locale === "ar" ? "مهام مكتملة" : "tasks complete"}</small></div></div>
    <div className="planner-grid"><form className="panel planner-form" onSubmit={addTask}><div className="panel-heading"><div><span className="eyebrow">{locale === "ar" ? "إضافة جلسة" : "ADD SESSION"}</span><h2>{locale === "ar" ? "جلسة واضحة أفضل من قائمة طويلة." : "One clear session beats a long list."}</h2></div><Plus size={21} /></div><label>{locale === "ar" ? "ماذا ستتعلم؟" : "What will you learn?"}<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={locale === "ar" ? "مثال: فهم الكوكيز الآمنة" : "e.g. Understand secure cookies"} maxLength={90} required /></label><div className="form-row"><label>{locale === "ar" ? "المسار" : "Path"}<select value={track} onChange={(event) => setTrack(event.target.value)}>{tracks.map((item) => <option value={item.id} key={item.id}>{localized(locale, item.label)}</option>)}</select></label><label>{locale === "ar" ? "الدقائق" : "Minutes"}<input type="number" min="15" max="240" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} /></label></div><button className="button button--primary" type="submit"><Save size={17} />{locale === "ar" ? "حفظ في خطة اليوم" : "Save to today’s plan"}</button></form>
      <article className="panel plan-panel"><div className="panel-heading"><div><span className="eyebrow">{locale === "ar" ? "جلسات اليوم" : "TODAY’S SESSIONS"}</span><h2>{locale === "ar" ? "نفّذ ثم علّم." : "Do, then check it off."}</h2></div><div className="time-total"><TimerReset size={16} />{todayTasks.reduce((sum, task) => sum + task.minutes, 0)}m</div></div>{todayTasks.length === 0 ? <div className="empty-record"><Target size={24} /><p>{locale === "ar" ? "أضف أول جلسة واقعية لليوم." : "Add a realistic first session for today."}</p></div> : <div className="task-list">{todayTasks.map((task) => <label className={`task-row ${task.completed ? "task-row--done" : ""}`} key={task.id}><input type="checkbox" checked={task.completed} onChange={() => setTasks(tasks.map((item) => item.id === task.id ? { ...item, completed: !item.completed } : item))} /><span className="custom-check"><Check size={13} /></span><span className="task-track">{task.track.toUpperCase()}</span><span>{task.title}</span><small>{task.minutes}m</small><button type="button" onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))} aria-label="Remove task"><X size={15} /></button></label>)}</div>}</article>
    </div>
    <div className="privacy-note"><LockKeyhole size={18} /><p>{locale === "ar" ? "خطتك محفوظة داخل هذا المتصفح فقط. يمكنك تصديرها من دفتر المختبر متى شئت." : "Your plan remains in this browser only. You can export your record from the lab journal whenever you wish."}</p></div>
  </section>;
}

function Journal({ locale, journal, setJournal }: { locale: Locale; journal: JournalEntry[]; setJournal: (value: JournalEntry[]) => void }) {
  const [title, setTitle] = useState(""); const [environment, setEnvironment] = useState(""); const [lesson, setLesson] = useState(""); const fileRef = useRef<HTMLInputElement>(null);
  function addEntry(event: React.FormEvent) { event.preventDefault(); if (title.trim().length < 3 || environment.trim().length < 3 || lesson.trim().length < 12) return; setJournal([{ id: crypto.randomUUID(), title: title.trim(), environment: environment.trim(), lesson: lesson.trim(), date: new Date().toISOString().slice(0, 10) }, ...journal]); setTitle(""); setEnvironment(""); setLesson(""); }
  function importJournal(event: React.ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(String(reader.result)); if (Array.isArray(parsed) && parsed.every((entry) => typeof entry.title === "string" && typeof entry.lesson === "string")) setJournal(parsed as JournalEntry[]); } catch { /* Invalid imports are intentionally ignored. */ } }; reader.readAsText(file); event.target.value = ""; }
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">{locale === "ar" ? "ذاكرتك العملية، ملكك" : "YOUR PRACTICAL MEMORY, YOURS"}</span><h1>{locale === "ar" ? "دوّن ما تعلّمته، لا ما تتوقعه." : "Record what you learned, not what you assume."}</h1><p>{locale === "ar" ? "دفتر خاص يساعدك على تحويل جلسة المختبر إلى ملاحظة بسيطة قابلة للمراجعة. لا تسجل أسراراً أو بيانات حقيقية أو خطوات خارج نطاق المختبر." : "A private journal turns a lab session into a simple, reviewable note. Never record secrets, real data, or steps outside a lab scope."}</p></div>
    <div className="journal-layout"><form className="journal-editor" onSubmit={addEntry}><div className="editor-top"><div><span className="eyebrow">{locale === "ar" ? "إضافة ملاحظة" : "NEW NOTE"}</span><h2>{locale === "ar" ? "ما الدرس الذي ستتذكره؟" : "What will you remember?"}</h2></div><NotebookPen size={23} /></div><label>{locale === "ar" ? "عنوان واضح" : "Clear title"}<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={90} placeholder={locale === "ar" ? "مثال: كيف تتحقق الكوكيز من الجلسة" : "e.g. How session cookies are verified"} required /></label><label>{locale === "ar" ? "بيئة التدريب" : "Training environment"}<input value={environment} onChange={(event) => setEnvironment(event.target.value)} maxLength={70} placeholder="OWASP Juice Shop / Local lab" required /></label><label>{locale === "ar" ? "ماذا لاحظت؟ وما الضابط الدفاعي؟" : "What did you observe, and what is the defensive control?"}<textarea value={lesson} onChange={(event) => setLesson(event.target.value)} maxLength={1200} placeholder={locale === "ar" ? "اكتب ملاحظتك بلغة دفاعية ومحددة..." : "Write a specific, defensive learning note..."} required /></label><button className="button button--primary" type="submit"><Save size={17} />{locale === "ar" ? "حفظ محلي" : "Save locally"}</button><p className="form-hint"><LockKeyhole size={14} />{locale === "ar" ? "لا تضع بيانات حساسة أو رموز وصول هنا." : "Do not put sensitive data or access tokens here."}</p></form>
      <div className="journal-record"><div className="journal-toolbar"><div><span className="eyebrow">{locale === "ar" ? "سجلك" : "YOUR RECORD"}</span><h2>{journal.length} {locale === "ar" ? "ملاحظات" : "notes"}</h2></div><div><button className="toolbar-button" onClick={() => downloadJson("cyber-4-ever-journal.json", journal)}><Download size={16} />{locale === "ar" ? "تصدير" : "Export"}</button><button className="toolbar-button" onClick={() => fileRef.current?.click()}><Upload size={16} />{locale === "ar" ? "استيراد" : "Import"}</button><input ref={fileRef} hidden type="file" accept="application/json" onChange={importJournal} /></div></div>{journal.length === 0 ? <div className="journal-empty"><FileText size={29} /><p>{locale === "ar" ? "أول ملاحظة جيدة هي بداية Portfolio صادق." : "One good note is the start of an honest portfolio."}</p></div> : <div className="note-stack">{journal.map((entry) => <article className="journal-note" key={entry.id}><div className="note-meta"><span>{entry.environment}</span><time>{entry.date}</time></div><h3>{entry.title}</h3><p>{entry.lesson}</p><button onClick={() => setJournal(journal.filter((item) => item.id !== entry.id))}>{locale === "ar" ? "حذف" : "Delete"}</button></article>)}</div>}</div>
    </div>
  </section>;
}

function Portfolio({ locale, portfolio, setPortfolio }: { locale: Locale; portfolio: PortfolioItem[]; setPortfolio: (value: PortfolioItem[]) => void }) {
  const [kind, setKind] = useState<PortfolioItem["kind"]>("project"); const [title, setTitle] = useState(""); const [summary, setSummary] = useState(""); const [evidenceUrl, setEvidenceUrl] = useState(""); const [verified, setVerified] = useState(false); const [errors, setErrors] = useState<string[]>([]);
  function addItem(event: React.FormEvent) { event.preventDefault(); const candidate = { kind, title, summary, evidenceUrl, verified }; const nextErrors = validatePortfolioItem(candidate); setErrors(nextErrors); if (nextErrors.length > 0) return; setPortfolio([{ ...candidate, id: crypto.randomUUID() }, ...portfolio]); setTitle(""); setSummary(""); setEvidenceUrl(""); setVerified(false); }
  const labels = { project: locale === "ar" ? "مشروع" : "Project", certificate: locale === "ar" ? "شهادة" : "Certificate", lab: locale === "ar" ? "إنجاز مختبر" : "Lab milestone" };
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">{locale === "ar" ? "دليل لا ادعاء" : "EVIDENCE, NOT CLAIMS"}</span><h1>{locale === "ar" ? "Portfolio يعكس ما أنجزته فعلاً." : "A portfolio that reflects what you actually did."}</h1><p>{locale === "ar" ? "أضف مشروعاتك وشهاداتك وإنجازات المختبر الحقيقية. تضع المنصة وسم «مدعوم بدليل» فقط عندما تختار رابط HTTPS خارجي قابل للمراجعة." : "Add genuine projects, certificates, and lab milestones. The platform labels an item evidence-linked only when you supply a reviewable external HTTPS link."}</p></div>
    <div className="portfolio-layout"><form className="panel portfolio-form" onSubmit={addItem}><div className="panel-heading"><div><span className="eyebrow">{locale === "ar" ? "إضافة عنصر" : "ADD ITEM"}</span><h2>{locale === "ar" ? "اجعل الدليل قابلاً للمراجعة." : "Make your evidence reviewable."}</h2></div><Award size={23} /></div><label>{locale === "ar" ? "النوع" : "Type"}<select value={kind} onChange={(event) => setKind(event.target.value as PortfolioItem["kind"])}>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>{locale === "ar" ? "العنوان" : "Title"}<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={90} required /></label><label>{locale === "ar" ? "ما الذي تعلمته أو بنيته؟" : "What did you learn or build?"}<textarea value={summary} onChange={(event) => setSummary(event.target.value)} maxLength={500} required /></label><label>{locale === "ar" ? "رابط الدليل (اختياري)" : "Evidence link (optional)"}<input dir="ltr" type="url" value={evidenceUrl} onChange={(event) => setEvidenceUrl(event.target.value)} placeholder="https://" /></label><label className="verify-checkbox"><input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} /><span className="custom-check"><Check size={13} /></span><span>{locale === "ar" ? "ضع علامة «مدعوم بدليل» لهذا العنصر" : "Mark this item as evidence-linked"}</span></label>{errors.length > 0 && <div className="form-errors">{errors.map((error) => <p key={error}>{error}</p>)}</div>}<button className="button button--primary" type="submit"><Plus size={17} />{locale === "ar" ? "إضافة للـ Portfolio" : "Add to portfolio"}</button></form>
      <section className="portfolio-preview"><div className="portfolio-header"><div className="portfolio-person"><div className="portfolio-avatar"><GraduationCap size={28} /></div><div><span>{locale === "ar" ? "ملف طالب" : "Student profile"}</span><h2>Cyber 4 Ever Learner</h2></div></div><button className="toolbar-button" onClick={() => downloadJson("cyber-4-ever-portfolio.json", portfolio)}><Download size={16} />{locale === "ar" ? "تصدير" : "Export"}</button></div><div className="portfolio-principle"><Sparkles size={17} /><p>{locale === "ar" ? "هذا العرض لا يمنح شهادات ولا يتحقق من هوية المالك؛ هو مساحة لعرض أدلتك الحقيقية فقط." : "This view grants no certificates and does not verify identity; it is a space to present your real evidence only."}</p></div>{portfolio.length === 0 ? <div className="portfolio-empty"><Award size={31} /><h3>{locale === "ar" ? "أضف إنجازاً حقيقياً." : "Add a real milestone."}</h3><p>{locale === "ar" ? "ابدأ بمشروع، شهادة قابلة للتحقق، أو درس تعلمته في مختبر مصرح به." : "Start with a project, a verifiable certificate, or a lesson from an authorized lab."}</p></div> : <div className="portfolio-cards">{portfolio.map((item) => <article className="portfolio-item" key={item.id}><div className="item-top"><span>{labels[item.kind]}</span>{item.verified && <span className="verified"><ShieldCheck size={13} />{locale === "ar" ? "مدعوم بدليل" : "Evidence-linked"}</span>}</div><h3>{item.title}</h3><p>{item.summary}</p><div className="item-bottom">{item.evidenceUrl ? <a href={item.evidenceUrl} target="_blank" rel="noreferrer">{locale === "ar" ? "عرض الدليل" : "View evidence"}<ArrowUpRight size={14} /></a> : <span>{locale === "ar" ? "بدون رابط خارجي" : "No external link"}</span>}<button onClick={() => setPortfolio(portfolio.filter((entry) => entry.id !== item.id))}>{locale === "ar" ? "إزالة" : "Remove"}</button></div></article>)}</div>}</section>
    </div>
  </section>;
}

function Library({ locale, onNavigate }: { locale: Locale; onNavigate: (view: View) => void }) {
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">{locale === "ar" ? "افهم قبل أن تحفظ" : "UNDERSTAND BEFORE YOU MEMORIZE"}</span><h1>{locale === "ar" ? "مفاهيم قصيرة، مفيدة، ودفاعية." : "Short, useful, defensive concepts."}</h1><p>{locale === "ar" ? "هذه البطاقات تبني لغة مشتركة بينك وبين المسار. استخدمها لتراجع الفكرة، ثم طبقها في مختبر مصرح به فقط." : "These cards build a shared language for your learning paths. Review the idea, then apply it only in an authorized lab."}</p></div><div className="concept-grid">{conceptCards.map((card, index) => <article className="concept-card" key={card.tag}><div className="concept-top"><span>{card.tag}</span><small>0{index + 1}</small></div><CircleHelp size={25} /><h2>{locale === "ar" ? card.ar : card.en}</h2><p>{locale === "ar" ? card.detailAr : card.detailEn}</p><div className="concept-footer"><span>{locale === "ar" ? "مفهوم تأسيسي" : "Foundation concept"}</span><button onClick={() => onNavigate("roadmaps")}><ChevronLeft size={18} /></button></div></article>)}</div><section className="reference-panel"><div><span className="eyebrow">{locale === "ar" ? "مراجع أصلية" : "PRIMARY REFERENCES"}</span><h2>{locale === "ar" ? "تعلم من مصادر تُحدّث نفسها." : "Learn from sources that maintain themselves."}</h2><p>{locale === "ar" ? "تستند المسارات إلى أدوار NICE، ومبادئ OWASP، وبيئات التعليم المخصصة. راجع المرجع الأصلي عندما تحتاج إلى عمق أكبر." : "The paths are informed by NICE work roles, OWASP guidance, and purpose-built educational environments. Read the source when you need more depth."}</p></div><div className="reference-links"><a href="https://niccs.cisa.gov/tools/nice-framework" target="_blank" rel="noreferrer">NICE Framework <ArrowUpRight size={15} /></a><a href="https://owasp.org/www-project-web-security-testing-guide/" target="_blank" rel="noreferrer">OWASP WSTG <ArrowUpRight size={15} /></a></div></section></section>;
}

function Ethics({ locale }: { locale: Locale }) {
  const rows = [
    [locale === "ar" ? "مختبر مخصص أو دورة تدريبية" : "Purpose-built lab or training course", locale === "ar" ? "مسموح بعد قراءة القواعد" : "Allowed after reading its rules", "ok"],
    [locale === "ar" ? "مشروعك أو بيئة لديك إذن صريح لها" : "Your project or explicitly authorized environment", locale === "ar" ? "مسموح ضمن حدود الإذن" : "Allowed within authorization", "ok"],
    [locale === "ar" ? "موقع أو API أو شبكة لا تملك تصريحاً لها" : "A site, API, or network without your authorization", locale === "ar" ? "غير مسموح" : "Not allowed", "no"],
    [locale === "ar" ? "بيانات شخصية أو أسرار أو رموز وصول" : "Personal data, secrets, or access tokens", locale === "ar" ? "لا تجمعها ولا تحفظها" : "Do not collect or store", "no"],
  ];
  return <section className="page-section"><div className="page-heading"><span className="eyebrow">{locale === "ar" ? "حدود واضحة تحمي التعلم" : "CLEAR BOUNDARIES PROTECT LEARNING"}</span><h1>{locale === "ar" ? "الترخيص هو بداية المهارة الاحترافية." : "Authorization is the beginning of professional skill."}</h1><p>{locale === "ar" ? "Cyber 4 Ever صُممت لتدعم التعلم الدفاعي والمنهجي. لا تنفذ المنصة عمليات فحص، ولا تجمع أهدافاً، ولا تقدم تعليمات لاستهداف أنظمة حقيقية." : "Cyber 4 Ever supports defensive, methodical learning. It does not run scans, collect targets, or provide instructions for targeting real systems."}</p></div><div className="ethics-grid"><article className="ethics-principles"><div className="ethic-icon"><ShieldCheck size={28} /></div><h2>{locale === "ar" ? "القاعدة الذهبية" : "The golden rule"}</h2><blockquote>{locale === "ar" ? "إذا لم يكن لديك إذن صريح ومحدد، لا تختبر." : "If you do not have explicit, specific authorization, do not test."}</blockquote><p>{locale === "ar" ? "النطاق المصرح به يحميك، ويحمي الآخرين، ويجعل ما تتعلمه قابلاً للبناء عليه مهنياً." : "An authorized scope protects you and others, and makes your learning professionally durable."}</p></article><article className="boundary-table"><div className="table-head"><span>{locale === "ar" ? "السياق" : "Context"}</span><span>{locale === "ar" ? "القرار" : "Decision"}</span></div>{rows.map(([context, decision, status]) => <div className="table-row" key={String(context)}><span>{context}</span><strong className={status === "ok" ? "allowed" : "blocked"}>{status === "ok" ? <Check size={15} /> : <X size={15} />}{decision}</strong></div>)}</article></div><div className="security-promise"><LockKeyhole size={22} /><div><h2>{locale === "ar" ? "وعد الخصوصية" : "Privacy promise"}</h2><p>{locale === "ar" ? "لا تسجيل دخول، لا تحليلات مستخدم، ولا خادم لحفظ يومياتك أو Portfolio. يمكنك حذف بياناتك عبر بيانات المتصفح أو تصديرها قبل ذلك." : "No sign-in, no user analytics, and no server storing your journal or portfolio. You can remove data through browser storage or export it first."}</p></div></div></section>;
}
