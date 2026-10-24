import React, { useState } from 'react';
import { SparklesIcon, TimerIcon, SlidersIcon, BeanIcon, StarIcon, FlameIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onSelectBean: (beanId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectBean }) => {
  const [selectedHeroRoast, setSelectedHeroRoast] = useState<'Light' | 'Medium' | 'Dark'>('Light');
  const [cupSteamLevel, setCupSteamLevel] = useState<number>(3);

  const heroCoffeeDetails = {
    Light: {
      name: 'El Paraiso Geisha Reserve',
      origin: 'Huila, Colombia • 1,950 MASL',
      score: '93.0 SCA',
      notes: ['Lemongrass', 'White Peach', 'Orange Blossom', 'Honey'],
      temp: '93°C',
      ratio: '1:16',
      accentColor: '#f4a261',
      id: 'colombia-huila-geisha'
    },
    Medium: {
      name: 'Yemen Mocha Matari Ancient',
      origin: 'Bani Matar, Sana’a • 2,250 MASL',
      score: '92.0 SCA',
      notes: ['Dried Fig', 'Dark Cocoa', 'Cinnamon', 'Molasses'],
      temp: '91°C',
      ratio: '1:15',
      accentColor: '#9e2a2b',
      id: 'yemen-mocha-matari'
    },
    Dark: {
      name: 'Gayo Mountain Triple-Pick',
      origin: 'Aceh, Sumatra • 1,500 MASL',
      score: '88.5 SCA',
      notes: ['Cacao Nibs', 'Cedar Wood', 'Black Cardamom', 'Molasses'],
      temp: '90°C',
      ratio: '1:14',
      accentColor: '#355070',
      id: 'sumatra-mandheling-triple'
    }
  };

  const current = heroCoffeeDetails[selectedHeroRoast];

  const handleRoastChange = (roast: 'Light' | 'Medium' | 'Dark') => {
    sound.playClick();
    setSelectedHeroRoast(roast);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <SparklesIcon size={14} color="#f4a261" />
            <span>SCA CERTIFIED MICRO-LOT SPECIALTY COFFEE</span>
          </div>

          <h1 className="hero-title">
            The Science & Art of <span className="highlight-text">Exceptional Coffee</span>
          </h1>

          <p className="hero-description">
            Immerse yourself in artisanal single-origin coffees, calculate precision brew ratios,
            time your extraction with real-time audio guidance, and craft your bespoke roasted micro-blend.
          </p>

          {/* Interactive Hero Quick Tabs */}
          <div className="hero-interactive-controls">
            <div className="control-label">
              <span>EXPLORE HARVEST SPECTRUM:</span>
            </div>
            <div className="roast-pill-group">
              {(['Light', 'Medium', 'Dark'] as const).map((r) => (
                <button
                  key={r}
                  className={`roast-pill-btn ${selectedHeroRoast === r ? 'active' : ''}`}
                  onClick={() => handleRoastChange(r)}
                >
                  <FlameIcon size={14} />
                  <span>{r} Roast Profile</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              className="btn btn-primary btn-glow"
              onClick={() => { sound.playClick(); onNavigate('brew-lab'); }}
            >
              <TimerIcon size={18} />
              <span>Launch Brew Master Lab</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => { sound.playClick(); onNavigate('blend-studio'); }}
            >
              <SlidersIcon size={18} />
              <span>Craft Custom Blend</span>
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => { sound.playClick(); onNavigate('cup-quiz'); }}
            >
              <span>🎯 Take Sensory Quiz</span>
            </button>
          </div>

          {/* Micro Stats Bar */}
          <div className="hero-stats-grid">
            <div className="stat-card">
              <div className="stat-number">93.0</div>
              <div className="stat-label">Peak SCA Cupping Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2,250m</div>
              <div className="stat-label">Max Volcanic Elevation</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Direct Ethical Farm Trade</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D/Sensory Coffee Card */}
        <div className="hero-visual">
          <div className="sensory-card-wrapper">
            <div className="sensory-card" style={{ borderColor: current.accentColor }}>
              {/* Card Header */}
              <div className="card-top-bar">
                <div className="score-badge">
                  <StarIcon size={14} color="#f4a261" />
                  <span>{current.score}</span>
                </div>
                <div className="live-status">
                  <span className="pulse-dot"></span>
                  <span>CURRENT ROAST PROFILE</span>
                </div>
              </div>

              {/* Animated Interactive Coffee Cup Graphic */}
              <div 
                className="interactive-cup-display"
                onClick={() => {
                  sound.playPour();
                  setCupSteamLevel((prev) => (prev % 5) + 1);
                }}
                title="Click cup to pour aroma steam!"
              >
                <div className="cup-outer">
                  <div className="cup-steam-box">
                    {Array.from({ length: cupSteamLevel }).map((_, i) => (
                      <span key={i} className={`steam-particle steam-p-${i + 1}`} />
                    ))}
                  </div>
                  <div className="cup-body">
                    <div className="cup-liquid" style={{ background: `linear-gradient(180deg, ${current.accentColor}dd, #1a0f0a)` }}>
                      <div className="cup-crema-ring"></div>
                      <div className="cup-heart-art">☕</div>
                    </div>
                  </div>
                  <div className="cup-saucer"></div>
                </div>
                <span className="cup-hint">✨ Click cup for aroma release</span>
              </div>

              {/* Bean Details */}
              <div className="card-bean-info">
                <span className="bean-origin-tag">{current.origin}</span>
                <h3 className="bean-name-title">{current.name}</h3>

                <div className="tasting-notes-strip">
                  {current.notes.map((note, idx) => (
                    <span key={idx} className="note-chip">
                      {note}
                    </span>
                  ))}
                </div>

                <div className="param-metrics">
                  <div className="param-item">
                    <span className="p-label">Optimal Temp</span>
                    <span className="p-val">{current.temp}</span>
                  </div>
                  <div className="param-item">
                    <span className="p-label">Dial-in Ratio</span>
                    <span className="p-val">{current.ratio}</span>
                  </div>
                  <div className="param-item">
                    <span className="p-label">Roast Date</span>
                    <span className="p-val">Roaster Fresh</span>
                  </div>
                </div>

                {/* Direct Action Button on Card */}
                <div className="card-action-row">
                  <button
                    className="card-brew-btn"
                    onClick={() => {
                      sound.playClick();
                      onSelectBean(current.id);
                      onNavigate('brew-lab');
                    }}
                  >
                    <BeanIcon size={16} />
                    <span>Dial-in this Bean</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
