import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

const THEMES = {
  dark: {
    bg: "#0B1B33",
    bgAlt: "#101F3A",
    surface: "#122140",
    surfaceStrong: "#17284A",
    border: "rgba(255,255,255,0.10)",
    text: "#EDEFF4",
    textMuted: "#93A2BC",
    accent: "#63A4FF",
    accentStrong: "#2F6FE0",
    accentSoft: "rgba(99,164,255,0.16)",
    navBg: "#0B1B33",
    onAccent: "#0B1B33",
  },

  light: {
    bg: "#F4F8FC",
    bgAlt: "#EAF1FA",
    surface: "#FFFFFF",
    surfaceStrong: "#EEF3FB",
    border: "rgba(11,27,51,0.10)",
    text: "#0E1F3D",
    textMuted: "#54638A",
    accent: "#2560E0",
    accentStrong: "#173F99",
    accentSoft: "rgba(37,96,224,0.10)",
    navBg: "#F4F8FC",
    onAccent: "#FFFFFF",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        t: THEMES[theme],
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}