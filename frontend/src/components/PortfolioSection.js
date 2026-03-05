import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('موقع البروفيسور جرادات', 'Prof. Jaradat Website'),
      desc: t('موقع أكاديمي شخصي مع نظام إدارة المحتوى', 'Personal academic website with CMS'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      category: t('موقع شخصي', 'Portfolio')
    },
    {
      title: t('متجر الأناقة', 'Elegance Store'),
      desc: t('متجر إلكتروني للأزياء والإكسسوارات', 'Fashion and accessories e-commerce store'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      category: t('متجر إلكتروني', 'E-commerce')
    },
    {
      title: t('نظام إدارة العيادات', 'Clinic Management System'),
      desc: t('نظام متكامل لإدارة المواعيد والمرضى', 'Complete system for appointments and patients'),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      category: t('نظام مخصص', 'Custom System')
    }
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-[#21242D] relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3B4961]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#CBCCC8] mb-4" data-testid="portfolio-title">
            {t('أعمالنا', 'Our Work')}
          </h2>
          <p className="text-base md:text-lg text-[#A6A39D] max-w-2xl mx-auto">
            {t(
              'نماذج من المشاريع التي نفتخر بإنجازها لعملائنا',
              'Samples of projects we are proud to have completed for our clients'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer hover-glow"
              data-testid={`portfolio-item-${index}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21242D] to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#3B4961]/80 backdrop-blur-sm text-[#CBCCC8] text-xs px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-[#3B4961]/80 backdrop-blur-sm rounded-lg">
                    <ExternalLink className="w-4 h-4 text-[#CBCCC8]" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#CBCCC8] mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#A6A39D] text-sm">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
