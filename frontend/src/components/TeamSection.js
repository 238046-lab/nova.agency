import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const TeamSection = () => {
  const { t } = useLanguage();

  const team = [
    {
      name: t('صمود السلامين', 'Sumood Salameen'),
      role: t('المديرة التنفيذية ومطورة البرمجيات', 'CEO & Software Developer'),
      image: 'https://customer-assets.emergentagent.com/job_nova-agency-2/artifacts/ql0l3ln5_1000311052.jpg',
      bio: t('خبيرة في تطوير البرمجيات وقيادة المشاريع التقنية', 'Expert in software development and technical project leadership')
    }
  ];

  return (
    <section id="team" data-testid="team-section" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8EB1D1]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1C2B48] mb-4" data-testid="team-title">
            {t('فريقنا', 'Our Team')}
          </h2>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto">
            {t(
              'فريق من الخبراء المتخصصين في التقنية والإبداع لتحويل رؤيتك إلى واقع',
              'A team of experts specialized in technology and creativity to turn your vision into reality'
            )}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="flex justify-center">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 text-center max-w-sm hover:shadow-xl transition-all duration-300 group"
              data-testid={`team-member-${index}`}
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-[#8EB1D1]/30 rounded-full blur-xl scale-90 group-hover:scale-100 transition-transform" />
                <div className="w-40 h-40 rounded-full overflow-hidden relative z-10 border-4 border-[#8EB1D1]/30 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-[center_15%] scale-[1.8]"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-[#1C2B48] mb-2">
                {member.name}
              </h3>
              
              <p className="text-[#8EB1D1] font-medium text-sm mb-3">
                {member.role}
              </p>
              
              <p className="text-[#64748B] text-sm mb-6">
                {member.bio}
              </p>

              <div className="flex justify-center gap-3">
                <a 
                  href="https://wa.me/972592128272" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1C2B48] rounded-lg hover:bg-[#8EB1D1] transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </a>
                <a 
                  href="https://www.instagram.com/nova.co.web?igsh=c2w1NjQ2OWMxcWY1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1C2B48] rounded-lg hover:bg-[#8EB1D1] transition-colors"
                >
                  <FaInstagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
