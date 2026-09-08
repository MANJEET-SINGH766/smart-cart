import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { DeliveryProgress } from './DeliveryProgress';

export const CartDrawer = ({ onOpenCheckout }) => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    subtotal,
    deliveryFee,
    isFreeDeliveryUnlocked,
    finalTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
    getRecommendations
  } = useCart();

  if (!isCartOpen) return null;

  const recommendations = getRecommendations(3);

  return (
    <>
      {/* Overlay backdrop */}
      <div className="cart-overlay" onClick={closeCart} aria-hidden="true" />

      {/* Slide-over Drawer */}
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} color="#C84B31" />
            <span>Your Smart Cart</span>
            <span className="cart-badge">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <button
            onClick={closeCart}
            className="cart-close-btn"
            aria-label="Close Smart Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Progress */}
        <DeliveryProgress />

        {/* Cart Body */}
        {cartItems.length === 0 ? (
          <div className="empty-cart-view">
            <div className="empty-cart-icon">
              <ShoppingBag size={42} />
            </div>
            <h3 className="empty-cart-title">Your Cart is Empty</h3>
            <p className="empty-cart-desc">
              Discover authentic handmade Maharashtrian pickles, spicy chutneys, and aromatic ground spices!
            </p>
            <button onClick={closeCart} className="continue-shopping-btn">
              Explore Products
            </button>
          </div>
        ) : (
          <div className="cart-body">
            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <div>
                      <h4 className="cart-item-name">{item.product.name}</h4>
                      <span className="cart-item-weight">{item.product.weight}</span>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-count">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        ₹{item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item-btn"
                    title="Remove item"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Smart Recommendations Section */}
            {recommendations.length > 0 && (
              <div className="smart-recommendations">
                <div className="recommendations-header">
                  <div className="recommendations-title">
                    <Sparkles size={16} color="#D9601A" />
                    <span>Smart Pairings</span>
                  </div>
                  <span className="recommendations-badge">Handpicked for you</span>
                </div>

                <div className="recommendations-list">
                  {recommendations.map((prod) => (
                    <div key={prod.id} className="recommendation-card">
                      <div className="rec-left">
                        <img src={prod.image} alt={prod.name} className="rec-img" />
                        <div>
                          <div className="rec-name">{prod.name}</div>
                          <div className="rec-price">₹{prod.price} • {prod.weight}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(prod, 1, false)}
                        className="rec-add-btn"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>
                {isFreeDeliveryUnlocked ? (
                  <strong style={{ color: '#2A9D8F' }}>FREE</strong>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span className="total-amount">₹{finalTotal}</span>
            </div>

            <button
              onClick={() => {
                closeCart();
                onOpenCheckout();
              }}
              className="checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={clearCart}
              style={{
                fontSize: '0.8rem',
                color: '#9CA3AF',
                textAlign: 'center',
                textDecoration: 'underline',
                paddingTop: '4px'
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};
