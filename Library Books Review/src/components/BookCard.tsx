import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover_url: string;
  rating: number;
  short_description: string;
}

const BookCard = ({ id, title, author, cover_url, rating, short_description }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/book/${id}`}>
      <Card
        className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 bg-card border-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={cover_url}
              alt={`Cover buku ${title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent p-4 flex flex-col justify-end animate-fade-in">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm font-medium text-primary-foreground">{rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-primary-foreground/90 line-clamp-3">
                  {short_description}
                </p>
              </div>
            )}
          </div>
          <div className="p-4 bg-card">
            <h3 className="font-serif font-semibold text-foreground line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
