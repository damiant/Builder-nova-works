# 🎰 Napoleon Casino Group

A luxury casino resort application featuring world-class gaming, dining, and hospitality experiences across 30 states in America.

![Napoleon Casino Group](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.11-blue)

## 🏛️ **Overview**

Napoleon Casino Group represents the pinnacle of luxury gaming and hospitality. This modern web application provides guests with seamless access to our premium casino resorts, fine dining establishments, and exclusive rewards program across multiple states.

## ✨ **Key Features**

### 🏠 **Homepage & Booking**

- **Smart Location Selector** - Choose from 30+ premium destinations
- **Advanced Date Picker** - Check-in/out date selection with validation
- **Guest Management** - Flexible party size configuration
- **Instant Booking** - Direct CTA with parameter passing to booking system
- **Hero Animations** - Luxury-branded motion design with crown iconography

### 🍽️ **Restaurant Experience**

- **Culinary Catalog** - 6 signature restaurants across properties
- **Real Food Photography** - API-powered images of signature dishes
- **Advanced Filtering** - Search by cuisine type, location, and price range
- **Reservation System** - Direct booking integration with availability
- **Restaurant Details** - Hours, dress code, features, and contact information

### 🏨 **Hotel Booking System**

- **Room Comparison** - Detailed amenities and pricing for each room type
- **Real-time Availability** - Live room counts and booking status
- **Dynamic Pricing** - Automatic calculation of taxes, fees, and totals
- **URL Parameter Support** - Deep linking from homepage searches
- **Booking Summary** - Comprehensive reservation details and confirmation

### 🗺️ **Interactive Destinations Map**

- **Custom USA Map** - Elegant SVG-based visualization
- **Casino Pin Markers** - Crown-branded location indicators with hover effects
- **Real-time Highlighting** - Synchronized selection between map and cards
- **Destination Details** - Popup information panels with booking integration
- **Geographic Accuracy** - Precise lat/lng positioning for all properties

### 📅 **Reservation Management**

- **Comprehensive Dashboard** - View all hotel and restaurant bookings
- **Status Tracking** - Confirmed, pending, cancelled, and completed reservations
- **Tabbed Interface** - Filter by type, status, and upcoming dates
- **Modification Tools** - Edit, cancel, or download reservation details
- **Mobile Check-in** - QR code integration for seamless arrival

### 🏆 **Napoleon Elite Rewards**

- **Tier Progression** - Bronze, Silver, Gold, Platinum membership levels
- **Points Tracking** - Real-time balance and lifetime point accumulation
- **Reward Catalog** - Redeem points for stays, dining, spa, and experiences
- **Exclusive Offers** - Member-only promotions and limited-time deals
- **Activity History** - Complete transaction log with earning details

## 🎨 **Design & Branding**

### **Luxury Aesthetic**

- **Napoleon Brand Identity** - Crown iconography and royal color palette
- **Golden Accents** - Premium gold gradient system (`napoleon-400` series)
- **Sophisticated Typography** - Poppins font family for modern elegance
- **Dark Casino Theme** - Professional dark UI with casino-inspired patterns

### **Visual Elements**

- **Framer Motion Animations** - Smooth transitions and micro-interactions
- **Glass Morphism Effects** - Backdrop blur and translucent overlays
- **Custom Component Library** - Radix UI with Napoleon styling
- **Responsive Images** - API-powered photography for destinations and cuisine

## 🛠️ **Technical Architecture**

### **Frontend Stack**

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.5.3** - Full type safety and developer experience
- **Vite 6.2.2** - Lightning-fast build tool and dev server
- **React Router 6.26.2** - Client-side routing with SPA architecture

### **Styling & UI**

- **Tailwind CSS 3.4.11** - Utility-first styling with custom design tokens
- **Radix UI Components** - Accessible, unstyled UI primitives
- **Framer Motion 12.6.2** - Production-ready animation library
- **Lucide React** - Beautiful, customizable icon library

