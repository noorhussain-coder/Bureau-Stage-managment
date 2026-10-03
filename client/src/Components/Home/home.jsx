import React, { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  Users,
  FileCheck2,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Send,
  ShieldCheck,
  Star,
  Mail,
  Phone,
  MapPin,

} from "lucide-react";

/* ---------------------------------------------------------
   Student-facing homepage: awareness and application carry
   equal weight throughout, not application-first marketing.
   Lighter, calmer than the booking-side homepage — more
   whitespace, soft shadows instead of glass, animation used
   sparingly so nothing competes with deadline/eligibility info.
--------------------------------------------------------- */

const THEMES = {
  light: {
    bg: "#FFFFFF",
    bgAlt: "#F6F9FD",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5FB",
    border: "#E4E9F2",
    text: "#111C34",
    textMuted: "#5A6786",
    accent: "#2560E0",
    accentStrong: "#173F99",
    accentSoft: "#E9F0FE",
    accentGrad: "linear-gradient(135deg,#5B93F5,#2560E0)",
    onAccent: "#FFFFFF",
    navBg: "rgba(255,255,255,0.9)",
    shadow: "0 8px 24px -12px rgba(17,28,52,0.12)",
  },
  dark: {
    bg: "#0E1626",
    bgAlt: "#121B2E",
    surface: "#151F33",
    surfaceAlt: "#1A2439",
    border: "rgba(255,255,255,0.09)",
    text: "#EDF1F9",
    textMuted: "#8FA0C2",
    accent: "#6CA5FF",
    accentStrong: "#3D7BEF",
    accentSoft: "rgba(108,165,255,0.14)",
    accentGrad: "linear-gradient(135deg,#8EC1FF,#3D7BEF)",
    onAccent: "#0E1626",
    navBg: "rgba(14,22,38,0.9)",
    shadow: "0 8px 24px -12px rgba(0,0,0,0.4)",
  },
};

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = ["Home", "About the Program", "How to Apply", "Announcements", "Contact"];

const AT_A_GLANCE = [
  { icon: CalendarClock, label: "Applications close", value: "Aug 31, 2026" },
  { icon: Users, label: "Open to", value: "All enrolled students" },
  { icon: FileCheck2, label: "Decision time", value: "7–10 working days" },
];

const OFFERS = [
  { icon: GraduationCap, title: "Stage & Program Access", body: "Apply to use university-approved stages and spaces for cultural, academic, and student-led events." },
  { icon: BookOpen, title: "Guidance & Resources", body: "Templates, checklists, and past examples so your application says exactly what reviewers need to see." },
  { icon: ClipboardList, title: "Tracked Applications", body: "Follow your application status from submission to decision — no guessing, no chasing emails." },
];

const STEPS = [
  { title: "Check Eligibility", body: "Confirm your program, year, and event type qualify — takes under a minute." },
  { title: "Submit Application", body: "Fill in the form with event details, dates, and supporting documents." },
  { title: "Admin Review", body: "The bureau reviews your request, typically within 7–10 working days." },
  { title: "Confirmation", body: "Get your decision by email, with next steps if approved." },
];

const ANNOUNCEMENTS = [
  { tag: "Deadline", date: "Jul 20, 2026", title: "Fall semester applications now open" },
  { tag: "Recap", date: "Jul 10, 2026", title: "How last term's cultural festival got approved in 5 days" },
  { tag: "Guide", date: "Jun 30, 2026", title: "Common reasons applications get sent back for edits" },
];

const VOICES = [
  { name: "Ayesha, 3rd year", text: "I was sure I'd missed the deadline. The status tracker showed me exactly where my application stood, so I didn't have to keep emailing to check." },
  { name: "Hamza, final year", text: "The checklist caught two documents I would have forgotten. Approval came through in under a week." },
];

const FAQS = [
  { q: "Who can apply?", a: "Any currently enrolled student, individually or on behalf of a registered student society, can submit an application." },
  { q: "How long does review take?", a: "Most applications are reviewed within 7–10 working days. You'll get an email either way, including reasons if changes are needed." },
  { q: "Can I edit my application after submitting?", a: "Yes, as long as it hasn't entered the review stage yet. After that, you'll need to wait for a decision before resubmitting." },
  { q: "Is there a limit on how many times I can apply?", a: "No — you can submit a new application for each event. There's no cap on the number of applications per student." },
];

