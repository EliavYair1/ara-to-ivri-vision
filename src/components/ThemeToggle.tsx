
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  
  return (
    <Button
      variant="ghost"
      size={isMobile ? "icon" : "default"}
      onClick={toggleTheme}
      className="transition-all duration-200"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          {!isMobile && <span className="ml-2">לילה</span>}
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          {!isMobile && <span className="ml-2">יום</span>}
        </>
      )}
    </Button>
  );
}
