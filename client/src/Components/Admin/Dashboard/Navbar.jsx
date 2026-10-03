import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Mail,
  Newspaper,
  Settings,

  X,

  Building2,
} from "lucide-react";

const Navbar = () => {
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
  { icon: FileText, label: "Applications",link:"/dashboard/application" },
  { icon: CalendarDays, label: "Calendar" ,link:"/dashboard/calendar"},
  { icon: Mail, label: "Emails",link:"/dashboard/create-email" },
  { icon: Newspaper, label: "Blog & Reports",link:"/dashboard/create-blog" },
  { icon: Settings, label: "Settings" ,link:"/dashboard/setting"},
  { icon: Settings, label: "announcement" ,link:"/dashboard/announcement"},
  { icon: Settings, label: "create-stage" ,link:"/dashboard/create-stage"},

 
];


     const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const t = THEMES[theme];
  const isDark = theme === "dark";

  const toneColor = (tone) => t[tone] || t.accent;
  return (
    <div className=" h-screen overflow-hidden flex"  >

            <aside
          className={`fixed    inset-y-0 left-0 z-40 w-64 shrink-0 border-r transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ background: t.navBg, borderColor: t.border, backdropFilter: "blur(10px)" }}
        >
          <div  className="  flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.accentGrad }}>
                <Building2 size={18} style={{ color: t.onAccent }} />
              </div>
            <a href="/">  <span className="font-display text-lg">Bureau Stage</span></a>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

  
            <nav className="mt-4 space-y-1 px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition"
                style={{
                  background: item.active ? t.accentSoft : "transparent",
                  color: item.active ? t.accent : t.textMuted,
                  fontWeight: item.active ? 600 : 500,
                }}
              >
                {item.active && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full" style={{ background: t.accentGrad }} />
                )}
                <item.icon size={17} />
                {item.label}
              </a>
            ))}
          </nav>


          <div className="   absolute bottom-0 left-0 right-0 border-t px-6 py-4" style={{ borderColor: t.border }}>
            <div className="relative flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm" style={{ background: t.accentGrad, color: t.onAccent }}>
                A
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs" style={{ color: t.textMuted }}>Bureau Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
    </div>
  )
}

export default Navbar