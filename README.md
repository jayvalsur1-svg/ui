# NEXORA DIGITAL — Website Demos & Agency Platform

> **"Beautiful Websites. Smarter Business."**  
> Premium-quality, high-converting digital agency website showcasing four genuinely different website design systems, interactive device viewport simulators, and a conversion-focused client acquisition funnel.

---

## 🌟 Executive Overview

**NEXORA DIGITAL** is engineered to turn prospective business owners, startups, creators, and established companies into paying clients. Rather than presenting static color variations, the platform hosts **four completely separate, navigable website design demos**—each with its own visual personality, design tokens, layout hierarchy, and functional interactions—plus three secondary tactile style playgrounds.

---

## 🚀 Live Routes & Architecture

### Main Agency Platform
| Route | Page | Purpose & Key Features |
|---|---|---|
| `/` | **Home** | 15-section conversion funnel: Hero, animated preview mockups, dual CTAs, featured styles, demo gallery, services, methodology, sample pricing, portfolio, client testimonials, FAQ, and final CTA. |
| `/explore` | **Explore Designs Showroom** | Full showroom with live search, industry filter, visual style filter, cards with "Open Full Demo" & "Request Similar", and 3 interactive secondary playgrounds. |
| `/services` | **Web Services** | Full breakdown of UI/UX Design, CRO Funnels, E-Commerce, Speed Optimization, Full-Stack Apps, and Hypercare. |
| `/pricing` | **Pricing Packages** | Illustrative sample packages (STARTER: $1,450, GROWTH: $2,950, PREMIUM: $4,850) with transparent ethical terms and quote routing. |
| `/about` | **About Studio** | Agency manifesto, engineering principles, core metrics, and senior leadership bios. |
| `/contact` | **Direct Inquiries** | Direct studio coordinates, priority WhatsApp chat button, and validated message form. |
| `/request` | **Request a Website (Client Conversion)** | Multi-step client conversion system with live auto-updating scope summary, input validation, celebratory confetti, formatted receipt, and 1-click WhatsApp message dispatch. |

### The Four Distinct Design Demos
| Route | Design System | Industry & Persona | Signature Interactive Features |
|---|---|---|---|
| `/demos/bento-grid` | **Bento Grid System** | *Kinetic Bento Labs* (Digital Agency & SaaS) | Asymmetric CSS Grid, toggleable live metrics model (`30d`, `90d`, `12m`), architecture capability tabs, interactive review carousel, and dark glowing cards. |
| `/demos/liquid-glass` | **Liquid Glass Architecture** | *Lumen Audio* (Spatial Audio & Streaming) | Translucent frosted panels (`backdrop-blur-2xl`), ambient gradient orbs, genre filter, song search, and **functional fixed music player bar** (play/pause, scrubber, volume slider, track metadata). |
| `/demos/brutalism` | **Neo-Brutalism Design** | *RAW // Concrete Apparel* (Streetwear E-Commerce) | Stark black/white palette, 4px solid borders, hard offset shadows (`4px 4px 0px #000`), acid yellow accents, size selectors, product quick-view modal, and **functional interactive shopping cart drawer** (real-time subtotal, quantity +/-). |
| `/demos/glassmorphism` | **Glassmorphism System** | *PulseFit Wellness* (Health & Fitness Studio) | Translucent cards, soft mesh gradients, **interactive daily member dashboard** (hydration tracker with +250mL log, 18-day streak tracker, recovery scores), trainer bio modals, and monthly/annual pricing toggle (with 20% discount). |

### Secondary Style Previews (`/explore`)
- **Claymorphism (3D Soft UI):** Soft, rounded 3D pillowy surfaces with dual inner and drop shadows, playful interactive counter.
- **Neumorphism (Tactile Extrusion):** Soft extruded tone-on-tone surfaces with interactive sensor toggle switch and smooth tactile slider.
- **Skeuomorphism (Physical Realism):** Brushed metallic panel with clickable mechanical toggle lever, red glowing LED indicator lamp, and rotating analog dial knob (potentiometer).

---

