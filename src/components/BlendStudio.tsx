import React, { useState } from 'react';
import { COFFEE_BEANS } from '../data/coffeeData';
import type { CoffeeBean, RoastLevel } from '../types/coffee';
import { SlidersIcon, SparklesIcon, FlameIcon, ShoppingBagIcon, CheckIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface BlendStudioProps {
  onAddCustomBlendToCart: (blend: {
    name: string;
    description: string;
    components: string;
    roast: RoastLevel;
    packageColor: string;
    grind: string;
    price: number;
  }) => void;
}

const ROAST_LEVELS: { level: RoastLevel; label: string; temp: string; color: string; crackInfo: string }[] = [
  { level: 'Light', label: 'Cinnamon / Light City', temp: '196°C - 205°C', color: '#c49265', crackInfo: 'Post 1st Crack • Maximum fruit & florals' },
  { level: 'Medium-Light', label: 'City+ Roast', temp: '206°C - 212°C', color: '#9d6b38', crackInfo: 'Balanced acidity & sweetness development' },
  { level: 'Medium', label: 'Full City', temp: '213°C - 220°C', color: '#7a4d25', crackInfo: 'Rich caramelization & heavy cocoa core' },
  { level: 'Medium-Dark', label: 'Vienna Roast', temp: '221°C - 228°C', color: '#543216', crackInfo: 'Approaching 2nd Crack • Velvet smoke notes' },
  { level: 'Dark', label: 'French / Italian Dark', temp: '229°C - 235°C', color: '#331d0b', crackInfo: 'Full 2nd crack • Syrupy bittersweet molasses' },
];

const PACKAGING_STYLES = [
  { id: 'matte-black', name: 'Obsidian Velvet', hex: '#16171d', border: '#e0a96d' },
  { id: 'kraft-minimal', name: 'Artisan Kraft', hex: '#c89d6c', border: '#7f4f24' },
  { id: 'terracotta', name: 'Terracotta Clay', hex: '#9e2a2b', border: '#f4a261' },
  { id: 'champagne', name: 'Champagne Gold', hex: '#2b2d42', border: '#ffd166' },
];

const AESTHETIC_NAMES = [
  'Midnight Alchemist',
  'Solar Blossom No. 7',
  'Highland Solstice',
  'Obsidian Silk Espresso',
  'Aurora Mist Reserve',
  'Velvet Horizon',
  'Sanctuary Roaster Lot',
  'Zephyr & Cacao Blend',
  'Elysian Nectar',
  'Crown & Crema'
];

export const BlendStudio: React.FC<BlendStudioProps> = ({ onAddCustomBlendToCart }) => {
  // Component beans in blend
  const [selectedBean1, setSelectedBean1] = useState<CoffeeBean>(COFFEE_BEANS[0]); // Ethiopia
  const [selectedBean2, setSelectedBean2] = useState<CoffeeBean>(COFFEE_BEANS[4]); // Guatemala
  const [selectedBean3, setSelectedBean3] = useState<CoffeeBean>(COFFEE_BEANS[1]); // Colombia

  // Proportions (should sum to 100%)
  const [ratio1, setRatio1] = useState<number>(50);
  const [ratio2, setRatio2] = useState<number>(30);
  const [ratio3, setRatio3] = useState<number>(20);

  // Roast Selection
  const [roastIndex, setRoastIndex] = useState<number>(1); // Medium-Light

  // Customizer Meta
  const [blendName, setBlendName] = useState<string>('Aurora Solstice Reserve');
  const [packageColor, setPackageColor] = useState<string>('matte-black');
  const [selectedGrind, setSelectedGrind] = useState<string>('Whole Bean');
  const [orderAdded, setOrderAdded] = useState<boolean>(false);

  const currentRoast = ROAST_LEVELS[roastIndex];
  const selectedPkg = PACKAGING_STYLES.find((p) => p.id === packageColor) || PACKAGING_STYLES[0];

  // Helper to adjust ratios cleanly
  const handleRatio1Change = (val: number) => {
    sound.playClick();
    const remaining = 100 - val;
    const ratio2Share = ratio2 / (ratio2 + ratio3 || 1);
    const newRatio2 = Math.round(remaining * ratio2Share);
    const newRatio3 = remaining - newRatio2;
    setRatio1(val);
    setRatio2(newRatio2);
    setRatio3(newRatio3);
  };

  const handleRatio2Change = (val: number) => {
    sound.playClick();
    const maxVal = 100 - ratio1;
    const clamped2 = Math.min(val, maxVal);
    setRatio2(clamped2);
    setRatio3(maxVal - clamped2);
  };

  // Generate creative blend name
  const generateRandomName = () => {
    sound.playClick();
    const rand = AESTHETIC_NAMES[Math.floor(Math.random() * AESTHETIC_NAMES.length)];
    setBlendName(rand);
  };

  // Compute composite flavor notes and radar profile
  const compositeAcidity = ((selectedBean1.profile.acidity * ratio1 + selectedBean2.profile.acidity * ratio2 + selectedBean3.profile.acidity * ratio3) / 100).toFixed(1);
  const compositeSweetness = ((selectedBean1.profile.sweetness * ratio1 + selectedBean2.profile.sweetness * ratio2 + selectedBean3.profile.sweetness * ratio3) / 100).toFixed(1);
  const compositeBody = ((selectedBean1.profile.body * ratio1 + selectedBean2.profile.body * ratio2 + selectedBean3.profile.body * ratio3) / 100).toFixed(1);

  // Combined tasting notes
  const combinedNotes = Array.from(new Set([
    selectedBean1.tastingNotes[0],
    selectedBean1.tastingNotes[1],
    selectedBean2.tastingNotes[0],
    selectedBean2.tastingNotes[1],
    selectedBean3.tastingNotes[0],
  ])).filter(Boolean).slice(0, 4);

  // Calculate dynamic custom blend price
  const baseCalculatedPrice = (
    (selectedBean1.price * (ratio1 / 100)) +
    (selectedBean2.price * (ratio2 / 100)) +
    (selectedBean3.price * (ratio3 / 100))
  );
  const finalPrice = Number(baseCalculatedPrice.toFixed(2));

  const handleRoastSlider = (idx: number) => {
    sound.playBeanCrack();
    setRoastIndex(idx);
  };

  const handleAddToCart = () => {
    sound.playSuccess();
    setOrderAdded(true);
    onAddCustomBlendToCart({
      name: blendName || 'Bespoke Custom Blend',
      description: `${currentRoast.level} Roast Custom Lot crafted with ${ratio1}% ${selectedBean1.name}, ${ratio2}% ${selectedBean2.name}, and ${ratio3}% ${selectedBean3.name}.`,
      components: `${ratio1}% ${selectedBean1.country} • ${ratio2}% ${selectedBean2.country} • ${ratio3}% ${selectedBean3.country}`,
      roast: currentRoast.level,
      packageColor: selectedPkg.name,
      grind: selectedGrind,
      price: finalPrice,
    });
    setTimeout(() => setOrderAdded(false), 2000);
  };

  return (
    <section className="blend-studio-section">
      {/* Section Head */}
      <div className="section-head">
        <div className="section-badge">
          <SlidersIcon size={14} color="#f4a261" />
          <span>ROASTERY LAB CUSTOMIZER</span>
        </div>
        <h2 className="section-title">Craft Your Bespoke Micro-Blend</h2>
        <p className="section-subtitle">
          Select single-origin terroirs, adjust proportion percentages, dial in roast caramelization,
          and design your custom coffee bag.
        </p>
      </div>

      <div className="blend-workspace-grid">
        {/* Left Column: Ingredients, Proportions & Roast Dial */}
        <div className="studio-control-card">
          <h3 className="studio-card-heading">
            <span>1. Select Component Terroirs & Mix Ratios</span>
          </h3>

          {/* Bean 1 Control */}
          <div className="component-bean-row">
            <div className="bean-pick-header">
              <span className="comp-badge" style={{ backgroundColor: selectedBean1.color }}>Lot A</span>
              <select
                value={selectedBean1.id}
                onChange={(e) => {
                  sound.playClick();
                  const found = COFFEE_BEANS.find((b) => b.id === e.target.value);
                  if (found) setSelectedBean1(found);
                }}
                className="bean-select-box"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <span className="ratio-pct-badge">{ratio1}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={ratio1}
              onChange={(e) => handleRatio1Change(Number(e.target.value))}
              className="blend-range-slider"
            />
          </div>

          {/* Bean 2 Control */}
          <div className="component-bean-row">
            <div className="bean-pick-header">
              <span className="comp-badge" style={{ backgroundColor: selectedBean2.color }}>Lot B</span>
              <select
                value={selectedBean2.id}
                onChange={(e) => {
                  sound.playClick();
                  const found = COFFEE_BEANS.find((b) => b.id === e.target.value);
                  if (found) setSelectedBean2(found);
                }}
                className="bean-select-box"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <span className="ratio-pct-badge">{ratio2}%</span>
            </div>
            <input
              type="range"
              min="10"
              max={100 - ratio1 - 10}
              value={ratio2}
              onChange={(e) => handleRatio2Change(Number(e.target.value))}
              className="blend-range-slider"
            />
          </div>

          {/* Bean 3 Control */}
          <div className="component-bean-row">
            <div className="bean-pick-header">
              <span className="comp-badge" style={{ backgroundColor: selectedBean3.color }}>Lot C</span>
              <select
                value={selectedBean3.id}
                onChange={(e) => {
                  sound.playClick();
                  const found = COFFEE_BEANS.find((b) => b.id === e.target.value);
                  if (found) setSelectedBean3(found);
                }}
                className="bean-select-box"
              >
                {COFFEE_BEANS.map((b) => (
                  <option key={b.id} value={b.id}>{b.country} - {b.name} ({b.scaScore} SCA)</option>
                ))}
              </select>
              <span className="ratio-pct-badge">{ratio3}%</span>
            </div>
            <div className="ratio-locked-bar">
              <div className="ratio-fill" style={{ width: `${ratio3}%` }}></div>
              <span className="locked-label">Auto-balanced balance ({ratio3}%)</span>
            </div>
          </div>

          {/* Interactive Roast Degree Spectrum */}
          <div className="roast-dial-section">
            <div className="roast-header-flex">
              <h3 className="studio-card-heading">
                <span>2. Dial In Roast Degree & Temperature</span>
              </h3>
              <span className="roast-temp-badge">
                <FlameIcon size={14} color="#f4a261" />
                {currentRoast.temp}
              </span>
            </div>

            {/* Visual Roast Bean preview */}
            <div className="roast-bean-interactive-display">
              <div 
                className="animated-bean-visual"
                style={{ backgroundColor: currentRoast.color }}
                onClick={() => sound.playBeanCrack()}
                title="Click bean to hear roasting crack!"
              >
                <div className="bean-crease"></div>
                <div className="bean-shine"></div>
              </div>

              <div className="roast-spec-info">
                <div className="roast-label-name">{currentRoast.label}</div>
                <div className="roast-crack-note">{currentRoast.crackInfo}</div>
              </div>
            </div>

            {/* Roast Slider */}
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={roastIndex}
              onChange={(e) => handleRoastSlider(Number(e.target.value))}
              className="roast-level-slider"
            />
            <div className="roast-steps-legend">
              {ROAST_LEVELS.map((r, i) => (
                <button
                  key={i}
                  className={`roast-legend-step ${i === roastIndex ? 'active' : ''}`}
                  onClick={() => handleRoastSlider(i)}
                >
                  <span className="step-dot" style={{ backgroundColor: r.color }}></span>
                  <span className="step-txt">{r.level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Packaging Options */}
          <div className="packaging-custom-section">
            <h3 className="studio-card-heading">
              <span>3. Blend Identity & Packaging Style</span>
            </h3>

            <div className="blend-name-input-row">
              <input
                type="text"
                value={blendName}
                onChange={(e) => setBlendName(e.target.value)}
                placeholder="Name your signature blend..."
                className="blend-name-input"
              />
              <button
                className="btn-gen-name"
                onClick={generateRandomName}
                title="Generate aesthetic blend name"
              >
                <SparklesIcon size={15} />
                <span>Auto-Generate</span>
              </button>
            </div>

            {/* Package style pills */}
            <div className="package-style-row">
              {PACKAGING_STYLES.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`pkg-select-btn ${packageColor === pkg.id ? 'active' : ''}`}
                  style={{ borderColor: packageColor === pkg.id ? pkg.border : 'transparent' }}
                  onClick={() => {
                    sound.playClick();
                    setPackageColor(pkg.id);
                  }}
                >
                  <span className="pkg-color-swatch" style={{ backgroundColor: pkg.hex }}></span>
                  <span>{pkg.name}</span>
                </button>
              ))}
            </div>

            {/* Grind Specification */}
            <div className="grind-pick-row">
              <label>Grind Type:</label>
              <select
                value={selectedGrind}
                onChange={(e) => setSelectedGrind(e.target.value)}
                className="blend-grind-select"
              >
                <option value="Whole Bean">Whole Bean (Recommended)</option>
                <option value="Pour Over Grind">Pour Over (V60/Chemex)</option>
                <option value="Espresso Fine">Espresso Machine</option>
                <option value="French Press Coarse">French Press / Cold Brew</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Bag Mockup & Computed Sensory Matrix */}
        <div className="studio-preview-card">
          <div className="preview-top-bar">
            <span className="preview-label">LIVE BESPOKE BAG MOCKUP</span>
            <span className="craft-badge">✨ Custom Micro-Roast</span>
          </div>

          {/* 3D-styled Coffee Bag Graphic */}
          <div className="bag-mockup-wrapper">
            <div
              className="coffee-bag-3d"
              style={{
                backgroundColor: selectedPkg.hex,
                borderColor: selectedPkg.border,
                boxShadow: `0 20px 40px -10px ${selectedPkg.hex}99`
              }}
            >
              {/* Bag Seal / Valve */}
              <div className="bag-valve">
                <span className="valve-dot"></span>
              </div>

              {/* Bag Label Card */}
              <div className="bag-front-label">
                <div className="label-brand">AURA SPECIALTY ATELIER</div>
                <div className="label-blend-title">{blendName || 'Bespoke Roastery Lot'}</div>

                <div className="label-roast-pill" style={{ backgroundColor: currentRoast.color }}>
                  {currentRoast.level} Roast
                </div>

                <div className="label-recipe-breakdown">
                  <div className="r-item">{ratio1}% {selectedBean1.country} ({selectedBean1.process})</div>
                  <div className="r-item">{ratio2}% {selectedBean2.country} ({selectedBean2.process})</div>
                  <div className="r-item">{ratio3}% {selectedBean3.country} ({selectedBean3.process})</div>
                </div>

                <div className="label-tasting-line">
                  {combinedNotes.join(' • ')}
                </div>

                <div className="label-bottom-meta">
                  <span>250g Net Wt.</span>
                  <span>{selectedGrind}</span>
                  <span>Roasted to Order</span>
                </div>
              </div>

              {/* Bottom Bag Fold */}
              <div className="bag-gusset"></div>
            </div>
          </div>

          {/* Computed Flavor Spectrum Matrix */}
          <div className="computed-flavor-matrix">
            <div className="matrix-title">Projected Cup Balance:</div>

            <div className="matrix-stat-row">
              <span className="m-label">Acidity</span>
              <div className="m-track">
                <div className="m-fill" style={{ width: `${Number(compositeAcidity) * 10}%`, backgroundColor: '#f4a261' }}></div>
              </div>
              <span className="m-num">{compositeAcidity}/10</span>
            </div>

            <div className="matrix-stat-row">
              <span className="m-label">Sweetness</span>
              <div className="m-track">
                <div className="m-fill" style={{ width: `${Number(compositeSweetness) * 10}%`, backgroundColor: '#e76f51' }}></div>
              </div>
              <span className="m-num">{compositeSweetness}/10</span>
            </div>

            <div className="matrix-stat-row">
              <span className="m-label">Body</span>
              <div className="m-track">
                <div className="m-fill" style={{ width: `${Number(compositeBody) * 10}%`, backgroundColor: '#6d597a' }}></div>
              </div>
              <span className="m-num">{compositeBody}/10</span>
            </div>
          </div>

          {/* Order CTA */}
          <div className="studio-cta-box">
            <div className="studio-price-row">
              <div>
                <span className="studio-total-price">${finalPrice.toFixed(2)}</span>
                <span className="studio-bag-size">/ 250g Bespoke Bag</span>
              </div>
              <span className="roast-queue-tag">⚡ Roasted within 24 hours</span>
            </div>

            <button
              className={`btn btn-primary btn-large ${orderAdded ? 'btn-added' : ''}`}
              onClick={handleAddToCart}
            >
              {orderAdded ? (
                <>
                  <CheckIcon size={20} />
                  <span>Custom Blend Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBagIcon size={20} />
                  <span>Order Custom Micro-Roast (${finalPrice.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
