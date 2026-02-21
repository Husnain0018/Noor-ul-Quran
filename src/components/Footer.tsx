import { BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <BookOpen className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Noor-ul-Quran
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Read Quran online with focus and consistency. created by Ali Husnain.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
