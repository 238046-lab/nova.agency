import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RamadanGreeting from "./components/RamadanGreeting";
import RamadanDecorations from "./components/RamadanDecorations";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


const API = process.env.REACT_APP_BACKEND_URL;

function HomePage() {
  useEffect(() => {
  fetch(`${API}/api/track-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      referrer: document.referrer || null,
      page: window.location.pathname
    })
  }).catch(() => {});
}, []);

  return (
    <div className="min-h-screen bg-white" data-testid="nova-app">
      <RamadanGreeting />
      <RamadanDecorations />
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
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
