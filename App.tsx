import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import StaffPicks from './components/StaffPicks';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { AIChat } from './components/AIChat';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary">
          <Header />
          <CartDrawer />
          <main>
            <Hero />
            <CategoryNav />
            <StaffPicks />
            {/* Add more sections here like New Releases, Trust Badges etc */}
          </main>
          <Footer />
          <AIChat />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;