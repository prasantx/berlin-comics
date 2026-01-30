import React from 'react';
import { Comic } from '../types';

interface ProductCardProps {
  comic: Comic;
  onClick: (comic: Comic) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ comic, onClick }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col gap-3"
      onClick={() => onClick(comic)}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
        <img 
          src={comic.cover} 
          alt={comic.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge logic: Show if NM or Brand New */}
        {(comic.condition === 'NM' || comic.condition === 'NEW') && (
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-sm text-berlin-black">
            {comic.condition === 'NEW' ? 'NEW' : `NM ${comic.gradeNote ? comic.gradeNote.split(' ')[0] : ''}`}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-lg font-bold leading-tight group-hover:underline decoration-berlin-black/50 underline-offset-4 line-clamp-2">
          {comic.title} <span className="text-berlin-muted font-normal text-base">{comic.issueNumber}</span>
        </h3>
        <p className="text-xs text-berlin-muted uppercase tracking-wide">{comic.publisher} • {comic.year}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="font-medium text-lg">${comic.price.toFixed(2)}</span>
          <span className="text-[10px] font-bold text-berlin-muted border border-berlin-muted/30 px-1.5 py-0.5 rounded uppercase">
            {comic.category === 'manga' ? 'Manga' : comic.condition}
          </span>
        </div>
      </div>
    </div>
  );
};