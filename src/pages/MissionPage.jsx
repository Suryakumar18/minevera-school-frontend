import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, Sparkles, X } from 'lucide-react';

export const MissionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Mission points replaced with detailed mission content below

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
            Our Mission
          </h1>
        </motion.div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-lg mb-12">
          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2 mb-6">
            <li>To provide CBSE-aligned education that promotes academic excellence and conceptual clarity.</li>
            <li>To insist Indian values, ethics and cultural heritage in every learner.</li>
            <li>To foster discipline, respect, responsibility and empathy as core life values.</li>
            <li>To encourage critical thinking, creativity and problem-solving skills.</li>
            <li>To ensure holistic development through academics, co-curricular activities, yoga, sports and life skills.</li>
            <li>To build a strong partnership between school, parents and society for the child’s overall growth.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Strong Educational Foundation</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>We believe every child deserves a strong educational foundation to grow, succeed and lead.</li>
            <li>Our school focuses on building strong foundations that support lifelong curiosity and confidence.</li>
            <li>A strong educational foundation today shapes responsible leaders of tomorrow.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Well Rounded Individuals</h2>
          <p className="text-gray-700 mb-6">Our mission is to nurture well-rounded individuals by providing balanced education that promotes academic excellence, strong values, emotional intelligence and social responsibility.</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Excellence in Education</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>We strive for excellence in education by nurturing curiosity, discipline and lifelong learning.</li>
            <li>Our commitment to excellence in education shapes confident and capable learners.</li>
          </ul>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Our Commitment</h2>
          <p className="text-gray-700">
            At our school, we are dedicated to shaping an educational experience that extends beyond textbooks and classrooms. Every decision we make is guided by our commitment to holistic development, ensuring that learning nurtures intellect, character and creativity.<br/>
            We believe education should ignite curiosity, encourage independent thinking and instil a sense of responsibility toward society. Through thoughtfully designed learning programs, student-centric teaching practices and continuous mentorship, we help each child recognise their strengths and unlock their full potential.<br/>
            Our commitment to excellence is reflected in our supportive learning environment, innovative methodologies and unwavering care for every learner. We strive to create a school culture where students feel valued, confident and inspired to grow into capable, compassionate individuals ready to meet the future.
          </p>
        </div>

        
      </div>
    </section>
  );
};
