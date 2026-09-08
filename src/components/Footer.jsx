import React from 'react';
import { Utensils, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: '#F4A261' }}>
              <Utensils size={24} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '800' }}>Naik Foods</span>
            </div>
            <p>
              Handcrafted Maharashtrian culinary heritage. Made in small batches using traditional stone-grinding, pure mustard oil, and zero preservatives.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Special Mango Pickle</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Spicy Garlic Pickle</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Kolhapuri Red Chutney</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Goda Masala Secret Blend</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Why Naik Foods?</h4>
            <ul>
              <li>🌱 100% Sun-Cured Ingredients</li>
              <li>🪨 Traditional Stone Ground Spices</li>
              <li>🌶️ Authentic Recipe Passed Down 3 Generations</li>
              <li>🚚 Free Delivery Across India above ₹799</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact & Support</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#F4A261" />
                <span>Kolhapur, Maharashtra 416003</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#F4A261" />
                <span>+91 98765 43210</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#F4A261" />
                <span>orders@naikfoods.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Naik Foods. Handcrafted with <Heart size={14} color="#C84B31" style={{ display: 'inline', verticalAlign: 'middle' }} /> for pickle lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};
