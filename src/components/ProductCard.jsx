import React, { useState } from 'react';
import { Star, Plus, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, cartItems } = useCart();
  const [isJustAdded, setIsJustAdded] = useState(false);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, true);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1500);
  };

  return (
    <div className="product-card" onClick={() => onQuickView(product)}>
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {product.tag && (
          <span
            className="product-tag"
            style={{ backgroundColor: product.badgeColor || '#C84B31' }}
          >
            {product.tag}
          </span>
        )}

        <span className="product-weight">{product.weight}</span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1D242B',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          title="Quick View"
        >
          <Eye size={16} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating}</span>
          <span style={{ color: '#9CA3AF' }}>({product.reviewsCount})</span>
        </div>

        <h3 className="product-name">{product.name}</h3>

        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="product-price-box">
            <div className="product-price">₹{product.price}</div>
            {product.originalPrice && (
              <div className="product-original-price">₹{product.originalPrice}</div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${isJustAdded ? 'added' : ''}`}
          >
            {isJustAdded ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>{currentQuantity > 0 ? `Add More (${currentQuantity})` : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
