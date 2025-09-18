import React, { useEffect, useState } from "react";
import offer1 from "./assets/offer1.jpg";
import offer2 from "./assets/offer2.jpg";
import offer3 from "./assets/offer3.jpg";


/**
 * App.jsx
 * - Boutique-style e-commerce front-end
 * - Hover-only size dropdowns (custom per category), mandatory selection
 * - Buy Now opens WhatsApp with product + size + price
 * - Animated gradient background, staggered load, tilt hover, sticky search, left categories
 *
 * WhatsApp number: +91 7026172617 (encoded in wa.me link)
 */

const OFFERS = [
  { id: 1, img: offer1, text: "🔥 Flat 50% Off on Shoes" },
  { id: 2, img: offer2, text: "🎉 New Arrivals – Bags & Purses" },
  { id: 3, img: offer3, text: "✨ Perfume Combo Deals" },
];


/* ----------------- Category -> Size options ----------------- */
const SIZE_OPTIONS = {
  womens_kick: ["5", "6", "7", "8", "9", "10"],
  mens_kick: ["6", "7", "8", "9", "10", "11"],
  belt: ["28", "30", "32", "34", "36"],
  jackets: ["S", "M", "L", "XL", "XXL"],
  pants: ["S", "M", "L", "XL", "XXL"],
  perfume_women: ["50ml", "100ml", "150ml"],
  perfume_men: ["50ml", "100ml", "150ml"],
  perfume_combo: ["50ml", "100ml", "150ml"],
  mens_watch: ["Small", "Medium", "Large"],
  womens_watch: ["Small", "Medium", "Large"],
  sunglasses: ["Small", "Medium", "Wide"],
  ladies_sunglasses: ["Small", "Medium", "Wide"],
  frames: ["Small", "Medium", "Wide"],
  // categories without entries will be treated as "no size required"
};

/* ----------------- Categories ----------------- */
const MOCK_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "womens_kick", name: "Women’s Kick" },
  { id: "mens_kick", name: "Men’s Kick" },
  { id: "wallet", name: "Wallet" },
  { id: "belt", name: "Belt" },
  { id: "handbags", name: "Hand Bags" },
  { id: "backpacks", name: "Bag Packs" },
  { id: "purse", name: "Purse" },
  { id: "jackets", name: "Jockets" },
  { id: "pants", name: "Pants" },
  { id: "perfume_women", name: "Perfume for Women" },
  { id: "perfume_men", name: "Perfume for Men" },
  { id: "perfume_combo", name: "Perfume Combo" },
  { id: "mens_watch", name: "Men’s Watch" },
  { id: "womens_watch", name: "Women Watch" },
  { id: "sunglasses", name: "Sunglasses" },
  { id: "ladies_sunglasses", name: "Ladies Sunglasses" },
  { id: "frames", name: "Frames" },
];

/* ----------------- Products ----------------- */
/* You can replace this array with real API data later */
const MOCK_PRODUCTS = [
  { id: "p1", name: "Women’s Running Shoes", price: 2499, rating: 4.5, category: "womens_kick"},
  { id: "p2", name: "Men’s Casual Sneakers", price: 2999, rating: 4.3, category: "mens_kick"},
  { id: "p3", name: "Leather Wallet", price: 999, rating: 4.6, category: "wallet"},
  { id: "p4", name: "Classic Brown Belt", price: 799, rating: 4.2, category: "belt"},
  { id: "p5", name: "Designer Hand Bag", price: 3499, rating: 4.7, category: "handbags"},
  { id: "p6", name: "Travel Backpack", price: 1999, rating: 4.4, category: "backpacks"},
  { id: "p7", name: "Ladies Purse", price: 1299, rating: 4.3, category: "purse"},
  { id: "p8", name: "Winter Jacket", price: 3999, rating: 4.5, category: "jackets"},
  { id: "p9", name: "Slim Fit Pants", price: 1599, rating: 4.2, category: "pants"},
  { id: "p10", name: "Floral Perfume for Women", price: 1799, rating: 4.6, category: "perfume_women"},
  { id: "p11", name: "Woody Perfume for Men", price: 1999, rating: 4.4, category: "perfume_men"},
  { id: "p12", name: "Perfume Gift Combo", price: 2999, rating: 4.7, category: "perfume_combo"},
  { id: "p13", name: "Men’s Analog Watch", price: 2499, rating: 4.5, category: "mens_watch"},
  { id: "p14", name: "Women’s Smart Watch", price: 2699, rating: 4.6, category: "womens_watch"},
  { id: "p15", name: "Unisex Sunglasses", price: 1499, rating: 4.3, category: "sunglasses"},
  { id: "p16", name: "Ladies Cat Eye Sunglasses", price: 1699, rating: 4.4, category: "ladies_sunglasses"},
  { id: "p17", name: "Stylish Frames", price: 1299, rating: 4.2, category: "frames"},
];

