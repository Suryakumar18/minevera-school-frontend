import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const footerLinks = [
    { title: 'Home', path: '/#home' },
    { title: 'About Us', path: '/about#about' },
    { title: 'Academics', path: '/academics#academics' },
    { title: 'Facilities', path: '/facilities#facilities' },
    { title: 'Gallery', path: '/gallery#gallery' },
    { title: 'FAQ', path: '/faq#faq' },
    { title: 'Contact', path: '/contact#contact' },
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', color: 'bg-blue-600', href: 'https://www.facebook.com/minervaaschool' },
    { icon: Instagram, label: 'Instagram', color: 'bg-pink-600', href: 'https://www.instagram.com/minervaa_vidhya_mandhir?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { icon: Youtube, label: 'YouTube', color: 'bg-red-600', href: 'https://youtube.com/@mvmschoolpollachi?si=cgSRKz5pHYW0TYdD' },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/Logo.png"
                alt="Minervaa Vidhya Mandhir"
                className="h-14 w-auto object-contain bg-white rounded-xl p-2"
              />
            </div>
            <p className="text-blue-200 leading-relaxed">
              Inspiring minds and building futures through quality education and holistic development.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`${social.color} text-white p-3 rounded-xl shadow-lg flex items-center justify-center`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-4">School Hours</h4>
            <div className="space-y-2 text-blue-200">
              <p>Monday - Saturday: 8:40 AM to 4:00 PM — UKG to 8th Standard</p>
              <p>Monday - Saturday: 8:40 AM to 3:00 PM — LKG</p>
              <p>Sunday: Holiday</p>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-4">Find Us</h4>
            <div className="rounded-xl overflow-hidden shadow-lg h-48">
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
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=10.649279024249184,77.01923534494344"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-blue-200 hover:text-white transition-colors text-sm underline"
            >
              Get Directions →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-blue-700 pt-8 text-center"
        >
          <p className="text-blue-200 flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <span>by</span>
            <a href="https://sayvai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:underline">
              Sayvai Software LLP
            </a>
          </p>
          <p className="text-blue-300 mt-2">
            © 2025 Minervaa Vidhya Mandhir. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