### **Data & State Management**

- **TanStack Query 5.56.2** - Server state management and caching
- **React Hook Form 7.53.0** - Performant form validation
- **Date-fns 3.6.0** - Modern date utility library
- **Zod 3.23.8** - TypeScript-first schema validation

## 📱 **Responsive Design**

- **Mobile-First Approach** - Optimized for all screen sizes
- **Breakpoint System** - Tailored experiences for mobile, tablet, desktop
- **Touch Interactions** - Mobile-optimized gestures and controls
- **Performance Optimized** - Fast loading on all device types

## 🚀 **Performance Features**

- **Code Splitting** - Optimized bundle sizes with lazy loading
- **Image Optimization** - WebP support with fallbacks
- **Caching Strategy** - Intelligent data caching with TanStack Query
- **SEO Optimized** - Semantic HTML and meta tag management

## 🏗️ **Project Structure**

```
napoleon-casino-group/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI component library
│   │   ├── Navbar.tsx      # Navigation with mobile menu
│   │   ├── LocationSelector.tsx  # Advanced location picker
│   │   ├── DatePicker.tsx  # Enhanced date selection
│   │   ├── SimpleMap.tsx   # Interactive destination map
│   │   └── MapWrapper.tsx  # Map container component
│   ├── pages/              # Route components
│   │   ├── Index.tsx       # Homepage with booking
│   │   ├── Restaurants.tsx # Restaurant catalog
│   │   ├── HotelBooking.tsx # Hotel reservation system
│   │   ├── Destinations.tsx # Property showcase with map
│   │   ├── MyReservations.tsx # Booking management
│   │   └── MyRewards.tsx   # Loyalty program dashboard
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── App.tsx            # Root application component
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 **Key Destinations**

| Location          | State       | Rooms | Restaurants | Features                        |
| ----------------- | ----------- | ----- | ----------- | ------------------------------- |
| **Las Vegas**     | Nevada      | 450+  | 8           | Strip Location, Celebrity Chefs |
| **Atlantic City** | New Jersey  | 320+  | 6           | Oceanfront, Boardwalk Access    |
| **New Orleans**   | Louisiana   | 280+  | 5           | French Quarter, Jazz Culture    |
| **Biloxi**        | Mississippi | 200+  | 4           | Gulf Coast, Seafood Specialties |
| **Reno**          | Nevada      | 180+  | 3           | Mountain Views, Lake Tahoe      |
| **Tunica**        | Mississippi | 150+  | 3           | Delta Heritage, Blues Culture   |

## 🚦 **Getting Started**

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd napoleon-casino-group

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create optimized production build
- `npm run typecheck` - Validate TypeScript types
- `npm test` - Run test suite
- `npm run format.fix` - Format code with Prettier

## 🔧 **Configuration**

### Environment Variables

```env
VITE_API_BASE_URL=https://api.napoleon-casinos.com
VITE_IMAGE_API_URL=https://api.webnative.dev/images
```

### Tailwind Design Tokens

```javascript
// Napoleon brand colors
napoleon: {
  400: "#facc15", // Primary gold
  500: "#eab308", // Medium gold
  600: "#ca8a04", // Dark gold
}

// Casino theme colors
casino: {
  800: "#1e293b", // Dark background
  900: "#0f172a", // Darker background
  950: "#020617", // Darkest background
}
```

## 🤝 **Contributing**

1. **Code Quality** - TypeScript strict mode, ESLint, Prettier
2. **Component Standards** - Reusable, accessible, well-documented
3. **Performance** - Optimized bundles, lazy loading, efficient rendering
4. **Testing** - Unit tests for utilities, integration tests for workflows

## 📄 **License**

© 2024 Napoleon Casino Group. All rights reserved.

---

**Experience the Napoleon Difference** - Where luxury gaming meets exceptional hospitality. 🎰✨
