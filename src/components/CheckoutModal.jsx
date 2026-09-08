import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, finalTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  const handleCloseAll = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="checkout-modal-overlay" role="dialog" aria-modal="true">
      <div className="checkout-modal-content">
        <div className="checkout-modal-header">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800' }}>
            {isOrdered ? 'Order Confirmed!' : 'Express Checkout'}
          </h3>
          <button onClick={handleCloseAll} className="cart-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="checkout-modal-body">
          {isOrdered ? (
            <div className="order-success-screen">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', marginBottom: '10px' }}>
                Thank You for Your Order! 🎉
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '20px', maxWidth: '380px', margin: '0 auto 24px auto' }}>
                Your authentic handmade products will be freshly packed and delivered to your doorstep in 2-3 business days.
              </p>

              <div style={{ background: '#FAF6F0', padding: '16px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6B7280', marginBottom: '6px' }}>
                  <span>Order Reference</span>
                  <strong style={{ color: '#1D242B' }}>#NF-{orderId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6B7280' }}>
                  <span>Status</span>
                  <span style={{ color: '#2A9D8F', fontWeight: '700' }}>Processing & Packing</span>
                </div>
              </div>

              <button onClick={handleCloseAll} className="continue-shopping-btn" style={{ padding: '12px 32px' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="checkout-summary-box">
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '10px', color: '#1D242B' }}>
                  Order Summary ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items)
                </div>
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item-row">
                    <span>{item.quantity}x {item.product.name} ({item.product.weight})</span>
                    <strong style={{ color: '#C84B31' }}>₹{item.product.price * item.quantity}</strong>
                  </div>
                ))}
                <div style={{ borderTop: '1px dashed #E5E7EB', marginTop: '10px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem' }}>
                  <span>Total Payble</span>
                  <span style={{ color: '#C84B31' }}>₹{finalTotal}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Naik"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PIN Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 400001"
                    className="form-input"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat No, Building, Street, Landmark, City"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: `1.5px solid ${formData.paymentMethod === 'cod' ? '#C84B31' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: formData.paymentMethod === 'cod' ? '#FFF7ED' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <span>Cash on Delivery</span>
                  </label>

                  <label
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: `1.5px solid ${formData.paymentMethod === 'upi' ? '#C84B31' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: formData.paymentMethod === 'upi' ? '#FFF7ED' : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    />
                    <span>UPI / GPay / PhonePe</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="place-order-btn" style={{ marginTop: '8px' }}>
                Confirm & Place Order (₹{finalTotal})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
