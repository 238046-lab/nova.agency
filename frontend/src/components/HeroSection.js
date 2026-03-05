import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown, Bot, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

const HeroSection = () => {
  const { isRTL, t } = useLanguage();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-[#21242D]">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#3B4961]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3B4961]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B4961]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`order-2 lg:order-1 ${isRTL ? 'lg:order-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#3B4961]/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#CBCCC8]" />
              <span className="text-sm text-[#A6A39D]">
                {t('وكالة رقمية متكاملة', 'Full-Service Digital Agency')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#CBCCC8] leading-tight mb-6"
              data-testid="hero-title"
            >
              {t('نبني ', 'We Build ')}
              <span className="text-gradient">{t('المستقبل', 'The Future')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-[#A6A39D] mb-8 max-w-xl leading-relaxed"
              data-testid="hero-description"
            >
              {t(
                'نقدم حلولاً رقمية مبتكرة تشمل تطوير البرمجيات، أتمتة الذكاء الاصطناعي، والتسويق الرقمي لمساعدة أعمالك على النمو والتميز.',
                'We deliver innovative digital solutions including software development, AI automation, and digital marketing to help your business grow and stand out.'
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-[#3B4961] hover:bg-[#3B4961]/80 text-[#CBCCC8] rounded-lg px-8 py-6 text-lg hover-glow"
                data-testid="hero-cta-start"
              >
                {t('ابدأ مشروعك', 'Start Your Project')}
              </Button>
              <Button
                onClick={() => scrollToSection('#nova-bot')}
                variant="outline"
                className="border-[#3B4961] text-[#CBCCC8] hover:bg-[#3B4961]/20 rounded-lg px-8 py-6 text-lg"
                data-testid="hero-cta-bot"
              >
                <Bot className="w-5 h-5 me-2" />
                {t('جرب Nova Bot', 'Try Nova Bot')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`order-1 lg:order-2 ${isRTL ? 'lg:order-1' : ''} relative`}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#3B4961]/30 rounded-full blur-3xl scale-75" />
              
              {/* Robot image */}
              <motion.img
                src="https://images.unsplash.com/photo-1677442135132-141348e809d9?q=80&w=1000&auto=format&fit=crop"
                alt="AI Robot"
                className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                data-testid="hero-image"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 -left-10 glass-card p-4 rounded-xl"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Bot className="w-8 h-8 text-[#3B4961]" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 -right-5 glass-card p-4 rounded-xl"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Sparkles className="w-8 h-8 text-[#CBCCC8]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#about')}
          >
            <ArrowDown className="w-6 h-6 text-[#A6A39D]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
