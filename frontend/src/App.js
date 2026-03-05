import React from "react";
import "@/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import NovaBotSection from "./components/NovaBotSection";
import TeamSection from "./components/TeamSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#21242D]" data-testid="nova-app">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <NovaBotSection />
          <TeamSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#21242D',
              border: '1px solid #3B4961',
              color: '#CBCCC8',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
