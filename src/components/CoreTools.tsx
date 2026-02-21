import { Headphones, Languages, GraduationCap } from "lucide-react";

const tools = [
  {
    icon: Headphones,
    title: "Recitation Audio",
    description: "Play/Pause, range seek, voice selection, and ayah highlight with scrolling.",
  },
  {
    icon: Languages,
    title: "Translation & Tafseer",
    description: "Urdu translation toggle and ayah-wise tafseer panel inside the Quran reader.",
  },
  {
    icon: GraduationCap,
    title: "Learning Flow",
    description: "Resume markers, bookmark list, and session continuity for better daily routine.",
  },
];

const CoreTools = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Core Quran Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-xl p-6 bg-card border border-border"
              style={{ boxShadow: "var(--card-shadow)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <tool.icon className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  {tool.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTools;
