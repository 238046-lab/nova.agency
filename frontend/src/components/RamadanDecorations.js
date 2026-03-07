import React from 'react';
import { motion } from 'framer-motion';

const RamadanDecorations = () => {
  // Decorations with different positions and delays
  const decorations = [
    { type: 'crescent', x: '5%', delay: 0, size: 40, color: '#8EB1D1' },
    { type: 'star', x: '12%', delay: 0.2, size: 20, color: '#A7C7E7' },
    { type: 'lantern', x: '20%', delay: 0.4, size: 50, color: '#8EB1D1' },
    { type: 'star', x: '28%', delay: 0.1, size: 16, color: '#1C2B48' },
    { type: 'crescent', x: '35%', delay: 0.3, size: 30, color: '#A7C7E7' },
    { type: 'star', x: '45%', delay: 0.5, size: 24, color: '#8EB1D1' },
    { type: 'lantern', x: '55%', delay: 0.2, size: 45, color: '#A7C7E7' },
    { type: 'star', x: '65%', delay: 0.4, size: 18, color: '#1C2B48' },
    { type: 'crescent', x: '72%', delay: 0.1, size: 35, color: '#8EB1D1' },
    { type: 'star', x: '80%', delay: 0.3, size: 22, color: '#A7C7E7' },
    { type: 'lantern', x: '88%', delay: 0.5, size: 48, color: '#8EB1D1' },
    { type: 'star', x: '95%', delay: 0.2, size: 20, color: '#1C2B48' },
  ];

  const renderDecoration = (item, index) => {
    const stringLength = 30 + Math.random() * 40;

    return (
      <motion.div
        key={index}
        className="absolute top-0"
        style={{ left: item.x }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: item.delay, 
          duration: 0.8, 
          type: 'spring', 
          bounce: 0.4 
        }}
      >
        {/* String */}
        <div 
          className="w-px mx-auto"
          style={{ 
            height: stringLength,
            background: `linear-gradient(to bottom, transparent, ${item.color}40)`
          }}
        />
        
        {/* Decoration */}
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, 3, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {item.type === 'crescent' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
              <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
          )}
          
          {item.type === 'star' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill={item.color}>
              <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"/>
            </svg>
          )}
          
          {item.type === 'lantern' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="none">
              {/* Lantern top */}
              <path d="M10 4H14L15 6H9L10 4Z" fill={item.color}/>
              {/* Lantern body */}
              <path d="M8 6H16V8C16 8 17 10 17 13C17 16 16 18 16 18H8C8 18 7 16 7 13C7 10 8 8 8 8V6Z" fill={item.color} fillOpacity="0.3" stroke={item.color} strokeWidth="1"/>
              {/* Lantern inner glow */}
              <ellipse cx="12" cy="12" rx="3" ry="4" fill={item.color} fillOpacity="0.5"/>
              {/* Lantern bottom */}
              <path d="M9 18H15L14 21H10L9 18Z" fill={item.color}/>
              {/* Decorative lines */}
              <path d="M8 10H16M8 14H16" stroke={item.color} strokeWidth="0.5" strokeOpacity="0.5"/>
            </svg>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none overflow-hidden z-10">
      {decorations.map((item, index) => renderDecoration(item, index))}
    </div>
  );
};

export default RamadanDecorations;
