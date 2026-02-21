import { BookOpen, Home, Info, Settings, LogIn, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Quran", icon: BookOpen },
  { label: "About", icon: Info },
  { label: "Admin", icon: Settings },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Al-Quran
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                item.active
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="heroOutline" size="sm" className="gap-1.5">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