## 📱 Device Viewport Simulation Shell (`DemoViewerShell`)
Every demo route is wrapped in an interactive preview shell featuring:
- **Device Viewport Switcher:**
  - 🖥️ **Desktop:** 100% full responsive viewport.
  - 📱 **Tablet:** 768px centered container with realistic device bezels.
  - 📲 **Mobile:** 390px centered container with realistic notch, frame, and independent scrolling.
- **Fullscreen Mode:** Toggle full-screen presentation mode for client walkthroughs.
- **Direct Conversion CTA:** "Request Similar Website" pre-selects the active demo style in the quote builder.
- **Share Link:** Copy clean URL with feedback indicator.

---

## 🛠️ Tech Stack & Technical Foundation

- **Frontend Framework:** React 18 & TypeScript (strict mode)
- **Build Tool:** Vite 5 (instant Hot Module Replacement, optimized ES modules)
- **Styling:** Tailwind CSS with custom design tokens for Brutalism, Glassmorphism, and Neumorphism
- **Icons:** Lucide React (clean, accessible vector icons)
- **Delight & Micro-interactions:** Canvas Confetti, smooth CSS transitions
- **Routing:** React Router v6 with `ScrollToTop` behavior

---

## ⚙️ How to Run Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation & Startup
```bash
# Navigate to the website root
cd E:\website

# Install dependencies (already installed)
npm install

# Start Vite local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Typecheck and bundle assets into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🔧 Agency Configuration Guide

All agency information, contact points, sample rates, and demo metadata are centralized in:
📂 `src/config/agency.ts`

To customize for your agency:
1. **Agency Name & Branding:** Update `AGENCY_CONFIG.brand.name` and taglines.
2. **WhatsApp Contact Number:** Change `AGENCY_CONFIG.contact.phone` to your international phone number (e.g. `"+15551234567"`). WhatsApp URLs will automatically format and encode quotes to this destination.
3. **Email & Coordinates:** Update `AGENCY_CONFIG.contact.email` and `address`.
4. **Sample Package Pricing:** Adjust rates, included features, and timelines in `AGENCY_CONFIG.pricingPackages`.

---

## 🛡️ Enterprise Security & Anti-Exploit Architecture

The platform has been hardened with defense-in-depth security principles:
1. **Content Security Policy (CSP):** Strict CSP meta policies preventing unauthorized external script execution, malicious inline injections, and unauthorized framing (`frame-ancestors 'self'`).
2. **Defensive Input Sanitization:** Centralized in [`src/utils/security.ts`](src/utils/security.ts), stripping null bytes, control sequences, executable `javascript:` URIs, and raw HTML tags.
3. **Anti-Bot Honeypot Protection:** Conversion and contact forms deploy hidden trap fields invisible to humans that silently discard automated bot spam and credential scrapers.
4. **Client-Side Anti-Abuse Rate Limiting:** Form submissions enforce a token cooldown to block automated rapid-fire denial-of-service hammering.
5. **Fault-Tolerant Error Boundary:** [`src/components/common/ErrorBoundary.tsx`](src/components/common/ErrorBoundary.tsx) catches unexpected exceptions, isolates component failures, and prevents application crashes.
6. **URL & Parameter Neutralization:** All generated WhatsApp dispatch URLs and inquiry parameters are stripped of control lines, CRLF injection characters, and illegal query tokens.

---

## ⚡ High-Throughput Scalability & Performance

- **On-Demand Dynamic Code-Splitting:** All 7 main pages and 4 standalone demos are lazy-loaded via `React.lazy()` and `Suspense`. The initial main bundle is reduced to just ~63 kB (gzipped), ensuring instantaneous global First Contentful Paint (<100ms).
- **Zero Layout Shifts (CLS):** Explicit sizing and responsive CSS Grid structures prevent unexpected page jumps.
- **Autonomous Architecture:** All demos, search filters, state machines, and viewports function completely in the client without requiring an active external database for demonstration.

---

Crafted by **NEXORA DIGITAL** • *Beautiful Websites. Smarter Business.*
