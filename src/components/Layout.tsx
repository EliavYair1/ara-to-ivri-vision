
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // INTEGRATION POINT: Server Connection Check
    // Replace with actual server connection status check
    // Example: const status = await checkServerConnection();
    const checkServerConnection = async () => {
      try {
        // Simulate server connection check
        await new Promise(resolve => setTimeout(resolve, 1500));
        setServerConnected(true);
        toast({
          title: "שרת מחובר",
          description: "התחברות לשרת הצליחה",
          variant: "default",
        });
      } catch (error) {
        setServerConnected(false);
        toast({
          title: "שרת מנותק",
          description: "לא ניתן להתחבר לשרת, פונקציונליות מלאה לא זמינה",
          variant: "destructive",
        });
      }
    };
    
    checkServerConnection();
    
    // Set up periodic connection check
    const intervalId = setInterval(checkServerConnection, 60000); // Every minute
    
    return () => clearInterval(intervalId);
  }, [toast]);
  
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 container py-6">{children}</main>
        <footer className="border-t py-4">
          <div className="container flex justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} חכמת הלשון - Language Wisdom</p>
            <div className="flex items-center gap-2">
              {serverConnected === true && (
                <div className="flex items-center text-green-500">
                  <Wifi className="h-4 w-4 mr-1" />
                  <span className="text-xs">שרת מחובר</span>
                </div>
              )}
              {serverConnected === false && (
                <div className="flex items-center text-destructive">
                  <WifiOff className="h-4 w-4 mr-1" />
                  <span className="text-xs">שרת מנותק</span>
                </div>
              )}
              {serverConnected === null && (
                <div className="flex items-center text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse mr-1"></div>
                  <span className="text-xs">בודק חיבור</span>
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
