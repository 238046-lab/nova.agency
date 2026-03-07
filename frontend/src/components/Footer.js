import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { href: '#about', label: t('من نحن', 'About') },
    { href: '#services', label: t('خدماتنا', 'Services') },
    { href: '#pricing', label: t('الأسعار', 'Pricing') },
    { href: '#portfolio', label: t('أعمالنا', 'Portfolio') },
    { href: '#contact', label: t('تواصل معنا', 'Contact') }
  ];

  const legalLinks = [
    { href: '#privacy', label: t('سياسة الخصوصية', 'Privacy Policy') },
    { href: '#terms', label: t('الشروط والأحكام', 'Terms & Conditions') }
  ];

  const socials = [
    { icon: FaWhatsapp, href: 'https://wa.me/972592128272' },
    { icon: FaInstagram, href: 'https://www.instagram.com/nova.co.web?igsh=c2w1NjQ2OWMxcWY1' }
  ];

  return (
    <footer className="py-12 bg-[#1C2B48]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="#" className="text-2xl font-bold text-white">Nova</a>
            <p className="text-sm text-[#C4D8E5] mt-2">
              {t('نبني المستقبل الرقمي', 'Building the digital future')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">{t('روابط سريعة', 'Quick Links')}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#C4D8E5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">{t('قانوني', 'Legal')}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#C4D8E5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold mb-4">{t('تابعنا', 'Follow Us')}</h4>
            <div className="flex gap-4 mb-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <p className="text-sm text-[#C4D8E5]">
              novvaway@gmail.com
            </p>
            <p className="text-sm text-[#C4D8E5]">
              +972 592128272
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#C4D8E5]">
            © {new Date().getFullYear()} Nova. {t('جميع الحقوق محفوظة', 'All rights reserved')}
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-[#C4D8E5] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
