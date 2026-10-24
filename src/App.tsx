import { useState, useEffect } from 'react';
import type { CoffeeBean, CartItem, RoastLevel } from './types/coffee';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrewLab } from './components/BrewLab';
import { OriginVault } from './components/OriginVault';
import { BlendStudio } from './components/BlendStudio';
import { LatteLab } from './components/LatteLab';
import { CupFinderQuiz } from './components/CupFinderQuiz';
import { ShopCatalog } from './components/ShopCatalog';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { BeanModal } from './components/BeanModal';
import { Footer } from './components/Footer';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('origin-vault');
  const [selectedBeanForBrew, setSelectedBeanForBrew] = useState<string>('ethiopia-yirgacheffe');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      beanId: 'colombia-huila-geisha',
      name: 'El Paraiso Geisha Reserve',
      origin: 'Huila, Colombia',
      roastLevel: 'Light',
      grind: 'Whole Bean (Recommended)',
      weight: '250g',
      price: 34.00,
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>([
    'colombia-huila-geisha',
    'ethiopia-yirgacheffe'
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'warm'>('dark');
  const [inspectingBean, setInspectingBean] = useState<CoffeeBean | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme to root class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (bean: CoffeeBean, grind: string = 'Whole Bean') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.beanId === bean.id && item.grind === grind);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          beanId: bean.id,
          name: bean.name,
          origin: `${bean.region}, ${bean.country}`,
          roastLevel: bean.roastLevel,
          grind,
          weight: bean.weight,
          price: bean.price,
          quantity: 1,
        }
      ];
    });
    showToast(`✨ Added "${bean.name}" to your roastery bag!`);
  };

  const handleAddCustomBlendToCart = (blend: {
    name: string;
    description: string;
    components: string;
    roast: RoastLevel;
    packageColor: string;
    grind: string;
    price: number;
  }) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        isCustomBlend: true,
        name: blend.name,
        roastLevel: blend.roast,
        grind: blend.grind,
        weight: '250g',
        price: blend.price,
        quantity: 1,
        customDetails: {
          components: blend.components,
          packageColor: blend.packageColor,
        }
      }
    ]);
    showToast(`🎉 Custom Blend "${blend.name}" added to bag!`);
  };

  const handleAddFlightToCart = (flight: {
    name: string;
    beans: string[];
    price: number;
  }) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `flight-${Date.now()}`,
        isCustomBlend: true,
        name: flight.name,
        grind: 'Tasting Vials (Whole Bean)',
        weight: '3 x 100g',
        price: flight.price,
        quantity: 1,
        customDetails: {
          components: flight.beans.join(' • '),
          packageColor: 'Specialty Flight Box',
        }
      }
    ]);
    showToast(`📦 Added 3-Origin Tasting Flight to your bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (beanId: string) => {
    setWishlist((prev) => {
      if (prev.includes(beanId)) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== beanId);
      } else {
        showToast('❤️ Added to your saved coffees');
        return [...prev, beanId];
      }
    });
  };

  // Navigation handlers
  const handleNavigateBrew = (beanId: string) => {
    setSelectedBeanForBrew(beanId);
    setActiveTab('brew-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`app-shell theme-${theme}`}>
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="toast-notification-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main App Workspace */}
      <main className="main-content">
        {/* Hero Section displayed on top */}
        <Hero
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 500, behavior: 'smooth' });
          }}
          onSelectBean={(beanId) => setSelectedBeanForBrew(beanId)}
        />

        {/* Dynamic Interactive Studio Tabs */}
        <div className="interactive-tabs-container">
          {activeTab === 'brew-lab' && (
            <BrewLab
              selectedBeanId={selectedBeanForBrew}
              onSelectBean={(id) => setSelectedBeanForBrew(id)}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'origin-vault' && (
            <OriginVault
              onNavigateBrew={handleNavigateBrew}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          )}

          {activeTab === 'blend-studio' && (
            <BlendStudio
              onAddCustomBlendToCart={handleAddCustomBlendToCart}
            />
          )}

          {activeTab === 'latte-lab' && (
            <LatteLab />
          )}

          {activeTab === 'cup-quiz' && (
            <CupFinderQuiz
              onNavigateBrew={handleNavigateBrew}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'shop' && (
            <ShopCatalog
              onAddToCart={handleAddToCart}
              onAddCustomFlightToCart={handleAddFlightToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onInspectBean={(b) => setInspectingBean(b)}
            />
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFavorite={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onNavigateBrew={handleNavigateBrew}
      />

      {/* Detailed Bean Inspection Modal */}
      {inspectingBean && (
        <BeanModal
          bean={inspectingBean}
          onClose={() => setInspectingBean(null)}
          onNavigateBrew={handleNavigateBrew}
          onAddToCart={handleAddToCart}
          isFavorite={wishlist.includes(inspectingBean.id)}
          onToggleFavorite={handleToggleWishlist}
        />
      )}

      {/* Site Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 500, behavior: 'smooth' });
      }} />
    </div>
  );
}

export default App;
