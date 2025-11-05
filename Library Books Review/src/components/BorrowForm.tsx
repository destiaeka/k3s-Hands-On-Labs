import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CalendarIcon, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface BorrowFormProps {
  bookId: string;
  bookTitle: string;
}

const BorrowForm = ({ bookId, bookTitle }: BorrowFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const { toast } = useToast();

  const borrowMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("borrowings").insert({
        book_id: bookId,
        borrower_name: name.trim(),
        borrower_email: email.trim(),
        borrow_date: date,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setDate("");
      toast({
        title: "Peminjaman berhasil!",
        description: `Anda telah meminjam "${bookTitle}". Silakan ambil di perpustakaan.`,
      });
    },
    onError: () => {
      toast({
        title: "Gagal meminjam buku",
        description: "Silakan coba lagi atau hubungi admin.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !date) {
      toast({
        title: "Lengkapi form",
        description: "Semua field harus diisi.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email tidak valid",
        description: "Masukkan alamat email yang benar.",
        variant: "destructive",
      });
      return;
    }

    borrowMutation.mutate();
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-serif font-semibold text-foreground">Pinjam Buku Ini</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Nama Lengkap</Label>
          <Input
            id="name"
            type="text"
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-border focus-visible:ring-primary"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border focus-visible:ring-primary"
            maxLength={255}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-foreground">Tanggal Peminjaman</Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
              className="border-border focus-visible:ring-primary"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <Button
          type="submit"
          disabled={borrowMutation.isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {borrowMutation.isPending ? "Memproses..." : "Pinjam Sekarang"}
        </Button>
      </form>
    </Card>
  );
};

export default BorrowForm;
