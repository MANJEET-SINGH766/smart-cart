import React from 'react';
import { ShoppingCart, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { totalItemsCount, toggleCart, lastAddedId } = useCart();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="brand-logo">
          <div className="brand-icon-wrapper">
            <Utensils size={24} />
          </div>
          <div>
            <div className="brand-title">Naik Foods</div>
            <div className="brand-subtitle">Authentic Taste of Heritage</div>
          </div>
        </a>

        <div className="nav-actions">
          <button
            onClick={toggleCart}
            className="cart-toggle-btn"
            aria-label="Open Smart Cart"
            id="smart-cart-toggle-btn"
          >
            <ShoppingCart size={20} color="#C84B31" />
            <span>Smart Cart</span>
            <div className={`cart-badge ${lastAddedId ? 'pop' : ''}`}>
              {totalItemsCount}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
