"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null); // Start with null

  useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") as Theme | null : null; // Get stored theme
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme); // Set the theme class immediately
    } else {
      setTheme("light"); // Set a default theme if none is stored
      document.documentElement.classList.add("light"); // Set a default class if no theme is stored
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme); // Update localStorage here
      }
    }
  }, [theme]);

  if (theme === null) return null; // Prevent rendering until theme is determined

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Update localStorage here
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
