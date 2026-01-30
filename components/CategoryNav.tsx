import React from 'react';
import { Link } from "react-router-dom";
import { categoryLabels } from "../data/comics";
import { Category } from "../types";
import { Sword, Skull, Heart, Sparkles, Zap, Shield, Award, Image as ImageIcon } from "lucide-react";

// Use lucide icons instead of specific images for categories to ensure it looks good without assets
const categoryConfig: Partial<Record<Category, { icon: any, color: string, count: number }>> = {
  'new-releases': { icon: Zap, color: "from-yellow-500 to-amber-500", count: 156 },
  'back-issues': { icon: Shield, color: "from-indigo-500 to-purple-500", count: 2340 },
  'rare-collectible': { icon: Sparkles, color: "from-blue-500 to-cyan-500", count: 89 },
  'graded': { icon: Award, color: "from-purple-500 to-pink-500", count: 234 },
  'graphic-novels': { icon: Sword, color: "from-red-500 to-orange-500", count: 567 },
  'manga': { icon: Skull, color: "from-pink-500 to-rose-500", count: 892 },
  'poster': { icon: ImageIcon, color: "from-emerald-500 to-teal-500", count: 42 }
};

const CategoryNav = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-primary font-semibold tracking-wider uppercase text-xs">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Shop by <span className="text-gradient">Category</span>
          </h2>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(Object.keys(categoryLabels) as Category[]).map((catKey, index) => {
             const config = categoryConfig[catKey];
             if (!config) return null;
             const Icon = config.icon;
             
             return (
              <Link
                key={catKey}
                to={`/`}
                onClick={(e) => e.preventDefault()}
                className="group relative p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(280_100%_70%/0.2)] animate-fade-in flex flex-col items-center justify-center text-center gap-3 aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {categoryLabels[catKey]}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{config.count} items</p>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;