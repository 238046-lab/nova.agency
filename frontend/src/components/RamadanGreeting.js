import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RamadanGreeting = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]"
          data-testid="ramadan-greeting"
        >
          <div 
            className="relative px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #1C2B48 0%, #0f172a 100%)',
              border: '1px solid rgba(142, 177, 209, 0.4)'
            }}
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(142, 177, 209, 0.5))' }}>
                <defs>
                  <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A7C7E7" />
                    <stop offset="100%" stopColor="#8EB1D1" />
                  </linearGradient>
                </defs>
                <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" fill="url(#moonGrad)"/>
              </svg>
            </motion.div>

            <span 
              className="text-sm sm:text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #A7C7E7 0%, #8EB1D1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              رمضان كريم
            </span>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="#A7C7E7">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 24 24" fill="#8EB1D1">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-1 -left-1"
              animate={{ scale: [1, 0.8, 1], rotate: [0, -180, -360] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2" viewBox="0 0 24 24" fill="#A7C7E7" fillOpacity="0.6">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RamadanGreeting;
