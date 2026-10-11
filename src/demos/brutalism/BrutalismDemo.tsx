import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Zap, 
  Eye, 
  Check, 
  Tag, 
  Sparkles,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { BrutalProduct, CartItem } from '../../types';

export const BrutalismDemo: React.FC = () => {
  // Store inventory
  const initialProducts: BrutalProduct[] = [
    {
      id: 'p1',
      name: 'HEAVYWEIGHT OVERSIZED HOODIE // 001',
      tagline: '520 GSM French Terry Cotton • Raw Hem',
      price: 140,
      originalPrice: 175,
      category: 'Hoodies',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80',
      badge: 'ARCHIVE DROP',
      description: 'Custom milled in Portugal. Heavyweight structured boxy fit, distressed raw-edge hems, and high-density industrial puff embroidery across upper back.',
      inStock: true,
    },
    {
      id: 'p2',
      name: 'NEO-INDUSTRIAL TACTICAL CARGO PANT',
      tagline: 'Water-Repellent Ripstop • 8 Modular Pockets',
      price: 165,
      category: 'Tees', // using apparel categories
      sizes: ['M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
      badge: 'BESTSELLER',
      description: 'Engineered for dystopian urban utility. Custom matte black Cobra buckle closures, reinforced double-layer knee articulators, and cinch ankles.',
      inStock: true,
    },
    {
      id: 'p3',
      name: 'BRUTAL GRAPHIC BOXY TEE // VOL. 04',
      tagline: '300 GSM Combed Cotton • Distressed Acid Wash',
      price: 65,
      category: 'Tees',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80',
      badge: 'LOW STOCK',
      description: 'Silk-screen printed with solvent-resistant high density ink. High-rib collar, dropped shoulder seams, and relaxed streetwear draping.',
      inStock: true,
    },
    {
      id: 'p4',
      name: 'BALLISTIC NYLON CROSSBODY RIG',
      tagline: 'Cordura 1000D • Waterproof YKK Aquaguard',
      price: 85,
      category: 'Accessories',
      sizes: ['M'], // One Size
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      badge: 'WATERPROOF',
      description: 'Military-grade Cordura fabric with magnetic Fidlock quick-release hardware. Fits iPad Mini, camera, and everyday EDC hardware.',
      inStock: true,
    },
    {
      id: 'p5',
      name: 'HEAVY METALS KNIT BEANIE',
      tagline: '100% Merino Wool • Metal Logo Inset',
      price: 45,
      category: 'Headwear',
      sizes: ['M'],
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80',
      badge: 'NEW',
      description: 'Chunky ribbed knit structure with laser-engraved stainless steel industrial plate on front cuff.',
      inStock: true,
    },
    {
      id: 'p6',
      name: 'CYBER-PUNK ACID WASH BOMBER',
      tagline: 'Insulated Primaloft • Reversible Safety Orange',
      price: 240,
      originalPrice: 290,
      category: 'Hoodies',
      sizes: ['S', 'M', 'L'],
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80',
      badge: 'LIMITED 50 PIECES',
      description: 'Heavy duty vintage flight nylon shell, reversible safety orange lining, and oversized brass utility arm pocket.',
      inStock: true,
    },
  ];

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: initialProducts[0],
      selectedSize: 'L',
      quantity: 1,
    },
  ]);

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProduct, setActiveModalProduct] = useState<BrutalProduct | null>(null);
  const [modalSelectedSize, setModalSelectedSize] = useState<string>('L');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Cart Actions
  const addToCart = (product: BrutalProduct, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: Math.min(99, item.quantity + 1) }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: Math.min(99, newQty) } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const filteredProducts =
    selectedCategory === 'ALL'
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  return (
    <DemoViewerShell
      demoId="brutalism"
      demoTitle="RAW // Concrete Apparel"
      category="High-Impact Streetwear E-Commerce"
      styleBadge="Neo-Brutalism Design"
    >
      <div className="bg-[#FFFFFF] text-black font-sans selection:bg-[#FAFF00] selection:text-black min-h-screen relative overflow-x-hidden pb-20">
        
        {/* Marquee Ticker Banner */}
        <div className="bg-[#000000] text-[#FAFF00] font-mono text-xs py-2 px-4 font-bold border-b-4 border-black tracking-widest overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee uppercase">
            🔥 WORLDWIDE EXPRESS DISPATCH // CODE 'BRUTAL20' FOR 20% OFF FIRST ORDER // DEMO STOREFRONT // EXPERIMENTAL HEAVY COTTON DROP // 48 HOURS ONLY // 🔥
          </div>
        </div>

        {/* Brutalist Brand Header Bar */}
        <header className="sticky top-0 z-40 bg-white border-b-4 border-black px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="bg-black text-[#FAFF00] px-2.5 sm:px-3 py-1 font-mono font-black text-lg sm:text-xl tracking-tighter shadow-[3px_3px_0px_#FAFF00] border-2 border-black shrink-0">
              RAW //
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-base sm:text-xl tracking-tight uppercase block leading-none truncate">
                CONCRETE ATELIER
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-widest truncate block">
                Industrial Streetwear Division
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-[#FAFF00] hover:bg-yellow-300 text-black border-2 sm:border-3 border-black font-mono font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 sm:gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>BAG ({totalCartCount})</span>
            </button>

            <Link
              to="/request?style=brutalism"
              className="hidden sm:inline-flex bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs px-3.5 py-2 border-3 border-black shadow-[3px_3px_0px_#FAFF00]"
            >
              Order Brutalist Store
            </Link>
          </div>
        </header>

        {/* Hero Banner Section */}
        <div className="border-b-4 border-black bg-[#FAFF00] p-4 sm:p-10 lg:p-14 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-block bg-black text-white font-mono text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#FFF]">
                DROP 004 // LIMITED SUPPLY
              </div>

              <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-7xl uppercase tracking-tighter leading-[0.9] text-black">
                WEAR THE <br />
                <span className="bg-black text-[#FAFF00] px-2 py-0.5 inline-block my-1 border-3 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
                  CONCRETE.
                </span>
                <br />
                NO COMPROMISE.
              </h1>

              <p className="font-mono text-xs sm:text-sm font-semibold max-w-lg leading-relaxed text-zinc-900 border-l-4 border-black pl-3 sm:pl-4">
                Anti-minimalist heavy industrial streetwear engineered with Portugal-milled heavyweight cotton and tactical hardware. Designed to disrupt conventional e-commerce.
              </p>

              <div className="flex flex-col xs:flex-row gap-3 pt-2">
                <a
                  href="#catalog"
                  className="bg-black text-white hover:bg-zinc-800 font-mono font-black text-xs sm:text-sm text-center px-5 sm:px-6 py-3 sm:py-3.5 border-3 border-black shadow-[4px_4px_0px_#FFF] sm:shadow-[5px_5px_0px_#FFF] active:translate-x-0.5 active:translate-y-0.5"
                >
                  SHOP DROP 004 ↓
                </a>
                <Link
                  to="/request?style=brutalism"
                  className="bg-white text-black hover:bg-zinc-100 font-mono font-bold text-xs sm:text-sm text-center px-5 sm:px-6 py-3 sm:py-3.5 border-3 border-black shadow-[4px_4px_0px_#000] sm:shadow-[5px_5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Build Your Store Like This
                </Link>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border-4 border-black p-4 shadow-[10px_10px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
                <div className="relative aspect-square border-2 border-black overflow-hidden bg-zinc-100">
                  <img
                    src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=700&q=80"
                    alt="Lookbook 04"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAFF00] border-2 border-black font-mono font-black text-xs px-2 py-1 shadow-[2px_2px_0px_#000]">
                    AUTUMN / WINTER 2026
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center font-mono text-xs font-bold">
                  <span>LOOKBOOK 04 // EDITORIAL</span>
                  <span className="text-zinc-600">BERLIN • TOKYO</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Navigation */}
        <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-4 border-black">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
                ACTIVE DROP INVENTORY
              </h2>
              <span className="font-mono text-xs text-zinc-600">
                Click any product to test live cart & size selection
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'Hoodies', 'Tees', 'Accessories', 'Headwear'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-xs font-bold px-3 py-1.5 border-2 border-black transition-all ${
                    selectedCategory === cat
                      ? 'bg-black text-[#FAFF00] shadow-[3px_3px_0px_#FAFF00]'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-black shadow-[2px_2px_0px_#000]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid (Section 6 Requirement) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] flex flex-col justify-between group hover:shadow-[9px_9px_0px_#000] hover:-translate-y-1 transition-all"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-square border-2 border-black overflow-hidden bg-zinc-100 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-[#FAFF00] border-2 border-black font-mono font-black text-[10px] px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={() => {
                        setActiveModalProduct(product);
                        setModalSelectedSize(product.sizes[0]);
                      }}
                      className="absolute bottom-2 right-2 bg-white hover:bg-[#FAFF00] text-black border-2 border-black font-mono font-bold text-[11px] px-2.5 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>DETAILS</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-black text-sm uppercase tracking-tight text-black line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-black text-base text-black">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="block font-mono text-[11px] line-through text-zinc-500">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="font-mono text-xs text-zinc-600 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions: Size & Add to Cart */}
                <div className="pt-4 mt-4 border-t-2 border-black flex items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => addToCart(product, s)}
                        className="w-7 h-7 bg-zinc-100 hover:bg-[#FAFF00] border-2 border-black font-mono text-xs font-bold flex items-center justify-center transition-colors shadow-[1px_1px_0px_#000]"
                        title={`Add size ${s} to cart`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(product, product.sizes[0])}
                    className="bg-black hover:bg-zinc-800 text-[#FAFF00] border-2 border-black font-mono font-black text-xs px-3 py-1.5 shadow-[3px_3px_0px_#FAFF00] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Manifesto Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16">
          <div className="bg-[#000000] text-white border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_#FAFF00] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-[#FAFF00] font-mono text-xs font-bold tracking-widest uppercase">
                BRAND MANIFESTO // 001
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
                ORDINARY E-COMMERCE IS DULL. RAW BRUTALISM CONVERTS THROUGH UNFORGETTABLE ATTITUDE.
              </h3>
              <p className="font-mono text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                If your brand sells streetwear, lifestyle merchandise, edgy tech gear, or underground art, generic pastel templates kill your authenticity. Neo-Brutalism establishes instant cult status.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <Link
                to="/request?style=brutalism"
                className="bg-[#FAFF00] hover:bg-yellow-300 text-black font-mono font-black text-center text-sm py-3 px-4 border-3 border-black shadow-[4px_4px_0px_#FFF] active:translate-x-0.5 active:translate-y-0.5"
              >
                REQUEST BRUTALIST STORE
              </Link>
              <Link
                to="/explore"
                className="bg-white hover:bg-zinc-100 text-black font-mono font-bold text-center text-xs py-2 px-4 border-2 border-black"
              >
                Back to All Demos
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup (Section 6 Requirement) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">
          <div className="bg-[#FAFF00] border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-black text-xl uppercase">JOIN THE UNDERGROUND DISPATCH</h4>
              <p className="font-mono text-xs text-zinc-800">Secret releases, prototype invites, and no spam ever.</p>
            </div>

            {newsletterSubscribed ? (
              <div className="bg-black text-[#FAFF00] font-mono font-bold text-xs px-4 py-2.5 border-2 border-black flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>CONFIRMED: ADDED TO DISPATCH LIST</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row w-full md:w-auto gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL..."
                  className="bg-white border-3 border-black font-mono text-xs px-3 py-2 w-full sm:w-64 focus:outline-none focus:bg-yellow-50"
                />
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-zinc-800 font-mono font-black text-xs px-5 py-2.5 sm:py-2 border-3 border-black shadow-[3px_3px_0px_#FFF] shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Functional Cart Slide-Over Drawer */}
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setCartOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
              <div className="w-full sm:w-screen sm:max-w-md bg-white border-l-4 border-black shadow-2xl flex flex-col justify-between">
                
                {/* Cart Drawer Header */}
                <div className="bg-black text-[#FAFF00] p-4 flex items-center justify-between border-b-4 border-black">
                  <div className="flex items-center gap-2 font-mono font-black text-sm uppercase">
                    <ShoppingBag className="w-4 h-4" />
                    <span>YOUR BAG ({totalCartCount} ITEMS)</span>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-1 hover:bg-zinc-800 text-white rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Item List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-3 font-mono">
                      <ShoppingBag className="w-10 h-10 mx-auto text-zinc-400 stroke-1" />
                      <p className="text-sm font-bold">YOUR BAG IS EMPTY</p>
                      <p className="text-xs text-zinc-500">Pick any drop item from the catalog to test cart updates.</p>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${idx}`}
                        className="bg-zinc-50 border-3 border-black p-3 shadow-[4px_4px_0px_#000] flex gap-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover border-2 border-black shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <h5 className="font-display font-black text-xs uppercase truncate">
                            {item.product.name}
                          </h5>
                          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
                            <span className="bg-black text-white px-1.5 py-0.2 rounded font-bold">
                              SIZE: {item.selectedSize}
                            </span>
                            <span>${item.product.price} each</span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity buttons */}
                            <div className="flex items-center border-2 border-black bg-white">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                                className="p-1 hover:bg-zinc-200"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-mono font-bold text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                                className="p-1 hover:bg-zinc-200"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-zinc-500 hover:text-red-600 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Drawer Footer with Calculation */}
                {cart.length > 0 && (
                  <div className="border-t-4 border-black bg-[#FAFF00] p-4 space-y-3 font-mono">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>SUBTOTAL:</span>
                        <span className="font-bold">${cartSubtotal}</span>
                      </div>
                      <div className="flex justify-between text-zinc-700">
                        <span>ESTIMATED TAX:</span>
                        <span>$0.00 (DEMO)</span>
                      </div>
                      <div className="flex justify-between text-zinc-700">
                        <span>SHIPPING:</span>
                        <span>COMPLIMENTARY</span>
                      </div>
                      <div className="flex justify-between text-base font-black border-t-2 border-black pt-1">
                        <span>TOTAL:</span>
                        <span>${cartSubtotal}</span>
                      </div>
                    </div>

                    <Link
                      to="/request?style=brutalism"
                      onClick={() => setCartOpen(false)}
                      className="w-full bg-black hover:bg-zinc-800 text-[#FAFF00] font-mono font-black text-center text-sm py-3 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 block"
                    >
                      REQUEST SIMILAR E-COMMERCE STORE
                    </Link>

                    <p className="text-[10px] text-center text-zinc-700">
                      *Interactive checkout demonstration powered by Nexora Digital
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Product Quick-View Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white border-4 border-black max-w-xl w-full p-6 shadow-[12px_12px_0px_#FAFF00] relative">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-1.5 bg-black text-white hover:bg-zinc-800 border-2 border-black"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="border-3 border-black overflow-hidden aspect-square bg-zinc-100">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                      {activeModalProduct.category}
                    </span>
                    <h3 className="font-display font-black text-lg uppercase text-black leading-tight">
                      {activeModalProduct.name}
                    </h3>
                    <div className="font-mono font-black text-xl text-black pt-1">
                      ${activeModalProduct.price}
                    </div>
                  </div>

                  <p className="font-mono text-xs text-zinc-700 leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  {/* Size Selector */}
                  <div>
                    <label className="font-mono text-xs font-bold block mb-1.5">SELECT SIZE:</label>
                    <div className="flex gap-2">
                      {activeModalProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setModalSelectedSize(sz)}
                          className={`w-9 h-9 border-2 border-black font-mono font-bold text-xs flex items-center justify-center transition-all ${
                            modalSelectedSize === sz
                              ? 'bg-black text-[#FAFF00] shadow-[2px_2px_0px_#FAFF00]'
                              : 'bg-zinc-100 text-black hover:bg-zinc-200'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(activeModalProduct, modalSelectedSize);
                      setActiveModalProduct(null);
                    }}
                    className="w-full bg-[#FAFF00] hover:bg-yellow-300 text-black font-mono font-black text-sm py-3 border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG (${activeModalProduct.price})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
