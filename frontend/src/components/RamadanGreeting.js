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
            
            onClick={() => setIsVisible(false)}
          >
            

            <span 
              className="text-sm sm:text-lg font-bold"
              
            >
            </span>

           

            

            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RamadanGreeting;
