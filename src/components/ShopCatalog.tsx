import React, { useState } from 'react';
import { COFFEE_BEANS } from '../data/coffeeData';
import type { CoffeeBean } from '../types/coffee';
import { ShoppingBagIcon, StarIcon, SparklesIcon, CheckIcon, HeartIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface ShopCatalogProps {
  onAddToCart: (bean: CoffeeBean, grind: string) => void;
  onAddCustomFlightToCart: (flight: {
    name: string;
    beans: string[];
    price: number;
  }) => void;
  wishlist: string[];
  onToggleWishlist: (beanId: string) => void;
  onInspectBean: (bean: CoffeeBean) => void;
}

interface GearItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  badge: string;
}

const BREW_GEAR: GearItem[] = [
  {
    id: 'kettle-stagg',
    name: 'Precision Gooseneck Variable Temp Kettle (0.9L)',
    category: 'Pour Over Gear',
    price: 165.00,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Counterbalanced handle, precision pour spout, and ±1°C PID temperature stability for flawless bloom flow.',
    badge: 'Barista Essential'
  },
  {
    id: 'grinder-conical',
    name: 'Titanium Burr Precision Hand Grinder',
    category: 'Grinders',
    price: 89.00,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Dual-bearing CNC stainless steel 38mm conical burrs with step micro-adjustments from Turkish to French press.',
    badge: 'Pro Grade'
  },
  {
    id: 'scale-timer',
    name: 'Smart Bluetooth Precision Coffee Scale (0.1g)',
    category: 'Scales & Timers',
    price: 54.00,
    rating: 4.9,
    reviewsCount: 215,
    description: 'Fast 20ms response time, auto-tare flow detection, and integrated extraction timer screen.',
    badge: 'Best Seller'
  },
  {
    id: 'v60-dripper-set',
    name: 'Heatproof Borosilicate V60 Glass Dripper & Server Set',
    category: 'Brewers',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 88,
    description: 'Handcrafted heat-resistant glass dripper with olive wood base and 600ml decanter carafe.',
    badge: 'Specialty Classic'
  }
];

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  onAddToCart,
  onAddCustomFlightToCart,
  wishlist,
  onToggleWishlist,
  onInspectBean,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'beans' | 'flights' | 'gear'>('all');

  // Flight Box Builder States
  const [flightSlot1, setFlightSlot1] = useState<string>(COFFEE_BEANS[0].id);
  const [flightSlot2, setFlightSlot2] = useState<string>(COFFEE_BEANS[1].id);
  const [flightSlot3, setFlightSlot3] = useState<string>(COFFEE_BEANS[3].id);
  const [flightAdded, setFlightAdded] = useState<boolean>(false);

  // User review submission simulation
  const [userRating, setUserRating] = useState<number>(5);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const bean1 = COFFEE_BEANS.find((b) => b.id === flightSlot1) || COFFEE_BEANS[0];
  const bean2 = COFFEE_BEANS.find((b) => b.id === flightSlot2) || COFFEE_BEANS[1];
  const bean3 = COFFEE_BEANS.find((b) => b.id === flightSlot3) || COFFEE_BEANS[3];

  const handleAddFlight = () => {
    sound.playSuccess();
    setFlightAdded(true);
    onAddCustomFlightToCart({
      name: `Specialty Terroir Flight (3 x 100g Sampler)`,
      beans: [bean1.name, bean2.name, bean3.name],
      price: 36.00,
    });
    setTimeout(() => setFlightAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReviewText.trim()) return;
    sound.playSuccess();
    setReviewSubmitted(true);
    setUserReviewText('');
  };

  return (
    <section className="shop-section">
      {/* Header */}
      <div className="section-head">
        <div className="section-badge">
          <ShoppingBagIcon size={14} color="#f4a261" />
          <span>ROASTERY PROVISIONS</span>
        </div>
        <h2 className="section-title">Specialty Roastery & Gear Store</h2>
        <p className="section-subtitle">
          Freshly roasted single-origin micro-lots, custom 3-origin tasting flight boxes,
          and barista precision extraction instruments.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="shop-category-tabs">
        <button
          className={`shop-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => { sound.playClick(); setActiveCategory('all'); }}
        >
          All Offerings
        </button>
        <button
          className={`shop-tab-btn ${activeCategory === 'flights' ? 'active' : ''}`}
          onClick={() => { sound.playClick(); setActiveCategory('flights'); }}
        >
          ✨ Custom 3-Origin Flight Box
        </button>
        <button
          className={`shop-tab-btn ${activeCategory === 'beans' ? 'active' : ''}`}
          onClick={() => { sound.playClick(); setActiveCategory('beans'); }}
        >
          Single-Origin Bags (250g)
        </button>
        <button
          className={`shop-tab-btn ${activeCategory === 'gear' ? 'active' : ''}`}
          onClick={() => { sound.playClick(); setActiveCategory('gear'); }}
        >
          Barista Equipment
        </button>
      </div>

      {/* Interactive 3-Origin Flight Box Builder */}
      {(activeCategory === 'all' || activeCategory === 'flights') && (
        <div className="flight-builder-card">
          <div className="flight-header-flex">
            <div>
              <span className="flight-tag">EXCLUSIVE TASTING EXPERIENCE</span>
              <h3 className="flight-title">Bespoke 3-Origin Tasting Flight (3 x 100g)</h3>
              <p className="flight-desc">
                Curate your personal sensory cupping box. Select any three single-origin micro-lots
                and receive freshly roasted sealed 100g tasting vials.
              </p>
            </div>
            <div className="flight-price-box">
              <span className="f-old-price">$45.00</span>
              <span className="f-price">$36.00</span>
              <span className="f-savings">Save 20% on Flight</span>
            </div>
          </div>

          <div className="flight-slots-grid">
            {/* Slot 1 */}
            <div className="flight-slot">
              <span className="slot-num">Vial 1:</span>
              <select
                value={flightSlot1}
                onChange={(e) => { sound.playClick(); setFlightSlot1(e.target.value); }}
                className="flight-select"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <div className="slot-meta">
                <span className="slot-notes">{bean1.tastingNotes.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Slot 2 */}
            <div className="flight-slot">
              <span className="slot-num">Vial 2:</span>
              <select
                value={flightSlot2}
                onChange={(e) => { sound.playClick(); setFlightSlot2(e.target.value); }}
                className="flight-select"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <div className="slot-meta">
                <span className="slot-notes">{bean2.tastingNotes.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Slot 3 */}
            <div className="flight-slot">
              <span className="slot-num">Vial 3:</span>
              <select
                value={flightSlot3}
                onChange={(e) => { sound.playClick(); setFlightSlot3(e.target.value); }}
                className="flight-select"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <div className="slot-meta">
                <span className="slot-notes">{bean3.tastingNotes.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="flight-action-row">
            <button
              className={`btn btn-primary btn-flight ${flightAdded ? 'btn-added' : ''}`}
              onClick={handleAddFlight}
            >
              {flightAdded ? (
                <>
                  <CheckIcon size={18} />
                  <span>Flight Box Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBagIcon size={18} />
                  <span>Add Tasting Flight to Bag ($36.00)</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Coffee Beans Catalog Grid */}
      {(activeCategory === 'all' || activeCategory === 'beans') && (
        <div className="shop-beans-section">
          <h3 className="category-heading">☕ Single-Origin Micro-Lots (250g Whole Bean / Ground)</h3>
          <div className="shop-grid">
            {COFFEE_BEANS.map((bean) => {
              const isFav = wishlist.includes(bean.id);
              return (
                <div key={bean.id} className="shop-item-card">
                  <div className="card-top-row">
                    <span className="sca-pill">{bean.scaScore} SCA</span>
                    <button
                      className="card-fav-btn"
                      onClick={() => { sound.playClick(); onToggleWishlist(bean.id); }}
                    >
                      <HeartIcon size={16} filled={isFav} color={isFav ? '#e63946' : '#9ca3af'} />
                    </button>
                  </div>

                  <span className="item-origin">{bean.region}, {bean.country}</span>
                  <h4 className="item-name">{bean.name}</h4>

                  <div className="item-notes">
                    {bean.tastingNotes.slice(0, 3).join(' • ')}
                  </div>

                  <div className="item-bottom-flex">
                    <div className="item-price">${bean.price.toFixed(2)}</div>
                    <div className="item-btns">
                      <button
                        className="btn-inspect-small"
                        onClick={() => { sound.playClick(); onInspectBean(bean); }}
                      >
                        Inspect
                      </button>
                      <button
                        className="btn-add-small"
                        onClick={() => {
                          sound.playSuccess();
                          onAddToCart(bean, 'Whole Bean (Recommended)');
                        }}
                      >
                        <ShoppingBagIcon size={14} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Barista Equipment Section */}
      {(activeCategory === 'all' || activeCategory === 'gear') && (
        <div className="shop-gear-section">
          <h3 className="category-heading">⚙️ Barista Precision Brewing Gear</h3>
          <div className="gear-grid">
            {BREW_GEAR.map((item) => (
              <div key={item.id} className="gear-card">
                <div className="gear-badge">{item.badge}</div>
                <span className="gear-cat">{item.category}</span>
                <h4 className="gear-name">{item.name}</h4>
                <p className="gear-desc">{item.description}</p>

                <div className="gear-rating-row">
                  <div className="stars-box">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={14} filled={i < Math.floor(item.rating)} />
                    ))}
                  </div>
                  <span className="rating-num">{item.rating} ({item.reviewsCount} reviews)</span>
                </div>

                <div className="gear-bottom-flex">
                  <span className="gear-price">${item.price.toFixed(2)}</span>
                  <button
                    className="btn btn-secondary btn-add-gear"
                    onClick={() => {
                      sound.playSuccess();
                      alert(`✨ Added ${item.name} ($${item.price.toFixed(2)}) to your order!`);
                    }}
                  >
                    <ShoppingBagIcon size={14} />
                    <span>Add Gear</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Tasting Review Box */}
      <div className="community-reviews-box">
        <h3 className="review-box-title">📝 Community Tasting Log & Reviews</h3>
        <p className="review-box-sub">Share your cupping notes and extraction scores with fellow coffee lovers.</p>

        {reviewSubmitted ? (
          <div className="review-success-banner">
            <CheckIcon size={20} color="#52b788" />
            <span>Thank you for your tasting notes! Your review has been added to our sensory cupping board.</span>
          </div>
        ) : (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="form-star-rating">
              <span>Your Cupping Rating:</span>
              <div className="interactive-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className="star-rater-btn"
                    onClick={() => { sound.playClick(); setUserRating(star); }}
                  >
                    <StarIcon size={20} filled={star <= userRating} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={userReviewText}
              onChange={(e) => setUserReviewText(e.target.value)}
              placeholder="Describe your brew extraction, flavor notes (e.g. sweet peach, bright bergamot acidity, velvet mouthfeel)..."
              className="review-textarea"
              rows={3}
              required
            />

            <button type="submit" className="btn btn-primary btn-submit-review">
              <SparklesIcon size={16} />
              <span>Post Tasting Notes</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
