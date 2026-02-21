import { Button } from "@/components/ui/button";

const searches = [
  "quran online read",
  "read quran online",
  "quran with urdu translation",
  "listen quran online",
  "quran audio download",
  "quran tafseer urdu",
  "surah yasin read online",
  "surah rahman with urdu translation",
  "surah kahf friday read",
  "surah mulk read before sleep",
  "surah waqiah with urdu tarjuma",
  "ayat ul kursi urdu translation",
];

const PopularSearches = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Popular Quran Searches</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These are common search intents for Quran online reading, Urdu translation, tilawat audio, ayah tafseer, and daily surah recitation.
        </p>
        <div className="flex flex-wrap gap-2">
          {searches.map((search) => (
            <Button key={search} variant="tag" size="sm">
              {search}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
