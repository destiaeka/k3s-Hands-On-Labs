import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Green Reads
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
