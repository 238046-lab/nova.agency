import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Rocket } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, clients: 0, years: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = { projects: 50, clients: 30, years: 3 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        projects: Math.floor(targets.projects * easeOut),
        clients: Math.floor(targets.clients * easeOut),
        years: Math.floor(targets.years * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8EB1D1]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-[#1C2B48] mb-6" data-testid="about-title">
              {t('من نحن', 'About Nova')}
            </h2>
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-6">
              {t(
                'Nova هي وكالة رقمية متكاملة متخصصة في تحويل الأفكار التجارية إلى حلول رقمية مذهلة وفعالة. نجمع بين الإبداع والتقنية لنقدم تجارب استثنائية تساعد عملاءنا على التميز في السوق الرقمي.',
                'Nova is a full-service digital agency specializing in transforming business ideas into stunning and effective digital solutions. We combine creativity and technology to deliver exceptional experiences that help our clients stand out in the digital market.'
              )}
            </p>
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed">
              {t(
                'نستخدم أحدث التقنيات والأدوات لضمان تقديم أفضل النتائج، من تطوير المواقع والتطبيقات إلى حلول الذكاء الاصطناعي والتسويق الرقمي.',
                'We use the latest technologies and tools to ensure the best results, from website and app development to AI solutions and digital marketing.'
              )}
            </p>

            {/* Animated Stats */}
            <div className="mt-8 flex items-center gap-8">
              <motion.div 
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">
                  {counts.projects}+
                </div>
                <div className="text-sm text-[#64748B]">{t('مشروع منجز', 'Projects')}</div>
              </motion.div>
              <div className="w-px h-12 bg-[#8EB1D1]/30" />
              <motion.div 
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">
                  {counts.clients}+
                </div>
                <div className="text-sm text-[#64748B]">{t('عميل سعيد', 'Happy Clients')}</div>
              </motion.div>
              <div className="w-px h-12 bg-[#8EB1D1]/30" />
              <motion.div 
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">
                  {counts.years}+
                </div>
                <div className="text-sm text-[#64748B]">{t('سنوات خبرة', 'Years')}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-[#1C2B48] mb-8">
              {t('قيمنا الجوهرية', 'Our Core Values')}
            </h3>
            
            {[
              {
                icon: Lightbulb,
                title: t('الابتكار', 'Innovation'),
                desc: t('نستخدم أحدث التقنيات لتقديم حلول مبتكرة ومتطورة', 'We use the latest technologies to deliver innovative solutions')
              },
              {
                icon: Rocket,
                title: t('الإبداع', 'Creativity'),
                desc: t('تصاميم جذابة وسهلة الاستخدام تعكس هوية عملك', 'Attractive and user-friendly designs that reflect your brand')
              },
              {
                icon: Users,
                title: t('التركيز على العميل', 'Client Focus'),
                desc: t('حلول مخصصة تلبي احتياجاتك الفريدة وتتجاوز توقعاتك', 'Custom solutions that meet your unique needs and exceed expectations')
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-all duration-300"
                data-testid={`value-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#8EB1D1]/20 rounded-xl">
                    <value.icon className="w-6 h-6 text-[#1C2B48]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#1C2B48] mb-2">{value.title}</h4>
                    <p className="text-[#64748B] text-sm">{value.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
