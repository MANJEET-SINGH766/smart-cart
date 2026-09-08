import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_FEE } from '../data/products';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage gracefully
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('smartCart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState(null);

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('smartCart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  // Calculations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const isFreeDeliveryUnlocked = subtotal >= FREE_DELIVERY_THRESHOLD;

  const deliveryFee = totalItemsCount === 0 ? 0 : (isFreeDeliveryUnlocked ? 0 : STANDARD_DELIVERY_FEE);

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const freeDeliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  const finalTotal = totalItemsCount === 0 ? 0 : subtotal + deliveryFee;

  // Add to cart action
  const addToCart = (product, quantityToAdd = 1, shouldOpenDrawer = true) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd
        };
        return updated;
      } else {
        return [...prevItems, { id: product.id, product, quantity: quantityToAdd }];
      }
    });

    setLastAddedId(product.id);
    setTimeout(() => {
      setLastAddedId(prev => (prev === product.id ? null : prev));
    }, 2000);

    if (shouldOpenDrawer) {
      setIsCartOpen(true);
    }
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Drawer controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Smart recommendation logic
  const getRecommendations = (limit = 3) => {
    const cartProductIds = new Set(cartItems.map(item => item.id));
    const available = PRODUCTS.filter(p => !cartProductIds.has(p.id));

    if (available.length === 0) return [];

    // If below free delivery threshold, prioritize products that help reach threshold smoothly
    if (amountNeededForFreeDelivery > 0) {
      // Sort items: those whose price is closest to or slightly above amountNeededForFreeDelivery
      return [...available].sort((a, b) => {
        const diffA = Math.abs(a.price - amountNeededForFreeDelivery);
        const diffB = Math.abs(b.price - amountNeededForFreeDelivery);
        return diffA - diffB;
      }).slice(0, limit);
    }

    // Default: recommend top rated items
    return [...available].sort((a, b) => b.rating - a.rating).slice(0, limit);
  };

  const value = {
    cartItems,
    isCartOpen,
    lastAddedId,
    totalItemsCount,
    subtotal,
    deliveryFee,
    amountNeededForFreeDelivery,
    freeDeliveryProgress,
    isFreeDeliveryUnlocked,
    finalTotal,
    FREE_DELIVERY_THRESHOLD,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    getRecommendations
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
