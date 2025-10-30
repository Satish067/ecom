import React, { useEffect, useState } from "react";
import MOCK_PRODUCTS from "./MOCK_PRODUCTS.js";
import brandlogo from "./assets/brand-logo.png";
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Get categories dynamically from products
  const getCategories = () => {
    const categoryCount = {};
    products.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    
    return [
      { name: "Kick for Women", image: "/products/p1.jpg", count: categoryCount["Kick for Women"] || 0 },
      { name: "Kick for Men", image: "/products/p11.jpg", count: categoryCount["Kick for Men"] || 0 },
      { name: "Wallet", image: "/products/p21.jpg", count: categoryCount["Wallet"] || 0 },
      { name: "Belt", image: "/products/p31.jpg", count: categoryCount["Belt"] || 0 },
      { name: "Hand Bag", image: "/products/p41.jpg", count: categoryCount["Hand Bag"] || 0 },
      { name: "Backpacks", image: "/products/p51.jpg", count: categoryCount["Backpacks"] || 0 },
      { name: "Jackets", image: "/products/p71.jpg", count: categoryCount["Jackets"] || 0 },
      { name: "Pants", image: "/products/p81.jpg", count: categoryCount["Pants"] || 0 },
      { name: "Perfume for Women", image: "/products/p91.jpg", count: categoryCount["Perfume for Women"] || 0 },
      { name: "Perfume for Men", image: "/products/p115.jpg", count: categoryCount["Perfume for Men"] || 0 },
      { name: "Watch for Men", image: "/products/p125.jpg", count: categoryCount["Watch for Men"] || 0 },
      { name: "Watch for Women", image: "/products/p271.jpg", count: categoryCount["Watch for Women"] || 0 },
      { name: "Sunglasses for Men", image: "/products/p301.jpg", count: categoryCount["Sunglasses for Men"] || 0 },
      { name: "Ladies Sunglasses", image: "/products/p371.jpg", count: categoryCount["Ladies Sunglasses"] || 0 },
      { name: "Frames", image: "/products/p401.jpg", count: categoryCount["Frames"] || 0 }
    ];
  };
  
  const categories = getCategories();

  const socialReviews = [
    {
      platform: "Instagram",
      username: "@fashionista_maya",
      avatar: "👩‍💼",
      review: "Just received my LV bag from @luxuryhub! Quality is amazing and shipping was super fast! 😍",
      likes: 234,
      time: "2h ago"
    },
    {
      platform: "Twitter",
      username: "@style_guru_raj",
      avatar: "👨‍💻",
      review: "Best place for luxury watches! Got my Rolex and it's authentic. Highly recommended! 🔥",
      likes: 156,
      time: "5h ago"
    },
    {
      platform: "Facebook",
      username: "Priya Sharma",
      avatar: "👩‍🎨",
      review: "Amazing collection of designer sunglasses! Customer service is top-notch. Will definitely shop again! ⭐⭐⭐⭐⭐",
      likes: 89,
      time: "1d ago"
    },
    {
      platform: "Instagram",
      username: "@luxury_lover_sam",
      avatar: "👨‍🎤",
      review: "The Gucci wallet I ordered is perfect! Exactly as shown in pictures. Thank you @luxuryhub! 💯",
      likes: 312,
      time: "3h ago"
    },
    {
      platform: "Twitter",
      username: "@fashion_forward_k",
      avatar: "👩‍🚀",
      review: "Finally found authentic designer perfumes at great prices! The Dior fragrance is divine! 🌸",
      likes: 198,
      time: "6h ago"
    },
    {
      platform: "Facebook",
      username: "Arjun Patel",
      avatar: "👨‍🏫",
      review: "Ordered a jacket and it fits perfectly! Great quality and fast delivery. 5 stars! ⭐⭐⭐⭐⭐",
      likes: 145,
      time: "2d ago"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setFilteredProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1000);
  }, []);

