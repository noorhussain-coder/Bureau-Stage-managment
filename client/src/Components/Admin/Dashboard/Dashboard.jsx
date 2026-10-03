import React, { useState } from "react";
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

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/* ---------------------------------------------------------
   Bureau Stage — Admin Dashboard. Same theme system as the
   public homepage (blue/white, light + dark), but the beam
   motif is dialed back to a quiet accent strip — a working
   tool reads calm and dense, not like a marketing page.
--------------------------------------------------------- */

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

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true ,link:"/dashboard"},
  { icon: FileText, label: "Applications",link:"application" },
  { icon: CalendarDays, label: "Calendar" ,link:"calender"},
  { icon: Mail, label: "Emails",link:"/dashboard/create-email" },
  { icon: Newspaper, label: "Blog & Reports",link:"/dashboard/create-blog" },
  { icon: Settings, label: "Settings" ,link:"setting"},
  { icon: Settings, label: "students", link:"student"},
];


export default function AdminDashboard() {
  const [theme, setTheme] = useState("dark");
  const t = THEMES[theme];
  const toneColor = (tone) => t[tone] || t.accent;
  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{ background: t.bg, color: t.text, fontFamily: "'Inter', ui-sans-serif, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin 2.4s linear infinite; }
      `}</style>

      <div className="flex  h-screen overflow-hidden ">
        {/* SIDEBAR */}
     <Navbar/>

        {/* MAIN */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
<Outlet/>
        </main>

      </div>
    </div>
  );
}