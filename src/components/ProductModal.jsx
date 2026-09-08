import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity, true);
    onClose();
  };

  return (
    <div
      className="checkout-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="checkout-modal-content"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="checkout-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="product-tag"
              style={{ position: 'static', backgroundColor: product.badgeColor || '#C84B31' }}
            >
              {product.tag || product.category}
            </span>
          </div>
          <button onClick={onClose} className="cart-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="checkout-modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '20px' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', background: '#FDFBF7' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#F59E0B', marginBottom: '4px' }}>
                  <Star size={16} fill="#F59E0B" />
                  <strong>{product.rating}</strong>
                  <span style={{ color: '#6B7280' }}>({product.reviewsCount} customer reviews)</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '800', marginBottom: '6px' }}>
                  {product.name}
                </h2>
                <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: '600' }}>
                  Pack Net Weight: {product.weight}
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-spice)' }}>
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span style={{ fontSize: '0.95rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>About this item</h4>
            <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>

          {product.ingredients && (
            <div style={{ marginBottom: '24px', background: '#FAF6F0', padding: '14px 18px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#C84B31', marginBottom: '8px' }}>
                🌿 Key Ingredients
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="quantity-controls" style={{ padding: '6px 10px', borderRadius: '10px' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
                style={{ width: '32px', height: '32px' }}
              >
                <Minus size={16} />
              </button>
              <span className="qty-count" style={{ fontSize: '1rem', padding: '0 14px' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
                style={{ width: '32px', height: '32px' }}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="checkout-btn"
              style={{ flexGrow: 1 }}
            >
              <ShoppingBag size={20} />
              <span>Add to Cart • ₹{product.price * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
