import React, { useState } from 'react';
import { COFFEE_BEANS, FLAVOR_TAGS } from '../data/coffeeData';
import type { CoffeeBean, Continent } from '../types/coffee';
import { 
  SparklesIcon, 
  StarIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  TimerIcon, 
  CompassIcon 
} from './CoffeeIcons';
import { BeanModal } from './BeanModal';
import { sound } from '../utils/audio';

interface OriginVaultProps {
  onNavigateBrew: (beanId: string) => void;
  onAddToCart: (bean: CoffeeBean, grind: string) => void;
  wishlist: string[];
  onToggleWishlist: (beanId: string) => void;
}

export const OriginVault: React.FC<OriginVaultProps> = ({
  onNavigateBrew,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'All'>('All');
  const [selectedFlavorTag, setSelectedFlavorTag] = useState<string>('All Profiles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'score' | 'price-asc' | 'price-desc' | 'acidity'>('score');
  const [inspectingBean, setInspectingBean] = useState<CoffeeBean | null>(null);

  const continents: (Continent | 'All')[] = ['All', 'Africa', 'Latin America', 'Asia-Pacific', 'Middle East'];

  // Filter beans
  const filteredBeans = COFFEE_BEANS.filter((bean) => {
    // Continent filter
    if (selectedContinent !== 'All' && bean.continent !== selectedContinent) {
      return false;
    }

    // Flavor Tag filter
    if (selectedFlavorTag !== 'All Profiles') {
      const matchTag = bean.tastingNotes.some((n) =>
        selectedFlavorTag.toLowerCase().includes(n.toLowerCase()) ||
        (selectedFlavorTag === 'Floral & Jasmine' && (n.includes('Jasmine') || n.includes('Floral') || n.includes('Bergamot'))) ||
        (selectedFlavorTag === 'Citrus & Berry' && (n.includes('Berry') || n.includes('Lemon') || n.includes('Grapefruit') || n.includes('Currant'))) ||
        (selectedFlavorTag === 'Tropical Fruit' && (n.includes('Peach') || n.includes('Papaya') || n.includes('Mango') || n.includes('Lychee'))) ||
        (selectedFlavorTag === 'Dark Chocolate' && (n.includes('Chocolate') || n.includes('Cacao') || n.includes('Cocoa'))) ||
        (selectedFlavorTag === 'Caramel & Honey' && (n.includes('Caramel') || n.includes('Honey') || n.includes('Toffee') || n.includes('Maple'))) ||
        (selectedFlavorTag === 'Spicy & Earthy' && (n.includes('Spice') || n.includes('Cardamom') || n.includes('Cedar') || n.includes('Molasses')))
      );
      if (!matchTag) return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        bean.name.toLowerCase().includes(q) ||
        bean.country.toLowerCase().includes(q) ||
        bean.region.toLowerCase().includes(q) ||
        bean.variety.toLowerCase().includes(q) ||
        bean.tastingNotes.some((n) => n.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    return true;
  });

  // Sort
  const sortedBeans = [...filteredBeans].sort((a, b) => {
    if (sortBy === 'score') return b.scaScore - a.scaScore;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'acidity') return b.profile.acidity - a.profile.acidity;
    return 0;
  });

  return (
    <section className="origin-vault-section">
      {/* Header */}
      <div className="section-head">
        <div className="section-badge">
          <CompassIcon size={14} color="#f4a261" />
          <span>MICRO-LOT ATLAS</span>
        </div>
        <h2 className="section-title">The Origin & Sensory Vault</h2>
        <p className="section-subtitle">
          Explore single-origin coffees sourced directly from volcanic highlands, terraced cliff farms,
          and indigenous heirloom forests.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="vault-controls-card">
        {/* Continent Filter Pills */}
        <div className="continent-pill-row">
          {continents.map((cont) => (
            <button
              key={cont}
              className={`pill-filter-btn ${selectedContinent === cont ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setSelectedContinent(cont);
              }}
            >
              <span>{cont === 'All' ? '🌍 All Origins' : cont}</span>
            </button>
          ))}
        </div>

        {/* Flavor Tags Row */}
        <div className="flavor-tag-row">
          {FLAVOR_TAGS.map((tag) => (
            <button
              key={tag}
              className={`flavor-tag-btn ${selectedFlavorTag === tag ? 'active' : ''}`}
              onClick={() => {
                sound.playClick();
                setSelectedFlavorTag(tag);
              }}
            >
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort Bar */}
        <div className="search-sort-bar">
          <div className="search-input-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by variety (Geisha, Bourbon), origin (Huila, Yirgacheffe), notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="vault-search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          <div className="sort-box">
            <label className="sort-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                sound.playClick();
                setSortBy(e.target.value as 'score' | 'price-asc' | 'price-desc' | 'acidity');
              }}
              className="sort-select"
            >
              <option value="score">Highest SCA Cupping Score</option>
              <option value="acidity">Sparkling Acidity (High to Low)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Specialty Beans */}
      <div className="beans-cards-grid">
        {sortedBeans.length === 0 ? (
          <div className="no-results-box">
            <span className="empty-icon">☕</span>
            <h3>No micro-lots match your current filters</h3>
            <p>Try resetting the search keywords or selecting 'All Origins'.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedContinent('All');
                setSelectedFlavorTag('All Profiles');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedBeans.map((bean) => {
            const isFav = wishlist.includes(bean.id);
            return (
              <div
                key={bean.id}
                className="bean-catalog-card"
                style={{ '--accent-color': bean.color } as React.CSSProperties}
              >
                {/* Top Card Badge Row */}
                <div className="card-badge-row">
                  <div className="sca-score-tag">
                    <StarIcon size={13} color="#f4a261" />
                    <span>{bean.scaScore} SCA</span>
                  </div>

                  <div className="process-tag">
                    <span>{bean.process}</span>
                  </div>

                  <button
                    className="card-fav-btn"
                    onClick={() => {
                      sound.playClick();
                      onToggleWishlist(bean.id);
                    }}
                    title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <HeartIcon size={16} filled={isFav} color={isFav ? '#e63946' : '#9ca3af'} />
                  </button>
                </div>

                {/* Country & Region */}
                <div className="card-origin-line">
                  <span className="country-flag">{bean.country}</span>
                  <span className="region-name">• {bean.region}</span>
                </div>

                <h3 className="card-bean-title">{bean.name}</h3>

                {/* Elevation & Variety Specs */}
                <div className="card-micro-specs">
                  <span>⛰️ {bean.elevation}</span>
                  <span>🌱 {bean.variety}</span>
                </div>

                {/* Tasting Note Chips */}
                <div className="card-tasting-chips">
                  {bean.tastingNotes.slice(0, 3).map((note, i) => (
                    <span key={i} className="t-chip">
                      {note}
                    </span>
                  ))}
                  {bean.tastingNotes.length > 3 && (
                    <span className="t-chip more-chip">+{bean.tastingNotes.length - 3}</span>
                  )}
                </div>

                {/* Mini Profile Balance Bars */}
                <div className="mini-profile-bars">
                  <div className="bar-row">
                    <span className="b-lbl">Acidity</span>
                    <div className="b-track">
                      <div className="b-fill acidity-fill" style={{ width: `${bean.profile.acidity * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="bar-row">
                    <span className="b-lbl">Sweetness</span>
                    <div className="b-track">
                      <div className="b-fill sweetness-fill" style={{ width: `${bean.profile.sweetness * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="bar-row">
                    <span className="b-lbl">Body</span>
                    <div className="b-track">
                      <div className="b-fill body-fill" style={{ width: `${bean.profile.body * 10}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Card Footer & Actions */}
                <div className="card-bottom-actions">
                  <div className="price-tag-box">
                    <span className="price-num">${bean.price.toFixed(2)}</span>
                    <span className="weight-num">/ {bean.weight}</span>
                  </div>

                  <div className="card-btn-duo">
                    <button
                      className="btn-inspect-lot"
                      onClick={() => {
                        sound.playClick();
                        setInspectingBean(bean);
                      }}
                      title="Inspect full flavor radar & farm specs"
                    >
                      <SparklesIcon size={14} />
                      <span>Inspect</span>
                    </button>

                    <button
                      className="btn-quick-brew"
                      onClick={() => {
                        sound.playClick();
                        onNavigateBrew(bean.id);
                      }}
                      title="Dial in with live brew timer"
                    >
                      <TimerIcon size={14} />
                    </button>

                    <button
                      className="btn-quick-add"
                      onClick={() => {
                        sound.playSuccess();
                        onAddToCart(bean, 'Whole Bean (Recommended)');
                      }}
                      title="Quick Add to Bag"
                    >
                      <ShoppingBagIcon size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for detailed inspection */}
      {inspectingBean && (
        <BeanModal
          bean={inspectingBean}
          onClose={() => setInspectingBean(null)}
          onNavigateBrew={onNavigateBrew}
          onAddToCart={onAddToCart}
          isFavorite={wishlist.includes(inspectingBean.id)}
          onToggleFavorite={onToggleWishlist}
        />
      )}
    </section>
  );
};
