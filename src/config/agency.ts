export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceSample: string;
  billingPeriod: string;
  description: string;
  popular?: boolean;
  features: string[];
  timeline: string;
  idealFor: string;
}

export interface DesignDemoMeta {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  visualStyle: 'Bento Grid' | 'Liquid Glass' | 'Neo-Brutalism' | 'Glassmorphism' | 'Claymorphism' | 'Neumorphism' | 'Skeuomorphism';
  description: string;
  suitableIndustries: string[];
  features: string[];
  previewGradient: string;
  accentColor: string;
  bgDark: boolean;
  isMainDemo: boolean;
}

export const AGENCY_CONFIG = {
  brand: {
    name: "NEXORA DIGITAL",
    positioning: "Beautiful Websites. Smarter Business.",
    tagline: "Beautiful Websites. Smarter Business.",
    subheadline: "We design modern websites that help businesses build trust, attract customers, and grow online.",
    heroTitlePrefix: "Websites That Turn",
    heroTitleHighlight: "Casual Visitors",
    heroTitleSuffix: "Into Paying Customers",
    foundedYear: 2024,
    location: "Global Remote Studio • New York & London hubs",
  },
  contact: {
    // Configurable agency phone number (Format: country code + number for WhatsApp API)
    phone: "+15552345678",
    displayPhone: "+1 (555) 234-5678",
    email: "hello@nexoradigital.studio",
    address: "742 Evergreen Terrace, Suite 400, New York, NY 10001",
    location: "Global Remote Studio • New York & London hubs",
    calendlyUrl: "https://calendly.com",
    workingHours: "Monday – Friday: 9am – 6pm EST",
    responseGuarantee: "Guaranteed initial consultation within 24 business hours.",
  },
  social: {
    twitter: "https://twitter.com/nexoradigital",
    github: "https://github.com/nexoradigital",
    linkedin: "https://linkedin.com/company/nexoradigital",
    dribbble: "https://dribbble.com/nexoradigital",
    instagram: "https://instagram.com/nexoradigital",
  },
  metrics: [
    { label: "Active Demos", value: "4 Complete", helper: "Full interactive design architectures" },
    { label: "Average Turnaround", value: "10-14 Days", helper: "From wireframe to production launch" },
    { label: "Conversion Lift", value: "+42%", helper: "Observed average across revamped client sites" },
    { label: "Design Standards", value: "WCAG AA", helper: "High-contrast, mobile-first, and ultra-fast" },
  ],
  pricingPackages: [
    {
      id: "starter",
      name: "STARTER",
      tagline: "Essential High-Impact Presence",
      priceSample: "$1,450",
      billingPeriod: "one-time sample rate",
      description: "Ideal for small businesses and local services requiring a fast, sleek, conversion-ready web presence.",
      popular: false,
      features: [
        "High-converting single-page landing architecture",
        "100% Responsive design across mobile, tablet & desktop",
        "Direct WhatsApp & instant contact integration",
        "Foundational technical SEO & Open Graph setup",
        "Blazing fast static deployment optimization",
        "Google Business & Local Schema integration",
        "14-day post-launch hypercare support",
      ],
      timeline: "5 – 7 business days",
      idealFor: "Cafes, boutiques, local service providers, solopreneurs",
    },
    {
      id: "growth",
      name: "GROWTH",
      badge: "Most Popular",
      tagline: "Comprehensive Multi-Page Experience",
      priceSample: "$2,950",
      billingPeriod: "one-time sample rate",
      description: "A tailored multi-page business website designed to establish domain authority and capture qualified leads.",
      popular: true,
      features: [
        "Multi-page bespoke architecture (up to 6 core pages)",
        "Bespoke design system matching your exact brand personality",
        "Interactive conversion forms with lead routing & validation",
        "Filterable portfolio, work gallery, or service menu",
        "Advanced SEO fundamentals, structured metadata & sitemap",
        "Privacy-first analytics & event tracking setup",
        "Interactive micro-animations & smooth transitions",
        "30-day post-launch optimization & support",
      ],
      timeline: "10 – 14 business days",
      idealFor: "Gyms & fitness studios, salons, real estate, clinics, consultancies",
    },
    {
      id: "premium",
      name: "PREMIUM",
      badge: "Full Custom",
      tagline: "Advanced Custom Interactive Platform",
      priceSample: "$4,850",
      billingPeriod: "one-time sample rate",
      description: "An enterprise-grade bespoke website with rich animations, dynamic components, and specialized integrations.",
      popular: false,
      features: [
        "Everything in Growth plus unlimited tailored pages",
        "Bespoke interactive components & advanced micro-interactions",
        "Custom API integrations (CRM, booking engine, payments)",
        "Dynamic content management readiness or headless setup",
        "Comprehensive cross-device performance & WCAG AA audit",
        "Staging environment & continuous deployment pipeline",
        "Speed score guarantee (>95 Google Lighthouse target)",
        "60-day dedicated post-launch concierge support",
      ],
      timeline: "2 – 3 weeks",
      idealFor: "Funded startups, SaaS products, e-commerce brands, high-end agencies",
    },
  ] as PricingPackage[],
  targetIndustries: [
    "Restaurants & Cafes",
    "Clothing Stores & Boutiques",
    "Gyms & Fitness Studios",
    "Salons & Beauty Businesses",
    "Real Estate Agencies",
    "Educational Institutes",
    "Local Service Providers",
    "Startups & SaaS Companies",
    "Personal Brands & Creators",
  ],
  demos: [
    {
      id: "bento-grid",
      slug: "/demos/bento-grid",
      title: "Bento Grid Studio",
      tagline: "Modular Asymmetric Layout for Creative Agencies",
      category: "Digital Agency & SaaS",
      visualStyle: "Bento Grid",
      description: "A sophisticated dashboard-inspired layout utilizing asymmetric grid modules, glowing borders, live business metrics, and modular portfolio cards.",
      suitableIndustries: ["Creative Agencies", "SaaS Startups", "Design Studios", "Tech Consultancies"],
      features: ["Asymmetric CSS Grid", "Interactive Metrics Toggles", "Client Reviews Bento", "Pricing Modules", "Dark High-Tech Aesthetic"],
      previewGradient: "from-slate-900 via-indigo-950 to-slate-900",
      accentColor: "#6366F1",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "liquid-glass",
      slug: "/demos/liquid-glass",
      title: "Lumen Liquid Glass",
      tagline: "Translucent Surfaces & Ambient Glow for Audio & Media",
      category: "Streaming & Entertainment",
      visualStyle: "Liquid Glass",
      description: "An atmospheric streaming music platform showcasing frosted glass cards, dynamic backdrop blurs, floating panels, and an active interactive music player.",
      suitableIndustries: ["Music & Podcasts", "Event Venues", "Luxury Nightlife", "Digital Media", "Mobile Apps"],
      features: ["Working Music Player Bar", "Frosted Glass Blur Panels", "Playlist Filter & Search", "Album Showcase", "Soft Lighting Effects"],
      previewGradient: "from-purple-950 via-slate-950 to-fuchsia-950",
      accentColor: "#A855F7",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "brutalism",
      slug: "/demos/brutalism",
      title: "RAW // Concrete Apparel",
      tagline: "High-Contrast Neo-Brutalism with Thick Borders & Hard Shadows",
      category: "E-Commerce & Fashion",
      visualStyle: "Neo-Brutalism",
      description: "A high-octane streetwear storefront with unapologetic thick black borders, vivid acid accents, oversized typography, live cart drawer, and interactive product modals.",
      suitableIndustries: ["Streetwear & Apparel", "Creative Collectives", "Music Artists", "Indie Game Studios", "Boutique Retail"],
      features: ["Functional Shopping Cart Drawer", "Size & Variant Selector", "Quick-View Product Modal", "Brutalist Shadow Physics", "High-Contrast Palette"],
      previewGradient: "from-yellow-300 via-amber-200 to-yellow-400",
      accentColor: "#FAFF00",
      bgDark: false,
      isMainDemo: true,
    },
    {
      id: "glassmorphism",
      slug: "/demos/glassmorphism",
      title: "PulseFit Wellness",
      tagline: "Frosted Mesh Gradients & Soft Curves for Health & Fitness",
      category: "Fitness & Wellness",
      visualStyle: "Glassmorphism",
      description: "A refreshing health and fitness ecosystem with translucent floating cards, interactive workout streak progress bars, trainer bios, and membership calculators.",
      suitableIndustries: ["Gyms & Fitness Studios", "Yoga & Pilates", "Wellness Spas", "Personal Trainers", "Health Coaches"],
      features: ["Interactive Streak & Calorie Dashboard", "Program Filter Explorer", "Trainer Modal Profiles", "Monthly/Annual Billing Toggle", "Fluid Mesh Gradients"],
      previewGradient: "from-teal-900 via-emerald-950 to-cyan-950",
      accentColor: "#10B981",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "claymorphism",
      slug: "/demos/claymorphism",
      title: "Lumina // 3D PlayLab",
      tagline: "Gamified 3D Learning & Tactile Inflated UI",
      category: "EdTech & Gamified Learning",
      visualStyle: "Claymorphism",
      description: "Warm, inflated, tactile surfaces that feel touchable. Features an interactive quest tracker, celebratory particle rewards, bouncy 3D buttons, and playful learning modules.",
      suitableIndustries: ["Educational Institutes", "Kids Products", "Gamified Learning", "Creative Studios", "Personal Brands & Creators"],
      features: ["Bouncy 3D Clay Buttons", "Quest Tracker with XP Leveling", "Confetti Celebrations", "Inflated Dual Shadows", "Interactive Avatar Switcher"],
      previewGradient: "from-indigo-600 via-purple-600 to-pink-500",
      accentColor: "#818CF8",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "neumorphism",
      slug: "/demos/neumorphism",
      title: "Aura // Tactile IoT",
      tagline: "Soft Extrusion Smart Home & Environmental Controller",
      category: "Smart Home & Hardware IoT",
      visualStyle: "Neumorphism",
      description: "Subtle dual light-and-dark shadows simulating soft matte plastic and physical extrusion. Features tactile inset switches, live energy wattage recalculation, and a thermostat dial.",
      suitableIndustries: ["IoT Dashboards", "Audio Hardware Controllers", "Smart Home Controls", "Specialized Tools", "Local Service Providers"],
      features: ["Tactile Inset/Outset Switches", "Smooth Dimmer Slider Physics", "Live Wattage Calculator", "Thermostat Dial", "Tone-on-Tone Depth"],
      previewGradient: "from-slate-800 via-slate-900 to-[#141724]",
      accentColor: "#64748B",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "skeuomorphism",
      slug: "/demos/skeuomorphism",
      title: "Valve 1976 // Studio Mastering",
      tagline: "Analog Vacuum Tube Processor & Hardware Console",
      category: "Pro Audio & Precision Hardware",
      visualStyle: "Skeuomorphism",
      description: "Rich brushed gunmetal faceplates, calibrated dual analog VU meters with ballistic inertia, rotary knurled knobs, illuminated vacuum tube filament, and mechanical toggles.",
      suitableIndustries: ["Pro Audio & Music", "Luxury Brands", "Hardware Manufacturers", "Heritage Instruments", "Startups & SaaS Companies"],
      features: ["Dual Animated Analog VU Meters", "5 Rotary Knurled Knobs", "Realistic Vacuum Tube Filament", "Mechanical Power/Bypass Levers", "Mastering Presets"],
      previewGradient: "from-zinc-900 via-amber-950/40 to-black",
      accentColor: "#F59E0B",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "saas-dashboard",
      slug: "/demos/saas-dashboard",
      title: "Nexus Metrics // SaaS Analytics",
      tagline: "Collapsible Sidebar, Real-Time MRR Charts & RBAC Governance",
      category: "Enterprise SaaS & Business Intelligence",
      visualStyle: "SaaS Dashboard",
      description: "A high-performance B2B SaaS platform featuring collapsible sidebar navigation, live MRR growth analytics, searchable customer account directory with filters, light/dark mode toggling, and role-based team management.",
      suitableIndustries: ["Startups & SaaS Companies", "Tech Consultancies", "Financial Tools", "Enterprise Platforms"],
      features: ["Collapsible Multi-State Sidebar", "Interactive MRR & Churn Charts", "Searchable & Filterable Data Table", "Light & Dark Mode Switcher", "Team Member RBAC Governance"],
      previewGradient: "from-indigo-900 via-slate-900 to-[#0E1322]",
      accentColor: "#6366F1",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "social",
      slug: "/demos/social",
      title: "Synapse // Creator Network",
      tagline: "Modern Social Profile, Live Feed, Discussions & Direct Messaging",
      category: "Social Networking & Community",
      visualStyle: "Social Profile",
      description: "An engaging creator platform featuring customizable cover banners, verified profile statistics with dynamic follow counters, rich activity feed with code snippets and likes, media galleries, and an interactive real-time messaging drawer.",
      suitableIndustries: ["Personal Brands & Creators", "Online Communities", "Media Networks", "Developer Platforms"],
      features: ["Interactive Follow/Unfollow State", "Live Post Composer & Inline Replies", "Direct Messaging Chat Drawer", "Media Grid & Code Snippets", "Responsive Bottom Navigation"],
      previewGradient: "from-purple-950 via-slate-950 to-indigo-950",
      accentColor: "#A855F7",
      bgDark: true,
      isMainDemo: true,
    },
    {
      id: "fintech-wallet",
      slug: "/demos/fintech-wallet",
      title: "Aura Pay // Global Treasury Wallet",
      tagline: "Multi-Currency Accounts, Titanium Virtual Card & Instant Transfers",
      category: "FinTech & Digital Wealth Management",
      visualStyle: "Digital Wallet",
      description: "An institutional-grade wealth and treasury wallet with privacy toggles to mask balances, multi-currency accounts (USD, EUR, BTC), interactive flip-to-reveal titanium virtual card, filtered audit ledgers, and simulated money transfer flows.",
      suitableIndustries: ["Startups & SaaS Companies", "Local Service Providers", "Educational Institutes", "Real Estate Agencies"],
      features: ["Simulated Instant Money Transfers", "Balance Privacy Masking Mode", "Titanium Virtual Card with Security Lock", "Real-Time Filterable Ledger", "Expense Category Allocation Charts"],
      previewGradient: "from-emerald-950 via-[#07090E] to-teal-950",
      accentColor: "#10B981",
      bgDark: true,
      isMainDemo: true,
    },
  ] as DesignDemoMeta[],
};

