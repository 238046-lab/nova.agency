import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';

const Navbar = () => {
  const { isRTL, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('من نحن', 'About') },
    { href: '#services', label: t('خدماتنا', 'Services') },
    { href: '#pricing', label: t('الأسعار', 'Pricing') },
    { href: '#portfolio', label: t('أعمالنا', 'Portfolio') },
    { href: '#contact', label: t('تواصل معنا', 'Contact') },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    // Small delay to allow menu to close first
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl md:text-3xl font-bold text-[#1C2B48] tracking-tight"
            whileHover={{ scale: 1.05 }}
            data-testid="logo"
          >
            Nova-way
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-[#64748B] hover:text-[#1C2B48] transition-colors duration-300 text-sm font-medium"
                data-testid={`nav-${link.href.replace('#', '')}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-[#64748B] hover:text-[#1C2B48] hover:bg-[#8EB1D1]/20"
              data-testid="language-toggle"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
              <span className="sr-only">{isRTL ? 'EN' : 'AR'}</span>
            </Button>
            
            <Button
              onClick={() => scrollToSection('#contact')}
              className="hidden md:flex bg-[#1C2B48] hover:bg-[#1C2B48]/90 text-white font-semibold rounded-lg px-6"
              data-testid="nav-cta"
            >
              {t('ابدأ مشروعك', 'Start Project')}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#64748B] hover:text-[#1C2B48]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-[#8EB1D1]/20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[#64748B] hover:text-[#1C2B48] transition-colors py-2 text-lg text-right"
                  data-testid={`mobile-nav-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-[#1C2B48] hover:bg-[#1C2B48]/90 text-white font-semibold rounded-lg mt-2"
                data-testid="mobile-nav-cta"
              >
                {t('ابدأ مشروعك', 'Start Project')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
