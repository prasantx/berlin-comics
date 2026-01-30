import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { toggleCart, itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-border' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <button className="md:hidden p-2 text-foreground">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <span className="font-bold text-white text-xl">B</span>
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight hidden sm:block">
            BERLIN<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['New Arrivals', 'Manga', 'Comics', 'Merch', 'Sale'].map((item) => (
            <Link 
              key={item} 
              to="/" 
              onClick={(e) => e.preventDefault()}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 rounded-full">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 rounded-full hidden sm:block">
            <User className="w-5 h-5" />
          </button>

          <button 
            onClick={toggleCart}
            className="p-2 text-foreground hover:text-primary transition-colors relative group"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            <ShoppingBag className="w-5 h-5 relative z-10" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-0 w-4 h-4 bg-accent text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-in zoom-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;