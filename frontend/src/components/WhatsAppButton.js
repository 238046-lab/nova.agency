import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/972592128272"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 p-4 bg-[#25D366] rounded-full shadow-lg whatsapp-pulse hover:scale-110 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      data-testid="whatsapp-float-btn"
    >
      <FaWhatsapp className="w-7 h-7 text-white" />
    </motion.a>
  );
};

export default WhatsAppButton;
