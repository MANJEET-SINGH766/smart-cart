import React from 'react';
import { ProductCard } from './ProductCard';
import { Frown } from 'lucide-react';

export const ProductGrid = ({ products, onQuickView }) => {
  if (products.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Frown size={48} color="#9CA3AF" style={{ marginBottom: '16px' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>
          No products match your search
        </h3>
        <p style={{ color: '#6B7280' }}>
          Try clearing your filters or searching for something else like "mango", "garlic", or "spicy".
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>
    </div>
  );
};
