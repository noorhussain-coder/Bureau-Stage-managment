import React from 'react'
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Mail,
  Newspaper,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
  Building2,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from 'react';
const SideDashboard = () => {
const THEMES = {
  dark: {
    bg: "#0B1B33",
    bgAlt: "rgba(255,255,255,0.03)",
    surface: "rgba(255,255,255,0.05)",
    surfaceStrong: "rgba(255,255,255,0.08)",
    border: "rgba(255,255,255,0.10)",
    text: "#EDEFF4",
    textMuted: "#93A2BC",
    accent: "#63A4FF",
    accentStrong: "#2F6FE0",
    accentSoft: "rgba(99,164,255,0.16)",
    accentGrad: "linear-gradient(135deg,#8EC1FF,#2F6FE0)",
    navBg: "rgba(11,27,51,0.9)",
    onAccent: "#0B1B33",
    good: "#3DD9A4",
    warn: "#F2B84B",
    bad: "#F3685E",
  },
  light: {
    bg: "#F4F8FC",
    bgAlt: "rgba(11,27,51,0.03)",
    surface: "#FFFFFF",
    surfaceStrong: "rgba(11,27,51,0.05)",
    border: "rgba(11,27,51,0.10)",
    text: "#0E1F3D",
    textMuted: "#54638A",
    accent: "#2560E0",
    accentStrong: "#173F99",
    accentSoft: "rgba(37,96,224,0.10)",
    accentGrad: "linear-gradient(135deg,#5B93F5,#2560E0)",
    navBg: "rgba(244,248,252,0.9)",
    onAccent: "#FFFFFF",
    good: "#1E9E71",
    warn: "#B9791A",
    bad: "#C6362E",
  },
};
const STATS = [
  { label: "Total Applications", value: "342", delta: "+12 this week" },
  { label: "Approved Bookings", value: "1,204", delta: "+8% vs last month" },
  { label: "Active Stages", value: "42", delta: "3 pending inspection" },
  { label: "Revenue (MTD)", value: "PKR 2.4M", delta: "+15% vs last month" },
];

const CHART_DATA = [
  { month: "Feb", applications: 38, approved: 28 },
  { month: "Mar", applications: 45, approved: 34 },
  { month: "Apr", applications: 52, approved: 39 },
  { month: "May", applications: 49, approved: 41 },
  { month: "Jun", applications: 61, approved: 47 },
  { month: "Jul", applications: 58, approved: 50 },
];

const STATUS_COLUMNS = [
  {
    key: "pending",
    label: "Pending",
    icon: Circle,
    tone: "warn",
    items: ["Youth Convention — Karachi", "Trade Expo — Hyderabad", "School Sports Gala"],
  },
  {
    key: "review",
    label: "Under Review",
    icon: Loader2,
    tone: "accent",
    items: ["Heritage Festival — Larkana", "Corporate Product Launch"],
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle2,
    tone: "good",
    items: ["Provincial Trade Exhibition", "District Awards Night", "Public Health Seminar"],
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: XCircle,
    tone: "bad",
    items: ["Unlicensed Rally Request"],
  },
];

const UPCOMING = [
  { title: "Trade Exhibition Setup", date: "Jul 28", time: "9:00 AM", loc: "Hyderabad Fairgrounds" },
  { title: "Heritage Festival Review", date: "Jul 29", time: "2:30 PM", loc: "Admin Office" },
  { title: "Youth Convention", date: "Aug 14", time: "10:00 AM", loc: "Karachi Expo Grounds" },
];

const ACTIVITY = [
  { text: "Application #A-2291 approved", who: "S. Memon", time: "12m ago" },
  { text: "Blog post published: \"Staging a 3,000-seat rally\"", who: "Admin", time: "1h ago" },
  { text: "Email broadcast sent to 214 applicants", who: "Admin", time: "3h ago" },
  { text: "New application submitted: Corporate Product Launch", who: "System", time: "5h ago" },
];
 const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = THEMES[theme];
  const isDark = theme === "dark";

  const toneColor = (tone) => t[tone] || t.accent;
function StatCard({ t, stat }) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border }}>
      <p className="text-sm" style={{ color: t.textMuted }}>{stat.label}</p>
      <p className="font-display mt-2 text-3xl" style={{ color: t.text }}>{stat.value}</p>
      <p className="mt-2 flex items-center gap-1 text-xs" style={{ color: t.accent }}>
        <ArrowUpRight size={12} /> {stat.delta}
      </p>
    </div>
  );
}


  return (
    <div>        <div className="min-w-0 flex-1">
          {/* TOPBAR */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b px-6 py-4" style={{ background: t.navBg, borderColor: t.border, backdropFilter: "blur(10px)" }}>
            <div className="flex items-center gap-3">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                <Menu size={20} />
              </button>
              <div>
                <h1 className="font-display text-xl">Dashboard</h1>
                <p className="text-xs" style={{ color: t.textMuted }}>Overview of applications, bookings, and stage activity</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex" style={{ borderColor: t.border }}>
                <Search size={14} style={{ color: t.textMuted }} />
                <input
                  placeholder="Search applications..."
                  className="w-40 bg-transparent text-sm outline-none placeholder:opacity-60"
                  style={{ color: t.text }}
                />
              </div>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: t.border }} aria-label="Notifications">
                <Bell size={16} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full" style={{ background: t.bad }} />
              </button>
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-full border"
                style={{ borderColor: t.border }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </header>

          <main className="space-y-8 px-6 py-8">
            {/* STATS */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <StatCard key={s.label} t={t} stat={s} />
              ))}
            </div>

            {/* CHART + UPCOMING */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border p-5 lg:col-span-2" style={{ background: t.surface, borderColor: t.border }}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg">Applications & Approvals</h2>
                    <p className="text-xs" style={{ color: t.textMuted }}>Last 6 months</p>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: t.accent }} /> Applications</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: t.good }} /> Approved</span>
                  </div>
                </div>
                <div style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_DATA} margin={{ left: -20, right: 10, top: 10 }}>
                      <defs>
                        <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={t.accent} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={t.accent} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="apprGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={t.good} stopOpacity={0.35} />
                          <stop offset="100%" stopColor={t.good} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.border} vertical={false} />
                      <XAxis dataKey="month" stroke={t.textMuted} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke={t.textMuted} fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, fontSize: 12 }}
                      />
                      <Area type="monotone" dataKey="applications" stroke={t.accent} strokeWidth={2} fill="url(#appGrad)" />
                      <Area type="monotone" dataKey="approved" stroke={t.good} strokeWidth={2} fill="url(#apprGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg">Upcoming</h2>
                  <a href="#" className="text-xs font-semibold" style={{ color: t.accent }}>View calendar</a>
                </div>
                <div className="space-y-4">
                  {UPCOMING.map((e) => (
                    <div key={e.title} className="flex gap-3 rounded-xl p-3" style={{ background: t.surfaceStrong }}>
                      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg text-xs font-semibold" style={{ background: t.accentSoft, color: t.accent }}>
                        {e.date}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{e.title}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs" style={{ color: t.textMuted }}>
                          <Clock size={11} /> {e.time}
                        </p>
                        <p className="flex items-center gap-1 text-xs" style={{ color: t.textMuted }}>
                          <MapPin size={11} /> {e.loc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STATUS BOARD + ACTIVITY */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border p-5 lg:col-span-2" style={{ background: t.surface, borderColor: t.border }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg">Applications by Status</h2>
                  <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
                    <Plus size={13} /> New Application
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {STATUS_COLUMNS.map((col) => (
                    <div key={col.key} className="rounded-xl border p-3" style={{ borderColor: t.border }}>
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold" style={{ color: toneColor(col.tone) }}>
                        <col.icon size={14} className={col.key === "review" ? "spin-slow" : ""} />
                        {col.label} · {col.items.length}
                      </div>
                      <div className="space-y-2">
                        {col.items.map((item) => (
                          <div key={item} className="rounded-lg p-2.5 text-xs" style={{ background: t.surfaceStrong, color: t.text }}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border p-5" style={{ background: t.surface, borderColor: t.border }}>
                <h2 className="font-display mb-4 text-lg">Recent Activity</h2>
                <div className="space-y-4">
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.accent }} />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug">{a.text}</p>
                        <p className="mt-0.5 text-xs" style={{ color: t.textMuted }}>{a.who} · {a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div></div>
  )
}

export default SideDashboard