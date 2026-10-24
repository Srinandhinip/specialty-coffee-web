import React, { useState } from 'react';
import type { CartItem } from '../types/coffee';
import { CloseIcon, ShoppingBagIcon, SparklesIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPct, setDiscountPct] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPct) / 100;
  const shipping = subtotal >= 45 || subtotal === 0 ? 0 : 5.00;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SPECIALTY10' || code === 'AURA10') {
      sound.playSuccess();
      setDiscountPct(10);
      setPromoMessage('✨ 10% Micro-Lot Roaster Discount Applied!');
    } else if (code === 'BARISTA20') {
      sound.playSuccess();
      setDiscountPct(20);
      setPromoMessage('🎉 20% Barista Master Discount Applied!');
    } else if (code === 'FRESHROAST') {
      sound.playSuccess();
      setDiscountPct(15);
      setPromoMessage('🚚 15% Fresh Roast Welcome Discount Applied!');
    } else {
      sound.playClick();
      setDiscountPct(0);
      setPromoMessage('❌ Invalid promo code. Try "SPECIALTY10" or "BARISTA20"');
    }
  };

  const handleCheckoutProcess = () => {
    sound.playClick();
    setIsCheckingOut(true);
    setCheckoutStep(1);

    setTimeout(() => {
      setCheckoutStep(2); // Roasting queue
    }, 1200);

    setTimeout(() => {
      setCheckoutStep(3); // Nitrogen flush & sealing
    }, 2400);

    setTimeout(() => {
      sound.playSuccess();
      setOrderComplete(true);
      onClearCart();
    }, 3600);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-flex">
            <ShoppingBagIcon size={20} color="#f4a261" />
            <h3 className="drawer-title">Your Roastery Order</h3>
            <span className="items-count-badge">({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
          </div>

          <button className="drawer-close-btn" onClick={() => { sound.playClick(); onClose(); }}>
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="free-shipping-bar">
          {subtotal >= 45 ? (
            <div className="shipping-unlocked">
              <span>🎉 You unlocked Complimentary Roastery Shipping!</span>
            </div>
          ) : (
            <div className="shipping-progress">
              <span>Add ${(45 - subtotal).toFixed(2)} more for Free Shipping</span>
              <div className="ship-track">
                <div className="ship-fill" style={{ width: `${Math.min(100, (subtotal / 45) * 100)}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        {orderComplete ? (
          /* Order Success Confirmation */
          <div className="order-success-screen">
            <div className="success-stamp-art">
              <div className="stamp-circle">
                <span>PASSPORT STAMP</span>
                <span className="stamp-origin">AURA ROASTERY</span>
                <span className="stamp-status">BATCH APPROVED</span>
              </div>
            </div>

            <h3 className="success-heading">Roasting Batch Confirmed!</h3>
            <p className="success-text">
              Your single-origin coffee is scheduled for small-batch roasting at sunrise.
              You will receive real-time tasting notes and tracking updates.
            </p>

            <div className="order-meta-box">
              <div className="meta-line"><span>Order ID:</span> <strong>#AUR-{Math.floor(100000 + Math.random() * 900000)}</strong></div>
              <div className="meta-line"><span>Roast Schedule:</span> <strong>Tomorrow, 06:00 AM</strong></div>
              <div className="meta-line"><span>Total Paid:</span> <strong>${grandTotal.toFixed(2)}</strong></div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                sound.playClick();
                setOrderComplete(false);
                setIsCheckingOut(false);
                onClose();
              }}
            >
              Continue Exploring Coffees
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Animated Checkout Simulation */
          <div className="checkout-sim-screen">
            <h3 className="sim-checkout-title">Processing Micro-Roast Order...</h3>

            <div className="checkout-steps-visual">
              <div className={`ch-step ${checkoutStep >= 1 ? 'ch-active' : ''}`}>
                <span className="ch-icon">1</span>
                <span>Verifying Fresh Crop Lot Reserves</span>
              </div>
              <div className={`ch-step ${checkoutStep >= 2 ? 'ch-active' : ''}`}>
                <span className="ch-icon">2</span>
                <span>Scheduling Roaster Profile Curve</span>
              </div>
              <div className={`ch-step ${checkoutStep >= 3 ? 'ch-active' : ''}`}>
                <span className="ch-icon">3</span>
                <span>Generating Degassing Valve Dispatch</span>
              </div>
            </div>

            <div className="loading-pulse-spinner"></div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="empty-cart-view">
            <span className="empty-cart-icon">🛍️</span>
            <h4>Your roastery bag is empty</h4>
            <p>Explore our single-origin micro-lots or build a custom bespoke blend.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
            >
              Discover Coffees
            </button>
          </div>
        ) : (
          /* Item List */
          <div className="drawer-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="item-main-details">
                  <h4 className="item-title">{item.name}</h4>
                  {item.origin && <span className="item-origin-sub">{item.origin}</span>}
                  {item.customDetails && (
                    <span className="item-components-sub">{item.customDetails.components}</span>
                  )}
                  <span className="item-grind-tag">Grind: {item.grind}</span>
                  <div className="item-price-unit">${item.price.toFixed(2)} each</div>
                </div>

                {/* Quantity Controls */}
                <div className="item-qty-col">
                  <div className="qty-picker">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        sound.playClick();
                        onUpdateQuantity(item.id, -1);
                      }}
                    >
                      -
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => {
                        sound.playClick();
                        onUpdateQuantity(item.id, 1);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <span className="item-total-cost">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="item-remove-btn"
                    onClick={() => {
                      sound.playClick();
                      onRemoveItem(item.id);
                    }}
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with promo and checkout */}
        {!orderComplete && !isCheckingOut && items.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Form */}
            <form className="promo-code-form" onSubmit={applyPromoCode}>
              <input
                type="text"
                placeholder="Promo code (e.g. SPECIALTY10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button type="submit" className="btn-apply-promo">
                Apply
              </button>
            </form>
            {promoMessage && <div className="promo-status-msg">{promoMessage}</div>}

            {/* Calculations Breakdown */}
            <div className="drawer-totals-table">
              <div className="total-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="total-line discount-line">
                  <span>Discount ({discountPct}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="total-line">
                <span>Fresh Roastery Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="total-line grand-total-line">
                <span>Estimated Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              className="btn btn-primary btn-checkout"
              onClick={handleCheckoutProcess}
            >
              <SparklesIcon size={18} />
              <span>Proceed to Roast & Dispatch (${grandTotal.toFixed(2)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
