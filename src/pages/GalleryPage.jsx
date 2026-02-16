import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Video } from 'lucide-react';
import { GallerySection } from '../components/GallerySection';
import { VideosSection } from '../components/VideosSection';

export const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('photos');

  return (
    <div className="pt-20">
      {/* Header with Tabs */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-4 font-playful">
              <span className="gradient-text">Gallery & Videos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our vibrant school events, celebrations, and memorable moments
            </p>
          </div>
          
          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Image className="w-6 h-6" />
              <span>Photos</span>
              {activeTab === 'photos' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Video className="w-6 h-6" />
              <span>Videos</span>
              {activeTab === 'videos' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'photos' ? <GallerySection /> : <VideosSection />}
      </motion.div>
    </div>
  );
};
