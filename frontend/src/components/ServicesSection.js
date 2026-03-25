import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Briefcase, ShoppingCart, Settings } from 'lucide-react';

const iconMap = {
  Briefcase,
  ShoppingCart,
  Settings
};

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: 'Briefcase',
      name: t('مواقع البورتفوليو', 'Portfolio Websites'),
      desc: t('مواقع شخصية احترافية لعرض أعمالك ومهاراتك بأسلوب عصري وجذاب', 'Professional personal websites to showcase your work and skills'),
   
    },
    {
      icon: 'ShoppingCart',
      name: t('المتاجر الإلكترونية', 'E-commerce Stores'),
      desc: t('متاجر إلكترونية متكاملة مع نظام دفع آمن وإدارة مخزون', 'Complete online stores with secure payment and inventory management'),
      
    },
    {
      icon: 'Settings',
      name: t('الأنظمة المخصصة', 'Custom Systems'),
      desc: t('أنظمة برمجية مخصصة لإدارة أعمالك بكفاءة عالية', 'Custom software systems to manage your business efficiently'),
      
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#A7C7E7]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1C2B48] mb-4" data-testid="services-title">
            {t('خدماتنا', 'Our Services')}
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto">
            {t(
              'نقدم مجموعة شاملة من الخدمات الرقمية لمساعدتك على بناء حضور رقمي قوي',
              'We offer a comprehensive range of digital services to help you build a strong digital presence'
            )}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover:shadow-xl transition-all duration-300 group"
                data-testid={`service-card-${index}`}
              >
                <div className="p-4 bg-[#1C2B48] rounded-2xl w-fit mb-6 group-hover:bg-[#8EB1D1] transition-colors">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#1C2B48] mb-3">
                  {service.name}
                </h3>
                
                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#8EB1D1]/20">
                  <span className="text-xs text-[#64748B]">{t('تبدأ من', 'Starting from')}</span>
                  <span className="text-2xl font-bold text-[#1C2B48]">{service.price}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
