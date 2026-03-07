import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const NovaBotSection = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: t('متاح 24/7', 'Available 24/7'),
      desc: t('مساعدك الذكي جاهز للإجابة على استفساراتك في أي وقت', 'Your smart assistant is ready to answer your queries anytime')
    },
    {
      icon: MessageCircle,
      title: t('استشارات فورية', 'Instant Consultation'),
      desc: t('احصل على معلومات الأسعار والتوصيات فوراً', 'Get pricing information and recommendations instantly')
    },
    {
      icon: Sparkles,
      title: t('توصيات ذكية', 'Smart Recommendations'),
      desc: t('يقترح عليك الباقات المناسبة بناءً على احتياجاتك', 'Suggests suitable packages based on your needs')
    }
  ];

  return (
    <section id="nova-bot" className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8EB1D1]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#8EB1D1]/20 px-4 py-2 rounded-full mb-6">
              <Bot className="w-4 h-4 text-[#1C2B48]" />
              <span className="text-sm text-[#64748B]">{t('مساعدك الذكي', 'Your Smart Assistant')}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold text-[#1C2B48] mb-6" data-testid="bot-title">
              {t('تعرف على Nova Bot', 'Meet Nova Bot')}
            </h2>
            
            <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-8">
              {t(
                'مساعدنا الذكي يعمل على مدار الساعة للإجابة على جميع استفساراتك حول خدماتنا وأسعارنا. دعه يساعدك في اختيار الحل الأمثل لمشروعك.',
                'Our smart assistant works around the clock to answer all your questions about our services and prices. Let it help you choose the best solution for your project.'
              )}
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2 bg-[#8EB1D1]/20 rounded-lg">
                    <feature.icon className="w-5 h-5 text-[#1C2B48]" />
                  </div>
                  <div>
                    <h4 className="text-[#1C2B48] font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-[#64748B]">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => window.open('https://wa.me/972592128272', '_blank')}
              className="bg-[#1C2B48] hover:bg-[#1C2B48]/90 text-white font-semibold rounded-lg px-8 py-6 text-lg hover-glow"
              data-testid="bot-cta"
            >
              {t('تحدث مع Nova Bot', 'Chat with Nova Bot')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
          </motion.div>

          {/* Bot Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card p-8 rounded-3xl">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-6 border-b border-[#8EB1D1]/20 mb-6">
                <div className="w-12 h-12 bg-[#1C2B48] rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1C2B48] font-medium">Nova Bot</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-[#64748B]">{t('متصل الآن', 'Online')}</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#F8FAFC] p-4 rounded-2xl rounded-tl-none max-w-[80%]"
                >
                  <p className="text-[#1C2B48] text-sm">
                    {t('مرحباً! أنا Nova Bot. كيف يمكنني مساعدتك اليوم؟', 'Hello! I\'m Nova Bot. How can I help you today?')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className={`bg-[#1C2B48] p-4 rounded-2xl ${isRTL ? 'rounded-tr-none mr-auto' : 'rounded-tr-none ml-auto'} max-w-[80%]`}
                >
                  <p className="text-white text-sm">
                    {t('أريد بناء متجر إلكتروني', 'I want to build an online store')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#F8FAFC] p-4 rounded-2xl rounded-tl-none max-w-[80%]"
                >
                  <p className="text-[#1C2B48] text-sm">
                    {t('رائع! متاجرنا الإلكترونية تبدأ من $400 وتشمل نظام دفع آمن وإدارة مخزون. هل تريد معرفة المزيد؟', 'Great! Our e-commerce stores start at $400 and include secure payment and inventory management. Want to know more?')}
                  </p>
                </motion.div>
              </div>

              {/* Chat Input */}
              <div className="mt-6 pt-6 border-t border-[#8EB1D1]/20">
                <div className="bg-[#F8FAFC] border border-[#8EB1D1]/20 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-[#64748B] text-sm flex-1">
                    {t('اكتب رسالتك...', 'Type your message...')}
                  </span>
                  <Button size="icon" className="bg-[#1C2B48] hover:bg-[#1C2B48]/90 rounded-lg">
                    <ArrowRight className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NovaBotSection;
