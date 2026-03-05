import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Rocket } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 bg-[#1C2B48] relative overflow-hidden">
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
            <h2 className="text-3xl md:text-5xl font-semibold text-[#E8ECEF] mb-6" data-testid="about-title">
              {t('من نحن', 'About Nova')}
            </h2>
            <p className="text-base md:text-lg text-[#C4D8E5] leading-relaxed mb-6">
              {t(
                'Nova هي وكالة رقمية متكاملة متخصصة في تحويل الأفكار التجارية إلى حلول رقمية مذهلة وفعالة. نجمع بين الإبداع والتقنية لنقدم تجارب استثنائية تساعد عملاءنا على التميز في السوق الرقمي.',
                'Nova is a full-service digital agency specializing in transforming business ideas into stunning and effective digital solutions. We combine creativity and technology to deliver exceptional experiences that help our clients stand out in the digital market.'
              )}
            </p>
            <p className="text-base md:text-lg text-[#C4D8E5] leading-relaxed">
              {t(
                'نستخدم أحدث التقنيات والأدوات لضمان تقديم أفضل النتائج، من تطوير المواقع والتطبيقات إلى حلول الذكاء الاصطناعي والتسويق الرقمي.',
                'We use the latest technologies and tools to ensure the best results, from website and app development to AI solutions and digital marketing.'
              )}
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">50+</div>
                <div className="text-sm text-[#C4D8E5]">{t('مشروع منجز', 'Projects')}</div>
              </div>
              <div className="w-px h-12 bg-[#8EB1D1]/30" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">30+</div>
                <div className="text-sm text-[#C4D8E5]">{t('عميل سعيد', 'Happy Clients')}</div>
              </div>
              <div className="w-px h-12 bg-[#8EB1D1]/30" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#8EB1D1]">3+</div>
                <div className="text-sm text-[#C4D8E5]">{t('سنوات خبرة', 'Years')}</div>
              </div>
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
            <h3 className="text-2xl font-semibold text-[#E8ECEF] mb-8">
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
                className="glass-card p-6 hover:bg-[#8EB1D1]/10 hover:border-[#8EB1D1]/40 transition-all duration-300 hover-glow"
                data-testid={`value-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#8EB1D1]/20 rounded-xl">
                    <value.icon className="w-6 h-6 text-[#8EB1D1]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#E8ECEF] mb-2">{value.title}</h4>
                    <p className="text-[#C4D8E5] text-sm">{value.desc}</p>
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
