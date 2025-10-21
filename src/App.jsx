import React, { useEffect, useState } from "react";
import MOCK_PRODUCTS from "./MOCK_PRODUCTS.js";
import offer1 from "./assets/offer1.jpg";
import offer2 from "./assets/offer2.jpg";
import offer3 from "./assets/offer3.jpg";
import './styles.css';
import p1 from "./assets/p1.jpg";


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
  { id: 1, img: offer1, text: "🔥 Flat 50% Off on All Watches" },
  { id: 2, img: offer2, text: "🎉 New Arrivals Bags & Purses" },
  { id: 3, img: offer3, text: "✨ New Release Sneakers" },
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
   { id: "handbags", name: "Hand Bag" },
   { id: "backpacks", name: "BackPacks" },
  { id: "purse", name: "Purses" },
  { id: "jackets", name: "Jackets" },
  { id: "pants", name: "Pants" },
  { id: "perfume_women", name: "Perfume for Women" },
  { id: "perfume_men", name: "Perfume for Men" },
  { id: "perfume_combo", name: "Perfume Combo" },
  { id: "mens_watch", name: "Men’s Watch" },
  { id: "womens_watch", name: "Women’s Watch" },
  { id: "sunglasses", name: "Men’s Sunglasses" },
  { id: "ladies_sunglasses", name: "Ladies Sunglasses" },
  { id: "frames", name: "Frames" },
];

/* ----------------- Products ----------------- */
/* You can replace this array with real API data later */


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
  const q = query.trim().toLowerCase();

  // normalize category to id (example: "Women’s Watch" → "womens-watch")
  const normalize = (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[’']/g, "");

  const matchCategory = selectedCat === "all" || 
    categories.find(cat => cat.id === selectedCat)?.name === p.category;

  const matchQuery = !q || p.name.toLowerCase().includes(q);

  return matchCategory && matchQuery;
});



  // Buy now — enforces size when required, opens WhatsApp
const handleBuyNow = (product, selectedSize) => {
  const message = `Hi, I want to buy: ${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ""} - Price: ₹${product.price}`;
  
  const phoneNumber = "916362141143";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, "_blank");
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

      {/* Offer Carousel */}
<div className="offer-carousel">
  {OFFERS.map((offer, i) => (
    <div key={offer.id} className={`offer-slide ${i === activeSlide ? "active" : ""}`}>
      <img src={offer.img} alt={offer.text} />
      <div className="offer-text">{offer.text}</div>
    </div>
  ))}
</div>

{/* Hamburger Button - Fixed Position */}
<button className="hamburger-btn-fixed" onClick={() => setSidebarOpen(!sidebarOpen)}>
  <span></span>
  <span></span>
  <span></span>
</button>

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

