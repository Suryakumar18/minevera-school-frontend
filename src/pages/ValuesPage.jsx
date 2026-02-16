import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Book, Users, Award, Leaf, X } from 'lucide-react';

export const ValuesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const values = [
    {
      title: 'Holistic Development',
      description: 'Balancing academics with creativity, physical growt and ethics to create well-rounded individuals.',
      icon: Heart,
      color: 'from-red-400 to-red-600'
    },
    {
      title: 'Character Building',
      description: 'Actively conducting activities to strengthen students\' morals and social responsibility.',
      icon: Award,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Cultural Awareness',
      description: 'Integrating tradition into learning through celebrations like Karthigai Deepam to nurture cultural understanding.',
      icon: Book,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Discipline and Neatness',
      description: 'Emphasizing personal standards alongside academic growth for overall development.',
      icon: Leaf,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Community Welfare',
      description: 'Nurturing social change through community-based projects and social responsibility.',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    }
  ];

  return (
    <section className="min-h-screen bg-white pt-32 pb-20 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Exit Button */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-28 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          title="Close"
        >
          <X className="w-6 h-6 text-gray-600" />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playful gradient-text">
            Our Core Values
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            These principles guide everything we do and shape the culture of our school community.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${value.color} w-fit mb-4`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-semibold mt-4 mb-2">Holistic development</h3>
            <p>We believe true education promotes holistic development by nurturing academic excellence alongside emotional intelligence, physical well-being, creativity and strong values, empowering students to grow into balanced and responsible individuals.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Character building</h3>
            <ul className="list-disc pl-6 mb-2">
              <li>Guiding students to develop strong character and ethical values.</li>
              <li>Encouraging character building through everyday learning experiences.</li>
            </ul>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Cultural awareness</h3>
            <p>Our focus on cultural awareness helps students respect their heritage, appreciate diversity and grow into socially responsible individuals.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Discipline and neatness</h3>
            <p>Our emphasis on discipline and neatness nurtures organised, responsible and confident learners.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Community welfare</h3>
            <ul className="list-disc pl-6">
              <li>Encouraging students to contribute positively to community welfare.</li>
              <li>Teaching students the importance of giving back to society.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
