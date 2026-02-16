import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X } from 'lucide-react';
import { getCoverUrl, getFullSizeUrl } from '../config/cloudinary';
import { galleryEventsConfig } from '../config/galleryConfig';

// Custom mapping for event button to folder
const eventFolderOverride = {
  // Add more overrides here if needed
};

export const GallerySection = () => {
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load gallery events with dynamic images
  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/gallery-manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          // Build a normalized manifest map to avoid case/spacing mismatches
          const normalizedManifest = Object.keys(manifest).reduce((acc, k) => {
            acc[k.trim().toLowerCase()] = manifest[k];
            return acc;
          }, {});
          const eventsWithImages = galleryEventsConfig.map(event => {
            // Determine folder key (prefer override), normalize for lookup
            const rawFolder = eventFolderOverride[event.folder?.toLowerCase()] || event.folder || '';
            const folderKeyNormalized = rawFolder.trim().toLowerCase();
            const images = normalizedManifest[folderKeyNormalized] || manifest[rawFolder] || [];
            // Cover selection rules:
            // - `award-day`: last image
            // - `independence-day`: second image (images[1]) if available, otherwise first
            // - `rainbow-day`: seventh image (images[6]) if available, otherwise first
            // - others: first image
            let cover = null;
            if (images.length > 0) {
              if (event.id === 'award-day') {
                cover = images[images.length - 1];
              } else if (event.id === 'independence-day') {
                cover = images.length > 1 ? images[1] : images[0];
              } else if (event.id === 'rainbow-day') {
                cover = images.length > 6 ? images[6] : images[0];
              } else if (event.id === 'pongal') {
                cover = images.length > 6 ? images[6] : images[0];
              } else if (event.id === 'vijayadhasamy') {
                cover = images.length > 6 ? images[6] : images[0];
              } else {
                cover = images[0];
              }
            }
            return {
              ...event,
              images,
              cover
            };
          });
          setGalleryEvents(eventsWithImages);
        } else {
          setGalleryEvents(galleryEventsConfig.map(event => ({
            ...event,
            images: []
          })));
        }
      } catch (error) {
        setGalleryEvents(galleryEventsConfig.map(event => ({
          ...event,
          images: []
        })));
      }
    };
    loadGalleryData();
  }, []);
  // Modal for selected event
  const [matchedFiles, setMatchedFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const TOUCH_THRESHOLD = 50; // px

  // Keyboard navigation for preview modal
  useEffect(() => {
    if (!previewImage) return;
    const handleKey = (e) => {
      if (!matchedFiles || matchedFiles.length === 0) return;
      if (e.key === 'ArrowLeft') {
        if (previewIndex == null) return;
        const prev = (previewIndex - 1 + matchedFiles.length) % matchedFiles.length;
        setPreviewIndex(prev);
        setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[prev]));
      } else if (e.key === 'ArrowRight') {
        if (previewIndex == null) return;
        const next = (previewIndex + 1) % matchedFiles.length;
        setPreviewIndex(next);
        setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[next]));
      } else if (e.key === 'Escape') {
        setPreviewImage(null);
        setPreviewIndex(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [previewImage, previewIndex, matchedFiles, selectedEvent]);
  useEffect(() => {
    if (selectedEvent) {
      fetch(`/gallery-manifest.json`).then(res => res.json()).then(manifest => {
        const normalizedManifest = Object.keys(manifest).reduce((acc, k) => { acc[k.trim().toLowerCase()] = manifest[k]; return acc; }, {});
        const rawFolder = eventFolderOverride[selectedEvent.folder?.toLowerCase()] || selectedEvent.folder || '';
        const folderKeyNormalized = rawFolder.trim().toLowerCase();
        setMatchedFiles(normalizedManifest[folderKeyNormalized] || manifest[rawFolder] || []);
      });
    } else {
      setMatchedFiles([]);
      setPreviewImage(null);
    }
  }, [selectedEvent]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedEvent]);

  return (
    <section id="gallery" className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => event.images.length > 0 && setSelectedEvent(event)}
              onTouchStart={() => event.images.length > 0 && setSelectedEvent(event)}
              className={`relative overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200 ${event.images.length > 0 ? 'cursor-pointer' : 'opacity-75'} group h-64`}
            >
              {/* Cover Photo or Placeholder */}
              <div className="absolute inset-0">
                {event.images.length > 0 ? (
                  <>
                    <img
                      src={getCoverUrl(event.folder, event.cover || event.images[0])}
                      alt={`${event.title} cover`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${event.color} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium opacity-70">No photos yet</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-4 text-white z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                  <Image className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{event.title}</p>
                  <p className="text-sm text-white/90">{event.images.length} {event.images.length === 1 ? 'photo' : 'photos'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for selected event */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative max-h-[80vh] overflow-hidden">
                {/* Close Button - always visible, larger and more prominent */}
                <button
                  className="absolute top-20 right-4 text-gray-700 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close event modal"
                  type="button"
                >
                  <X className="w-7 h-7" />
                </button>
                {/* Scrollable content area */}
                <div className="overflow-y-auto max-h-[68vh] pr-2">
                  {/* Move event name downward */}
                  <h2 className="text-2xl font-bold mt-8 mb-6 text-center">{selectedEvent.title}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {matchedFiles.length > 0 ? matchedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => { setPreviewIndex(idx); setPreviewImage(getFullSizeUrl(selectedEvent.folder, file)); }}
                        onTouchStart={() => { setPreviewIndex(idx); setPreviewImage(getFullSizeUrl(selectedEvent.folder, file)); }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open image ${idx + 1} of ${matchedFiles.length}`}
                      >
                        <img src={getCoverUrl(selectedEvent.folder, file)} alt={file} className="w-full h-40 object-cover" />
                      </div>
                    )) : <div className="text-gray-400 col-span-full text-center">No images found</div>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview Modal */}
        <AnimatePresence>
          {previewImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
              onTouchStart={(e) => {
                if (!e.touches || e.touches.length === 0) return;
                setTouchStartX(e.touches[0].clientX);
                setTouchEndX(null);
              }}
              onTouchMove={(e) => {
                if (!e.touches || e.touches.length === 0) return;
                setTouchEndX(e.touches[0].clientX);
              }}
              onTouchEnd={() => {
                if (touchStartX == null || touchEndX == null) return;
                const delta = touchEndX - touchStartX;
                if (Math.abs(delta) > TOUCH_THRESHOLD && matchedFiles && matchedFiles.length > 0) {
                  if (delta > 0) {
                    // swipe right -> previous
                    const prev = (previewIndex - 1 + matchedFiles.length) % matchedFiles.length;
                    setPreviewIndex(prev);
                    setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[prev]));
                  } else {
                    // swipe left -> next
                    const next = (previewIndex + 1) % matchedFiles.length;
                    setPreviewIndex(next);
                    setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[next]));
                  }
                }
                setTouchStartX(null);
                setTouchEndX(null);
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full relative flex flex-col items-center">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={() => { setPreviewImage(null); setPreviewIndex(null); }}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Prev button */}
                <button
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                  onClick={() => {
                    if (previewIndex == null) return;
                    const nextIndex = (previewIndex - 1 + matchedFiles.length) % matchedFiles.length;
                    setPreviewIndex(nextIndex);
                    setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[nextIndex]));
                  }}
                >
                  ‹
                </button>

                {/* Next button */}
                <button
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                  onClick={() => {
                    if (previewIndex == null) return;
                    const nextIndex = (previewIndex + 1) % matchedFiles.length;
                    setPreviewIndex(nextIndex);
                    setPreviewImage(getFullSizeUrl(selectedEvent.folder, matchedFiles[nextIndex]));
                  }}
                >
                  ›
                </button>

                <img src={previewImage} alt="Preview" className="w-full h-auto max-h-[80vh] rounded-xl mb-4 object-contain" />
                <div className="text-sm text-gray-600">{previewIndex != null ? `${previewIndex + 1} / ${matchedFiles.length}` : ''}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
