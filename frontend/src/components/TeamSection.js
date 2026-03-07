import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Code, Palette, Sparkles } from 'lucide-react';

const TeamSection = () => {
  const { t } = useLanguage();

  const team = [
    {
      name: t('أحمد الخطيب', 'Ahmad Al-Khatib'),
      role: t('مطور واجهات أمامية', 'Frontend Developer'),
      icon: Code,
      color: 'from-blue-400 to-blue-600',
      bio: t('متخصص في تصميم وتطوير واجهات المستخدم الحديثة', 'Specialist in modern UI design and development')
    },
    {
      name: t('صمود السلامين', 'Sumood Salameen'),
      role: t('المديرة التنفيذية ومطورة البرمجيات', 'CEO & Software Developer'),
      image: 'https://customer-assets.emergentagent.com/job_nova-agency-2/artifacts/ql0l3ln5_1000311052.jpg',
      isMain: true,
      bio: t('خبيرة في تطوير البرمجيات وقيادة المشاريع التقنية', 'Expert in software development and technical project leadership')
    },
    {
      name: t('لين محمود', 'Leen Mahmoud'),
      role: t('مصممة جرافيك', 'Graphic Designer'),
      icon: Palette,
      color: 'from-pink-400 to-purple-600',
      bio: t('مبدعة في تصميم الهويات البصرية والتجارب الرقمية', 'Creative in visual identity and digital experience design')
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
        <div className="grid md:grid-cols-3 gap-8 items-end">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 text-center hover:shadow-xl transition-all duration-300 group ${member.isMain ? 'md:-mt-8 ring-2 ring-[#8EB1D1]/50' : ''}`}
              data-testid={`team-member-${index}`}
            >
              <div className="relative mb-6 inline-block">
                <div className={`absolute inset-0 rounded-full blur-xl scale-90 group-hover:scale-100 transition-transform ${member.isMain ? 'bg-[#8EB1D1]/40' : 'bg-gradient-to-br ' + member.color + ' opacity-30'}`} />
                
                {member.isMain ? (
                  // صمود - صورة حقيقية
                  <div className="w-36 h-36 rounded-full overflow-hidden relative z-10 border-4 border-[#8EB1D1] mx-auto shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_15%] scale-[1.8]"
                    />
                  </div>
                ) : (
                  // باقي الفريق - أيقونات
                  <div className={`w-32 h-32 rounded-full relative z-10 mx-auto flex items-center justify-center bg-gradient-to-br ${member.color} shadow-lg`}>
                    <member.icon className="w-14 h-14 text-white" />
                  </div>
                )}
                
                {member.isMain && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <span className="bg-[#1C2B48] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      CEO
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className={`text-xl font-semibold text-[#1C2B48] mb-2 ${member.isMain ? 'text-2xl' : ''}`}>
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
