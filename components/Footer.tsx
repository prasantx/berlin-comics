import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">BERLIN<span className="text-primary">.</span></h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium manga and comics for the discerning collector. 
              Built with passion for the art form.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">New Releases</li>
              <li className="hover:text-primary cursor-pointer">Best Sellers</li>
              <li className="hover:text-primary cursor-pointer">Pre-orders</li>
              <li className="hover:text-primary cursor-pointer">Sale</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">Help Center</li>
              <li className="hover:text-primary cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-primary cursor-pointer">Condition Guide</li>
              <li className="hover:text-primary cursor-pointer">Track Order</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for rare drops and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border border-border rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 BERLIN Comics. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;