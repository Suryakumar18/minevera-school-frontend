import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, Lightbulb, Globe, X } from 'lucide-react';

export const VisionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const visions = [
    {
      title: 'Redefining Potential',
      description: 'Redefining student potential and setting new standards for academic and personal achievement.',
      icon: Lightbulb,
      color: 'from-yellow-400 to-orange-600'
    },
    {
      title: 'Tradition Meets Modernity',
      description: 'Blending traditional values with modern global educational standards.',
      icon: Globe,
      color: 'from-green-400 to-emerald-600'
    }
  ];

  return (
    <section className="min-h-screen bg-white pt-32 pb-20 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-4xl">
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
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playful gradient-text">
            Our Vision
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            To create a centre of excellence in education that nurtures disciplined, value-rooted and competent learners, inspired by Indian culture and prepared to meet global challenges with confidence and integrity.
          </p>
        </motion.div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {visions.map((vision, index) => {
            const Icon = vision.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-br ${vision.color} w-fit mb-4`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{vision.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{vision.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-purple-600" />
            Our Vision
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              To create a centre of excellence in education that nurtures disciplined, value-rooted and competent learners, inspired by Indian culture and prepared to meet global challenges with confidence and integrity.
            </p>
            <h3 className="text-2xl font-semibold mt-6 mb-2">Redefining potential</h3>
            <p>
              At our school, we believe every child has unlimited potential—we help redefine it. Redefining potential by nurturing curiosity, discipline and creativity.
            </p>
            <h3 className="text-2xl font-semibold mt-6 mb-2">Tradition meets modernity</h3>
            <p>
              We blend the wisdom of tradition with the skills of modern education. A learning environment where cultural values and modern thinking grow together.
            </p>
            <h3 className="text-2xl font-semibold mt-6 mb-2">Looking towards the future</h3>
            <p>
              At our school, we aspire to create a learning environment where tradition and modernity come together to inspire meaningful education. We believe true success goes beyond academic achievement—it lies in nurturing character, curiosity and confidence in every child.<br />
              By integrating strong cultural values with progressive teaching practices, we empower students to think critically, act responsibly and grow holistically. Our approach encourages intellectual growth while also fostering emotional strength, social awareness and moral integrity.<br />
              We strive to shape future-ready learners who respect their roots, embrace innovation and confidently engage with a rapidly changing world. Our vision is to cultivate lifelong learners who lead with knowledge, compassion and purpose.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
