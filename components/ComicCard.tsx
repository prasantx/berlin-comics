import React from 'react';
import { Star, Heart, ShoppingCart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Comic } from '../types';
import { conditionLabels } from '../data/comics';
import { useCart } from '../context/CartContext';

interface ComicCardProps {
  comic: Comic;
  featured?: boolean;
}

const ComicCard = ({ comic, featured = false }: ComicCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group relative card-hover">
      <div className="relative rounded-xl overflow-hidden bg-card border border-border">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {comic.staffPick && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded-md shadow-sm">
              Staff Pick
            </span>
          )}
          {comic.isRare && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase bg-gold text-black rounded-md shadow-sm">
              Rare
            </span>
          )}
          {comic.isGraded && (
            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase bg-secondary text-secondary-foreground rounded-md shadow-sm">
              <Award className="w-3 h-3" />
              CGC {comic.gradeScore}
            </span>
          )}
          {comic.originalPrice && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase bg-accent text-accent-foreground rounded-md shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-accent hover:text-accent-foreground">
          <Heart className="w-4 h-4" />
        </button>

        {/* Cover Image */}
        <Link to={`/`} onClick={(e) => e.preventDefault()}> 
          {/* Note: In a real app, this link would go to detail page. Preventing default for this demo since we don't have detail pages set up in router yet */}
          <div className="aspect-[2/3] overflow-hidden bg-muted">
            <img
              src={comic.cover}
              alt={comic.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Quick Add Button */}
        <div className="absolute bottom-20 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
          <button
            onClick={() => addItem(comic)}
            disabled={!comic.inStock}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_hsl(280_100%_70%/0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {comic.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider">
              {comic.publisher}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-gold fill-current" />
              <span className="text-xs font-medium text-foreground">{comic.rating}</span>
            </div>
          </div>

          <Link to={`/`} onClick={(e) => e.preventDefault()}>
            <h3 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[40px]">
              {comic.title}
              {comic.issueNumber && ` #${comic.issueNumber}`}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{conditionLabels[comic.condition]}</span>
            <span>•</span>
            <span>{comic.year}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">${comic.price.toFixed(2)}</span>
              {comic.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${comic.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {(comic.stockCount ?? 0) <= 3 && comic.inStock && (
              <span className="text-[10px] font-medium text-accent">
                Only {comic.stockCount} left
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
};

export default ComicCard;