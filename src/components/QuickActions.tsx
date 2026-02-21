import { BookOpen, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: BookOpen,
    title: "Last Read",
    description: "No last read found yet.",
    cta: "Start Reading",
  },
  {
    icon: Heart,
    title: "Favorite Surah",
    description: "Mark a surah as favorite to access quickly.",
    cta: "Pick Favorite",
  },
  {
    icon: Bookmark,
    title: "Latest Bookmark",
    description: "Save bookmarks from Quran reader.",
    cta: "Create Bookmark",
  },
];

const QuickActions = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Quick Quran Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <div
              key={action.title}
              className="rounded-xl p-6 bg-card border border-border transition-shadow hover:shadow-md"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <action.icon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
              <Button variant="outline" className="w-full">
                {action.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
