import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const PortfolioSection = () => {
  const { t } = useLanguage();

  const projects = [
   
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
    <section id="portfolio" className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
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
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1C2B48] mb-4" data-testid="portfolio-title">
            {t('أعمالنا', 'Our Work')}
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl overflow-hidden shadow-lg group cursor-pointer hover:shadow-xl transition-all duration-300"
              data-testid={`portfolio-item-${index}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B48] to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1C2B48] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 bg-white rounded-lg">
                    <ExternalLink className="w-4 h-4 text-[#1C2B48]" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1C2B48] mb-2 group-hover:text-[#8EB1D1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#64748B] text-sm">
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
