import React, { useState } from 'react';
import { BeanIcon, SparklesIcon, CheckIcon } from './CoffeeIcons';
import { sound } from '../utils/audio';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    sound.playSuccess();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Newsletter Card */}
        <div className="footer-newsletter-card">
          <div className="nl-text">
            <div className="nl-badge">
              <SparklesIcon size={14} color="#f4a261" />
              <span>THE COFFEE ALCHEMIST DISPATCH</span>
            </div>
            <h3 className="nl-title">First Access to 90+ SCA Micro-Lots</h3>
            <p className="nl-desc">
              Subscribe to receive cupping notes, farm harvest reports, and private reserve Geisha drops before public release.
            </p>
          </div>

          <div className="nl-form-col">
            {subscribed ? (
              <div className="nl-success-box">
                <CheckIcon size={20} color="#52b788" />
                <span>You're on the VIP Roastery Cupping List! Check your inbox for 10% off code.</span>
              </div>
            ) : (
              <form className="nl-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nl-input"
                  required
                />
                <button type="submit" className="btn btn-primary btn-subscribe">
                  Join Reserve
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-columns-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <BeanIcon size={24} color="#d4a373" />
              <span className="brand-title">AURA SPECIALTY ATELIER</span>
            </div>
            <p className="brand-statement">
              Dedicated to the relentless pursuit of coffee perfection. Sourcing exclusive single-origin
              micro-lots through direct farmer relationships and profiling each harvest on custom drum roasters.
            </p>
            <div className="roastery-location">
              📍 Micro-Roastery & Cupping Lab • Pacific NW & High Sierra
            </div>
          </div>

          {/* Interactive Navigation */}
          <div className="footer-col">
            <h4 className="col-heading">Interactive Studios</h4>
            <ul className="footer-links">
              <li>
                <button className="footer-link-btn" onClick={() => { sound.playClick(); onNavigate('brew-lab'); }}>
                  🧪 Precision Brew Master Lab
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => { sound.playClick(); onNavigate('origin-vault'); }}>
                  🗺️ Sensory Terroir & Origin Vault
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => { sound.playClick(); onNavigate('blend-studio'); }}>
                  🎨 Custom Roast & Blend Studio
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => { sound.playClick(); onNavigate('latte-lab'); }}>
                  🥛 Espresso Extraction & Latte Art
                </button>
              </li>
              <li>
                <button className="footer-link-btn" onClick={() => { sound.playClick(); onNavigate('cup-quiz'); }}>
                  🎯 Sensory Palate Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Specialty Coffee Education */}
          <div className="footer-col">
            <h4 className="col-heading">Sensory Education</h4>
            <ul className="footer-links static-links">
              <li><span>SCA 100-Point Cupping Protocol</span></li>
              <li><span>Anaerobic Thermal Shock Processing</span></li>
              <li><span>Total Dissolved Solids (TDS) Science</span></li>
              <li><span>Water Mineral Chemistry (GH / KH)</span></li>
              <li><span>Direct Trade Traceability Report</span></li>
            </ul>
          </div>

          {/* Roastery Standards */}
          <div className="footer-col">
            <h4 className="col-heading">Ethical Standards</h4>
            <div className="ethics-badges">
              <div className="e-badge">🌱 100% Direct Farmer Trade</div>
              <div className="e-badge">☀️ Volcanic High-Altitude Terroir</div>
              <div className="e-badge">♻️ 100% Biodegradable Valve Bags</div>
              <div className="e-badge">☕ Roasted Fresh to Order Daily</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="copy-text">
            © {new Date().getFullYear()} AURA Specialty Coffee Atelier & Lab. All rights reserved.
          </div>
          <div className="bottom-tags">
            <span>Specialty Coffee Association Member</span>
            <span>•</span>
            <span>Crafted with Precision & Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
