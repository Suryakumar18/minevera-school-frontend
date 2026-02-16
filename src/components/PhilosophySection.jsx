import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users } from 'lucide-react';

export const PhilosophySection = () => {
  const philosophyItems = [
    {
      title: 'Mission',
      subtitle: 'Our Purpose',
      description: 'Provide a safe, engaging environment where every child discovers their potential.',
      icon: Target,
      color: 'from-blue-400 to-blue-600',
      link: '/mission'
    },
    {
      title: 'Vision',
      subtitle: 'Our Future',
      description: 'Build a learning culture that shapes responsible citizens and lifelong learners.',
      icon: Eye,
      color: 'from-purple-400 to-purple-600',
      link: '/vision'
    },
    {
      title: 'Values',
      subtitle: 'Our Principles',
      description: 'Holistic development, character building, cultural awareness, and community welfare.',
      icon: Heart,
      color: 'from-pink-400 to-pink-600',
      link: '/values'
    },
    {
      title: 'Diversity',
      subtitle: 'Our Community',
      description: 'Inclusive environment where students from all backgrounds thrive together.',
      icon: Users,
      color: 'from-green-400 to-green-600',
      link: '/diversity'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 font-playful">
            <span className="gradient-text">Our Philosophy</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guided by our mission, vision, and values to provide transformative education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={item.link} className="block h-full">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${item.color} w-fit mb-4`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-purple-600 font-semibold mb-3">{item.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                      {item.description}
                    </p>
                    <motion.div
                      className="inline-flex items-center space-x-2 text-purple-600 font-semibold"
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