/* ----------------- Helpers ----------------- */
const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* ----------------- App ----------------- */
export default function App() {
  
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [query, setQuery] = useState("");
  const [sizes, setSizes] = useState({}); // { productId: selectedSize }
  const [showTop, setShowTop] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);



useEffect(() => {
  const timer = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % OFFERS.length);
  }, 2000); // every 4 seconds
  return () => clearInterval(timer);
}, []);


  useEffect(() => {
    // load mock data (swap with API calls later if needed)
    setAllProducts(MOCK_PRODUCTS);
    setCategories(MOCK_CATEGORIES);

    const onScroll = () => setShowTop(window.scrollY > 240);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Filtered list (category + search)
  const filteredProducts = allProducts.filter((p) => {
    const matchCategory = selectedCat === "all" || p.category === selectedCat;
    const q = query.trim().toLowerCase();
    const matchQuery = !q || p.name.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  // Buy now — enforces size when required, opens WhatsApp
  const handleBuyNow = (product) => {
    const sizeOptions = SIZE_OPTIONS[product.category];
    const selectedSize = sizes[product.id];

    if (sizeOptions && !selectedSize) {
      // mandatory size
      alert("Please select a size before buying.");
      return;
    }

    const msg = encodeURIComponent(
      `Hi, I want to buy:%0AProduct: ${product.name}%0A${selectedSize ? `Size: ${selectedSize}%0A` : ""}Price: ${formatINR(product.price)}`
    );
    // wa.me with country code +91
    window.open(`https://wa.me/917026172617?text=${msg}`, "_blank");
  };

  // remember size selection
  const setProductSize = (productId, value) => {
    setSizes((s) => ({ ...s, [productId]: value }));
  };

  // scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="ecom-root">
      <SiteStyles />

    <div className="app-wrapper">
      {/* Floating shapes layer */}
      <div className="shapes-container">
        <span className="shape" style={{ top: "5%", left: "10%", animationDuration: "15s" }}>♦</span>
        <span className="shape" style={{ top: "20%", left: "40%", animationDuration: "18s" }}>★</span>
        <span className="shape" style={{ top: "35%", left: "70%", animationDuration: "22s" }}>▲</span>
        <span className="shape" style={{ top: "50%", left: "25%", animationDuration: "20s" }}>❤</span>
        <span className="shape" style={{ top: "65%", left: "55%", animationDuration: "24s" }}>⬡</span>
        <span className="shape" style={{ top: "75%", left: "80%", animationDuration: "16s" }}>⬟</span>
        <span className="shape" style={{ top: "85%", left: "15%", animationDuration: "19s" }}>◆</span>
        <span className="shape" style={{ top: "90%", left: "45%", animationDuration: "21s" }}>✦</span>
        <span className="shape" style={{ top: "95%", left: "65%", animationDuration: "17s" }}>♡</span>
      </div>


{/* --- Header with Brand Logo + Text + Search --- */}
<header className="ecom-header sticky">
  <div className="ecom-brand">
    {/* Brand Logo (clickable) */}
    <a href="/" className="ecom-logo-link">
      <img src="/src/assets/brand-logo.png" alt="StyleMart Logo" className="ecom-logo" />
    </a>

    {/* Brand Name */}
    <div>
      <h1 className="ecom-title">Luxury Hub</h1>
      <p className="ecom-sub">Fashion • Accessories • Lifestyle</p>
    </div>
  </div>

  {/* Search */}
<div className="ecom-search-wrap">
  <input
    className="ecom-input"
    placeholder="Search products..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        setQuery(query.trim());
      }
    }}
  />
  <span
    className="search-icon"
    onClick={() => setQuery(query.trim())}
    role="button"
    aria-label="Search"
  >
    🔍
  </span>
</div>


</header>


      {/* Offer Carousel */}
<div className="offer-carousel">
  {OFFERS.map((offer, i) => (
    <div key={offer.id} className={`offer-slide ${i === activeSlide ? "active" : ""}`}>
      <img src={offer.img} alt={offer.text} />
      <div className="offer-text">{offer.text}</div>
    </div>
  ))}
</div>

{/* Category Button */}
<div className="category-toggle">
  <button onClick={() => setSidebarOpen(!sidebarOpen)}>
    ☰ Categories
  </button>
</div>

{/* Side Panel for Categories */}
<div className={`category-panel ${sidebarOpen ? "open" : ""}`}>
  <div className="panel-header">
    <h3>Shop by Category</h3>
    <button className="close-btn" onClick={() => setSidebarOpen(false)}>✖</button>
  </div>
  <ul>
    {categories.map((c) => (
      <li
        key={c.id}
        onClick={() => {
          setSelectedCat(c.id);
          setSidebarOpen(false); // auto-close after selection
        }}
        className={selectedCat === c.id ? "active" : ""}
      >
        {c.name}
      </li>
    ))}
  </ul>
</div>



     {/* --- Layout with Sidebar + Products --- */}
<div className="ecom-layout">
  



  {/* Product Grid */}
  <main className="ecom-main">
    <section className="ecom-grid">
      {filteredProducts.map((p, i) => {
        const sizeOptions = SIZE_OPTIONS[p.category];
        return (
         <article key={p.id} className="ecom-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
  <div className="card-inner">
    <div className="ecom-thumb">
      <img src={`/products/${p.id}.jpg`} alt={p.name} />
    </div>
    <div className="ecom-info">
      <h4 className="ecom-name">{p.name}</h4>
      <div className="ecom-meta">
        <span className="ecom-price">{formatINR(p.price)}</span>
        <span className="ecom-rate">★ {p.rating}</span>
      </div>
      </div>


              {/* Size dropdown - always visible */}
              {sizeOptions && (
                <div className="size-wrap always">
                  <select
                    className="size-dropdown"
                    value={sizes[p.id] || ""}
                    onChange={(e) => setSizes({ ...sizes, [p.id]: e.target.value })}
                  >
                    <option value="">Select Size</option>
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {sizes[p.id] && <span className="size-tick visible">✅</span>}
                </div>
              )}

              <button className="ecom-buy" onClick={() => handleBuyNow(p)}>
                Buy Now
              </button>
            </div>
          </article>
        );
      })}
    </section>
  </main>
</div>


      {/* Back to top (pulsing) */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </div>
    </div>
  );
}

