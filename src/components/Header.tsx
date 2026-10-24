import React from 'react';
import { 
  BeanIcon, 
  Volume2Icon, 
  VolumeXIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  SparklesIcon, 
  TimerIcon, 
  SlidersIcon, 
  PaletteIcon 
} from './CoffeeIcons';
import { sound } from '../utils/audio';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openWishlist: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  theme: 'dark' | 'warm';
  setTheme: (theme: 'dark' | 'warm') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  isMuted,
  setIsMuted,
  theme,
  setTheme,
}) => {
  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.isMuted = nextMuted;
    if (!nextMuted) {
      sound.playClick();
    }
  };

  const toggleTheme = () => {
    sound.playClick();
    setTheme(theme === 'dark' ? 'warm' : 'dark');
  };

  const handleTabClick = (tabId: string) => {
    sound.playClick();
    setActiveTab(tabId);
  };

  return (
    <header className="site-header">
      {/* Top Banner Ticker */}
      <div className="top-banner">
        <div className="ticker-wrap">
          <span className="ticker-item">✨ Direct Trade 90+ SCA Micro-lots Just Landed</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🚚 Complimentary Roastery Fresh Delivery Over $45</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">☕ Interactive Live Brew Dial-in Active</span>
          <span className="ticker-dot">•</span>
          <span className="ticker-item">🧪 Roasting Profile: Ultra Light to Rich Velvet</span>
        </div>
      </div>

      <div className="header-main">
        <div className="header-container">
          {/* Logo & Brand Identity */}
          <div className="brand-logo" onClick={() => handleTabClick('origin-vault')}>
            <div className="logo-icon-box">
              <BeanIcon size={26} color="#d4a373" />
              <span className="steam-line steam-1"></span>
              <span className="steam-line steam-2"></span>
            </div>
            <div className="brand-text">
              <div className="brand-name">
                <span>AURA</span>
                <span className="brand-tag">SPECIALTY</span>
              </div>
              <div className="brand-sub">COFFEE ATELIER & LAB</div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <nav className="nav-menu">
            <button
              className={`nav-link ${activeTab === 'brew-lab' ? 'active' : ''}`}
              onClick={() => handleTabClick('brew-lab')}
            >
              <TimerIcon size={16} />
              <span>Brew Master Lab</span>
              {activeTab === 'brew-lab' && <span className="tab-indicator" />}
            </button>

            <button
              className={`nav-link ${activeTab === 'origin-vault' ? 'active' : ''}`}
              onClick={() => handleTabClick('origin-vault')}
            >
              <SparklesIcon size={16} />
              <span>Origin Vault</span>
              {activeTab === 'origin-vault' && <span className="tab-indicator" />}
            </button>

            <button
              className={`nav-link ${activeTab === 'blend-studio' ? 'active' : ''}`}
              onClick={() => handleTabClick('blend-studio')}
            >
              <SlidersIcon size={16} />
              <span>Custom Roast Studio</span>
              {activeTab === 'blend-studio' && <span className="tab-indicator" />}
            </button>

            <button
              className={`nav-link ${activeTab === 'latte-lab' ? 'active' : ''}`}
              onClick={() => handleTabClick('latte-lab')}
            >
              <PaletteIcon size={16} />
              <span>Latte & Extraction Lab</span>
              {activeTab === 'latte-lab' && <span className="tab-indicator" />}
            </button>

            <button
              className={`nav-link ${activeTab === 'cup-quiz' ? 'active' : ''}`}
              onClick={() => handleTabClick('cup-quiz')}
            >
              <span>🎯 Cup Matcher Quiz</span>
              {activeTab === 'cup-quiz' && <span className="tab-indicator" />}
            </button>

            <button
              className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`}
              onClick={() => handleTabClick('shop')}
            >
              <span>Roastery Shop</span>
              {activeTab === 'shop' && <span className="tab-indicator" />}
            </button>
          </nav>

          {/* Utility Tools */}
          <div className="header-actions">
            {/* Audio Toggle */}
            <button
              className="action-btn icon-btn"
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              aria-label="Sound Toggle"
            >
              {isMuted ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} color="#f4a261" />}
            </button>

            {/* Theme Toggle */}
            <button
              className="action-btn theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme Mode"
            >
              {theme === 'dark' ? '☕ Espresso Dark' : '🌾 Warm Crema'}
            </button>

            {/* Wishlist Button */}
            <button 
              className="action-btn icon-btn" 
              onClick={() => { sound.playClick(); openWishlist(); }}
              title="Saved Favorites"
            >
              <HeartIcon size={18} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              className="action-btn cart-btn" 
              onClick={() => { sound.playClick(); openCart(); }}
            >
              <ShoppingBagIcon size={18} />
              <span>Bag</span>
              {cartCount > 0 && <span className="badge-count cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