useEffect(() => {
  let filtered = [...products]; // Create a copy to avoid mutation

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply category filter
  if (selectedCategory !== "All") {
    // normalize converts curly quotes to straight ones and trims whitespace
    const normalize = str =>
  str
    ? str
        .replace(/[’‘]/g, "'")       // curly → straight apostrophe
        .replace(/[“”]/g, '"')       // curly quotes → straight quotes
        .replace(/&amp;/g, "&")      // decode HTML entities
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
        .toLowerCase()               // make it case-insensitive
    : "";


    // Debug logging (safe) - optional, you can comment these out later
    console.log('🔍 FILTERING FOR CATEGORY:', selectedCategory);
    console.log('📊 Total products before filter:', filtered.length);
    console.log('📋 Sample product categories:', filtered.slice(0, 10).map(p => `${p.name}: "${p.category}"`));

    // Filter safely using normalized comparisons
    filtered = filtered.filter(product =>
      normalize(product.category) === normalize(selectedCategory)
    );

    console.log('📊 Products after filter:', filtered.length);
  }

  // Apply price range filter
  filtered = filtered.filter(product =>
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Apply sorting
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      filtered.sort((a, b) =>
        ((b.originalPrice - b.price) / b.originalPrice) -
        ((a.originalPrice - a.price) / a.originalPrice)
      );
      break;
    default:
      break;
  }

  console.log('FINAL filtered products count:', filtered.length);
  if (selectedCategory !== "All" && filtered.length === 0) {
    console.log('❌ NO PRODUCTS FOUND FOR CATEGORY:', selectedCategory);
  }

  setFilteredProducts(filtered);
}, [products, searchTerm, selectedCategory, sortBy, priceRange]);


  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const buyNow = (product) => {
    const message = `Hi! I want to buy ${product.name} for ₹${product.price}`;
    window.open(`https://wa.me/916362141143?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Loading The Luxury Hub...</h2>
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="homepage">
        {/* Header */}
        <header className="homepage-header">
          <div className="header-container">
            <div className="header-left">
              <img src={brandlogo} alt="The Luxury Hub" className="brand-logo" />
              <h1>The Luxury Hub</h1>
            </div>
            <div className="header-right">
              <button className="profile-btn">
                👤 Guest
              </button>
              <button 
                className="cart-btn"
                onClick={() => setShowCart(!showCart)}
              >
                🛒 Cart ({cart.length})
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to The Luxury Hub</h1>
            <p className="hero-subtitle">Discover Premium Designer Collections</p>
            <p className="hero-description">
              From luxury handbags to premium watches, find authentic designer pieces 
              that define your style and elevate your wardrobe.
            </p>
            <button 
              className="hero-cta"
              onClick={() => setCurrentPage('shop')}
            >
              Shop Now
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Premium Products</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Luxury Brands</p>
            </div>
            <div className="stat">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div 
                  key={category.name} 
                  className="category-card"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setCurrentPage('shop');
                  }}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="category-image-container">
                    <img src={category.image} alt={category.name} className="category-image" />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.count} items</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Reviews Section */}
        <section className="reviews-section">
          <div className="container">
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="reviews-grid">
              {socialReviews.map((review, index) => (
                <div 
                  key={index} 
                  className={`review-card ${review.platform.toLowerCase()}`}
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  <div className="review-header">

                    <div className="review-info">
                      <h4>{review.username}</h4>
                      <span className="platform-badge">{review.platform}</span>
                    </div>
                    <div className="review-time">{review.time}</div>
                  </div>
                  <p className="review-text">{review.review}</p>
                  <div className="review-footer">
                    <span className="review-likes">❤️ {review.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>Contact Us</h3>
                <p>📞 +91 9876543210</p>
                <p>📧 info@luxuryhub.co.in</p>
                <p>📍 Mumbai, Maharashtra</p>
                <div className="social-links">
                  <a href="#" className="social-link">📘</a>
                  <a href="#" className="social-link">📷</a>
                  <a href="#" className="social-link">🐦</a>
                  <a href="#" className="social-link">💼</a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3>Help & Support</h3>
                <ul>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Size Guide</a></li>
                  <li><a href="#">Return Policy</a></li>
                  <li><a href="#">Shipping Info</a></li>
                  <li><a href="#">Track Order</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Service Areas</h3>
                <ul>
                  <li>Mumbai & Suburbs</li>
                  <li>Delhi NCR</li>
                  <li>Bangalore</li>
                  <li>Chennai</li>
                  <li>Hyderabad</li>
                  <li>Pune</li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>About</h3>
                <ul>
                  <li><a href="#">Our Story</a></li>
                  <li><a href="#">Authenticity</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; 2024 The Luxury Hub. All rights reserved.</p>
              <p>Authentic luxury products with worldwide shipping</p>
            </div>
          </div>
        </footer>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="cart-overlay" onClick={() => setShowCart(false)}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
              <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
              </div>
              
              <div className="cart-items">
                {cart.length === 0 ? (
                  <p className="empty-cart">Your cart is empty</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>₹{item.price.toLocaleString()}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ₹{getTotalPrice().toLocaleString()}</strong>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Shop Page (existing code)
  return (
    <div className="modern-app">
      {/* Header */}
      <header className="modern-header">
        <div className="header-container">
          <div className="header-left" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>
            <img src={brandlogo} alt="The Luxury Hub" className="brand-logo" />
            <h1>The Luxury Hub</h1>
          </div>
          
          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>

          <div className="header-right">
            <button 
              className="filter-btn mobile-only"
              onClick={() => setShowFilters(!showFilters)}
            >
              🔧 Filters
            </button>
            <button className="profile-btn">
              👤 Guest
            </button>
            <button 
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filter-section">
            <h3>Categories</h3>
            {["All", ...categories.map(c => c.name)].map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>


        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Sort Bar */}
          <div className="sort-bar">
            <div className="results-count">
              {filteredProducts.length} Products
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Better Discount</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="product-card" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-overlay">
                    <button 
                      className="quick-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="discount-badge">
                      {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                    </div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <span className="rating-stars">★★★★★</span>
                    <span className="rating-text">({product.rating})</span>
                  </div>
                  <div className="product-pricing">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button 
                    className="buy-now-btn"
                    onClick={() => buyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price.toLocaleString()}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button 
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: ₹{getTotalPrice().toLocaleString()}</strong>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;