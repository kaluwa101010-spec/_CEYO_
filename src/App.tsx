/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, ScreenType, OrderConfirmationData } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductView } from './views/ProductView';
import { CheckoutView } from './views/CheckoutView';
import { ConfirmationView } from './views/ConfirmationView';

export default function App() {
  // Screen routing
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [shopCategory, setShopCategory] = useState<string>('All');

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'JPY' ? '¥' : '$';

  // Initial cart matching Screen 4 (Signature Hoodie + Essential Cargo Pants)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-hoodie-1',
      productId: 'ceyo-signature-hoodie',
      product: PRODUCTS[0],
      selectedColor: 'Washed Charcoal',
      selectedSize: 'L',
      quantity: 1,
    },
    {
      id: 'initial-cargo-2',
      productId: 'essential-cargo-pants',
      product: PRODUCTS[2],
      selectedColor: 'Matte Black',
      selectedSize: '32',
      quantity: 1,
    },
  ]);

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>([
    PRODUCTS[1], // Oversized Essential Tee
    PRODUCTS[3], // Classic Denim Jacket
  ]);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Completed Order
  const [lastOrder, setLastOrder] = useState<OrderConfirmationData | null>(null);

  // Global ⌘K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size = 'M', color = '', quantity = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.sizes[0] || 'M';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `${product.id}-${chosenSize}-${chosenColor}-${Date.now()}`,
            productId: product.id,
            product,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
            quantity,
          },
        ];
      }
    });

    setToastMessage(`Added ${quantity} × ${product.name} (${chosenSize}) to your bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setToastMessage('Item removed from your bag');
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      setToastMessage(`Removed ${product.name} from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      setToastMessage(`Saved ${product.name} to wishlist`);
    }
  };

  // Navigation helpers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNavigate = (category: string) => {
    setShopCategory(category);
    setCurrentScreen('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (orderData: OrderConfirmationData) => {
    setLastOrder(orderData);
    setCartItems([]);
    setCurrentScreen('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-['Geist'] selection:bg-primary selection:text-on-primary">
      {/* Shared Header (rendered on all screens except custom checkout header) */}
      {currentScreen !== 'checkout' ? (
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onCategoryNavigate={handleCategoryNavigate}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />
      ) : (
        /* Focused Transactional Checkout Header */
        <header className="w-full bg-surface-container-lowest sticky top-0 z-40 border-b border-outline-variant">
          <div className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop h-20 flex items-center justify-between">
            <div className="flex items-center gap-space-lg">
              <button
                onClick={() => handleNavigate('shop')}
                className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-body-md">arrow_back</span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest hidden sm:inline font-bold">
                  Return to Shopping
                </span>
              </button>
            </div>
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center justify-center focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-display-hero text-2xl font-extrabold tracking-widest text-primary uppercase">
                  CEYO
                </span>
                <span className="text-outline-variant font-light text-lg">|</span>
                <span className="font-mono text-xs tracking-[0.25em] text-on-surface-variant uppercase pt-0.5">
                  STUDIO
                </span>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-surface-container-low border border-outline-variant rounded-full text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
                <span>256-Bit SSL</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span className="hidden md:inline">Guaranteed Authentic</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Screen Views */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeView
            products={PRODUCTS}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(p) => setQuickViewProduct(p)}
            currencySymbol={currencySymbol}
          />
        )}

        {currentScreen === 'shop' && (
          <ShopView
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            currencySymbol={currencySymbol}
            initialCategory={shopCategory}
          />
        )}

        {currentScreen === 'product' && (
          <ProductView
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            isWishlisted={wishlist.some((p) => p.id === selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            currencySymbol={currencySymbol}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutView
            items={cartItems}
            allProducts={PRODUCTS}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onAddProductToCart={(p) => handleAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1)}
            onNavigate={handleNavigate}
            onOrderCompleted={handleOrderCompleted}
            currencySymbol={currencySymbol}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationView
            orderData={lastOrder}
            onNavigate={handleNavigate}
            currencySymbol={currencySymbol}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => handleNavigate('checkout')}
        currencySymbol={currencySymbol}
      />

      {/* ⌘K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onQuickAdd={(p) => handleAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1)}
        currencySymbol={currencySymbol}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Quick View / Tailor Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleSelectProduct}
        currencySymbol={currencySymbol}
      />

      {/* Saved / Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1)}
        currencySymbol={currencySymbol}
      />

      {/* VIP Client Account Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Global Toast Notifications */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}
