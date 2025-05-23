
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type Language = "hebrew" | "english";
type Direction = "rtl" | "ltr";

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: Direction;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      
      // Check for system preference if no saved theme
      if (!savedTheme) {
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches 
          ? "dark" 
          : "light";
        return systemPreference;
      }
      
      return savedTheme;
    }
    return "light";
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      return savedLanguage || "hebrew";
    }
    return "hebrew";
  });

  const [direction, setDirection] = useState<Direction>("rtl");

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Save theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Set direction based on language
    setDirection(language === "hebrew" ? "rtl" : "ltr");
    
    // Save language to localStorage
    localStorage.setItem("language", language);
    
    // Set direction attribute on html element
    document.documentElement.dir = language === "hebrew" ? "rtl" : "ltr";
  }, [language]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AppContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      language, 
      setLanguage, 
      direction 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
