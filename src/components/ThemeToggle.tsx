
import { Moon, Sun } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={isMobile ? "icon" : "default"}
            className="transition-all duration-200"
          >
            <Languages className="h-5 w-5" />
            {!isMobile && <span className="mx-2">{language === "hebrew" ? "שפה" : "Language"}</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border-border shadow-lg">
          <DropdownMenuItem onClick={() => setLanguage("hebrew")} className="cursor-pointer">
            <span className={language === "hebrew" ? "font-bold" : ""}>עברית</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("english")} className="cursor-pointer">
            <span className={language === "english" ? "font-bold" : ""}>English</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="ghost"
        size={isMobile ? "icon" : "default"}
        onClick={toggleTheme}
        className="transition-all duration-200"
      >
        {theme === "light" ? (
          <>
            <Moon className="h-5 w-5" />
            {!isMobile && <span className="mx-2">{language === "hebrew" ? "לילה" : "Dark"}</span>}
          </>
        ) : (
          <>
            <Sun className="h-5 w-5" />
            {!isMobile && <span className="mx-2">{language === "hebrew" ? "יום" : "Light"}</span>}
          </>
        )}
      </Button>
    </div>
  );
}
