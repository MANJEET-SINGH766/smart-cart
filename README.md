#  Naik Foods — Smart Cart E-Commerce Platform

> **Authentic Handmade Pickles & Spices with an Intelligent Smart Cart Experience**

Live Demo: [smart-cart-lovat-three.vercel.app](https://smart-cart-lovat-three.vercel.app/)

---

##  Overview

**Naik Foods** is a modern e-commerce web application crafted to deliver authentic, 50-year-old family recipe pickles, chutneys, and artisanal spices directly to food lovers. Built with **React 19** and **Vite**, the application features a **Smart Cart Engine** designed to optimize user engagement, increase average order value, and streamline checkout.

---

##  Key Features

### 🛒 1. Intelligent Smart Cart Engine
- **Dynamic Free Shipping Progress Bar**: Real-time progress visualizer updating as customers add items, showing exact amount remaining to unlock **FREE Delivery** (Threshold: ₹799).
- **Smart Product Recommendations**: Context-aware recommendation engine that suggests items priced perfectly to help users cross the free delivery threshold.
- **Cart Persistence**: Automatically synchronizes cart contents with `localStorage`, retaining state across page refreshes.
- **Animated Drawer & Badges**: Smooth slide-over side drawer with micro-animations and cart badge notifications.

###  2. Interactive Product Catalog
- **Multi-Category Filter**: Instant filtering across *All, Pickles, Chutneys, Spices, and Combos*.
- **Real-Time Deep Search**: Search engine looking across product titles, descriptions, and ingredient lists.
- **Stock & Badge Highlights**: Visual indicators for Bestsellers, Handcrafted recipes, Special Combos, and Stock status.

###  3. Quick View Product Modal
- **Comprehensive Product Breakdown**: Displays net weight, customer ratings, review counts, detailed descriptions, and key natural ingredients.
- **Quantity Selector & Direct Cart Add**: Adjust unit counts before adding directly to cart.

###  4. Express Checkout Flow
- **Order Summary**: Full breakdown of items, quantities, subtotal, and calculated delivery fees.
- **Address & Payment Options**: Integrated checkout form supporting Cash on Delivery (COD) and Instant UPI/GPay options.
- **Instant Order Confirmation**: Generates a unique order reference number (`#NF-XXXXXX`) with packing & processing status upon completion.

---

##  Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React 19, JavaScript (ES6+) |
| **Build Tool & HMR** | Vite 8 |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **Styling** | Vanilla CSS (Custom Design System, Responsive Grid, CSS Variables) |
| **State Management** | React Context API (`CartContext`) |
| **Linter** | Oxlint |
| **Deployment** | Vercel (Configured with `vercel.json` for SPA rewrites) |

---

##  Project Structure

```text
assign/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Brand images & banners
│   ├── components/
│   │   ├── SmartCart/
│   │   │   ├── CartDrawer.jsx          # Slide-over cart container
│   │   │   ├── DeliveryProgress.jsx    # Dynamic shipping progress bar
│   │   │   └── SmartRecommendations.jsx # Intelligent product upsells
│   │   ├── CheckoutModal.jsx   # Express checkout modal
│   │   ├── FilterBar.jsx       # Category pills & search bar
│   │   ├── Footer.jsx          # Footer & brand highlights
│   │   ├── HeroBanner.jsx      # Main promotional banner
│   │   ├── Navbar.jsx          # Top navigation & cart toggle
│   │   ├── ProductGrid.jsx     # Product card listing grid
│   │   └── ProductModal.jsx    # Quick view details modal
│   ├── context/
│   │   └── CartContext.jsx     # Global cart state & recommendation logic
│   ├── data/
│   │   └── products.js         # Product dataset & pricing rules
│   ├── App.css                 # Application layout styles
│   ├── App.jsx                 # Main application structure
│   ├── index.css               # Design system & global styles
│   └── main.jsx                # Application entry point
├── .gitignore
├── .oxlintrc.json
├── index.html                  # HTML entry point
├── package.json
├── README.md
├── vercel.json                 # Vercel deployment configuration
└── vite.config.js              # Vite build setup
```

---

##  Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MANJEET-SINGH766/smart-cart.git
   cd assign
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

##  Available Scripts

- `npm run dev` — Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` — Compiles production-ready static assets into the `dist/` folder.
- `npm run preview` — Locally previews the built production app.
- `npm run lint` — Runs `oxlint` to check code quality and syntax standards.

---

##  Deployment

The project is pre-configured for seamless single-page application (SPA) deployment on **Vercel**.

`vercel.json` configuration included:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

To deploy manually via Vercel CLI:
```bash
npx vercel
```

---

## 📄 License

This project is licensed under the MIT License.
