import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Comment {
  id: string;
  user_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentSectionProps {
  bookId: string;
}

const CommentSection = ({ bookId }: CommentSectionProps) => {
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", bookId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("book_id", bookId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("comments").insert({
        book_id: bookId,
        user_name: userName.trim(),
        comment_text: commentText.trim(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", bookId] });
      setUserName("");
      setCommentText("");
      toast({
        title: "Komentar berhasil ditambahkan",
        description: "Terima kasih atas tanggapan Anda!",
      });
    },
    onError: () => {
      toast({
        title: "Gagal menambahkan komentar",
        description: "Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !commentText.trim()) {
      toast({
        title: "Lengkapi form",
        description: "Nama dan komentar harus diisi.",
        variant: "destructive",
      });
      return;
    }
    addCommentMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-serif font-semibold text-foreground">Komentar</h2>
      </div>

      <Card className="p-6 bg-card border-border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nama Anda"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border-border focus-visible:ring-primary"
            maxLength={100}
          />
          <Textarea
            placeholder="Tulis komentar Anda..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-24 border-border focus-visible:ring-primary resize-none"
            maxLength={500}
          />
          <Button
            type="submit"
            disabled={addCommentMutation.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {addCommentMutation.isPending ? "Mengirim..." : "Kirim Komentar"}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Memuat komentar...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 bg-card border-border animate-fade-in">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-foreground">{comment.user_name}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(comment.created_at), "dd MMM yyyy, HH:mm")}
                </p>
              </div>
              <p className="text-sm text-foreground/80">{comment.comment_text}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
