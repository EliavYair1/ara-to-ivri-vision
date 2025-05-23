
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 container py-6">{children}</main>
        <footer className="border-t py-4">
          <div className="container text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} חכמת הלשון - Language Wisdom</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}
