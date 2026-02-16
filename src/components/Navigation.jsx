import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About Us', path: '/about' },
  { id: 'academics', label: 'Academics', path: '/academics' },
  { id: 'facilities', label: 'Facilities', path: '/facilities' },
  { id: 'gallery', label: 'Gallery', path: '/gallery' },
  { id: 'contact', label: 'Contact Us', path: '/contact' },
  { id: 'faq', label: 'FAQ', path: '/faq' }
];

export const Navigation = ({ isMenuOpen = false, setIsMenuOpen = () => {} }) => {
  const location = useLocation();
  const isFacilityDetail = location.pathname.startsWith('/facilities/');
  const activeSection = isFacilityDetail
    ? 'facilities'
    : navItems.find(item => item.path === location.pathname)?.id || 'home';
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [mouseIdleTimer, setMouseIdleTimer] = useState(null);
  
  // Ensure activeSection is always a string
  const currentSection = typeof activeSection === 'string' ? activeSection : 'home';

  useEffect(() => {
    let mouseIdleTimer;
    const MOUSE_IDLE_TIMEOUT = 2000; // 2 seconds

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Don't hide nav if mobile menu is open
      if (isMenuOpen) {
        setIsNavHidden(false);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      // Show nav when mouse is moving, regardless of scroll
      if (isMouseMoving) {
        setIsNavHidden(false);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      // Hide nav when scrolling down (past 100px threshold)
      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        setIsNavHidden(true);
      }
      // Show nav when scrolling up
      else if (currentScrollPos < prevScrollPos) {
        setIsNavHidden(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    const handleMouseMove = () => {
      // Show nav immediately on mouse move
      setIsNavHidden(false);
      setIsMouseMoving(true);

      // Clear existing timer
      if (mouseIdleTimer) {
        clearTimeout(mouseIdleTimer);
      }

      // Set new timer to hide nav after mouse stops moving
      mouseIdleTimer = setTimeout(() => {
        setIsMouseMoving(false);
        // Only hide if not at the top of the page and not in mobile menu
        if (window.scrollY > 100 && !isMenuOpen) {
          setIsNavHidden(true);
        }
      }, MOUSE_IDLE_TIMEOUT);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseIdleTimer) {
        clearTimeout(mouseIdleTimer);
      }
    };
  }, [prevScrollPos, isMenuOpen, isMouseMoving, mouseIdleTimer]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isNavHidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/Logo.png" 
              alt="Minervaa Vidhya Mandhir Logo" 
              className="h-14 w-auto object-contain"
            />
           
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Main Navigation Items */}
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link key={item.id} to={item.path}>
                  <motion.button
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            {navItems.map((item, index) => (
              <Link key={item.id} to={item.path} onClick={() => setIsMenuOpen(false)}>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full text-left px-6 py-3 font-medium ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </motion.button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
