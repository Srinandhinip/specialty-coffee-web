import React, { useState } from 'react';
import type { CoffeeBean } from '../types/coffee';
import { CloseIcon, StarIcon, SparklesIcon, ShoppingBagIcon, TimerIcon, HeartIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface BeanModalProps {
  bean: CoffeeBean | null;
  onClose: () => void;
  onNavigateBrew: (beanId: string) => void;
  onAddToCart: (bean: CoffeeBean, grind: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (beanId: string) => void;
}

export const BeanModal: React.FC<BeanModalProps> = ({
  bean,
  onClose,
  onNavigateBrew,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedGrind, setSelectedGrind] = useState<string>('Whole Bean (Recommended)');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  if (!bean) return null;

  const grindOptions = [
    'Whole Bean (Recommended)',
    'Espresso / Moka (Fine)',
    'Pour Over / V60 (Medium-Fine)',
    'Drip / Chemex (Medium)',
    'French Press / Cold Brew (Coarse)'
  ];

  const handleAddToCart = () => {
    sound.playSuccess();
    setAddedAnimation(true);
    onAddToCart(bean, selectedGrind);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  // Helper to render interactive radar chart
  const renderRadarChart = () => {
    const p = bean.profile;
    const center = 100;
    const maxRadius = 75;

    // 6 axes: Acidity, Sweetness, Body, Floral, Fruity, CocoaNutty
    const keys = [
      { label: 'Acidity', val: p.acidity, angle: 0 },
      { label: 'Sweetness', val: p.sweetness, angle: 60 },
      { label: 'Body', val: p.body, angle: 120 },
      { label: 'Floral', val: p.floral, angle: 180 },
      { label: 'Fruity', val: p.fruity, angle: 240 },
      { label: 'Cocoa/Nutty', val: p.cocoaNutty, angle: 300 },
    ];

    const points = keys.map((k) => {
      const rad = (k.angle - 90) * (Math.PI / 180);
      const r = (k.val / 10) * maxRadius;
      const x = center + r * Math.cos(rad);
      const y = center + r * Math.sin(rad);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="radar-container">
        <svg className="radar-svg" viewBox="0 0 200 200">
          {/* Background concentric webs */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <polygon
              key={i}
              className="radar-grid-polygon"
              points={keys.map((k) => {
                const rad = (k.angle - 90) * (Math.PI / 180);
                const r = scale * maxRadius;
                return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
              }).join(' ')}
            />
          ))}

          {/* Axes lines */}
          {keys.map((k, idx) => {
            const rad = (k.angle - 90) * (Math.PI / 180);
            const x = center + maxRadius * Math.cos(rad);
            const y = center + maxRadius * Math.sin(rad);
            return <line key={idx} x1={center} y1={center} x2={x} y2={y} className="radar-axis-line" />;
          })}

          {/* Data shape polygon */}
          <polygon
            points={points}
            className="radar-data-polygon"
            style={{ fill: `${bean.color}33`, stroke: bean.color }}
          />

          {/* Data point dots */}
          {keys.map((k, idx) => {
            const rad = (k.angle - 90) * (Math.PI / 180);
            const r = (k.val / 10) * maxRadius;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4"
                fill={bean.color}
                stroke="#fff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Labels */}
          {keys.map((k, idx) => {
            const rad = (k.angle - 90) * (Math.PI / 180);
            const labelR = maxRadius + 18;
            const x = center + labelR * Math.cos(rad);
            const y = center + labelR * Math.sin(rad);
            return (
              <text
                key={idx}
                x={x}
                y={y}
                className="radar-label"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {k.label} ({k.val})
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content bean-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={() => { sound.playClick(); onClose(); }}>
          <CloseIcon size={20} />
        </button>

        <div className="modal-inner-grid">
          {/* Left Column: Visuals & Radar */}
          <div className="modal-left-col">
            <div className="bean-hero-badge-box" style={{ background: `linear-gradient(135deg, ${bean.color}22, #1a161f)` }}>
              <div className="modal-top-tags">
                <span className="sca-badge">
                  <StarIcon size={14} color="#f4a261" />
                  <span>{bean.scaScore} SCA Grade</span>
                </span>
                <button
                  className="fav-toggle-btn"
                  onClick={() => {
                    sound.playClick();
                    onToggleFavorite(bean.id);
                  }}
                  title="Toggle Wishlist"
                >
                  <HeartIcon size={18} filled={isFavorite} color={isFavorite ? '#e63946' : 'currentColor'} />
                </button>
              </div>

              <div className="lot-card-art">
                <div className="lot-origin-flag">{bean.country}</div>
                <h2 className="lot-name-large">{bean.name}</h2>
                <span className="lot-elevation">{bean.elevation} • {bean.process} Process</span>
              </div>
            </div>

            {/* Flavor Radar Matrix */}
            <div className="radar-section-box">
              <div className="radar-title-row">
                <SparklesIcon size={16} color="#f4a261" />
                <span className="radar-title">Sensory Flavor Radar</span>
              </div>
              {renderRadarChart()}
            </div>
          </div>

          {/* Right Column: Terroir story & Order configuration */}
          <div className="modal-right-col">
            <div className="terroir-header">
              <span className="origin-sub">{bean.region}, {bean.country}</span>
              <p className="bean-full-desc">{bean.description}</p>
            </div>

            {/* Tasting Notes */}
            <div className="modal-tasting-notes">
              <span className="notes-label">CUPPING TASTING NOTES:</span>
              <div className="notes-pill-wrap">
                {bean.tastingNotes.map((n, i) => (
                  <span key={i} className="tasting-pill" style={{ borderColor: `${bean.color}88` }}>
                    ✨ {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Farm & Harvest Specifications */}
            <div className="specs-table-grid">
              <div className="spec-row">
                <span className="s-name">Farm / Producer</span>
                <span className="s-val">{bean.farm}</span>
              </div>
              <div className="spec-row">
                <span className="s-name">Botanical Variety</span>
                <span className="s-val">{bean.variety}</span>
              </div>
              <div className="spec-row">
                <span className="s-name">Harvest Season</span>
                <span className="s-val">{bean.harvestDate}</span>
              </div>
              <div className="spec-row">
                <span className="s-name">Roast Profile</span>
                <span className="s-val">{bean.roastLevel} Roast</span>
              </div>
              <div className="spec-row">
                <span className="s-name">Best Brew Method</span>
                <span className="s-val">{bean.recommendedBrew}</span>
              </div>
            </div>

            {/* Grind Selector */}
            <div className="modal-grind-select">
              <label className="grind-select-label">Choose Grind Specification:</label>
              <select
                value={selectedGrind}
                onChange={(e) => setSelectedGrind(e.target.value)}
                className="grind-dropdown"
              >
                {grindOptions.map((g, idx) => (
                  <option key={idx} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Bottom Modal Actions */}
            <div className="modal-cta-bar">
              <div className="price-display">
                <span className="price-amount">${bean.price.toFixed(2)}</span>
                <span className="price-unit">/ {bean.weight} Micro-lot Bag</span>
              </div>

              <div className="cta-btn-group">
                <button
                  className="btn btn-dial-brew"
                  onClick={() => {
                    sound.playClick();
                    onNavigateBrew(bean.id);
                    onClose();
                  }}
                >
                  <TimerIcon size={16} />
                  <span>Dial-in Brew</span>
                </button>

                <button
                  className={`btn btn-primary ${addedAnimation ? 'btn-added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingBagIcon size={18} />
                  <span>{addedAnimation ? 'Added to Bag! ✓' : 'Add to Bag'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
