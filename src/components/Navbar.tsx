
import { Book, Search, ImagePlus } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("translation");
  const isMobile = useIsMobile();
  const { language, direction } = useApp();

  // Define tabs with language-specific labels
  const getTabs = () => [
    {
      id: "translation",
      label: language === "hebrew" ? "תרגום" : "Translation",
      icon: <Book className="h-5 w-5" />,
    },
    {
      id: "search",
      label: language === "hebrew" ? "חיפוש" : "Search",
      icon: <Search className="h-5 w-5" />,
    },
    {
      id: "image",
      label: language === "hebrew" ? "תרגום תמונה" : "Image Translation",
      icon: <ImagePlus className="h-5 w-5" />,
      disabled: true,
    },
  ];

  const tabs = getTabs();

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between py-4" dir={direction}>
        <div className={`flex items-center space-x-2 ${direction === "rtl" ? "space-x-reverse" : ""}`}>
          <Book className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {language === "hebrew" ? "חכמת הלשון" : "Language Wisdom"}
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <nav className="container pb-2">
        <div className={`flex space-x-1 ${direction === "rtl" ? "space-x-reverse justify-end" : "justify-start"}`}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`flex items-center ${tab.disabled ? "opacity-50" : ""} ${
                activeTab === tab.id ? "bg-primary text-white" : ""
              }`}
            >
              {tab.icon}
              {(!isMobile || (isMobile && activeTab === tab.id)) && (
                <span className={`mx-2 ${language === "hebrew" ? "hebrew-text" : ""}`}>{tab.label}</span>
              )}
            </Button>
          ))}
        </div>
      </nav>
    </header>
  );
}