/* ----------------- Inline styles & theme ----------------- */
/* Kept inline so this file is drop-in. Replace or move to CSS if you prefer. */
function SiteStyles() {
  
  return (
    <style>{`

      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

body, .ecom-root, .ecom-sidebar, .ecom-main, 
.ecom-card, .ecom-name, .ecom-meta, .ecom-price, 
.ecom-rate, .size-dropdown, .ecom-buy, .offer-text {
  font-family: 'Poppins', sans-serif !important;
}

.offer-carousel {
  position: relative;
  width: 100%;
  height: 260px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.offer-slide {
  position: absolute;
  top: 0; left: 100%;
  width: 100%; height: 100%;
  opacity: 0;
  transition: all 1s ease-in-out;
}

.offer-slide.active {
  left: 0;
  opacity: 1;
  z-index: 2;
}

.offer-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  .offer-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

/* Sidebar - Animated Dark Gradient */
.ecom-sidebar {
  width: 240px;
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(160deg, #000000, #3a1c1c, #2e003e, #1a001f);
  background-size: 400% 400%;
  animation: sidebarGradient 10s ease infinite;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
  color: #fff;
}

@keyframes sidebarGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.ecom-sidebar h3 {
  font-size: 16px;
  margin-bottom: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #f5f5f5;
  text-transform: uppercase;
}

.ecom-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ecom-sidebar li {
  margin: 10px 0;
  padding: 10px 16px;
  border-radius: 30px;
  background: rgba(255,255,255,0.08);
  color: #f0f0f0;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ecom-sidebar li:hover,
.ecom-sidebar li.active {
  background: linear-gradient(135deg, #e75480, #c084fc);
  color: #fff;
  transform: translateX(6px) scale(1.05);
  box-shadow: 0 6px 16px rgba(231,84,128,0.5);
}
  .ecom-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.ecom-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ecom-logo:hover {
  transform: scale(1.1);
}



/* Product Grid */
.ecom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
  gap: 20px;
}

/* Card container */
.ecom-card {
  perspective: 1000px;
  display: inline-block;
  border-radius: 16px;
  animation: fadeInCard 0.8s forwards;
  opacity: 0;
  transform: translateY(20px);
}

/* Fade-in stagger */
@keyframes fadeInCard {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Inner wrapper */
.card-inner {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transition: transform 1s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;

  /* ✅ always reset */
  transform: rotateY(0deg);
}

/* Hover → 0 → 360 spin */
.ecom-card:hover .card-inner {
  transform: rotateY(360deg) scale(1.05);
  box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
}




.ecom-thumb {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.ecom-thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ecom-info {
  padding: 14px;
}

.ecom-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 16px;
  margin: 0 0 6px;
  color: #2a2a2a;
}

.ecom-meta {
  display:flex;
  justify-content:space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.ecom-price {
  color: #e75480;
  font-weight: 700;
}

/* Size always visible */
.size-wrap.always {
  display:flex;
  gap:8px;
  margin-bottom: 10px;
}

.size-dropdown {
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.size-tick {
  font-size: 18px;
  color: green;
  transition: transform .3s;
}
.size-tick.visible {
  transform: scale(1.2);
}

/* Search wrapper */
/* Search wrapper */
.ecom-search-wrap {
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}

/* Input field */
.ecom-input {
  padding: 10px 44px 10px 18px;
  border-radius: 999px; /* pill shape */
  border: 3px solid transparent; /* gradient border applied below */
  outline: none;
  font-size: 15px;
  width: 260px;
  font-weight: 600;
  transition: width 0.4s ease, box-shadow 0.3s ease;

  /* background inside search box */
  background: #1a1a1a; /* dark background for contrast */
  color: #8B4513;      /* solid brown text */
}

/* Gradient border effect */
/* Gradient border effect */
.ecom-input {
  background-clip: padding-box;
  border: 3px solid transparent;
  border-image: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513) 1;
  border-image-slice: 1;
  animation: shimmerBorder 3s linear infinite; /* faster shimmer */
}

/* Faster shimmer animation */
@keyframes shimmerBorder {
  0% { border-image-source: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513); }
  50% { border-image-source: linear-gradient(135deg, #D4AF37, #8B4513, #D4AF37); }
  100% { border-image-source: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513); }
}


/* Placeholder in brown */
.ecom-input::placeholder {
  color: #8B4513;
  opacity: 0.8;
}

/* Search icon */
.search-icon {
  position: absolute;
  right: 16px;
  font-size: 18px;
  cursor: pointer;
  color: #8B4513; /* solid brown icon */
}

/* Border shimmer animation */
@keyframes shimmerBorder {
  0% { border-image-source: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513); }
  50% { border-image-source: linear-gradient(135deg, #D4AF37, #8B4513, #D4AF37); }
  100% { border-image-source: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513); }
}



/* Buy button - Gradient */
.ecom-buy {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #e75480, #c084fc);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .25s ease, box-shadow .25s ease;
  position: relative;
  overflow: hidden;
}

.ecom-buy:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(231,84,128,0.4);
}
  .ecom-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #8B4513, #D4AF37, #8B4513);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmerGold 4s ease-in-out infinite;
}

@keyframes shimmerGold {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}




:root{
  --bg: #fff7fb; --card:#ffffff; --muted:#6b6b6b; --ink:#2a2a2a;
  --accent:#e75480; --accent2:#c084fc; --border:#f0d9e7;
  --shadow:0 6px 20px rgba(231,84,128,.15); --radius:16px; --container:1180px;
  --pulse: 1.05;
}

/* Animated gradient background (light blue, green, pink) */
/* Global Page Background - Animated Dark Gradient */
/* Global Page Background - Animated Gradient + Diamond Texture */
/* Base Gradient (already in your code) */
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background: linear-gradient(-45deg, #000000, #3a1c1c, #2e003e, #1a001f);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  position: relative;
  overflow-x: hidden;
}


/* Whole app wrapper with animated gradient */
.app-wrapper {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(-45deg, #000000, #3a1c1c, #2e003e, #1a001f);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  overflow-x: hidden;
}

/* Floating shapes layer */
.shapes-container {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* behind content */
  pointer-events: none;
  overflow: hidden;
}

/* Shapes styling */
.shape {
  position: absolute;
  font-size: 22px;
  color: rgba(255,255,255,0.15);
  animation: floatShape linear infinite;
}

/* Main content sits above */
.site-content {
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes floatShape {
  0%   { transform: translateY(0) translateX(0) rotate(0deg); }
  50%  { transform: translateY(-50px) translateX(25px) rotate(180deg); }
  100% { transform: translateY(0) translateX(0) rotate(360deg); }
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Product grid responsive */
.ecom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px;
}

/* Desktop layout */
@media (min-width: 1025px) {
  .ecom-layout {
    display: flex;
    gap: 24px;
  }

  .ecom-sidebar {
    width: 250px;
    flex-shrink: 0;
  }

  .ecom-main {
    flex: 1;
  }
}

/* Tablet layout */
@media (max-width: 1024px) and (min-width: 601px) {
  .ecom-layout {
    display: flex;
    flex-direction: row;
  }

  .ecom-sidebar {
    width: 200px;
    font-size: 14px;
  }

  .ecom-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile layout */
@media (max-width: 600px) {
  .ecom-layout {
    display: block;
  }

  /* Sidebar becomes top bar */
  .ecom-sidebar {
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 12px;
    margin-bottom: 16px;
    padding: 10px;
    text-align: center;
  }

  .ecom-sidebar ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .ecom-sidebar li {
    padding: 6px 10px;
    font-size: 13px;
  }

  /* Product grid single column */
  .ecom-grid {
    grid-template-columns: 1fr;
  }

  /* Brand + Search stack */
  .ecom-header {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .brand-title {
    font-size: 22px;
    text-align: center;
  }

  .ecom-input {
    width: 100%;
    font-size: 14px;
    padding: 8px;
  }

  .search-icon {
    font-size: 16px;
  }
}
/* Categories at top-left */
.ecom-categories {
  position: fixed;
  top: 70px; /* adjust based on your header height */
  left: 10px;
  width: 180px;
  max-height: 80vh;
  overflow-y: auto;
  background: linear-gradient(-45deg, #000000, #3a1c1c, #2e003e);
  border-radius: 12px;
  padding: 12px;
  z-index: 1000;
}

.ecom-categories ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ecom-categories li {
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: #fff;
  font-family: inherit;
  text-align: left;
}

.ecom-categories li:hover {
  background: rgba(212, 175, 55, 0.2);
  transform: translateX(5px);
}

.ecom-categories li.active {
  background: rgba(212, 175, 55, 0.3);
  font-weight: bold;
}

/* Adjust product grid to leave space */
.ecom-main {
  margin-left: 200px; /* space for category panel */
}
/* Category button */
.category-toggle {
  position: fixed;
  top: 70px; /* below header */
  left: 10px;
  z-index: 1100;
}

.category-toggle button {
  background: linear-gradient(45deg, #5a3a1e, #d4af37);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.category-toggle button:hover {
  background: linear-gradient(45deg, #d4af37, #5a3a1e);
}

/* Side panel */
.category-panel {
  position: fixed;
  top: 0;
  left: -100%;
  width: 250px;
  height: 100%;
  background: linear-gradient(-45deg, #000000, #3a1c1c, #2e003e);
  padding: 20px;
  transition: left 0.4s ease;
  z-index: 1200;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.4);
}

.category-panel.open {
  left: 0;
}

.category-panel .panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.category-panel h3 {
  color: #fff;
  margin: 0;
}

.category-panel .close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

/* Category list inside panel */
.category-panel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-panel li {
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: #fff;
}

.category-panel li:hover {
  background: rgba(212, 175, 55, 0.2);
  transform: translateX(5px);
}

.category-panel li.active {
  background: rgba(212, 175, 55, 0.3);
  font-weight: bold;
}








/* Layout */
.ecom-root{max-width:var(--container); margin:0 auto; padding:18px 16px 48px}
.ecom-header{
margin-bottom:20px;
  display:flex; justify-content:space-between; align-items:center;
  background:#fff; border:1px solid var(--border); border-radius:16px; padding:12px 16px;
  box-shadow:var(--shadow); position:relative; z-index:1000; transition: all .3s ease;
}
.ecom-header.sticky{position:sticky; top:0; animation:slideDown .4s ease}
@keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.ecom-brand{display:flex; gap:12px; align-items:center}
.ecom-logo{font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:10px; background:linear-gradient(135deg,#fff,#fff0f6); box-shadow:0 6px 16px rgba(0,0,0,.06)}
.ecom-title{margin:0; font-size:20px; color:var(--accent)}
.ecom-sub{margin:0; font-size:12px; color:var(--muted)}

.ecom-search-wrap{display:flex; align-items:center; gap:8px}
.ecom-input{padding:10px; border-radius:12px; border:1px solid var(--border); width:320px; outline:none}
.ecom-input:focus{box-shadow:0 0 0 4px rgba(200,128,252,0.08); border-color:var(--accent2)}

/* Layout columns */
.ecom-layout{display:flex; gap:20px; margin-top:20px}
.ecom-aside{flex:0 0 220px; background:#fff; border:1px solid var(--border); border-radius:16px; box-shadow:var(--shadow); padding:14px; height:fit-content; position:sticky; top:96px}
.ecom-aside-title{margin:0 0 10px; font-size:14px; color:var(--accent2)}
.ecom-cat{padding:10px; border-radius:10px; border:1px solid var(--border); background:#fff; cursor:pointer; margin:6px 0; width:100%; text-align:left; transition:all .18s ease}
.ecom-cat:hover{background:#fceff5}
.ecom-cat.active{background:var(--accent); color:#fff}

/* Main grid */
.ecom-main{flex:1; min-width:0}
.ecom-grid{display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:16px}

/* Product card (tilt hover + gradient overlay + staggered fade-in) */
.ecom-card{
  position:relative;
  background:linear-gradient(180deg,#fff,#fff0f6);
  border:1px solid var(--border); border-radius:16px; box-shadow:var(--shadow);
  overflow:hidden; transition:transform .32s cubic-bezier(.2,.9,.3,1), box-shadow .32s ease;
  transform-origin:center; opacity:0;
  will-change:transform, opacity;
}
.ecom-card::before{
  content:""; position:absolute; inset:0;
  background:linear-gradient(270deg,#dff6ff,#e8fdf1,#ffe6f7); background-size:600% 600%;
  animation: gradientBG 12s ease infinite; opacity:0.12; pointer-events:none;
}
.ecom-card.fade-in{animation:fadeInUp .5s ease forwards}
@keyframes fadeInUp{from{opacity:0; transform:translateY(20px) scale(.96)}to{opacity:1; transform:translateY(0) scale(1)}}

/* 3D tilt on hover - subtle */
.ecom-card:hover{
  transform: rotateX(4deg) rotateY(4deg) scale(1.02);
  box-shadow:0 14px 36px rgba(231,84,128,.18);
}

/* product thumbnail */
.ecom-thumb{aspect-ratio:1/1; background:#fceff5; display:flex; align-items:center; justify-content:center}
.ecom-thumb img{max-width:100%; max-height:100%; object-fit:contain; position:relative; z-index:1}

/* info */
.ecom-info{padding:12px; position:relative; z-index:2}
.ecom-name{margin:0 0 6px; font-size:15px; color:var(--ink)}
.ecom-meta{display:flex; justify-content:space-between; font-size:14px; margin-bottom:10px}
.ecom-price{color:var(--accent); font-weight:700}
.ecom-rate{color:#f59e0b; font-weight:600}

/* Buy button */
.ecom-buy{
  width:100%; padding:10px; border:none; border-radius:12px;
  background:linear-gradient(135deg, var(--accent), var(--accent2)); color:#fff; cursor:pointer; font-weight:600;
  transition:transform .12s ease, opacity .12s ease;
}
.ecom-buy:hover{transform:scale(1.02); opacity:.98}

/* Size dropdown - hidden by default, appears on hover or keyboard focus */
.size-wrap{display:none; align-items:center; gap:8px; margin-bottom:8px}
.ecom-card:hover .size-wrap,
.ecom-card:focus-within .size-wrap,
.size-dropdown:focus + .size-tick,
.size-dropdown:focus {
  display:flex;
}

/* ensure keyboard users can tab into the select and see it */
.size-dropdown{padding:8px; border-radius:8px; border:1px solid var(--border); background:#fff; font-size:14px}

/* animated green tick */
.size-tick{
  font-size:18px; color: #22c55e; opacity:0; transform:scale(.6);
  transition:transform .22s cubic-bezier(.15,.9,.3,1), opacity .22s ease;
  will-change:transform, opacity;
}
.size-tick.visible{opacity:1; transform:scale(1); animation:tickPop .28s cubic-bezier(.2,.9,.25,1)}
@keyframes tickPop{0%{transform:scale(.4);opacity:0}60%{transform:scale(1.15);opacity:1}100%{transform:scale(1)}}

/* Back to top: pulsing glow */
.back-to-top{
  position:fixed; bottom:22px; right:22px;
  background:linear-gradient(135deg, var(--accent), var(--accent2));
  color:#fff; border:none; border-radius:50%; width:52px; height:52px; font-size:22px; cursor:pointer;
  box-shadow:0 8px 30px rgba(0,0,0,.12); z-index:2000;
  display:flex; align-items:center; justify-content:center;
  animation:backPulse 2s infinite;
}
@keyframes backPulse{
  0%{transform:scale(1); box-shadow:0 8px 30px rgba(231,84,128,.22)}
  50%{transform:scale(1.06); box-shadow:0 12px 36px rgba(231,84,128,.28)}
  100%{transform:scale(1); box-shadow:0 8px 30px rgba(231,84,128,.22)}
}

/* small responsive tweaks */
@media (max-width: 900px){
  .ecom-layout{flex-direction:column}
  .ecom-aside{position:relative; top:auto; width:100%}
  .ecom-input{width:100%}
  .ecom-root{padding:12px}
}
`}</style>
  );
}
