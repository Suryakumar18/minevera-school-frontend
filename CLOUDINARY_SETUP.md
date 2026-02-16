# Cloudinary Integration Setup Guide

Your gallery is now connected to Cloudinary! Follow these steps to complete the setup:

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

## 2. Get Your Credentials

After logging in to your Cloudinary dashboard:

1. You'll see your **Cloud Name** on the dashboard
2. Note down your cloud name

## 3. Upload Your Images to Cloudinary

### Upload Preset Configuration
You've already created an upload preset with:
- **Upload preset name**: `minervaa` ✓
- **Signing mode**: `Signed` ✓
- **Asset folder**: `public` ✓

Now upload your images:

### Option A: Upload via Dashboard (Recommended)
1. Go to **Media Library** in your Cloudinary dashboard
2. Upload images to the `public` folder with subfolders for each event:
   - `public/pongal`
   - `public/food festival`
   - `public/gokulastami`
   - `public/independence day`
   - `public/vijayadhasamy`
   - `public/annual day`
3. Upload images to their respective folders
4. Keep the same image names as in your code

### Option B: Bulk Upload via API
You can also use Cloudinary's upload API to bulk upload images from your local public folder.

## 4. Update Environment Variables

Edit your `.env` file and replace the placeholder values:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=minervaa
VITE_CLOUDINARY_ASSET_FOLDER=public
```

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=minervaa-school
VITE_CLOUDINARY_UPLOAD_PRESET=minervaa
VITE_CLOUDINARY_ASSET_FOLDER=public
```

## 5. Restart Development Server

After updating the .env file:

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

## Benefits of Cloudinary Integration

✅ **Automatic Image Optimization** - Images are automatically optimized for web
✅ **Responsive Images** - Different sizes served based on device
✅ **Fast CDN Delivery** - Images served from global CDN
✅ **Format Conversion** - Automatic WebP conversion for supported browsers
✅ **Quality Optimization** - Automatic quality adjustment
✅ **Lazy Loading** - Images load only when needed

## Image Transformations

The integration automatically applies:

- **Cover Images**: 600px width, optimized quality, center crop
- **Thumbnails**: 400px width, good quality
- **Full Size**: 1200px width, best quality
- **Format**: Auto-converts to best format (WebP, AVIF)
- **Quality**: Auto-optimizes quality based on content

## Fallback

If Cloudinary cloud name is not configured, the gallery will automatically fall back to loading images from your local `public` folder.

## Folder Structure on Cloudinary

Make sure your Cloudinary folder structure matches (with the public folder):

```
your-cloudinary-root/
└── public/
    ├── pongal/
    │   ├── 23450004.JPG
    │   ├── 23450008.JPG
    │   └── ...
    ├── food festival/
    │   ├── 6E7A9042.JPG
    │   └── ...
    ├── gokulastami/
    │   ├── 3.jpeg
    │   └── ...
    ├── independence day/
    │   ├── DSC00654.JPG
    │   └── ...
    ├── vijayadhasamy/
    │   ├── DSC08201.JPG
    │   └── ...
    └── annual day/
        ├── DSC00354.JPG
        └── ...
```

## Troubleshooting

**Images not loading?**
- Check if VITE_CLOUDINARY_CLOUD_NAME is correctly set in .env
- Verify folder names match exactly (case-sensitive)
- Ensure images are uploaded to Cloudinary
- Check browser console for errors
- Restart dev server after .env changes

**Images loading slowly?**
- This is normal on first load as Cloudinary processes transformations
- Subsequent loads will be much faster (cached on CDN)

## Need Help?

Refer to [Cloudinary Documentation](https://cloudinary.com/documentation) for more details.
