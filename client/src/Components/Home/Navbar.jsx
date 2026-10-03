import React from 'react'
import { useState } from 'react';
import {

  Menu,
  X,
  Building2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from '../Context/ThemeContext';


 const NAV_LINKS = [
  {title:"Home",
    link:"/"

}, 
 {title:"service",
    link:"/service"

}, 
 {title:"About",
    link:"/about"

}, 
 {title:"Events",
    link:"/events"

}, 
 {title:"Blog",
    link:"/blog"

}, 
 {title:"Contact",
    link:"/contact"

}, 
];

const Navbar = () => {
 


   const { t, toggleTheme, isDark  } = useTheme();
const [menuOpen, setMenuOpen]=useState(false)
      const ThemeToggle = ({ className = "" }) => (
        <button
          onClick={toggleTheme}
          className={`flex h-9 w-9 items-center justify-center rounded-full border ${className}`}
          style={{ borderColor: t.border, color: t.text }}
          aria-label="Toggle color theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      );
    return (
    <div>
              {/* NAV */}
              <header className="sticky top-0 z-50 border-b" style={{ background: t.navBg, borderColor: t.border }}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.accent }}>
                      <Building2 size={18} style={{ color: t.onAccent }} />
                    </div>
                    <span className="font-display text-lg tracking-wide"  style={{ color: t.textMuted }}>Bureau Stage</span>
                  </div>
          
                  <nav className="hidden items-center gap-7 lg:flex">
              
                    
                    {NAV_LINKS.map((l,key) => (
                      <a key={key} href={l.link} className="text-sm" style={{ color: t.textMuted }}>
                        {l.title}
                      </a>
                    ))}
                    <a href="/dashboard"className="text-sm" style={{ color: t.textMuted }}>
                    Dashboard</a>
                  </nav>
        
                  <div className="hidden items-center gap-3 lg:flex">
                    <a href="/login" className="text-sm" style={{ color: t.textMuted }}>Login</a>
                    <a href="/register" className="text-sm" style={{ color: t.textMuted }}>Register</a>
                    <a href="/apply" className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: t.accent, color: t.onAccent }}>
                      Book a Stage
                    </a>
                    <ThemeToggle />
                  </div>
        
                  <div className="flex items-center gap-2 lg:hidden">
                    <ThemeToggle />
                    <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
                      {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                  </div>
                </div>
        
                {menuOpen && (
                  <div className="border-t px-6 py-4 lg:hidden" style={{ borderColor: t.border }}>
                    {NAV_LINKS.map((l) => (
                      <a key={l} href={l.link} className="block py-2 text-sm" style={{ color: t.textMuted }}>{l.title}</a>
                    ))}
                    <a href="/apply" className="mt-2 block rounded-full px-4 py-2 text-center text-sm font-semibold" style={{ background: t.accent, color: t.onAccent }}>
                      Book a Stage
                    </a>
                  </div>
                )}
              </header>
    </div>
  )
}

export default Navbar