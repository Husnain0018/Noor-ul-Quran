import { ExternalLink } from "lucide-react";

const popularSurahs = [
  { name: "Surah Yaseen", number: 36 },
  { name: "Surah Rahman", number: 55 },
  { name: "Surah Kahf", number: 18 },
  { name: "Surah Mulk", number: 67 },
  { name: "Surah Waqiah", number: 56 },
  { name: "Surah Fatiha", number: 1 },
];

const ayahLinks = [
  { title: "Ayat ul Kursi (2:255)", label: "Open Ayah" },
  { title: "Last 2 Ayat of Baqarah (2:285-286)", label: "Open Ayah" },
  { title: "3 Qul (Ikhlas, Falaq, Naas)", label: "Open Ayah" },
];

const QuickLinks = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Quick Links for High-Intent Queries</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Popular Surahs
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Open surah pages with Arabic text, Urdu/English translation, audio, and tafseer actions.
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSurahs.map((surah) => (
              <a
                key={surah.number}
                href="#"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:bg-secondary transition-colors"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                {surah.name}
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Ayah & Tafseer Access
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Direct entry points for Ayat ul Kursi, last ayahs, and tafseer pages.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {ayahLinks.map((link) => (
              <div
                key={link.title}
                className="rounded-xl p-4 bg-card border border-border flex items-center justify-between"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <span className="text-sm font-medium text-foreground">{link.title}</span>
                <a
                  href="#"
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
