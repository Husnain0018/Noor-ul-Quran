import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteSurahs } from "@/hooks/useFavoriteSurahs";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

const QuranPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavoriteSurahs();

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => { setSurahs(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = surahs.filter(
    (s) =>
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
      s.number.toString().includes(search) ||
      s.name.includes(search)
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex h-14 items-center gap-4 px-4">
          <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button></Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Al-Quran</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>The Holy Quran</h1>
        <p className="text-muted-foreground mb-6">Choose a Surah to start reading with Arabic text, translations, and audio.</p>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search surah by name or number..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-xl p-5 bg-card border border-border animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((surah) => (
              <div key={surah.number} className="rounded-xl p-5 bg-card border border-border hover:shadow-md transition-all group relative" style={{ boxShadow: "var(--card-shadow)" }}>
                {user && (
                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite(surah.number, surah.name, surah.englishName, surah.englishNameTranslation); }}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-secondary/80 hover:bg-secondary transition-colors"
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorite(surah.number) ? "text-destructive fill-current" : "text-muted-foreground"}`} />
                  </button>
                )}
                <Link to={`/quran/${surah.number}`}>
                  <div className="flex items-start justify-between pr-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{surah.number}</div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{surah.englishName}</h3>
                        <p className="text-xs text-muted-foreground">{surah.englishNameTranslation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}>{surah.name}</p>
                      <p className="text-xs text-muted-foreground">{surah.numberOfAyahs} Ayahs · {surah.revelationType}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No surahs found matching "{search}"</p>
        )}
      </main>
    </div>
  );
};

export default QuranPage;
