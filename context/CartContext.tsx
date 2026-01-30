import React, { createContext, useContext, useState, useEffect } from 'react';
import { Comic, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (comic: Comic) => void;
  removeItem: (comicId: string) => void;
  updateQuantity: (comicId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.comic.price * item.quantity), 0);

  const addItem = (comic: Comic) => {
    setItems(prev => {
      const existing = prev.find(item => item.comic.id === comic.id);
      if (existing) {
        return prev.map(item => 
          item.comic.id === comic.id 
            ? { ...item, quantity: Math.min(item.quantity + 1, comic.stockCount) } 
            : item
        );
      }
      return [...prev, { comic, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (comicId: string) => {
    setItems(prev => prev.filter(item => item.comic.id !== comicId));
  };

  const updateQuantity = (comicId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => {
      if (item.comic.id === comicId) {
        return { ...item, quantity: Math.min(quantity, item.comic.stockCount) };
      }
      return item;
    }));
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      openCart,
      closeCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};