export default function StudentHomepage() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const t = THEMES[theme];
  const isDark = theme === "light";

  return (
    <div className="min-h-screen w-full transition-colors duration-500" style={{ background: t.bg, color: t.text, fontFamily: "'Inter', ui-sans-serif, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b" style={{ background: t.navBg, borderColor: t.border, backdropFilter: "blur(8px)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.accentGrad }}>
              <GraduationCap size={18} style={{ color: t.onAccent }} />
            </div>
            <span className="font-display text-lg">Stage Bureau</span>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
             <a href="/home">home2</a>
            <a href="/dashboard">dashboard</a>
            <a href="/login">login</a>
            <a href="/register">register</a>
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="text-sm" style={{ color: t.textMuted }}>{l}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: t.border }} aria-label="Toggle theme">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#" className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
              Apply Now
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className="flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: t.border }} aria-label="Toggle theme">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t px-6 py-4 lg:hidden" style={{ borderColor: t.border }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="block py-2 text-sm" style={{ color: t.textMuted }}>{l}</a>
            ))}
            <a href="#" className="mt-2 block rounded-full px-5 py-2.5 text-center text-sm font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
              Apply Now
            </a>
          </div>
        )}
      </header>

      {/* HERO — two equal paths */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: t.accent }}>Sindh University Art Programs Bureau</p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Book stages for your events — and understand exactly how the process works.
          </h1>
          <p className="mt-5 max-w-xl text-base" style={{ color: t.textMuted }}>
            Whether you're ready to apply or just want to see what's involved, this is built for both — clear steps, honest timelines, no guesswork.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold sm:flex-none"
              style={{ background: t.accentGrad, color: t.onAccent, boxShadow: t.shadow }}
            >
              Apply Now <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border px-6 py-4 text-sm font-semibold sm:flex-none"
              style={{ borderColor: t.border, color: t.text }}
            >
              Learn How It Works
            </a>
          </div>
        </Reveal>

        {/* AT-A-GLANCE */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-4 rounded-2xl border p-5 sm:grid-cols-3" style={{ background: t.surfaceAlt, borderColor: t.border }}>
            {AT_A_GLANCE.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: t.accentSoft }}>
                  <item.icon size={18} style={{ color: t.accent }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: t.textMuted }}>{item.label}</p>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* WHAT THE PROGRAM OFFERS — awareness */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-3xl">What the Program Offers</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {OFFERS.map((o, i) => (
            <Reveal key={o.title} delay={i * 90}>
              <div className="h-full rounded-2xl border p-6" style={{ background: t.surface, borderColor: t.border, boxShadow: t.shadow }}>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: t.accentSoft }}>
                  <o.icon size={19} style={{ color: t.accent }} />
                </div>
                <h3 className="font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm" style={{ color: t.textMuted }}>{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW TO APPLY — application */}
      <section className="py-16" style={{ background: t.bgAlt }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl">How to Apply</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative">
                  <div className="font-display flex h-9 w-9 items-center justify-center rounded-full border text-sm" style={{ borderColor: t.accent, color: t.accent }}>
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm" style={{ color: t.textMuted }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <a href="#" className="mt-10 inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
              Start Your Application <Send size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ANNOUNCEMENTS — ongoing awareness */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl">Announcements</h2>
            <a href="#" className="text-sm font-semibold" style={{ color: t.accent }}>View all</a>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ANNOUNCEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 90}>
              <div className="h-full rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border, boxShadow: t.shadow }}>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full px-2 py-1 font-semibold" style={{ background: t.accentSoft, color: t.accent }}>{a.tag}</span>
                  <span style={{ color: t.textMuted }}>{a.date}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{a.title}</h3>
                <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: t.accent }}>
                  Read more <ArrowRight size={13} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STUDENT VOICES */}
      <section className="py-16" style={{ background: t.bgAlt }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl">Student Voices</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {VOICES.map((v, i) => (
              <Reveal key={v.name} delay={i * 100}>
                <div className="h-full rounded-2xl border p-6" style={{ background: t.surface, borderColor: t.border, boxShadow: t.shadow }}>
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} style={{ color: t.accent }} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: t.text }}>"{v.text}"</p>
                  <p className="mt-4 text-sm font-semibold" style={{ color: t.textMuted }}>{v.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-center text-3xl">Frequently Asked Questions</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="rounded-2xl border" style={{ background: t.surface, borderColor: t.border }}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold"
                  >
                    {f.q}
                    {open ? <ChevronUp size={16} style={{ color: t.accent }} /> : <ChevronDown size={16} style={{ color: t.textMuted }} />}
                  </button>
                  {open && (
                    <p className="px-5 pb-4 text-sm" style={{ color: t.textMuted }}>{f.a}</p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="rounded-2xl border p-10 text-center" style={{ background: t.accentSoft, borderColor: t.border }}>
            <ShieldCheck size={28} style={{ color: t.accent }} className="mx-auto" />
            <h2 className="font-display mt-4 text-2xl sm:text-3xl">Ready when you are.</h2>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: t.textMuted }}>
              Applications take about 10 minutes. You can save and come back if you need to.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
              Apply Now <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: t.border }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-display text-base">About</h4>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li>About the Bureau</li><li>Eligibility</li><li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base">Apply</h4>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li>Start Application</li><li>Check Status</li><li>Guidelines</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li className="flex items-center gap-2"><Phone size={13} /> +92 22 000 0000</li>
              <li className="flex items-center gap-2"><Mail size={13} /> apply@stagebureau.edu</li>
              <li className="flex items-center gap-2"><MapPin size={13} /> Hyderabad, Sindh</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base">Follow</h4>
            <div className="mt-3 flex gap-3">
              {/* <Facebook size={17} style={{ color: t.textMuted }} />
              <Instagram size={17} style={{ color: t.textMuted }} />
              <Youtube size={17} style={{ color: t.textMuted }} /> */}
            </div>
          </div>
        </div>
        <div className="border-t py-5 text-center text-xs" style={{ borderColor: t.border, color: t.textMuted }}>
          © 2026 Sindh University Art Programs Bureau. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}