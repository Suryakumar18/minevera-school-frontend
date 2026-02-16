import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, Users, Award, Sparkles } from 'lucide-react';

export const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Gardening',
      description: 'Our students explore nature and learn through gardening activities',
      thumbnail: 'from-blue-400 to-blue-600',
      icon: Film,
      videoId: 'o55qCxI3riI',
      customCover: '/gardening-cover.jpg', // Custom cover image in public folder
    },
    {
      id: 2,
      title: 'Diwali Celebration',
      description: 'Watch our students celebrate Diwali with joy and cultural pride',
      thumbnail: 'from-green-400 to-green-600',
      icon: Users,
      videoId: 'nv2Cb1IS9bA',
    },
    {
      id: 3,
      title: 'Annual Day Celebration',
      description: 'Highlights from our grand annual day event',
      thumbnail: 'from-purple-400 to-purple-600',
      icon: Sparkles,
      videoId: 'TjIeZ4ZB2w8',
    },
    {
      id: 4,
      title: 'School Overview',
      description: 'Discover Minervaa Vidhya Mandhir - Where Learning Meets Joy',
      thumbnail: 'from-orange-400 to-orange-600',
      icon: Award,
      videoId: 'eATH9UUNlZM',
    },
    {
      id: 5,
      title: 'Field Trip',
      description: 'Our students explore and learn through exciting field trip experiences',
      thumbnail: 'from-pink-400 to-pink-600',
      icon: Film,
      videoId: 'sQj-mgkdhAk',
    },
    {
      id: 6,
      title: 'Happy Independence Day',
      description: 'Our students celebrate Independence Day with patriotic spirit and joy',
      thumbnail: 'from-yellow-400 to-yellow-600',
      icon: Sparkles,
      videoId: 'FrIs130k9oQ',
    },
  ];

  return (
    <section id="videos" className="py-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Video Thumbnail */}
                <div className="relative h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={video.customCover || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to YouTube thumbnail if custom cover fails
                      if (video.customCover && e.target.src === video.customCover) {
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
                      } else {
                        // Fallback to hqdefault if maxresdefault is not available
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="bg-white/90 backdrop-blur-sm rounded-full p-6"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Play className="w-12 h-12 text-blue-600" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">{video.description}</p>
                  <motion.div
                    className="mt-4 flex items-center text-blue-600 font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    <span>Watch Now</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Video Title */}
                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-300">{selectedVideo.description}</p>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
