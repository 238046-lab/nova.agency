import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    { value: 'portfolio', label: t('موقع بورتفوليو', 'Portfolio Website') },
    { value: 'ecommerce', label: t('متجر إلكتروني', 'E-commerce Store') },
    { value: 'custom', label: t('نظام مخصص', 'Custom System') },
    { value: 'other', label: t('أخرى', 'Other') }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success(t('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'Message sent successfully! We will contact you soon'));
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      toast.error(t('حدث خطأ. يرجى المحاولة مرة أخرى', 'An error occurred. Please try again'));
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaWhatsapp,
      title: t('واتساب', 'WhatsApp'),
      value: '+972 592128272',
      href: 'https://wa.me/972592128272'
    },
    {
      icon: Mail,
      title: t('البريد الإلكتروني', 'Email'),
      value: 'novvaway@gmail.com',
      href: 'mailto:novvaway@gmail.com'
    },
    {
      icon: MapPin,
      title: t('الموقع', 'Location'),
      value: t('الخليل، فلسطين', 'Hebron, Palestine'),
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#21242D] relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B4961]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B4961]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#CBCCC8] mb-4" data-testid="contact-title">
            {t('تواصل معنا', 'Get In Touch')}
          </h2>
          <p className="text-base md:text-lg text-[#A6A39D] max-w-2xl mx-auto">
            {t(
              'نحن هنا لمساعدتك. تواصل معنا لبدء مشروعك الرقمي',
              'We are here to help. Contact us to start your digital project'
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#CBCCC8] text-sm mb-2">
                      {t('الاسم', 'Name')} *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#21242D] border-[#3B4961]/50 text-[#CBCCC8] focus:border-[#3B4961] rounded-lg"
                      placeholder={t('أدخل اسمك', 'Enter your name')}
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[#CBCCC8] text-sm mb-2">
                      {t('البريد الإلكتروني', 'Email')} *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#21242D] border-[#3B4961]/50 text-[#CBCCC8] focus:border-[#3B4961] rounded-lg"
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#CBCCC8] text-sm mb-2">
                      {t('رقم الهاتف', 'Phone')}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#21242D] border-[#3B4961]/50 text-[#CBCCC8] focus:border-[#3B4961] rounded-lg"
                      placeholder={t('أدخل رقم هاتفك', 'Enter your phone')}
                      data-testid="contact-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[#CBCCC8] text-sm mb-2">
                      {t('الخدمة المطلوبة', 'Service')}
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger 
                        className="bg-[#21242D] border-[#3B4961]/50 text-[#CBCCC8] focus:border-[#3B4961] rounded-lg"
                        data-testid="contact-service-select"
                      >
                        <SelectValue placeholder={t('اختر الخدمة', 'Select service')} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#21242D] border-[#3B4961]">
                        {services.map((service) => (
                          <SelectItem 
                            key={service.value} 
                            value={service.value}
                            className="text-[#CBCCC8] focus:bg-[#3B4961]/30"
                          >
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#CBCCC8] text-sm mb-2">
                    {t('رسالتك', 'Message')} *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#21242D] border-[#3B4961]/50 text-[#CBCCC8] focus:border-[#3B4961] rounded-lg min-h-[150px]"
                    placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                    data-testid="contact-message-input"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00D4FF] hover:bg-[#00D4FF]/80 text-[#21242D] font-semibold rounded-lg py-6 text-lg hover-glow"
                  data-testid="contact-submit-btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 me-2 animate-spin" />
                      {t('جاري الإرسال...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 me-2" />
                      {t('إرسال الرسالة', 'Send Message')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold text-[#CBCCC8] mb-6">
                {t('معلومات التواصل', 'Contact Information')}
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                    data-testid={`contact-info-${index}`}
                  >
                    <div className="p-3 bg-[#00D4FF]/20 rounded-xl group-hover:bg-[#00D4FF]/30 transition-colors">
                      <info.icon className="w-6 h-6 text-[#00D4FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#72706C] mb-1">{info.title}</p>
                      <p className="text-[#CBCCC8] group-hover:text-white transition-colors">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108203.83370867844!2d35.0276!3d31.5326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502e67c3d3e5f1f%3A0x2e6b0000e9b4c82f!2sHebron!5e0!3m2!1sen!2sps!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nova Location"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
