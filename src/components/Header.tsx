import React from 'react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onCategoryNavigate?: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onCategoryNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  wishlistCount,
  onOpenWishlist,
  onOpenAccount,
}) => {
  return (
    <>
      {/* Top Ticker Banner */}
      <aside className="bg-primary text-on-primary py-2 px-gutter text-center overflow-hidden border-b border-primary-container relative z-40">
        <div className="flex items-center justify-center space-x-6 text-center animate-pulse">
          <p className="font-label-caps text-label-caps tracking-widest uppercase text-xs md:text-sm">
            COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $250 • NEW DROP: AUTUMN/WINTER &apos;25 ARCHIVE AVAILABLE NOW
          </p>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline sticky top-0 z-40">
        <div className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop flex justify-between items-center h-20">
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center focus:outline-none text-left cursor-pointer group"
              aria-label="CEYO CLOTHING Homepage"
            >
              <div className="flex items-center gap-2 tracking-tighter">
                <span className="font-display-hero text-2xl md:text-3xl font-extrabold tracking-widest text-primary uppercase">
                  CEYO
                </span>
                <span className="text-outline-variant font-light text-xl">|</span>
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-on-surface-variant font-normal uppercase pt-0.5">
                  STUDIO
                </span>
              </div>
            </button>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`font-label-caps text-label-caps uppercase tracking-widest pb-1 transition-colors duration-200 cursor-pointer ${
                currentScreen === 'home'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                if (onCategoryNavigate) onCategoryNavigate('All');
                onNavigate('shop');
              }}
              className={`font-label-caps text-label-caps uppercase tracking-widest pb-1 transition-colors duration-200 cursor-pointer ${
                currentScreen === 'shop'
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => {
                if (onCategoryNavigate) onCategoryNavigate('Men');
                onNavigate('shop');
              }}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-widest pb-1 cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => {
                if (onCategoryNavigate) onCategoryNavigate('Women');
                onNavigate('shop');
              }}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-widest pb-1 cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => {
                if (onCategoryNavigate) onCategoryNavigate('New Arrivals');
                onNavigate('shop');
              }}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-widest pb-1 cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-widest pb-1 cursor-pointer"
            >
              Collections
            </button>
          </nav>

          {/* Right: Action Icons & Search */}
          <div className="flex items-center space-x-3 md:space-x-6">
            {/* Search bar with ⌘K shortcut */}
            <button
              onClick={onOpenSearch}
              className="hidden md:flex items-center bg-surface-container-low px-3 py-1.5 border border-outline-variant text-on-surface-variant hover:border-primary transition-colors cursor-pointer"
              aria-label="Search archive"
            >
              <span className="material-symbols-outlined text-[18px] mr-2">search</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mr-4">Search archive...</span>
              <kbd className="font-caption text-caption bg-surface-container px-1.5 py-0.5 border border-outline-variant text-on-surface-variant">⌘K</kbd>
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="md:hidden text-primary hover:opacity-70 transition-opacity p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Link / Trigger */}
            <button
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="text-primary hover:opacity-70 transition-opacity relative p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-primary text-on-primary text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Link */}
            <button
              onClick={onOpenAccount}
              aria-label="Account"
              className="hidden sm:inline-block text-primary hover:opacity-70 transition-opacity p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">person</span>
            </button>

            {/* Interactive Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="text-primary hover:bg-surface-container transition-colors flex items-center space-x-1.5 py-1.5 px-3 border border-primary cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="font-label-caps text-label-caps uppercase font-bold">
                Cart ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
