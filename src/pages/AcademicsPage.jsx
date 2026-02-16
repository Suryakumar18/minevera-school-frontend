import React from 'react';
import { motion } from 'framer-motion';
import { AcademicsSection } from '../components/AcademicsSection';

export const AcademicsPage = () => {
  return (
    <div className="pt-20">
      <AcademicsSection />
      <section id="school-hours" className="py-6 bg-white mt-2">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-block"
            >
            
            </motion.div>
            


          </div>
        </div>
      </section>
    </div>
  );
};
