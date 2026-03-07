import React from "react";
import "@/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import NovaBotSection from "./components/NovaBotSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white" data-testid="nova-app">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PricingSection />
          <NovaBotSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#1C2B48',
              border: '1px solid #8EB1D1',
              color: '#E8ECEF',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
