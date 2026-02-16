// Local image configuration - using public folder
// All images are served from the public folder

// Generate local URL for an image from public folder
export const getLocalImageUrl = (folder, imageName) => {
  // Images in Vite's public folder are served from the root
  // Encode segments to safely handle spaces and special characters
  const folderSegment = encodeURIComponent(folder);
  const imageSegment = encodeURIComponent(imageName);
  return `/${folderSegment}/${imageSegment}`;
};

// Generate thumbnail URL (same as full size for local images)
export const getThumbnailUrl = (folder, imageName) => {
  return getLocalImageUrl(folder, imageName);
};

// Generate full-size URL
export const getFullSizeUrl = (folder, imageName) => {
  return getLocalImageUrl(folder, imageName);
};

// Generate optimized URL for cover images (same as full size for local images)
export const getCoverUrl = (folder, imageName) => {
  return getLocalImageUrl(folder, imageName);
};
