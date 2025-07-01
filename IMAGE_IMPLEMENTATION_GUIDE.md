# Image Implementation Guide

This document outlines all the places where images can be added to enhance the Config-Driven UI demo site.

## 🖼️ Image Locations by Component

### 1. ImageBanner Component
**File:** `src/features/ecommerce-home/components/ImageBanner.tsx`
**Current Implementation:** Uses gradient backgrounds with color props
**Image Opportunities:**
- **Hero Background Images** - Full-width background images for dramatic effect
- **Overlay Support** - Dark overlays over images for better text readability

**TODO Comments in Code:**
```typescript
// TODO: Replace with actual image
// <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
```

**Suggested Images:**
- `/images/hero-bg.jpg` - SaaS landing hero background
- `/images/creative-hero.jpg` - Portfolio/agency hero background
- `/images/config-hero-bg.jpg` - E-commerce banner background

### 2. CardGrid Component
**File:** `src/features/ecommerce-home/components/CardGrid.tsx`
**Current Implementation:** Uses colored icon circles
**Image Opportunities:**
- **Feature Icons** - Custom illustrations or photos for each card
- **Service Images** - Screenshots or mockups for service cards

**TODO Comments in Code:**
```typescript
// TODO: Add image support
// {card.imageUrl && (
//   <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
// )}
```

**Suggested Images:**
- `/images/typescript.jpg` - TypeScript/development illustration
- `/images/performance.jpg` - Performance/speed illustration  
- `/images/developer-experience.jpg` - Developer tools screenshot
- `/images/web-dev.jpg` - Web development illustration
- `/images/ui-design.jpg` - UI/UX design mockups
- `/images/mobile-apps.jpg` - Mobile app screenshots
- `/images/branding.jpg` - Brand design examples

### 3. Testimonial Component
**File:** `src/features/ecommerce-home/components/Testimonial.tsx`
**Current Implementation:** Uses colored letter circles for avatars
**Image Opportunities:**
- **User Avatars** - Profile photos of testimonial providers
- **Company Logos** - Logos of companies giving testimonials

**TODO Comments in Code:**
```typescript
// TODO: Replace with actual avatar image
// <img 
//   src={testimonial.avatarUrl} 
//   alt={testimonial.name}
//   className="w-12 h-12 rounded-full mr-4 object-cover"
// />
```

**Suggested Images:**
- `/avatars/sarah.jpg` - Professional headshot
- `/avatars/michael.jpg` - Professional headshot  
- `/avatars/emily.jpg` - Professional headshot
- `/logos/techcorp.png` - Company logo
- `/logos/startupxyz.png` - Company logo
- `/logos/designstudio.png` - Company logo

### 4. ProductGrid Component
**File:** `src/features/ecommerce-home/components/ProductGrid.tsx`
**Current Implementation:** Uses placeholder product data
**Image Opportunities:**
- **Product Photos** - High-quality product images
- **Component Screenshots** - Visual examples of UI components

**TODO Comments in Code:**
```typescript
// TODO: Add product images in ProductGrid component
```

**Suggested Images:**
- `/products/navbar-component.png` - Screenshot of navbar component
- `/products/card-grid-component.png` - Screenshot of card grid
- `/products/banner-component.png` - Screenshot of banner component
- `/products/testimonial-component.png` - Screenshot of testimonial section

### 5. Configuration Files
**File:** `src/features/ecommerce-home/api/configOptions.ts`
**Image Opportunities in Config Props:**
- Banner background images for different themes
- Hero section backgrounds
- Feature card illustrations

**TODO Comments in Code:**
```typescript
// TODO: Add hero background image: imageUrl: '/images/hero-bg.jpg'
// TODO: Add feature image: imageUrl: '/images/typescript.jpg'
// TODO: Add banner background image: bgImage: '/images/config-hero-bg.jpg'
```

### 6. Homepage API
**File:** `src/features/ecommerce-home/api/homePageApi.ts`
**Image Opportunities:**
- Festival/promotional banner backgrounds
- Product showcase images

**TODO Comments in Code:**
```typescript
// TODO: Add banner background image: bgImage: '/images/config-hero-bg.jpg'
// TODO: Add product images in ProductGrid component
```

## 📁 Recommended Image Structure

```
public/
├── images/
│   ├── hero-bg.jpg              # Main hero background
│   ├── creative-hero.jpg        # Portfolio hero background
│   ├── config-hero-bg.jpg       # E-commerce banner background
│   ├── typescript.jpg           # TypeScript feature illustration
│   ├── performance.jpg          # Performance illustration
│   ├── developer-experience.jpg # Developer tools screenshot
│   ├── web-dev.jpg             # Web development illustration
│   ├── ui-design.jpg           # UI/UX design mockups
│   ├── mobile-apps.jpg         # Mobile app screenshots
│   └── branding.jpg            # Brand design examples
├── avatars/
│   ├── sarah.jpg               # User testimonial photos
│   ├── michael.jpg
│   └── emily.jpg
├── logos/
│   ├── techcorp.png            # Company logos
│   ├── startupxyz.png
│   └── designstudio.png
└── products/
    ├── navbar-component.png     # UI component screenshots
    ├── card-grid-component.png
    ├── banner-component.png
    └── testimonial-component.png
```

## 🎨 Image Specifications

### Hero/Banner Images
- **Dimensions:** 1920x1080px (16:9 ratio)
- **Format:** JPG (for photos), PNG (for graphics with transparency)
- **Size:** < 500KB for performance
- **Style:** High contrast for text overlay readability

### Avatar Images  
- **Dimensions:** 200x200px (1:1 ratio)
- **Format:** JPG
- **Size:** < 50KB
- **Style:** Professional headshots with good lighting

### Product/Component Screenshots
- **Dimensions:** 800x600px (4:3 ratio)
- **Format:** PNG (for UI screenshots)
- **Size:** < 200KB
- **Style:** Clean, well-lit screenshots with consistent styling

### Company Logos
- **Dimensions:** 200x100px (2:1 ratio)
- **Format:** PNG with transparency
- **Size:** < 20KB
- **Style:** High contrast, readable at small sizes

## 🚀 Implementation Priority

1. **High Priority** - Hero/banner background images (immediate visual impact)
2. **Medium Priority** - Feature card illustrations (enhance understanding)
3. **Low Priority** - Avatars and logos (nice-to-have polish)

## 💡 Tips for Implementation

1. **Lazy Loading** - Implement lazy loading for better performance
2. **Alt Text** - Always include descriptive alt text for accessibility
3. **Responsive Images** - Use different image sizes for different screen sizes
4. **WebP Format** - Consider WebP format for better compression
5. **Fallbacks** - Keep current color-based fallbacks for missing images

## 🔧 Code Examples

### Adding an Image to ImageBanner:
```tsx
{imageUrl && (
  <img 
    src={imageUrl} 
    alt={title} 
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
)}
```

### Adding Images to CardGrid:
```tsx
{card.imageUrl && (
  <img 
    src={card.imageUrl} 
    alt={card.title} 
    className="w-full h-48 object-cover rounded-t-xl"
    loading="lazy"
  />
)}
```

This structure will transform the demo from a color-based design to a rich, visually appealing showcase of the config-driven UI capabilities!
