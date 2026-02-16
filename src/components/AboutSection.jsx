import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lightbulb, Heart, Award, Globe } from 'lucide-react';

export const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Vision',
      description: 'To nurture young minds and inspire them to become confident, creative and compassionate individuals.',
      color: 'from-yellow-400 to-orange-500',
      link: '/vision'
    },
    {
      icon: Heart,
      title: 'Mission',
      description: 'Providing quality education with a focus on holistic development, creativity and character building.',
      color: 'from-pink-400 to-red-500',
      link: '/mission'
    },
    {
      icon: Award,
      title: 'Values',
      description: 'Excellence, Integrity, Respect, Innovation and Empathy form the foundation of our institution.',
      color: 'from-blue-400 to-purple-500',
      link: '/values'
    },
    {
      icon: Globe,
      title: 'Diversity',
      description: 'We celebrate diversity and foster an inclusive environment where every student feels valued and respected, regardless of their background or abilities.',
      color: 'from-green-400 to-teal-500',
      link: '/diversity'
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 font-playful">
            <span className="gradient-text">About Our School</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to Minervaa Vidhya Mandhir, where learning meets joy and every day is an adventure!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative"
            >
              <Link to={value.link} className="block h-full">
                <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-transparent hover:border-blue-200 h-full cursor-pointer">
                  <motion.div
                    className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  <motion.div
                    className="inline-flex items-center space-x-2 text-blue-600 font-semibold mt-4"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
