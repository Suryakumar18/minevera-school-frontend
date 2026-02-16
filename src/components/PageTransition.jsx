import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export const PageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);


  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center">
          {/* Glass Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-md"
          />

          {/* Tree Image - Centered */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.7, 1.2, 0.7], opacity: [0, 1, 0] }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 2, times: [0, 0.5, 1], ease: 'easeInOut' }}
            className="relative z-10 pointer-events-none"
          >
            <img 
              src="/tree.png" 
              alt="Tree" 
              className="w-40 h-40 md:w-56 md:h-56 object-contain"
            />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
