import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const DeliveryProgress = () => {
  const {
    subtotal,
    amountNeededForFreeDelivery,
    freeDeliveryProgress,
    isFreeDeliveryUnlocked,
    FREE_DELIVERY_THRESHOLD
  } = useCart();

  if (subtotal === 0) return null;

  return (
    <div className="delivery-progress-card" id="delivery-progress-container">
      <div className={`progress-header ${isFreeDeliveryUnlocked ? 'unlocked' : 'locked'}`}>
        {isFreeDeliveryUnlocked ? (
          <>
            <CheckCircle2 size={18} color="#2A9D8F" />
            <span>🎉 FREE delivery unlocked!</span>
          </>
        ) : (
          <>
            <Truck size={18} color="#D9601A" />
            <span>
              Add <strong style={{ color: '#C84B31' }}>₹{amountNeededForFreeDelivery}</strong> more to unlock FREE delivery
            </span>
          </>
        )}
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${isFreeDeliveryUnlocked ? 'complete' : ''}`}
          style={{ width: `${freeDeliveryProgress}%` }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#6B7280', marginTop: '6px' }}>
        <span>₹0</span>
        <span>Target: ₹{FREE_DELIVERY_THRESHOLD}</span>
      </div>
    </div>
  );
};
