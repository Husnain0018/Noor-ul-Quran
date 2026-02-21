import { ArrowRight, Settings, ChevronRight, BookOpen, Star, Bookmark, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: BookOpen, label: "Surahs", value: "114" },
  { icon: Star, label: "Favorites", value: "0" },
  { icon: Bookmark, label: "Bookmarks", value: "0" },
  { icon: Headphones, label: "Audio", value: "Ready" },
];

const HeroSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl p-8 md:p-12" style={{ background: "var(--hero-gradient)" }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border mb-6"
            style={{ borderColor: "var(--badge-border)", background: "var(--badge-bg)", color: "hsl(var(--primary))" }}>
            <BookOpen className="w-3 h-3" />
            Quran First
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl leading-tight">
            Read Quran with focus, resume fast, and stay consistent.
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8">
            Start recitation quickly, continue from your last ayah, and keep your favorite surahs and bookmarks organized in one place.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="hero" size="lg" className="gap-2">
              Open Quran <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="heroOutline" size="lg" className="gap-2">
              <Settings className="w-4 h-4" /> Quran Settings
            </Button>
            <Button variant="heroOutline" size="lg" className="gap-2">
              Read Quran Online <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 bg-card border border-border"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
                  <stat.icon className="w-3.5 h-3.5" />
                  {stat.label}
                </div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
