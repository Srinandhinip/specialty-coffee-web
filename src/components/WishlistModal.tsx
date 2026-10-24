import React from 'react';
import { COFFEE_BEANS } from '../data/coffeeData';
import type { CoffeeBean } from '../types/coffee';
import { CloseIcon, HeartIcon, ShoppingBagIcon, TimerIcon, StarIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveFavorite: (beanId: string) => void;
  onAddToCart: (bean: CoffeeBean, grind: string) => void;
  onNavigateBrew: (beanId: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFavorite,
  onAddToCart,
  onNavigateBrew,
}) => {
  if (!isOpen) return null;

  const favoriteBeans = COFFEE_BEANS.filter((b) => wishlistIds.includes(b.id));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content wishlist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <div className="wishlist-title-flex">
            <HeartIcon size={20} filled color="#e63946" />
            <h3>Your Saved Coffee Terroirs ({favoriteBeans.length})</h3>
          </div>
          <button className="modal-close-btn" onClick={() => { sound.playClick(); onClose(); }}>
            <CloseIcon size={20} />
          </button>
        </div>

        {favoriteBeans.length === 0 ? (
          <div className="empty-wishlist-view">
            <span className="empty-heart-icon">🤍</span>
            <h4>No saved coffees yet</h4>
            <p>Click the heart icon on any single-origin bean to save it for quick cupping comparison.</p>
          </div>
        ) : (
          <div className="wishlist-items-grid">
            {favoriteBeans.map((bean) => (
              <div key={bean.id} className="wishlist-card">
                <div className="w-card-header">
                  <span className="w-origin">{bean.country} • {bean.region}</span>
                  <button
                    className="w-remove-btn"
                    onClick={() => {
                      sound.playClick();
                      onRemoveFavorite(bean.id);
                    }}
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>

                <h4 className="w-bean-title">{bean.name}</h4>
                <div className="w-score">
                  <StarIcon size={14} color="#f4a261" />
                  <span>{bean.scaScore} SCA Cupping Score</span>
                </div>

                <div className="w-notes">
                  {bean.tastingNotes.slice(0, 3).join(' • ')}
                </div>

                <div className="w-bottom-row">
                  <span className="w-price">${bean.price.toFixed(2)}</span>
                  <div className="w-btn-group">
                    <button
                      className="btn-w-brew"
                      onClick={() => {
                        sound.playClick();
                        onNavigateBrew(bean.id);
                        onClose();
                      }}
                      title="Dial-in brew timer"
                    >
                      <TimerIcon size={14} />
                      <span>Brew</span>
                    </button>
                    <button
                      className="btn-w-cart"
                      onClick={() => {
                        sound.playSuccess();
                        onAddToCart(bean, 'Whole Bean (Recommended)');
                      }}
                      title="Add to cart"
                    >
                      <ShoppingBagIcon size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
