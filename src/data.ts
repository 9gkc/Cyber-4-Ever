import type { LearningTrack } from "./types";

export const tracks: LearningTrack[] = [
  {
    id: "web",
    label: { ar: "أمن تطبيقات الويب", en: "Web Application Security" },
    description: { ar: "افهم كيف تُبنى تطبيقات الويب وكيف تُراجع دفاعياً ضمن مختبرات مصرح بها.", en: "Understand how web apps are built and review them defensively in authorized labs." },
    level: { ar: "من الأساسيات إلى المراجعة", en: "Foundations to review" },
    accent: "aqua",
    icon: "globe",
    modules: [
      { id: "web-1", title: { ar: "كيف يعمل الويب وHTTP", en: "How the web and HTTP work" }, duration: "90m", outcome: { ar: "تمييز الطلبات والاستجابات والكوكيز", en: "Identify requests, responses, and cookies" } },
      { id: "web-2", title: { ar: "المصادقة والجلسات", en: "Authentication and sessions" }, duration: "120m", outcome: { ar: "فهم الدفاع عن الهوية والجلسة", en: "Understand identity and session defenses" } },
      { id: "web-3", title: { ar: "مدخل إلى OWASP Top 10", en: "OWASP Top 10 foundations" }, duration: "150m", outcome: { ar: "ربط المخاطر بضوابط وقائية", en: "Map risks to preventive controls" } },
      { id: "web-4", title: { ar: "قراءة نتائج الفحص بمسؤولية", en: "Reading findings responsibly" }, duration: "90m", outcome: { ar: "كتابة ملاحظة قابلة للإصلاح", en: "Write an actionable finding note" } },
      { id: "web-5", title: { ar: "تقرير مختبر احترافي", en: "Professional lab reporting" }, duration: "75m", outcome: { ar: "بناء دليل واضح ضمن النطاق", en: "Build clear in-scope evidence" } },
    ],
  },
  {
    id: "soc",
    label: { ar: "الدفاع وعمليات SOC", en: "Defense & SOC Operations" },
    description: { ar: "مسار لقراءة السجلات، فرز التنبيهات، وفهم الاستجابة للحوادث.", en: "A path for log analysis, alert triage, and incident-response foundations." },
    level: { ar: "من الرصد إلى الاستجابة", en: "Detection to response" },
    accent: "violet",
    icon: "shield",
    modules: [
      { id: "soc-1", title: { ar: "أساسيات الشبكات والسجلات", en: "Networks and log basics" }, duration: "110m", outcome: { ar: "تمييز مصادر الأدلة", en: "Recognize evidence sources" } },
      { id: "soc-2", title: { ar: "فرز التنبيهات", en: "Alert triage" }, duration: "120m", outcome: { ar: "ترتيب الأولويات بهدوء", en: "Prioritize alerts calmly" } },
      { id: "soc-3", title: { ar: "خط زمني للحادث", en: "Incident timeline" }, duration: "90m", outcome: { ar: "صياغة تسلسل أدلة قابل للمراجعة", en: "Create a reviewable evidence timeline" } },
      { id: "soc-4", title: { ar: "التواصل والتصعيد", en: "Communication and escalation" }, duration: "70m", outcome: { ar: "كتابة تحديث واضح وآمن", en: "Write a clear, safe update" } },
    ],
  },
  {
    id: "forensics",
    label: { ar: "التحليل الجنائي الرقمي", en: "Digital Forensics" },
    description: { ar: "تعلم حفظ الأدلة وتحليلها وإعداد ملاحظات قابلة للتدقيق دون تغيير المصدر.", en: "Learn evidence preservation, analysis, and reviewable notes without changing the source." },
    level: { ar: "سلسلة الحيازة إلى التقرير", en: "Chain of custody to report" },
    accent: "amber",
    icon: "database",
    modules: [
      { id: "dfir-1", title: { ar: "سلامة الدليل وسلسلة الحيازة", en: "Evidence integrity and custody" }, duration: "100m", outcome: { ar: "فهم توثيق المصدر", en: "Understand source documentation" } },
      { id: "dfir-2", title: { ar: "أساسيات الملفات والـ metadata", en: "Files and metadata foundations" }, duration: "105m", outcome: { ar: "قراءة السياق دون تعديل الدليل", en: "Read context without altering evidence" } },
      { id: "dfir-3", title: { ar: "بناء خط زمني", en: "Building a timeline" }, duration: "125m", outcome: { ar: "ربط الأحداث زمنياً", en: "Connect events in time" } },
      { id: "dfir-4", title: { ar: "ملخص التحقيق", en: "Investigation summary" }, duration: "80m", outcome: { ar: "تلخيص حدود الاستنتاج", en: "State conclusions and their limits" } },
    ],
  },
  {
    id: "cloud",
    label: { ar: "أمن السحابة", en: "Cloud Security" },
    description: { ar: "افهم نماذج المسؤولية المشتركة والهوية والإعدادات الآمنة في بيئة تدريبية.", en: "Understand shared responsibility, identity, and safe configuration in a training context." },
    level: { ar: "مفاهيم إلى ضوابط", en: "Concepts to controls" },
    accent: "blue",
    icon: "cloud",
    modules: [
      { id: "cloud-1", title: { ar: "نموذج المسؤولية المشتركة", en: "Shared responsibility model" }, duration: "75m", outcome: { ar: "تحديد من يحمي ماذا", en: "Identify who protects what" } },
      { id: "cloud-2", title: { ar: "الهوية وأقل صلاحية", en: "Identity and least privilege" }, duration: "115m", outcome: { ar: "ربط الوصول بالحاجة", en: "Match access to need" } },
      { id: "cloud-3", title: { ar: "أسرار وإعدادات آمنة", en: "Secrets and safe configuration" }, duration: "95m", outcome: { ar: "منع تسرب الأسرار في الأمثلة", en: "Avoid secret leakage in examples" } },
      { id: "cloud-4", title: { ar: "مراجعة الضوابط", en: "Control review" }, duration: "90m", outcome: { ar: "صياغة قائمة تحقق دفاعية", en: "Create a defensive checklist" } },
    ],
  },
];

