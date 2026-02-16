import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, Globe, Accessibility, X } from 'lucide-react';

export const DiversityPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const diversityPoints = [
    {
      title: 'Inclusive Environment',
      description: 'Providing a space where children from varied backgrounds receive individualized attention and support.',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Diverse Learning Options',
      description: 'Offering different schooling types, including Montessori options, to suit varying parental preferences and student needs.',
      icon: BookOpen,
      color: 'from-green-400 to-emerald-600'
    },
    {
      title: 'Global Standard',
      description: 'Using English as the medium of instruction to ensure students are prepared for professional endeavors in a diverse global society.',
      icon: Globe,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Equal Opportunity',
      description: 'Creating accessible learning pathways for all students regardless of their background, abilities or circumstances.',
      icon: Accessibility,
      color: 'from-pink-400 to-pink-600'
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
            Diversity & Inclusion
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Celebrating differences and creating an environment where every student thrives.
          </p>
        </motion.div>

        {/* Diversity Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {diversityPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-br ${point.color} w-fit mb-4`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed">{point.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-lg mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Diversity</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h3 className="text-2xl font-semibold mt-4 mb-2">Inclusive environment</h3>
            <p>Our school promotes an inclusive environment that celebrates diversity and encourages mutual respect.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Diverse learning options</h3>
            <p>We provide diverse learning options that combine Montessori teaching, classroom teaching, hands-on activities and digital learning.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Global standard</h3>
            <p>Our academic practices are aligned with global standards to prepare students for a competitive world.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Equal opportunity</h3>
            <p>At our school, opportunity and encouragement are extended to every learner.</p>
            <h3 className="text-2xl font-semibold mt-4 mb-2">Our Commitment to Inclusion</h3>
            <p>
              At Minervaa Vidhya Mandhir, we believe that diversity is a strength that enriches our learning community. We are deeply committed to creating an inclusive environment where students from all backgrounds—cultural, economic and social—feel welcomed, valued and supported.<br />
              An Inclusive Environment means more than just accepting differences; it means actively celebrating them. Every child in our school, regardless of their background, receives individualized attention and support tailored to their unique needs and learning style. We recognize that each student brings valuable perspectives and experiences that enhance our learning community.<br />
              Diverse Learning Options reflect our understanding that children learn differently. By offering various educational approaches, including Montessori programs, we ensure that every student has access to learning methods that suit their individual strengths and preferences. This flexibility allows us to serve families with different educational philosophies and student needs.<br />
              Global Standard Education through English medium instruction prepares our students to engage confidently in the global arena. However, we never lose sight of our cultural roots and values. This balance ensures that students are equipped for international opportunities while remaining grounded in their heritage.<br />
              Equal Opportunity for All is not just a policy—it's a promise. We work tirelessly to remove barriers to access and participation, ensuring that every student has the opportunity to succeed academically and personally, regardless of their circumstances.<br />
              Our diverse community of students, staff and families creates a rich tapestry of experiences and perspectives. This diversity is woven into every aspect of our school life—from our curriculum to our celebrations to our daily interactions. Together, we learn not just from textbooks, but from each other.
            </p>
          </div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Building a Better Future Together</h3>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            By embracing diversity and fostering inclusion, we are preparing students to be global citizens who appreciate, respect and celebrate the rich tapestry of human experience. Our inclusive community is a reflection of the world our students will inherit and lead.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