/**
 * Builds an official WhatsApp link with pre-filled message according to Section 10 specs
 */
export function buildWhatsAppUrl(data: {
  fullName?: string;
  businessName?: string;
  selectedDesign?: string;
  requestedFeatures?: string[];
  budgetRange?: string;
}): string {
  const sanitizeLine = (val?: string) => (val || '').replace(/[\r\n\x00-\x1F]/g, ' ').trim();
  const phone = AGENCY_CONFIG.contact.phone.replace(/[^0-9]/g, '');
  const lines = [
    `Hello ${AGENCY_CONFIG.brand.name}! I would like to request a website consultation.`,
    ``,
    `*Client Name:* ${sanitizeLine(data.fullName) || 'Not specified'}`,
    `*Business Name:* ${sanitizeLine(data.businessName) || 'Not specified'}`,
    `*Preferred Design Style:* ${sanitizeLine(data.selectedDesign) || 'Bespoke / Custom'}`,
    `*Key Features:* ${data.requestedFeatures && data.requestedFeatures.length > 0 ? data.requestedFeatures.map(sanitizeLine).join(', ') : 'Standard package'}`,
    `*Budget Range:* ${sanitizeLine(data.budgetRange) || 'Flexible'}`,
    ``,
    `Looking forward to discussing our website project!`,
  ];

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${encodedText}`;
}
