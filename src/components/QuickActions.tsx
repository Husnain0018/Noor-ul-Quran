import { BookOpen, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLastReading } from "@/hooks/useLastReading";
import { useFavoriteSurahs } from "@/hooks/useFavoriteSurahs";

const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lastReading } = useLastReading();
  const { favorites } = useFavoriteSurahs();

  const handleLastRead = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (lastReading) {
      navigate(`/quran/${lastReading.surah_number}?ayah=${lastReading.ayah_number}`);
    } else {
      navigate("/quran");
    }
  };

  const handleFavorite = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (favorites.length > 0) {
      navigate(`/quran/${favorites[0].surah_number}`);
    } else {
      navigate("/quran");
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Quick Quran Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Last Read */}
          <div className="rounded-xl p-6 bg-card border border-border transition-shadow hover:shadow-md" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Last Read</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {lastReading
                ? `${lastReading.surah_english_name} · Ayah ${lastReading.ayah_number}`
                : user ? "No last read found yet." : "Sign in to track your reading."}
            </p>
            <Button variant="outline" className="w-full" onClick={handleLastRead}>
              {lastReading ? "Continue Reading" : user ? "Start Reading" : "Sign In to Start"}
            </Button>
          </div>

          {/* Favorite Surah */}
          <div className="rounded-xl p-6 bg-card border border-border transition-shadow hover:shadow-md" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Favorite Surah</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {favorites.length > 0
                ? `${favorites[0].surah_english_name} (${favorites.length} total)`
                : user ? "Mark a surah as favorite to access quickly." : "Sign in to save favorites."}
            </p>
            <Button variant="outline" className="w-full" onClick={handleFavorite}>
              {favorites.length > 0 ? "Open Favorite" : user ? "Pick Favorite" : "Sign In"}
            </Button>
          </div>

          {/* Bookmark */}
          <div className="rounded-xl p-6 bg-card border border-border transition-shadow hover:shadow-md" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Latest Bookmark</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Save bookmarks from Quran reader.</p>
            <Button variant="outline" className="w-full" onClick={() => navigate("/quran")}>
              Open Quran
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
