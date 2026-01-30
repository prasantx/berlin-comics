import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
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
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary">
            <Header />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <CategoryNav />
                    <StaffPicks />
                    {/* Add more sections here like New Releases, Trust Badges etc */}
                  </>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
            <AIChat />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;