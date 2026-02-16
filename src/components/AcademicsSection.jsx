import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookOpen, GraduationCap, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const AcademicsSection = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const academicLevels = [
    {
      title: 'Pre School',
      subtitle: 'KGs',
      description: 'A nurturing environment where young children learn through play, exploration and joyful discovery while developing essential social and motor skills.',
      color: 'from-pink-400 to-rose-500',
      icon: Heart,
      features: ['Play-based Learning', 'Creative Arts', 'Music & Movement', 'Social Development'],
    },
    {
      title: 'Primary School',
      subtitle: 'Grades 1-5',
      description: 'Building strong academic foundations with engaging lessons, hands-on projects and a focus on curiosity and critical thinking for lifelong learning.',
      color: 'from-blue-400 to-cyan-500',
      icon: BookOpen,
      features: ['Core Subjects', 'STEM Projects', 'Reading Programs', 'Sports Activities'],
    },
    {
      title: 'Middle & High School',
      subtitle: 'Grades 6-8',
      description: 'Advanced curriculum with specialized subjects, career guidance and extracurricular activities to prepare students for higher education.',
      color: 'from-purple-400 to-indigo-500',
      icon: GraduationCap,
      features: ['Advanced Subjects', 'Career Counseling', 'Competitive Exam Prep', 'Leadership Programs'],
    },
  ];

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedLevel((prev) => (prev + 1) % academicLevels.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [academicLevels.length]);

  const nextSlide = () => {
    setSelectedLevel((prev) => (prev + 1) % academicLevels.length);
  };

  const prevSlide = () => {
    setSelectedLevel((prev) => (prev - 1 + academicLevels.length) % academicLevels.length);
  };

  return (
    <section id="academics" className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 font-playful">
            <span className="gradient-text">Our Educational Programs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive education for play school, pre school and primary school students with age-appropriate learning programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-lg text-gray-800">Curriculum</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Follows the CBSE framework with English as the primary medium of instruction.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <h3 className="font-bold text-lg text-gray-800">Levels of Schooling</h3>
              </div>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Kindergarten</li>
                <li>Primary School</li>
                <li>Secondary School</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="font-bold text-lg text-gray-800">Key Focus Areas</h3>
              </div>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Discipline</li>
                <li>Academic excellence</li>
                <li>English communication</li>
                <li>Sports</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Slideshow Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all text-blue-600"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="flex gap-2">
            {academicLevels.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedLevel(index)}
                className={`h-3 rounded-full transition-all ${
                  selectedLevel === index ? 'w-8 bg-blue-600' : 'w-3 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all text-blue-600"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {academicLevels.map((level, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedLevel(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                selectedLevel === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl'
                  : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {level.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className={`p-8 rounded-3xl bg-gradient-to-br ${academicLevels[selectedLevel].color}`}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {React.createElement(academicLevels[selectedLevel].icon, {
                  className: 'w-24 h-24 text-white',
                })}
              </motion.div>

              <div className="flex-1">
                <h3 className="text-4xl font-bold mb-2 font-playful">
                  {academicLevels[selectedLevel].title}
                </h3>
                <p className="text-xl text-blue-600 mb-4 font-semibold">
                  {academicLevels[selectedLevel].subtitle}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {academicLevels[selectedLevel].description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {academicLevels[selectedLevel].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
