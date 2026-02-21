import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LastReading {
  surah_number: number;
  surah_name: string;
  surah_english_name: string;
  ayah_number: number;
  updated_at: string;
}

export const useLastReading = () => {
  const { user } = useAuth();
  const [lastReading, setLastReading] = useState<LastReading | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLastReading(null);
      setLoading(false);
      return;
    }
    supabase
      .from("last_reading")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        setLastReading(data);
        setLoading(false);
      });
  }, [user]);

  const saveLastReading = async (surahNumber: number, surahName: string, surahEnglishName: string, ayahNumber: number) => {
    if (!user) return;
    const { data: existing } = await supabase
      .from("last_reading")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("last_reading")
        .update({
          surah_number: surahNumber,
          surah_name: surahName,
          surah_english_name: surahEnglishName,
          ayah_number: ayahNumber,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    } else {
      await supabase.from("last_reading").insert({
        user_id: user.id,
        surah_number: surahNumber,
        surah_name: surahName,
        surah_english_name: surahEnglishName,
        ayah_number: ayahNumber,
      });
    }
    setLastReading({
      surah_number: surahNumber,
      surah_name: surahName,
      surah_english_name: surahEnglishName,
      ayah_number: ayahNumber,
      updated_at: new Date().toISOString(),
    });
  };

  return { lastReading, loading, saveLastReading };
};
