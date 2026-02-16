import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, Heart, Star, Zap, Rocket, School, ChevronRight, X, Calendar, User, Phone } from 'lucide-react';
import API_URL from '../config/api';

export const HeroSection = () => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    admissionType: '',
    standard: '',
    dateOfBirth: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const admissionLabelMap = {
      'nursery': 'Nursery',
      'jr-kg': 'Jr. KG',
      'sr-kg': 'Sr. KG',
      'primary': 'Primary',
      'secondary': 'Secondary',
    };

    if (!formData.admissionType) {
      alert('Please select an option for "Admission Needed For"');
      return;
    }

    setIsSubmitting(true);

    const friendlyAdmission = admissionLabelMap[formData.admissionType] || 'Not specified';

    const enquiryData = {
      name: formData.name,
      phone: formData.phone,
      admissionType: friendlyAdmission,
      standard: formData.standard || 'Not specified',
      dateOfBirth: formData.dateOfBirth || 'Not specified',
    };

    try {
      const response = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your enquiry! We will contact you soon.');
        setIsEnquiryModalOpen(false);
        setFormData({ name: '', phone: '', admissionType: '', standard: '', dateOfBirth: '' });
      } else {
        alert(data.error || 'Sorry, we could not send your enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Enquiry form error:', error);
      alert('Sorry, we could not send your enquiry. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const floatingIcons = [
    { Icon: BookOpen, color: 'text-blue-500', delay: 0 },
    { Icon: Sparkles, color: 'text-yellow-500', delay: 0.2 },
    { Icon: Heart, color: 'text-pink-500', delay: 0.4 },
    { Icon: Star, color: 'text-purple-500', delay: 0.6 },
    { Icon: Zap, color: 'text-orange-500', delay: 0.8 },
    { Icon: Rocket, color: 'text-green-500', delay: 1 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden scroll-mt-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-pink-900/20"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
          >
            <motion.div 
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <School className="w-24 h-24 mx-auto text-blue-500 drop-shadow-xl" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4 font-playful"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
          >
            <span className="text-white">Minervaa Vidhya Mandhir</span>
          </motion.h1>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-lg" />
            <p className="text-2xl md:text-3xl text-white font-medium" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
              Inspiring Minds, Building Futures
            </p>
            <Sparkles className="w-6 h-6 text-yellow-300 drop-shadow-lg" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/gallery#gallery"
                className="w-56 h-14 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
              >
                Explore Our Campus
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.dispatchEvent(new Event('openAdmission'))}
                className="w-56 h-14 bg-white text-purple-600 rounded-full font-bold text-lg shadow-xl inline-flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                Enroll Now
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              className={`absolute ${color}`}
              style={{
                left: `${10 + index * 15}%`,
                top: `${20 + (index % 2) * 40}%`,
              }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: [0, 360],
              }}
              transition={{
                delay,
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            >
              <motion.div
                animate={{
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Icon className="w-12 h-12 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronRight className="w-8 h-8 text-blue-500 rotate-90" />
      </motion.div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsEnquiryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 font-playful">Admission Enquiry</h2>
                <button
                  onClick={() => setIsEnquiryModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <User className="w-5 h-5 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Admission Type - Radio Buttons */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3">
                    Admission Needed For *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: 'nursery', label: 'Nursery' },
                      { value: 'jr-kg', label: 'Jr. KG' },
                      { value: 'sr-kg', label: 'Sr. KG' },
                      { value: 'primary', label: 'Primary' },
                      { value: 'secondary', label: 'Secondary' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="admissionType"
                          value={option.value}
                          checked={formData.admissionType === option.value}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Standard Dropdown - Only show for secondary */}
                {formData.admissionType === 'secondary' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-gray-700 font-medium mb-2">
                      Standard *
                    </label>
                    <select
                      name="standard"
                      value={formData.standard}
                      onChange={handleInputChange}
                      required={formData.admissionType === 'secondary'}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select Standard</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                      <option value="IX">IX</option>
                      <option value="X">X</option>
                    </select>
                  </motion.div>
                )}

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Student Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
