# Assets Folder Structure

This folder contains all static assets for the NSU Alumni Melbourne website.

## 📁 Folder Organization

### `/images/`
Main images directory - organized by content type:

#### `/images/events/`
- Event photos and banners
- Event promotional images
- Past event gallery photos
- Recommended sizes: 
  - Featured events: 600x300px
  - Regular events: 400x200px
  - Event banners: 1200x400px

#### `/images/team/`
- Executive body member photos
- Leadership team portraits
- Staff photos
- Recommended size: 300x300px (square, for circular frames)

#### `/images/news/`
- News article featured images
- Blog post thumbnails
- Achievement photos
- Recommended sizes:
  - Featured articles: 600x300px
  - Regular articles: 400x200px

#### `/images/alumni/`
- Alumni profile photos
- Success story images
- Featured alumni portraits
- Graduation photos
- Recommended size: 300x300px (square)

#### `/images/logos/`
- NSU logo variations
- Partner university logos
- Sponsor logos
- Organization badges
- Recommended formats: PNG with transparency, SVG preferred

## 🖼️ Usage in Code

To use images from this folder in your components:

```tsx
// For event images
<Image 
  src="/assets/images/events/networking-gala.jpg" 
  alt="Event description"
  width={400}
  height={200}
/>

// For team member photos
<Image 
  src="/assets/images/team/president-photo.jpg" 
  alt="President name"
  width={300}
  height={300}
/>

// For logos
<Image 
  src="/assets/images/logos/nsu-logo.png" 
  alt="NSU Logo"
  width={120}
  height={60}
/>
```

## 📝 File Naming Conventions

- Use lowercase letters and hyphens
- Be descriptive but concise
- Include date for time-sensitive content
- Examples:
  - `annual-networking-gala-2025.jpg`
  - `president-dr-rashid-ahmed.jpg`
  - `melbourne-cup-event-2025.jpg`
  - `nsu-logo-official.png`

## 🎨 Image Guidelines

### Quality Standards:
- **Format**: JPG for photos, PNG for graphics with transparency, SVG for logos
- **Resolution**: At least 2x the display size for crisp rendering on high-DPI screens
- **Compression**: Optimize for web (80-90% quality for JPG)
- **Color**: sRGB color space recommended

### Accessibility:
- Always include descriptive alt text
- Ensure good contrast for text overlays
- Consider users with visual impairments

## 📂 Current Placeholder Replacements Needed:

Replace these placeholder images with real photos:

### Events Page:
- ReConnect 2025 event photo
- Tech Talk workshop image
- Cultural celebration photos
- Past event gallery images

### About Page:
- Executive body member portraits
- Team photos from events
- Office/meeting photos

### News Page:
- Article featured images
- Success story photos
- Achievement photos

## 🚀 Optimization Tips

1. **Compress images** before uploading using tools like:
   - TinyPNG (online)
   - ImageOptim (Mac)
   - GIMP (free)

2. **Use appropriate formats**:
   - Photos: JPG
   - Graphics/illustrations: PNG
   - Icons/logos: SVG (preferred) or PNG

3. **Responsive images**: Consider creating multiple sizes for different screen sizes

4. **Lazy loading**: Next.js Image component handles this automatically

---

*Last updated: November 6, 2025*