export const conceptCards = [
  { tag: "WEB", ar: "المصادقة", en: "Authentication", detailAr: "إثبات الهوية ليس هو التفويض؛ يجب أن يعرف الطالب الفرق بين من أنت وما يسمح لك به.", detailEn: "Authentication proves identity; authorization decides what that identity may do." },
  { tag: "DFIR", ar: "سلامة الأدلة", en: "Evidence integrity", detailAr: "الملاحظة الجيدة تحفظ المصدر وتفصل ما رُصد عن ما تم استنتاجه.", detailEn: "A useful note preserves the source and separates observations from conclusions." },
  { tag: "SOC", ar: "فرز التنبيه", en: "Alert triage", detailAr: "التنبيه إشارة تحتاج إلى سياق؛ لا يعني وحده وجود حادث مؤكد.", detailEn: "An alert needs context; it does not prove an incident by itself." },
  { tag: "CLOUD", ar: "أقل صلاحية", en: "Least privilege", detailAr: "امنح أقل وصول ممكن لإنجاز المهمة وراجعه دورياً.", detailEn: "Grant the minimum access needed for a task and review it regularly." },
];

export const safeLabs = [
  { name: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/", ar: "تطبيق متعمد الضعف للتدريب والتوعية فقط.", en: "An intentionally vulnerable application for training and awareness only.", tag: "WEB" },
  { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", ar: "مختبرات متصفح مخصصة لتعلم أمن الويب ضمن بيئة مصرح بها.", en: "Browser-based labs designed for authorized web-security learning.", tag: "WEB" },
  { name: "TryHackMe", url: "https://tryhackme.com/", ar: "غرف تعلم موجهة؛ اختر المسارات التعليمية وراجع قواعد كل غرفة.", en: "Guided learning rooms; choose educational paths and follow each room's rules.", tag: "GUIDED" },
  { name: "Hack The Box Academy", url: "https://academy.hackthebox.com/", ar: "وحدات تعليمية منظمة لبناء الأساس النظري والعملي ضمن المختبر.", en: "Structured modules for theoretical and practical foundations in a lab context.", tag: "GUIDED" },
];
