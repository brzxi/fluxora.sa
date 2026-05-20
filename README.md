# Fluxora - Premium Digital Store Theme for Salla

<div align="center">

![Fluxora Theme](https://img.shields.io/badge/Fluxora-v1.0.0-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Salla-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-Commercial-green?style=for-the-badge)
![RTL](https://img.shields.io/badge/RTL-Arabic-orange?style=for-the-badge)

**ثيم فلكسورا - ثيم احترافي فاخر للمنتجات الرقمية مصمم خصيصاً للسوق السعودي والخليجي**

</div>

---

## Overview

Fluxora is a premium, ultra-modern eCommerce theme designed specifically for digital product stores on the Salla platform. Built with a dark luxury aesthetic combined with futuristic glassmorphism effects, it targets Gen Z users in Saudi Arabia and Gulf countries.

### Key Features

- **Dark Luxury Design** - Ultra-modern dark theme with glassmorphism effects
- **Fully RTL Arabic** - Optimized right-to-left layout for Arabic content
- **Mobile-First** - Responsive design that looks perfect on all devices
- **High Conversion** - UX patterns designed to maximize sales
- **Fast Loading** - Lightweight code with optimized assets
- **SEO Optimized** - Clean semantic HTML with proper meta tags
- **Premium Animations** - Smooth microinteractions and scroll effects
- **Salla Compatible** - Ready to import and customize on Salla platform

---

## Pages Included

| Page | File | Description |
|------|------|-------------|
| Homepage | `pages/index.html` | Full landing page with hero, products, stats, reviews, FAQ, newsletter |
| Product | `pages/product.html` | Detailed product page with gallery, tabs, FAQ, related products |
| Category | `pages/category.html` | Product listing with filters and sorting |
| Cart | `pages/cart.html` | Shopping cart with coupon support and order summary |
| About | `pages/about.html` | Brand story, values, and statistics |
| Contact | `pages/contact.html` | Contact form with multiple channels |
| Offers | `pages/offers.html` | Special offers with countdown timer |
| Subscriptions | `pages/subscriptions.html` | Digital subscriptions landing with pricing cards |
| 404 | `pages/404.html` | Custom error page |

---

## Tech Stack

- **HTML5** - Semantic, accessible markup
- **CSS3** - Custom properties, glassmorphism, animations
- **Alpine.js** - Lightweight reactive JavaScript
- **TailwindCSS Concepts** - Utility-first approach in custom CSS
- **No jQuery** - Pure vanilla JS for performance

---

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary BG | `#0B0F19` | Main background |
| Secondary BG | `#121826` | Cards, sections |
| Tertiary BG | `#1A2035` | Inputs, hover states |
| Accent Blue | `#3B82F6` | Primary accent |
| Accent Violet | `#8B5CF6` | Gradient end |
| Text Primary | `#FFFFFF` | Headings |
| Text Secondary | `#94A3B8` | Body text |
| Success | `#22C55E` | Positive actions |

### Typography

- **Font**: IBM Plex Sans Arabic
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: Fluid typography with `clamp()`

### Effects

- Glassmorphism cards with backdrop blur
- Animated gradient orbs
- Cursor glow following mouse
- Floating particles
- Smooth scroll animations
- Magnetic button effects
- Tilt card interactions
- Ripple click effects
- Staggered grid animations

---

## Installation Guide

### Method 1: Direct Salla Import

1. **Download** the theme ZIP file
2. **Login** to your Salla dashboard at [merchant.salla.sa](https://merchant.salla.sa)
3. Navigate to **Appearance** → **Themes** → **Custom Themes**
4. Click **Upload Theme** and select the ZIP file
5. Click **Activate** to apply the theme
6. Customize colors and settings from the **Theme Settings** panel

### Method 2: Manual Installation

1. Clone or download this repository
2. Upload the theme files to your Salla store via FTP or the file manager
3. Ensure the folder structure matches Salla's theme requirements
4. Activate the theme from your dashboard

### Method 3: Developer Setup (Local Preview)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fluxora-theme.git

# Navigate to the project
cd fluxora-theme

# Open in browser (no build step needed)
# Simply open pages/index.html in your browser

# Or use a local server
npx serve pages/
```

---

## Customization

### Theme Settings (theme.json)

The theme includes a comprehensive settings schema that allows store owners to customize:

- **Colors**: Primary, secondary, accent colors and gradients
- **Typography**: Font family, base size
- **Layout**: Container width, header style
- **Effects**: Particles, cursor glow, animations toggle
- **Homepage**: Section visibility, hero content
- **Social**: Social media links

### CSS Variables

All design tokens are defined as CSS custom properties in `assets/css/main.css`:

```css
:root {
  --bg-primary: #0B0F19;
  --bg-secondary: #121826;
  --accent-blue: #3B82F6;
  --accent-violet: #8B5CF6;
  /* ... more variables */
}
```

### Adding New Products

Products follow the `.product-card` component pattern. Copy the HTML structure and customize:

```html
<div class="product-card">
  <div class="product-card-image">
    <!-- Product image or gradient -->
  </div>
  <div class="product-card-body">
    <span class="product-card-category">Category</span>
    <h4 class="product-card-title">Product Name</h4>
    <div class="product-card-footer">
      <span class="product-price">99 <span class="currency">ر.س</span></span>
      <button class="btn btn-primary btn-sm">إضافة</button>
    </div>
  </div>
</div>
```

---

## File Structure

```
fluxora-theme/
├── assets/
│   ├── css/
│   │   ├── main.css          # Core styles, components, utilities
│   │   └── checkout.css      # Checkout page enhancements
│   ├── js/
│   │   ├── app.js            # Alpine.js components & core logic
│   │   ├── animations.js     # Scroll animations, particles, effects
│   │   └── salla-integration.js  # Salla API event handlers
│   ├── images/               # Theme images and previews
│   └── fonts/                # Custom fonts (if needed)
├── components/
│   ├── header.html           # Shared header component
│   └── footer.html           # Shared footer component
├── config/                   # Additional configuration
├── layouts/                  # Layout templates
├── locales/
│   └── ar.json              # Arabic translations
├── pages/
│   ├── index.html           # Homepage
│   ├── product.html         # Product page
│   ├── category.html        # Category/listing page
│   ├── cart.html            # Shopping cart
│   ├── about.html           # About page
│   ├── contact.html         # Contact page
│   ├── offers.html          # Offers/deals page
│   ├── subscriptions.html   # Subscriptions landing
│   └── 404.html             # Error page
├── theme.json               # Theme configuration & settings schema
└── README.md                # This file
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## Performance

- **No build step required** - Pure HTML/CSS/JS
- **Minimal dependencies** - Only Alpine.js (14KB gzipped)
- **Optimized animations** - Uses `transform` and `opacity` for GPU acceleration
- **Lazy loading** - Images load on scroll
- **Reduced motion** - Respects `prefers-reduced-motion`
- **Efficient selectors** - BEM-inspired class naming

---

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible styles
- Color contrast compliance (WCAG AA for text)
- Screen reader friendly

---

## Credits

- **Font**: [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) by IBM
- **Icons**: Inline SVG (Lucide Icons style)
- **Framework**: [Alpine.js](https://alpinejs.dev/) by Caleb Porzio

---

## License

This is a commercial theme. Unauthorized redistribution is prohibited.

---

## Support

For support, customization requests, or questions:
- Email: support@fluxora.sa
- Twitter: @FluxoraSA

---

<div align="center">

**Made with ❤️ in Saudi Arabia**

</div>
