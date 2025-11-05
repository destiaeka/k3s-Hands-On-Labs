import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import { Loader2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  short_description: string;
}

const Index = () => {
  const { data: books = [], isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, author, cover_url, rating, short_description")
        .order("rating", { ascending: false });

      if (error) throw error;
      return data as Book[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center space-y-2 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Koleksi Buku Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan buku favorit Anda dan pinjam dengan mudah. Jelajahi koleksi kami yang penuh dengan cerita menarik.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">Gagal memuat buku. Silakan refresh halaman.</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Belum ada buku tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-scale-in">
            {books.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Green Reads. Semua hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default Index;
