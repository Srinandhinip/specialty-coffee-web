# ☕ AURA COFFEE LAB — Interactive Specialty Coffee & Roastery Experience

[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

An artisanal web application engineered for specialty coffee aficionados, home baristas, and roasters. **Aura Coffee Lab** blends sensory bean exploration, real-time barista brewing science, custom roast formulation, and a fluid canvas latte art simulator into an ultra-fast, modern interface.

---

## 🌟 Key Features

### 🌍 1. The Origin Vault (Single-Origin Archive)
- **Terroir & SCA Ratings**: Explore curated lots from premier origins including Ethiopia Yirgacheffe, Colombia Huila Geisha, Panama Boquete, Kenya Nyeri, and Sumatra Mandheling, complete with official SCA cupping scores (90+ points).
- **Interactive Multi-Filter System**: Filter by continent (Africa, South America, Central America, Asia-Pacific) and sensory flavor descriptors (Floral, Citrus, Stone Fruit, Honey, Chocolate, Jasmine).
- **Interactive Bean Dossier**: In-depth modal revealing elevation altitudes (up to 2,200m), varietal lineages (Geisha, Bourbon, Heirloom, SL28), harvest processing styles (Natural, Washed, Anaerobic, Honey), and roaster tasting wheels.

### ⏱️ 2. Brew Lab & Smart Barista Timer
- **Equipment Profiles**: Calibrated recipes for **Hario V60**, **Chemex**, **AeroPress**, **French Press**, and **Espresso**.
- **Dynamic Ratio Engine**: Seamlessly adjust water and coffee mass with real-time ratio calculation (1:12 to 1:18) and water temperature guidelines.
- **Guided Step-by-Step Timer**: Multi-stage audio-guided timer for bloom phase, initial pulse pours, and drawdown intervals with progress bars.

### 🧪 3. Artisan Blend Studio
- **Custom Lot Formulation**: Create bespoke roastery blends by dialing in percentages across distinct origins.
- **Dynamic Sensory Radar**: Live computation of acidity, sweetness, body, and aroma profiles based on bean composition.
- **Roast Profile Selector**: Choose between Light, Medium-Light, Medium, and Dark roasts.
- **Custom Bag Studio**: Personalize your coffee bag with custom naming, packaging hues, grind specifications, and direct addition to your order.

### 🎨 4. Latte Lab (Interactive Foam Canvas)
- **Canvas Fluid Pouring**: Practice pouring classic espresso patterns: **Heart**, **Tulip**, **Rosetta**, or unleash your creativity with **Freehand Pouring**.
- **Crema & Foam Dynamics**: Adjust steam wand texture, milk aeration, and contrast levels.
- **Snapshot Export**: Download and save your latte art creations directly from the browser.

### 🎯 5. Sensory Cup Finder Quiz
- **Personalized Recommendations**: A multi-step sensory questionnaire evaluating roast preferences, brew methods, acidity preference, and favorite flavors.
- **Algorithmic Match Score**: Instant calculation with match percentages and direct one-click brewing or ordering.

### 🛍️ 6. Roastery Catalog, Flights & Cart Drawer
- **Bespoke Tasting Flights**: Build 3-origin curated sample sets.
- **Precision Grind Customization**: Whole Bean, French Press, Chemex, Aeropress, V60, and Espresso grinds.
- **Seamless Cart & Wishlist**: Persistent state management with live free-shipping thresholds, order breakdowns, and drawer animations.

### 🔊 7. Procedural Soundscape & Theme Engine
- **Synthesized Web Audio API**: Crisp auditory feedback for button interactions, grinder whirs, kettle pours, and timer chimes—zero external MP3 dependencies.
- **Dual Visual Themes**: Toggle between **Midnight Obsidian** (high-contrast dark mode) and **Espresso Bronze** (warm roastery ambiance).

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern concurrent React with functional components and hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking, verbatim module syntax, and safety |
| **Bundler** | [Vite 8](https://vitejs.dev/) | Sub-second HMR and optimized production bundle compilation |
| **Styling** | Vanilla CSS3 | Custom design system with CSS custom properties, glassmorphism, responsive grid & flexbox |
| **Audio** | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Low-latency procedural sound generation |
| **Icons** | Custom SVG Components | Scalable, dependency-free vector icon library |

---

## 📁 Project Architecture

```
specialty-coffee/
├── index.html                   # HTML5 Entrypoint with typography preloads
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # Project TypeScript configuration
├── tsconfig.app.json            # Client TypeScript rules (verbatimModuleSyntax)
├── vite.config.ts               # Vite configuration
├── public/
│   └── favicon.svg              # Roastery brand favicon
└── src/
    ├── main.tsx                 # React application root mount
    ├── App.tsx                  # Core app container & state management
    ├── App.css                  # Comprehensive CSS design system & animations
    ├── index.css                # Base resets, typography & CSS variables
    ├── types/
    │   └── coffee.ts            # Type definitions (CoffeeBean, BrewMethod, CartItem, etc.)
    ├── data/
    │   └── coffeeData.ts        # Comprehensive coffee beans, brew guides & quiz questions
    ├── utils/
    │   └── audio.ts             # Web Audio API sound synthesis engine
    └── components/
        ├── Header.tsx           # Navigation bar with theme toggle, sound switch, cart counter
        ├── Hero.tsx             # Interactive hero banner with stats & quick actions
        ├── OriginVault.tsx      # Origin gallery & filterable bean cards
        ├── BrewLab.tsx          # Ratio calculator & step-by-step brew timer
        ├── BlendStudio.tsx      # Multi-bean mixer & custom bag generator
        ├── LatteLab.tsx         # Interactive HTML5 Canvas latte art creator
        ├── CupFinderQuiz.tsx    # Sensory quiz & bean recommendation engine
        ├── ShopCatalog.tsx      # Roastery shop, grind options & custom flight builder
        ├── BeanModal.tsx        # In-depth single-origin specification modal
        ├── CartDrawer.tsx       # Slide-out shopping cart drawer
        ├── WishlistModal.tsx    # Saved coffees modal
        ├── CoffeeIcons.tsx      # Custom SVG iconography set
        └── Footer.tsx           # Roastery footer & origin certifications
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or later recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Srinandhinip/specialty-coffee-web.git
   cd specialty-coffee-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Production Build

To compile a minified production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## ☕ Coffee Varieties & Regions Featured

- 🇪🇹 **Ethiopia**: Yirgacheffe Misty Valley G1 (Natural, 2,050m) — *Bergamot, Blueberry, Jasmine*
- 🇨🇴 **Colombia**: Huila El Paraiso Geisha Reserve (Thermal Shock, 1,950m) — *Peach Blossom, Lychee, Lemongrass*
- 🇬🇹 **Guatemala**: Antigua Los Volcanes (Washed, 1,750m) — *Dark Chocolate, Candied Orange, Toffee*
- 🇰🇪 **Kenya**: Nyeri Hill Peaberry Select (Double Washed, 1,850m) — *Blackcurrant, Grapefruit, Brown Sugar*
- 🇵🇦 **Panama**: Boquete Geisha Esmeralda (Washed, 1,800m) — *White Jasmine, Tangerine, Honeysuckle*
- 🇮🇩 **Sumatra**: Mandheling Wahana Estate (Wet Hulled, 1,400m) — *Cedar, Dark Cocoa, Sweet Tobacco*
- 🇨🇷 **Costa Rica**: Tarrazú Dragon Honey (Yellow Honey, 1,700m) — *Golden Apple, Cane Sugar, Marzipan*
- 🇷🇼 **Rwanda**: Nyamagabe Gitesi Bourbon (Washed, 1,900m) — *Red Plum, Hibiscus Tea, Meyer Lemon*

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
