import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { href: '#about', label: t('من نحن', 'About') },
    { href: '#services', label: t('خدماتنا', 'Services') },
    { href: '#portfolio', label: t('أعمالنا', 'Portfolio') },
    { href: '#contact', label: t('تواصل معنا', 'Contact') }
  ];

  const socials = [
    { icon: FaWhatsapp, href: 'https://wa.me/972592128272' },
    { icon: FaInstagram, href: 'https://www.instagram.com/nova.co.web?igsh=c2w1NjQ2OWMxcWY1' }
  ];

  return (
    <footer className="py-12 bg-[#1C2B48] border-t border-[#8EB1D1]/20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div>
            <a href="#" className="text-2xl font-bold text-[#E8ECEF]">Nova</a>
            <p className="text-sm text-[#C4D8E5] mt-2">
              {t('نبني المستقبل الرقمي', 'Building the digital future')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#C4D8E5] hover:text-[#E8ECEF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-end gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#8EB1D1]/20 rounded-lg hover:bg-[#8EB1D1]/30 transition-colors"
              >
                <social.icon className="w-5 h-5 text-[#8EB1D1]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#8EB1D1]/20 text-center">
          <p className="text-sm text-[#C4D8E5]">
            © {new Date().getFullYear()} Nova. {t('جميع الحقوق محفوظة', 'All rights reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
