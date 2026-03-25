import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('أساسي', 'Basic'),
      description: t('مثالي للمشاريع الصغيرة', 'Perfect for small projects'),
      price: '$400',
      period: t('يبدأ من', 'Starting'),
      features: [
        t('موقع من 5 صفحات', '5 pages website'),
        t('تصميم متجاوب', 'Responsive design'),
        t('نموذج تواصل', 'Contact form'),
        t('دعم لمدة شهر', '1 month support'),
      ],
      popular: false
    },
    {
      name: t('متقدم', 'Premium'),
      description: t('للأعمال المتوسطة والمتاجر', 'For medium businesses & stores'),
      price: '$600',
      period: t('يبدأ من', 'Starting'),
      features: [
        t('موقع غير محدود الصفحات', 'Unlimited pages'),
        t('متجر إلكتروني متكامل', 'Full e-commerce'),
        t('نظام دفع آمن', 'Secure payment'),
        t('لوحة تحكم', 'Admin dashboard'),
        t('دعم لمدة 3 أشهر', '3 months support'),
      ],
      popular: true
    },
    {
      name: t('احترافي', 'Extended'),
      description: t('للشركات والأنظمة المخصصة', 'For companies & custom systems'),
      price: '$800',
      period: t('يبدأ من', 'Starting'),
      features: [
        t('نظام مخصص بالكامل', 'Fully custom system'),
        t('تكامل API', 'API integration'),
        t('قاعدة بيانات متقدمة', 'Advanced database'),
        t('تطبيق موبايل', 'Mobile app'),
        t('دعم لمدة 6 أشهر', '6 months support'),
      ],
      popular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-[#1C2B48] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8EB1D1]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#A7C7E7]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" data-testid="pricing-title">
            {t('أسعارنا', 'OUR PRICES')}
          </h2>
          <p className="text-base md:text-lg text-[#C4D8E5] max-w-2xl mx-auto">
            {t(
              'اختر الباقة المناسبة لاحتياجاتك',
              'Choose the package that fits your needs'
            )}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-end">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
              data-testid={`pricing-card-${index}`}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#8EB1D1] to-[#A7C7E7] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500 ${plan.popular ? 'opacity-50' : ''}`} />
              
              {/* Card */}
              <div className={`relative bg-[#1C2B48]/90 backdrop-blur-xl border border-[#8EB1D1]/30 rounded-3xl p-8 ${plan.popular ? 'border-[#8EB1D1]/60' : ''}`}>
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#8EB1D1] to-[#A7C7E7] text-[#1C2B48] text-xs font-bold px-4 py-1 rounded-full">
                      {t('الأكثر طلباً', 'POPULAR')}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="text-[#8EB1D1] text-sm text-center mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3">
                      <div className="p-1 bg-[#8EB1D1]/20 rounded-full">
                        <Check className="w-4 h-4 text-[#8EB1D1]" />
                      </div>
                      <span className="text-[#C4D8E5] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#C4D8E5] text-sm">/{plan.period}</span>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={scrollToContact}
                  className={`w-full py-6 rounded-full font-semibold text-lg transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-[#8EB1D1] to-[#A7C7E7] text-[#1C2B48] hover:shadow-lg hover:shadow-[#8EB1D1]/30' 
                      : 'bg-[#8EB1D1]/20 text-[#8EB1D1] border border-[#8EB1D1]/30 hover:bg-[#8EB1D1]/30'
                  }`}
                >
                  {t('ابدأ الآن', 'START')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
