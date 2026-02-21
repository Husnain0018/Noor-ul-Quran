import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FavoriteSurah {
  id: string;
  surah_number: number;
  surah_name: string;
  surah_english_name: string;
  surah_english_translation: string;
}

export const useFavoriteSurahs = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteSurah[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("favorite_surahs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setFavorites(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (surahNumber: number, surahName: string, englishName: string, englishTranslation: string) => {
    if (!user) return;
    const existing = favorites.find((f) => f.surah_number === surahNumber);
    if (existing) {
      await supabase.from("favorite_surahs").delete().eq("id", existing.id);
      setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
    } else {
      const { data } = await supabase
        .from("favorite_surahs")
        .insert({
          user_id: user.id,
          surah_number: surahNumber,
          surah_name: surahName,
          surah_english_name: englishName,
          surah_english_translation: englishTranslation,
        })
        .select()
        .single();
      if (data) setFavorites((prev) => [data, ...prev]);
    }
  };

  const isFavorite = (surahNumber: number) => favorites.some((f) => f.surah_number === surahNumber);

  return { favorites, loading, toggleFavorite, isFavorite };
};
