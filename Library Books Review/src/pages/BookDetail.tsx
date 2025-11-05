import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import CommentSection from "@/components/CommentSection";
import BorrowForm from "@/components/BorrowForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Loader2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  description: string;
  short_description: string;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Book;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-destructive mb-4">Buku tidak ditemukan.</p>
          <Link to="/">
            <Button variant="outline" className="border-border">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6 border-border hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        <div className="grid md:grid-cols-[350px_1fr] gap-8 mb-12 animate-fade-in">
          {/* Cover Section */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-sm">
              <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
                <img
                  src={book.cover_url}
                  alt={`Cover buku ${book.title}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">oleh {book.author}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{book.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <h2 className="text-lg font-serif font-semibold text-foreground mb-2">Deskripsi</h2>
                <p className="text-foreground/80 leading-relaxed">{book.description}</p>
              </div>
            </div>

            <BorrowForm bookId={book.id} bookTitle={book.title} />
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-3xl animate-fade-in">
          <CommentSection bookId={book.id} />
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Green Reads. Semua hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default BookDetail;
