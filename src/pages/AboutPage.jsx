import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Target, Heart, Sparkles, TrendingUp, Shield } from 'lucide-react';

const AnimatedCounter = ({ target, suffix = '', duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset count when entering view
          setCount(0);
          
          setTimeout(() => {
            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
              if (!startTime) startTime = currentTime;
              const progress = Math.min((currentTime - startTime) / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * target));

              if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            animationFrame = requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [target, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const AboutPage = () => {
  const stats = [
    { target: 25, suffix: '+', label: 'Years of Excellence' },
    { target: 250, suffix: '+', label: 'Happy Students' },
    { target: 20, suffix: '+', label: 'Dedicated Staff' },
    { target: 100, suffix: '%', label: 'Success Rate' }
  ];

  const highlights = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'To be a leading educational institution that nurtures young minds, fostering critical thinking, creativity and compassion to shape future leaders.',
      link: '/vision'
    },
    {
      icon: Heart,
      title: 'Our Mission',
      description: 'To provide exceptional education in a safe and inspiring environment, empowering students to achieve their full potential academically, socially and emotionally.',
      link: '/mission'
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Integrity, Excellence, Respect, Innovation and Compassion guide everything we do, creating a strong foundation for lifelong learning.',
      link: '/values'
    },
    {
      icon: Users,
      title: 'Diversity & Inclusion',
      description: 'We embrace diversity and celebrate differences, creating an inclusive community where every student feels valued, respected and empowered to succeed.',
      link: '/diversity'
    }
  ];

  const whyChooseUs = [
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'CBSE curriculum enhanced with modern teaching methodologies, digital learning and skill development programs.'
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: 'Highly qualified and passionate teachers committed to bringing out the best in every student through personalized attention.'
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'CCTV surveillance, trained security, medical facilities and a zero-tolerance policy for bullying ensure student safety.'
    },
    {
      icon: TrendingUp,
      title: 'Holistic Development',
      description: 'Beyond academics, we focus on sports, arts, life skills and character building for well-rounded personality development.'
    },
    {
      icon: Sparkles,
      title: 'Modern Infrastructure',
      description: 'Well-equipped classrooms, science labs, computer labs, library, sports facilities and activity rooms provide optimal learning experiences.'
    },
    {
      icon: Heart,
      title: 'Caring Community',
      description: 'A warm, nurturing environment where students, teachers and parents work together as a family to support each child\'s growth.'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6"
          >
            <BookOpen className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Welcome to Minervaa School
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            A place where young minds blossom, dreams take flight and futures are shaped with care, dedication and excellence.
          </p>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            At Minervaa Vidhya Mandhir, we believe that every child is unique and deserves an education that celebrates their individuality 
            while nurturing their talents. Since our establishment, we have been committed to providing quality education that goes beyond 
            textbooks, fostering critical thinking, creativity and strong moral values.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-center shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2000} delay={index * 100} />
              </div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Why Choose Minervaa School?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-purple-200"
            >
              <motion.div 
                className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl inline-block mb-4"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                <item.icon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-3 text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.15 + 0.3 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Learning Community
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Experience the Minervaa difference. Schedule a visit to see our facilities and meet our dedicated team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              to="/facilities"
              className="px-8 py-4 bg-purple-700 text-white font-bold rounded-full hover:bg-purple-800 transition-colors duration-300 shadow-lg"
            >
              Explore Facilities
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