{/* Mobile Categories Overlay */}
{sidebarOpen && (
  <div className="mobile-categories-overlay" onClick={() => setSidebarOpen(false)}>
    <div className="mobile-categories-panel" onClick={(e) => e.stopPropagation()}>
      <div className="panel-header">
        <h3>Categories</h3>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
      </div>
      <div className="mobile-categories-list">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`mobile-category-item ${selectedCat === c.id ? "active" : ""}`}
            onClick={() => {
              setSelectedCat(c.id);
              setSidebarOpen(false);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  </div>
)}










     {/* --- Layout with Categories + Products --- */}
<div className="ecom-layout">
  
  {selectedCat === "all" && (
    <>
      {/* Categories Sidebar */}
      <aside className="categories-sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <div className="categories-list">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`category-item ${selectedCat === c.id ? "active" : ""}`}
              onClick={() => setSelectedCat(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </aside>
      
      {/* Categories Grid */}
      <div className="categories-grid">
    {categories.filter(c => c.id !== "all").map((c) => {
      const productsInCat = allProducts.filter((p) => p.category === c.name);
      if (productsInCat.length === 0) return null;
      
      return (
        <div key={c.id} className="category-card">
          <h3 className="category-card-title">{c.name}</h3>
          <div className="category-products">
            {productsInCat.slice(0, 1).map((p, i) => (
              <article key={p.id} className="mini-card">
                <img src={`/public/products/${p.id}.jpg`} alt={p.name} />
                <h4>{p.name}</h4>
                <div className="price">₹{p.price}</div>
                <button onClick={() => handleBuyNow(p)}>Buy</button>
              </article>
            ))}
          </div>
          <button className="view-all-btn" onClick={() => setSelectedCat(c.id)}>
            View All {productsInCat.length} Items
          </button>
        </div>
      );
    })}
      </div>
    </>
  )}
  
  {selectedCat !== "all" && (
    <main className="category-page">
      <div className="category-header">
        <button className="back-btn" onClick={() => setSelectedCat("all")}>
          ←
        </button>
        <h2 className="category-page-title">
          {categories.find(cat => cat.id === selectedCat)?.name || "Products"}
        </h2>
      </div>
      <div className="category-grid">
        {filteredProducts.map((p, i) => (
          <article key={p.id} className="ecom-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-inner">
              <div className="ecom-thumb">
                <img src={`/public/products/${p.id}.jpg`} alt={p.name} />
              </div>
              <div className="ecom-info">
                <h4 className="ecom-name">{p.name}</h4>
                <div className="ecom-meta">
                     <span className="original-price">₹{p.originalPrice}</span>{" "}
                     <span className="discount-price">₹{p.price}</span>
                  <span className="ecom-rate">★ {p.rating}</span>
                </div>
              </div>
              <button className="ecom-buy" onClick={() => handleBuyNow(p)}>
                Buy Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )}

</div>


      {/* Back to top (pulsing) */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
      
      {/* Footer */}
      <footer className="luxury-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LUXURY HUB</h3>
            <ul>
              <li>Who We Are</li>
              <li>Join Our Team</li>
              <li>Terms & Conditions</li>
              <li>We Respect Your Privacy</li>
              <li>Fees & Payments</li>
              <li>Returns & Refunds Policy</li>
              <li>Promotions Terms & Conditions</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>HELP</h3>
            <ul>
              <li>Track Your Order</li>
              <li>Frequently Asked Questions</li>
              <li>Returns</li>
              <li>Cancellations</li>
              <li>Payments</li>
              <li>Customer Care</li>
              <li>How Do I Redeem My Coupon?</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>SHOP BY</h3>
            <ul>
              <li>All</li>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Indie</li>
              <li>Stores</li>
              <li>New Arrivals</li>
              <li>Brand Directory</li>
              <li>Home</li>
              <li>Collections</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>FOLLOW US</h3>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Pinterest</li>
            </ul>
          </div>
        </div>
      </footer>
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
  height: 180px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: var(--shadow);
  max-width: 100%;
}

@media (max-width: 768px) {
  .offer-carousel {
    height: 120px;   /* ↓ reduce the height for mobile view */
  }
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
  background: linear-gradient(135deg, rgba(139,69,19,0.9), rgba(212,175,55,0.9));
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(139,69,19,0.3);
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
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(139,69,19,0.5);
}
  .ecom-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.ecom-logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.ecom-logo:hover {
  transform: scale(1.1);
}



/* Product grid container */
.ecom-grid {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1200px;   /* keep grid centered on big screens */
  margin: 0 auto;      /* 🔥 centers the grid */
  padding: 20px;
}

/* ---------- OPTIMIZED MOBILE VIEW (<=600px) ---------- */
@media (max-width: 600px) {
  .ecom-layout {
    display: grid;
    grid-template-columns: 55px 1fr;
    align-items: start;
  }

  /* Sidebar */
  .ecom-sidebar {
    width: 50px;
    padding: 2px;
    border-radius: 10px;
    background: linear-gradient(160deg, #000, #3a1c1c, #2e003e);
    animation: sidebarGradient 10s ease infinite;
    overflow-y: auto;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  .ecom-sidebar li {
    font-size: 7px;
    padding: 3px;
    text-align: center;
    margin: 2px 0;
    border-radius: 4px;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  .ecom-sidebar li.active,
  .ecom-sidebar li:hover {
    background: linear-gradient(135deg, #ffb347, #ffcc33);
    transform: scale(1.05);
  }

  /* Product grid */
  .ecom-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
    padding: 4px;
    justify-items: center;
  }

  .ecom-card {
    width: 95%;
    height: 130px; /* Smaller height for full 2x2 fit */
    padding: 3px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ecom-thumb img {
    height: 55px; /* Smaller image */
    object-fit: cover;
    border-radius: 4px;
  }

  .ecom-name {
    font-size: 8px;
    text-align: center;
    line-height: 1.1;
    margin-top: 1px;
  }

  .ecom-meta {
    display: flex;
    justify-content: space-between;
    font-size: 7px;
    margin: 0 2px;
  }

  .ecom-buy {
    font-size: 7px;
    padding: 2px;
    margin-top: 1px;
    border-radius: 4px;
  }
}





/* Product Card */
.ecom-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  padding: 12px;
  background: #fff;
  text-align: center;
  position: relative;
  transition: all 0.2s ease;
  min-height: 280px;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .ecom-card {
    min-height: 240px;
    max-width: 160px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .ecom-card {
    min-height: 200px;
    max-width: 140px;
    padding: 6px;
  }
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
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 1s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: rotateY(0deg);
}

/* Hover → 0 → 360 spin */
.ecom-card:hover .card-inner {
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
  height: 140px;
  object-fit: contain;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .ecom-thumb img {
    height: 100px;
  }
}

@media (max-width: 480px) {
  .ecom-thumb img {
    height: 80px;
  }
}

.ecom-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.ecom-name {
  font-size: 13px;
  margin: 6px 0;
  font-weight: 500;
  flex-grow: 1;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .ecom-name {
    font-size: 11px;
    margin: 4px 0;
  }
}

@media (max-width: 480px) {
  .ecom-name {
    font-size: 10px;
    margin: 3px 0;
  }
}

.ecom-meta {
  margin-bottom: 10px;
}

.ecom-buy {
  margin-top: auto;
  padding: 6px 12px;
  border: none;
  background: #111;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.ecom-buy:hover {
  background: #333;
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
  background: #efe3e3ff; /* dark background for contrast */
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
   font-size: 16px;
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
  background: linear-gradient(135deg, #8B4513, #D4AF37);
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
  box-shadow: 0 8px 20px rgba(139,69,19,0.4);
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
/* Global Page Background - Premium Dark */
body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e);
  position: relative;
  overflow-x: hidden;
}

/* Whole app wrapper with premium dark background */
.app-wrapper {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e);
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px;
  justify-items: center;
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
 /* Header below carousel */
.ecom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 10px 20px;
  background: transparent;
}


/* Brand logo + name */
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-logo {
  height: 40px;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
}

  .ecom-input {
    width: 100%;
    font-size: 14px;
    padding: 8px;
  }


}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 100%;
}

.category-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
}

.category-card-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category-products {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.mini-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
}

.mini-card img {
  width: 100%;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
}

.mini-card h4 {
  font-size: 11px;
  margin: 4px 0;
  line-height: 1.2;
}

.mini-card .price {
  display: none;
}

.mini-card button {
  display: none;
}

.view-all-btn {
  width: 100%;
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.view-all-btn:hover {
  transform: scale(1.02);
}

.ecom-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: flex-start;
}

/* Categories Sidebar */
.categories-sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  height: fit-content;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 999;
  overflow: hidden;
  overflow-x: hidden;
  flex-shrink: 0;
}

.categories-list {
  height: calc(100% - 60px);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}



.category-item {
  display: block;
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 0;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #f0f0f0;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-item:hover,
.category-item.active {
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(139,69,19,0.4);
}

.categories-grid {
  flex: 1;
}

/* Category Page */
.category-page {
  width: 100%;
  padding: 20px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.back-btn {
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.back-btn:hover {
  transform: scale(1.05);
}

.category-page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-align: center;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 768px) {
  .categories-sidebar {
    display: none;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    overflow: visible;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .categories-grid {
    grid-template-columns: 1fr;
    overflow: visible;
    width: 100%;
  }
}

.category-section {
  margin-bottom: 60px;
}

.category-heading {
  font-size: 2rem;
  text-align: center;
  margin: 30px 0 15px;
  font-weight: 700;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.offer-carousel.mini {
  height: 180px;
  margin-bottom: 20px;
  border-radius: 12px;
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
  top: 30px; /* below header */
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

.ecom-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  padding: 16px;
  background: #fff;
  text-align: center;
  position: relative;
  transition: all 0.2s ease;
  min-height: 320px; /* 🔥 equal height for all cards */
}

.ecom-card img {
  max-width: 100%;
  height: 200px; /* 🔥 consistent image height */
  object-fit: contain;
  margin-bottom: 10px;
}

.ecom-card h4,
.ecom-name {
  font-size: 15px;
  margin: 8px 0;
  font-weight: 500;
}

.ecom-card .ecom-price {
  font-weight: bold;
  font-size: 16px;
  color: #111;
  margin-bottom: 10px;
}



/* ---------- GLOBAL / BACKGROUND ---------- */
html, body, #root, .app-wrapper {
  height: 100%;
}
body {
  /* If you want the animated dark gradient, keep this.
     If you want plain white page, change to #fff */
  background: linear-gradient(-45deg, #000000, #3a1c1c, #2e003e, #1a001f);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

/* make sure the page content is transparent so background shows through */
.site-content, .ecom-main, .ecom-layout {
  background: transparent !important;
}

/* ---------- GRID CENTERING + SIZING ---------- */
/* grid container */
/* Grid container */
.ecom-grid {
  display: grid;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  /* 🔥 Equal row heights */
  grid-auto-rows: 1fr;
}

/* Product card */
.ecom-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #eee;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform .18s ease, box-shadow .18s ease;
}

/* Image */
.ecom-thumb img {
  width: 100%;
  height: 200px;       /* keep consistent image size */
  object-fit: cover;
  border-radius: 8px;
}


/* name (limit to 2 lines) */
.ecom-name {
  font-size: 15px;
  line-height: 1.2;
  margin: 8px 0;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* price and buy button */
.ecom-meta { margin-top: 6px; }
.ecom-buy { margin-top: 8px; align-self: center; }

/* hover lift */
.ecom-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.09);
}

/* ---------- RESPONSIVE COLUMNS ---------- */
/* mobile: exactly 2 columns */
@media (max-width: 600px) {
  .ecom-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-left: 12px;
    padding-right: 12px;
  }

  /* remove any left offset reserved for category panel on small screens */
  .ecom-main { margin-left: 0 !important; padding-left: 0 !important; padding-right: 0 !important; }
}

/* tablet / small desktop: 3 columns */
@media (min-width: 601px) and (max-width: 1024px) {
  .ecom-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Responsive grid columns */
@media (min-width: 1200px) {
  .ecom-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (min-width: 900px) and (max-width: 1199px) {
  .ecom-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 600px) and (max-width: 899px) {
  .ecom-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 599px) {
  .ecom-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 12px;
  }
}

html, body, #root, .app-wrapper {
  min-height: 100%;
  height: auto;
}

body {
  background: linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e);
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}








/* Layout */
.ecom-root{max-width:100%; margin:0; padding:18px 16px 48px; width:100%; overflow-x:hidden}
.ecom-header{
margin-bottom:20px;
  display:flex; justify-content:space-between; align-items:center;
  background:#fff; border:1px solid var(--border); border-radius:16px; padding:30px 40px;
  box-shadow:var(--shadow); position:relative; z-index:1000; transition: all .3s ease;
  min-height:150px; gap:20px; width:100%; box-sizing:border-box;
}
.ecom-header.sticky{position:sticky; top:0; animation:slideDown .4s ease}
@keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}
.ecom-brand{display:flex; gap:12px; align-items:center}
.ecom-logo{font-size:28px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; border-radius:10px; background:linear-gradient(135deg,#fff,#fff0f6); box-shadow:0 6px 16px rgba(0,0,0,.06)}
.ecom-title{margin:0; font-size:32px; color:var(--accent)}
.ecom-sub{margin:0; font-size:16px; color:var(--muted)}

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
  background:linear-gradient(135deg, #8B4513, #D4AF37); color:#fff; cursor:pointer; font-weight:600;
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
  background:linear-gradient(135deg, #8B4513, #D4AF37);
  color:#fff; border:none; border-radius:50%; width:52px; height:52px; font-size:22px; cursor:pointer;
  box-shadow:0 8px 30px rgba(0,0,0,.12); z-index:2000;
  display:flex; align-items:center; justify-content:center;
  animation:backPulse 2s infinite;
}
@keyframes backPulse{
  0%{transform:scale(1); box-shadow:0 8px 30px rgba(139,69,19,.22)}
  50%{transform:scale(1.06); box-shadow:0 12px 36px rgba(139,69,19,.28)}
  100%{transform:scale(1); box-shadow:0 8px 30px rgba(139,69,19,.22)}
}

/* small responsive tweaks */
@media (max-width: 900px){
  .ecom-layout{flex-direction:column}
  .ecom-aside{position:relative; top:auto; width:100%}
  .ecom-input{width:100%}
  .ecom-root{padding:12px}
}

/* ---------- MOBILE VIEW (<=600px) ---------- */
@media (max-width: 600px) {
  /* Overall layout */
  .ecom-layout {
    display: flex;
    width: 100%;
    align-items: flex-start;
  }

  .ecom-sidebar {
    width: 60px;
    min-width: 60px;
    background: linear-gradient(160deg, #000, #3a1c1c, #2e003e);
    animation: sidebarGradient 10s ease infinite;
    height: 100vh;
    overflow-y: auto;
    position: sticky;
    top: 0;
    border-radius: 10px;
  }

  .ecom-main {
    flex: 1;
    width: calc(100% - 60px);
    padding: 4px;
  }

  /* Grid for 2x2 layout */
 .ecom-grid {
  display: grid;
  gap: 70px;
}

@media (max-width: 768px) {
  .ecom-grid {
    grid-template-columns: repeat(2, 1fr); /* ✅ ensures 2 per row */
    justify-items: center; /* ✅ centers each card */
  }

  .ecom-card {
    max-width: 170px; /* ✅ controls card width */
    height: 190px;
  }
}


  /* Product cards */
  .ecom-card {
    width: 150%;
    max-width: 160px;
    height: 205px;
    padding: 6px;
    background: #fffaf5;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ecom-thumb img {
    width: 100%;
    height: 75px;
    object-fit: cover;
    border-radius: 5px;
  }

  .ecom-name {
    font-size: 10px;
    text-align: center;
    margin-top: 3px;
    line-height: 1.2;
  }

  .ecom-meta {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    margin: 2px 3px;
  }

  .ecom-buy {
    font-size: 9px;
    padding: 3px;
    border-radius: 5px;
    margin-top: 3px;
  }
}

/* ======= PERFECTLY CENTERED 2x2 PRODUCT GRID (MOBILE) ======= */
@media (max-width: 768px) {
  .ecom-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-content: center;
    align-items: start;
    margin: 0 auto;
    padding: 10px 12px 10px 50px; /* ✅ shifted slightly right to center */
    width: calc(100% + 15px);     /* ✅ compensate for sidebar offset */
    box-sizing: border-box;
  }

  .ecom-card {
    width: 45vw;
    height: 36vh;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ecom-thumb img {
    width: 100%;
    height: 50%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .ecom-name {
    font-size: 0.8rem;
    text-align: center;
    margin: 4px 0;
  }

  .ecom-buy {
    font-size: 0.7rem;
    padding: 4px 8px;
    align-self: center;
  }
}

/* === MOBILE SIDEBAR (CATEGORIES) === */
.ecom-sidebar {
  width: 60px;
  min-width: 60px;
  padding: 6px 4px;
  border-radius: 10px;
  background: linear-gradient(160deg, #000, #3a1c1c, #2e003e);
  animation: sidebarGradient 10s ease infinite;
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  top: 0;

  /* ✅ center everything */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* keep items from sticking to the top */
}

.ecom-sidebar h3 {
  text-align: center;
  font-size: 0.7rem;
  color: #fff;
  margin-bottom: 5px;
}

.ecom-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.ecom-sidebar li {
  font-size: 0.6rem;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 2px;
  margin-bottom: 4px;
  border-radius: 6px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.ecom-sidebar li.active,
.ecom-sidebar li:hover {
  background: linear-gradient(135deg, #ffb347, #ffcc33);
  color: #000;
  transform: scale(1.05);
}

/* Hide categories bar completely on mobile view */
@media (max-width: 768px) {
  .categories-bar {
    display: none !important;
  }
}

.price-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.discount-price {
  color: #d97706; /* gold/orange tone to match your theme */
  font-weight: bold;
  font-size: 16px;
}

/* Fixed Hamburger Button */
.hamburger-btn-fixed {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1500;
  display: none;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.hamburger-btn-fixed:hover {
  opacity: 1;
}

.hamburger-btn-fixed span {
  width: 20px;
  height: 2px;
  background: #fff;
  margin: 2px 0;
  transition: 0.3s;
  border-radius: 1px;
}

@media (max-width: 768px) {
  .hamburger-btn-fixed {
    display: flex;
  }
  
  .ecom-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .ecom-search-wrap {
    width: 100%;
  }
  
  .ecom-input {
    width: 100%;
    font-size: 14px;
  }
}

/* Mobile Categories Overlay */
.mobile-categories-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: flex-start;
}

.mobile-categories-panel {
  width: 280px;
  height: 100%;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h3 {
  color: #ffffff;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
}

.mobile-categories-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-category-item {
  display: block;
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  color: #f0f0f0;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-category-item:hover,
.mobile-category-item.active {
  background: linear-gradient(135deg, #8B4513, #D4AF37);
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(139,69,19,0.4);
}

/* Footer */
.luxury-footer {
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 60px;
  padding: 40px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #8B4513, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-section li:hover {
  color: #D4AF37;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

              

`}</style>
  );
}
