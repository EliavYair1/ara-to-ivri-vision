
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 container py-6">{children}</main>
        <footer className="border-t py-4">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} תלמוד סייע - Talmud Assistant</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
