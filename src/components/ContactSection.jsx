import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import API_URL from '../config/api';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      const response = await fetch(`http://localhost:5000/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your message! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert(data.error || 'Sorry, we could not send your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Sorry, we could not send your message. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: '2X9+75Q, Jothi Nagar, Pollachi, Tamil Nadu 642001',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91-9994959484',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Phone,
      title: 'Alternative Phone',
      content: '+91-9894886733',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'minervaavidhyamandhir@gmail.com',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const socialMedia = [
    { icon: Facebook, color: 'bg-blue-600', label: 'Facebook', href: 'https://www.facebook.com/minervaaschool' },
    { icon: Instagram, color: 'bg-pink-600', label: 'Instagram', href: 'https://www.instagram.com/minervaa_vidhya_mandhir?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { icon: Youtube, color: 'bg-red-600', label: 'YouTube', href: 'https://youtube.com/@mvmschoolpollachi?si=cgSRKz5pHYW0TYdD' }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 scroll-mt-24 relative z-30 overflow-x-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 p-4 rounded-lg shadow-lg pointer-events-auto">
            <div role="status" aria-label="Loading" className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 font-playful">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="+91 1234567890"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${info.color}`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                {socialMedia.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`${social.color} text-white p-4 rounded-xl shadow-lg flex items-center justify-center`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Section with Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Find Us Here</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Map in Square View */}
              <div className="flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.1145329945607!2d77.01541767480299!3d10.64820958949289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba837645bed4889%3A0x97b7f04ee4177b85!2sMinerva%20School%2Cjothinagar%2Cpollachi!5e0!3m2!1sen!2sin!4v1770132946592!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Minervaa Vidhya Mandhir Location"
                  ></iframe>
                </motion.div>
                <div className="mt-4">
                  <motion.a
                    href="https://www.google.com/maps/dir/?api=1&destination=10.649279024249184,77.01923534494344"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Side - Inspirational Quotes */}
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-md"
                >
                  <div className="text-6xl mb-4">📚</div>
                  <blockquote className="text-lg md:text-xl font-semibold text-gray-800 mb-2 italic">
                    "Education is the most powerful weapon which you can use to change the world."
                  </blockquote>
                  <p className="text-gray-600 font-medium">— Nelson Mandela</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6 shadow-md"
                >
                  <div className="text-6xl mb-4">🌟</div>
                  <blockquote className="text-lg md:text-xl font-semibold text-gray-800 mb-2 italic">
                    "Every child is a different kind of flower, and all together make this world a beautiful garden."
                  </blockquote>
                  <p className="text-gray-600 font-medium">— Anonymous</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 shadow-md"
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <blockquote className="text-lg md:text-xl font-semibold text-gray-800 mb-2 italic">
                    "The future belongs to those who believe in the beauty of their dreams."
                  </blockquote>
                  <p className="text-gray-600 font-medium">— Eleanor Roosevelt</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
