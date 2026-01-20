# S1 Health Fitness - Website Mockup

Premium fitness club website mockup with dummy data. This is a Next.js project showcasing the design and structure for S1 Health Fitness with two distinct locations.

## 🎯 Project Overview

This mockup demonstrates:
- **Premium positioning** - Clean, modern, high-end design with gym aesthetic
- **Two location separation** - Clear distinction between Fitness Studio and 24/7 Gym
- **Video backgrounds** - Immersive video backgrounds on hero sections
- **Parallax effects** - Smooth parallax scrolling effects throughout
- **Gym-like design** - Bold, dark, energetic design inspired by premium gyms
- **Complete page structure** - All required pages with dummy data
- **Responsive design** - Mobile-first approach

## ✨ New Features

### Video Backgrounds
- Hero sections feature immersive video backgrounds
- Automatic fallback to gradient if video fails to load
- Overlay controls for text readability

### Parallax Effects
- Smooth parallax scrolling on key sections
- Configurable speed and direction
- Performance optimized with intersection observer

### Gym Aesthetic
- Dark theme with bold typography
- Gradient accents (red/orange, blue/cyan)
- Energetic, premium feel
- Inspired by modern premium gyms like Novo Gyms

## 📄 Pages Included

1. **Home Page** (`/`)
   - Full-screen video background hero
   - Parallax effects on all sections
   - Two location cards with clear separation
   - Why choose us section
   - CTA sections

2. **Gym Classes** (`/gym-classes`)
   - Video background hero
   - Studio location focus
   - Class types overview with parallax
   - Full weekly timetable
   - Location information

3. **24/7 Gym** (`/24-7-gym`)
   - Independent training focus
   - Facilities overview
   - Location information

4. **Membership** (`/membership`)
   - Three membership tiers
   - Clear location indication for each membership
   - Comparison table
   - FAQ section

5. **Personal Training** (`/personal-training`)
   - Premium positioning
   - Trainer profiles
   - Pricing packages
   - Benefits comparison

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
s1-health-fitness-mockup/
├── app/
│   ├── layout.tsx              # Root layout with Header & Footer
│   ├── page.tsx                # Home page (with video & parallax)
│   ├── gym-classes/
│   │   └── page.tsx            # Gym Classes page (with video & parallax)
│   ├── 24-7-gym/
│   │   └── page.tsx            # 24/7 Gym page
│   ├── membership/
│   │   └── page.tsx            # Membership page
│   ├── personal-training/
│   │   └── page.tsx            # Personal Training page
│   └── globals.css             # Global styles (dark theme)
├── components/
│   ├── Header.tsx              # Navigation header (dark theme)
│   ├── Footer.tsx              # Footer component (dark theme)
│   ├── VideoBackground.tsx     # Video background component
│   └── ParallaxSection.tsx     # Parallax scrolling component
├── data/
│   └── dummy.ts                # All dummy data
└── public/                     # Static assets
```

## 🎨 Design Features

- **Dark Theme** - Black background with gray accents
- **Bold Typography** - Large, uppercase, black font weights
- **Gradient Accents** - Red/orange and blue/cyan gradients
- **Video Backgrounds** - Immersive hero sections
- **Parallax Effects** - Smooth scrolling animations
- **Gym Aesthetic** - Energetic, premium, modern
- **Location Separation** - Visual distinction between two locations
- **Responsive** - Mobile-first, works on all devices

## 🎬 Video Backgrounds

The website uses video backgrounds from Pexels (free stock videos). You can replace these with your own videos by:

1. Adding video files to `/public/videos/`
2. Updating the `videoSrc` prop in `VideoBackground` component
3. Or updating the default URLs in the component

Example:
```tsx
<VideoBackground videoSrc="/videos/gym-hero.mp4" overlayOpacity={0.6}>
  {/* Content */}
</VideoBackground>
```

## 📊 Dummy Data

All dummy data is stored in `/data/dummy.ts`:
- Locations (Studio & 24/7 Gym)
- Class types and timetable
- Membership options
- Personal training information
- Trainer profiles

## 🛠️ Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations (installed, ready to use)
- **React Intersection Observer** - For parallax effects

## 📝 Next Steps

1. **Design Review** - Review mockup with client
2. **Video Assets** - Replace placeholder videos with actual gym footage
3. **Content Updates** - Replace dummy data with real content
4. **Asset Integration** - Add real images and photography
5. **Functionality** - Add booking system, payment integration, etc.
6. **CMS Integration** - Connect headless CMS for content management

## 🎯 Key Design Decisions

1. **Dark Gym Aesthetic**
   - Black backgrounds for premium feel
   - Bold, uppercase typography
   - Gradient accents for energy

2. **Video Backgrounds**
   - Immersive hero sections
   - Automatic fallback handling
   - Overlay controls for readability

3. **Parallax Effects**
   - Smooth scrolling animations
   - Performance optimized
   - Configurable per section

4. **Two Location Separation**
   - Different color schemes (blue for Studio, orange for Gym)
   - Clear badges and labels
   - Separate pages for each location

## 📞 Notes

- All data is dummy/placeholder
- Videos are from Pexels (free stock videos)
- Images are placeholder (can be replaced with real assets)
- CTAs are buttons (not connected to actual sign-up flow)
- Timetable is static (can be made dynamic with CMS)

---

**Status:** Mockup Complete with Video & Parallax ✅
**Last Updated:** January 2025
