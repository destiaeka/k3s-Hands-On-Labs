-- Create books table
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  description TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  short_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create borrowings table
CREATE TABLE public.borrowings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  borrower_name TEXT NOT NULL,
  borrower_email TEXT NOT NULL,
  borrow_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrowings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth needed for this public library)
CREATE POLICY "Anyone can view books" 
ON public.books 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view comments" 
ON public.comments 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can add comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can add borrowings" 
ON public.borrowings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view borrowings" 
ON public.borrowings 
FOR SELECT 
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial book data
INSERT INTO public.books (title, author, rating, short_description, description, cover_url) VALUES
('Sisi Tergelap Surga', 'Brian Khrisna', 4.4, 'Kisah tentang kehilangan, penyesalan, dan harapan', 'Sebuah karya prosa puitis yang menyentuh hati, mengisahkan perjalanan emosional seseorang yang menghadapi kehilangan dan berusaha menemukan harapan di tengah kegelapan. Brian Khrisna menghadirkan narasi yang mendalam tentang makna kehidupan dan penyesalan.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595835037i/54669537.jpg'),
('Hujan', 'Tere Liye', 4.6, 'Cerita cinta dan perjuangan di dunia masa depan', 'Novel fiksi ilmiah yang mengisahkan cinta dan perjuangan di tengah bencana besar yang mengancam dunia. Tere Liye menghadirkan petualangan epik dengan karakter yang kuat dan plot yang menegangkan, menjadikan pembaca terhanyut dalam dunia paralel yang penuh misteri.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555931891i/44667277.jpg'),
('Dompet Ayah Sepatu Ibu', 'J.S. Khairen', 4.5, 'Kisah keluarga penuh kehangatan dan pesan moral', 'Sebuah novel yang menyentuh tentang kisah keluarga sederhana dengan nilai-nilai kehangatan dan pengorbanan. J.S. Khairen menghadirkan cerita yang relatable tentang cinta keluarga, perjuangan orang tua, dan pesan moral yang mendalam untuk generasi muda.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1599458826i/55216707.jpg'),
('Seporsi Mi Ayam Sebelum Mati', 'Brian Khrisna', 4.2, 'Refleksi kehidupan dan kebahagiaan sederhana', 'Kumpulan cerita pendek yang reflektif tentang kehidupan, kebahagiaan dalam hal-hal sederhana, dan makna di balik setiap momen menjelang akhir. Brian Khrisna kembali menghadirkan tulisan yang mengajak pembaca untuk merenungkan nilai kehidupan.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1638777155i/59838516.jpg'),
('Musim yang Tak Sempat Kita Miliki', 'Rintik Sedu', 4.3, 'Tulisan melankolis tentang cinta dan kehilangan', 'Novel melankolis yang mengisahkan cinta, kehilangan, dan waktu yang tak berpihak. Rintik Sedu menghadirkan narasi yang puitis dan emosional, menggambarkan perasaan yang sulit diungkapkan dengan kata-kata namun terasa begitu nyata.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612344823i/56905356.jpg');