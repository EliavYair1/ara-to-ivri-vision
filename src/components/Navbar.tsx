
import { Book, Search, ImagePlus } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("translation");
  const isMobile = useIsMobile();

  const tabs = [
    {
      id: "translation",
      label: "תרגום",
      icon: <Book className="h-5 w-5" />,
    },
    {
      id: "search",
      label: "חיפוש",
      icon: <Search className="h-5 w-5" />,
    },
    {
      id: "image",
      label: "תרגום תמונה",
      icon: <ImagePlus className="h-5 w-5" />,
      disabled: true,
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold tracking-tight">תלמוד סייע</h1>
        </div>
        <ThemeToggle />
      </div>

      <nav className="container pb-2">
        <div className="flex space-x-1 rtl:space-x-reverse">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`flex items-center ${tab.disabled ? "opacity-50" : ""}`}
            >
              {tab.icon}
              {(!isMobile || (isMobile && activeTab === tab.id)) && (
                <span className="mr-2 hebrew-text">{tab.label}</span>
              )}
            </Button>
          ))}
        </div>
      </nav>
    </header>
  );
}
