import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RamadanGreeting = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100]"
        >
          <div 
            className="relative px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #1C2B48 0%, #0f172a 100%)',
              border: '1px solid rgba(142, 177, 209, 0.4)'
            }}
            onClick={() => setIsVisible(false)}
            data-testid="ramadan-greeting"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(142, 177, 209, 0.5))' }}>
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
              className="text-lg font-bold"
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#A7C7E7">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#8EB1D1">
                <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-1 -left-1"
              animate={{ scale: [1, 0.8, 1], rotate: [0, -180, -360] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#A7C7E7" fillOpacity="0.6">
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
