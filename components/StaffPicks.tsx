import React from 'react';
import ComicCard from './ComicCard';
import { COMICS } from '../data/comics';

const StaffPicks = () => {
  const picks = COMICS.filter(c => c.staffPick);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
             <span className="text-primary font-semibold tracking-wider uppercase text-xs">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Staff <span className="text-gradient">Picks</span></h2>
          </div>
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            View All Staff Picks →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {picks.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffPicks;