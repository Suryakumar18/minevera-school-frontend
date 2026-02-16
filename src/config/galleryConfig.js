// Gallery configuration with event details
export const galleryEventsConfig = [
  { 
    id: 'independence-day', 
    title: 'Independence Day', 
    color: 'from-emerald-500 to-lime-500', 
    folder: 'independence day', 
  },
  { 
    id: 'rainbow-day', 
    title: 'Rainbow Day', 
    color: 'from-pink-500 to-red-500', 
    folder: 'rainbow day', 
  },
  { 
    id: 'bharathiyar-celebration', 
    title: 'Bharathiyar Celebration Day', 
    color: 'from-orange-500 to-yellow-500', 
    folder: 'bharathiyar celebration day', 
  },
  { 
    id: 'vijayadhasamy', 
    title: 'Vijayadhasamy', 
    color: 'from-purple-500 to-fuchsia-600', 
    folder: 'vijayadhasamy', 
  },
  { 
    id: 'food-festival', 
    title: 'food festival', 
    color: 'from-rose-500 to-pink-600', 
    folder: 'food festival', 
  },
  { 
    id: 'award-day', 
    title: 'Award Day', 
    color: 'from-yellow-500 to-amber-600', 
    folder: 'award day', 
  },
  { 
    id: 'pongal', 
    title: 'Pongal Celebration', 
    color: 'from-amber-500 to-orange-600',
    folder: 'pongal',
  },
  { 
    id: 'annual-day', 
    title: 'Annual Day', 
    color: 'from-blue-500 to-cyan-500', 
    folder: 'annual day', 
  },
];

// Function to get images from a folder using dynamic import pattern
export const getImagesFromFolder = async (folderPath) => {
  try {
    // Try to fetch from a public images list (generated at build time)
    const response = await fetch('/gallery-manifest.json');
    if (response.ok) {
      const manifest = await response.json();
      return manifest[folderPath] || [];
    }
  } catch (error) {
    console.log('Gallery manifest not found, using empty arrays');
  }
  return [];
};
