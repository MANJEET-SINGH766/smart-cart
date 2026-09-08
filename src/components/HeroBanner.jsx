import React from 'react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD } from '../data/products';

export const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={15} />
            <span>100% Sun-Dried & Stone-Ground Flavors</span>
          </div>

          <h1 className="hero-title">
            Authentic Homemade <span>Pickles & Spices</span>
          </h1>

          <p className="hero-desc">
            Crafted using 50-year-old family recipes, pure cold-pressed mustard oil, and premium farm-fresh spices. No artificial preservatives or additives.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="free-ship-banner-pill">
              <Truck size={18} />
              <span>FREE Shipping on orders over ₹{FREE_DELIVERY_THRESHOLD}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#E5E7EB' }}>
              <ShieldCheck size={18} color="#F4A261" />
              <span>Small Batch Artisanal Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
