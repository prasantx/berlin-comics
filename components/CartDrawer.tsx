import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">Your Cart</h2>
            <span className="text-sm text-muted-foreground">({itemCount} items)</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ comic, quantity }) => (
                <div key={comic.id} className="flex gap-4 p-3 bg-muted/30 rounded-xl border border-border/50">
                  <img
                    src={comic.cover}
                    alt={comic.title}
                    className="w-20 h-28 object-cover rounded-lg border border-border"
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-medium text-sm line-clamp-2">{comic.title}</h3>
                    {comic.series && (
                      <p className="text-xs text-muted-foreground">{comic.series}</p>
                    )}
                    <p className="text-primary font-bold mt-auto">
                      ${(comic.price * quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(comic.id, quantity - 1)}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors text-foreground"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(comic.id, quantity + 1)}
                          disabled={quantity >= comic.stockCount}
                          className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors disabled:opacity-50 text-foreground"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(comic.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-card">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{subtotal >= 75 ? "Free" : "$5.99"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">
                  ${(subtotal + (subtotal >= 75 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-[0_0_20px_hsl(280_100%_70%/0.4)] transition-all">
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 border border-border text-foreground rounded-xl font-medium hover:bg-muted/50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;