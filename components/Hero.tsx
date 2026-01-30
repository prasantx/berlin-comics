import React from 'react';
import { Button } from './Button';

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full bg-background overflow-hidden flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2670&auto=format&fit=crop" 
          alt="Anime Store Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-4">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-bold text-primary tracking-wide uppercase">New Collection Drop</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">
              Inner Otaku
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Discover a curated universe of rare manga, graded comics, and exclusive collectibles. Authenticity guaranteed.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-xl h-14 px-8 text-lg shadow-[0_0_20px_hsl(263_70%_50%/0.3)]">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted/50 rounded-xl h-14 px-8 text-lg backdrop-blur-sm">
              View Collections
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Free Shipping &gt; $75</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Mint Condition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Official Merch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;