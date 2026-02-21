import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLastReading } from "@/hooks/useLastReading";
import { useFavoriteSurahs } from "@/hooks/useFavoriteSurahs";

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
}

interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

type Lang = "en" | "ur";

const SurahReader = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [arabicAyahs, setArabicAyahs] = useState<Ayah[]>([]);
  const [englishAyahs, setEnglishAyahs] = useState<Ayah[]>([]);
  const [urduAyahs, setUrduAyahs] = useState<Ayah[]>([]);
  const [meta, setMeta] = useState<SurahMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("en");
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const { user } = useAuth();
  const { saveLastReading } = useLastReading();
  const { isFavorite, toggleFavorite } = useFavoriteSurahs();

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchArabic = fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`).then((r) => r.json());
    const fetchEnglish = fetch(`https://api.alquran.cloud/v1/surah/${id}/en.asad`).then((r) => r.json());
    const fetchUrdu = fetch(`https://api.alquran.cloud/v1/surah/${id}/ur.jalandhry`).then((r) => r.json());

    Promise.all([fetchArabic, fetchEnglish, fetchUrdu])
      .then(([arData, enData, urData]) => {
        setMeta(arData.data);
        setArabicAyahs(arData.data.ayahs);
        setEnglishAyahs(enData.data.ayahs);
        setUrduAyahs(urData.data.ayahs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Scroll to ayah from URL param
  useEffect(() => {
    if (loading) return;
    const ayahNum = searchParams.get("ayah");
    if (ayahNum) {
      const num = parseInt(ayahNum);
      setTimeout(() => {
        ayahRefs.current[num]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [loading, searchParams]);

  // Track reading on scroll
  const handleAyahVisible = useCallback(
    (ayah: Ayah) => {
      if (user && meta) {
        saveLastReading(meta.number, meta.name, meta.englishName, ayah.numberInSurah);
      }
    },
    [user, meta, saveLastReading]
  );

  // Use IntersectionObserver to track reading
  useEffect(() => {
    if (loading || !meta || !user) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ayahNum = parseInt(entry.target.getAttribute("data-ayah") || "0");
            if (ayahNum > 0) {
              const ayah = arabicAyahs.find((a) => a.numberInSurah === ayahNum);
              if (ayah) handleAyahVisible(ayah);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(ayahRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading, meta, user, arabicAyahs, handleAyahVisible]);

  const playAudio = (ayah: Ayah) => {
    if (playingAyah === ayah.numberInSurah) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(ayah.audio);
    audio.onended = () => setPlayingAyah(null);
    audio.play();
    audioRef.current = audio;
    setPlayingAyah(ayah.numberInSurah);
  };

  const playAll = () => {
    if (arabicAyahs.length === 0) return;
    let index = 0;
    const playNext = () => {
      if (index >= arabicAyahs.length) { setPlayingAyah(null); return; }
      const ayah = arabicAyahs[index];
      setPlayingAyah(ayah.numberInSurah);
      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      audio.onended = () => { index++; playNext(); };
      audio.play();
    };
    if (audioRef.current) audioRef.current.pause();
    playNext();
  };

  const stopAll = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlayingAyah(null);
  };

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, [id]);

  const translationAyahs = lang === "en" ? englishAyahs : urduAyahs;
  const surahIsFav = meta ? isFavorite(meta.number) : false;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/quran">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            {meta && (
              <div>
                <h2 className="font-semibold text-foreground text-sm leading-tight">{meta.englishName}</h2>
                <p className="text-xs text-muted-foreground">{meta.englishNameTranslation} · {meta.numberOfAyahs} Ayahs</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {user && meta && (
              <button
                onClick={() => toggleFavorite(meta.number, meta.name, meta.englishName, meta.englishNameTranslation)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  surahIsFav ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                aria-label={surahIsFav ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-4 h-4 ${surahIsFav ? "fill-current" : ""}`} />
              </button>
            )}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >English</button>
              <button
                onClick={() => setLang("ur")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  lang === "ur" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >اردو</button>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={playingAyah !== null ? stopAll : playAll}>
              {playingAyah !== null ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {playingAyah !== null ? "Stop" : "Play All"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-xl p-6 bg-card border border-border animate-pulse h-32" />
            ))}
          </div>
        ) : (
          <>
            {meta && meta.number !== 9 && meta.number !== 1 && (
              <div className="text-center py-6 mb-6">
                <p className="text-2xl md:text-3xl text-foreground leading-loose" style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }} dir="rtl">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
                <p className="text-sm text-muted-foreground mt-2">In the name of Allah, the Most Gracious, the Most Merciful</p>
              </div>
            )}

            <div className="space-y-4">
              {arabicAyahs.map((ayah, idx) => (
                <div
                  key={ayah.numberInSurah}
                  ref={(el) => { ayahRefs.current[ayah.numberInSurah] = el; }}
                  data-ayah={ayah.numberInSurah}
                  className={`rounded-xl p-5 border transition-all ${
                    playingAyah === ayah.numberInSurah
                      ? "bg-primary/5 border-primary/30 shadow-md"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {ayah.numberInSurah}
                    </span>
                    <button
                      onClick={() => playAudio(ayah)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        playingAyah === ayah.numberInSurah
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={playingAyah === ayah.numberInSurah ? "Pause" : "Play"}
                    >
                      {playingAyah === ayah.numberInSurah ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <p className="text-xl md:text-2xl text-foreground leading-[2.2] mb-4 text-right" dir="rtl"
                    style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}>{ayah.text}</p>

                  {translationAyahs[idx] && (
                    <div className="border-t border-border pt-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Globe className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          {lang === "en" ? "English" : "Urdu"} Translation
                        </span>
                      </div>
                      <p className={`text-sm text-muted-foreground leading-relaxed ${lang === "ur" ? "text-right" : ""}`}
                        dir={lang === "ur" ? "rtl" : "ltr"}
                        style={lang === "ur" ? { fontFamily: "'Noto Nastaliq Urdu', serif" } : undefined}>
                        {translationAyahs[idx].text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {meta && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                {meta.number > 1 ? (
                  <Link to={`/quran/${meta.number - 1}`}>
                    <Button variant="outline" className="gap-1.5"><ArrowLeft className="w-4 h-4" /> Previous Surah</Button>
                  </Link>
                ) : <div />}
                {meta.number < 114 ? (
                  <Link to={`/quran/${meta.number + 1}`}>
                    <Button variant="outline" className="gap-1.5">Next Surah <ArrowLeft className="w-4 h-4 rotate-180" /></Button>
                  </Link>
                ) : <div />}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SurahReader;
