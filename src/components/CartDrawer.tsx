import React, { useEffect } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  currencySymbol: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currencySymbol,
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-300">
      {/* Scrim Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F0F10]/50 backdrop-blur-[8px] transition-opacity cursor-pointer"
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-surface border-l border-outline-variant flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out z-10">
        {/* Drawer Header */}
        <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[20px] text-primary">shopping_bag</span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary tracking-tight">
              YOUR BAG ({totalItemCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-on-surface-variant hover:text-primary p-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Bar */}
        <div className="px-6 py-3.5 bg-surface-container border-b border-outline-variant">
          <div className="flex justify-between items-center mb-1.5 font-label-caps text-label-caps">
            <span className="text-primary font-bold">
              {amountToFreeShipping === 0
                ? 'FREE EXPRESS SHIPPING UNLOCKED'
                : `ADD ${currencySymbol}${amountToFreeShipping.toFixed(0)} FOR FREE EXPRESS SHIPPING`}
            </span>
            <span className="text-secondary font-mono">
              {currencySymbol}{subtotal.toFixed(0)} / {currencySymbol}{freeShippingThreshold}
            </span>
          </div>
          <div className="w-full bg-outline-variant h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="font-caption text-caption text-secondary mt-1">
            {amountToFreeShipping === 0
              ? 'You are $0 away from Free Express Delivery!'
              : 'Complimentary carbon-neutral DHL Worldwide courier on orders over $250.'}
          </p>
        </div>

        {/* Cart Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline mb-3">inventory_2</span>
              <h4 className="font-headline-sm text-headline-sm uppercase text-primary">YOUR CART IS EMPTY</h4>
              <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-xs">
                Explore our foundational collections and select your engineered pieces.
              </p>
              <button
                onClick={onClose}
                className="mt-6 border border-primary px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                DISCOVER GARMENTS
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 border-b border-outline-variant/60 pb-6">
                <div className="w-20 h-24 bg-surface-container flex-shrink-0 border border-outline-variant overflow-hidden">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-body-md text-body-md font-semibold text-primary uppercase leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                        className="text-secondary hover:text-primary p-0.5 cursor-pointer transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                    <p className="font-caption text-caption text-secondary mt-0.5">
                      {item.selectedColor} / Size {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {/* Monospaced size/qty box */}
                    <div className="flex items-center border border-outline-variant bg-surface">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs hover:bg-surface-container transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-body-md text-body-md font-semibold text-primary font-mono">
                      {currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-outline-variant bg-surface-container-low space-y-4">
            <div className="space-y-1.5 font-body-sm text-body-sm">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span className="text-primary font-medium font-mono">
                  {currencySymbol}{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Express Delivery</span>
                <span className="text-primary font-medium">
                  {amountToFreeShipping === 0 ? 'Free' : `${currencySymbol}15.00`}
                </span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Estimated Taxes</span>
                <span className="text-primary font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-base pt-2 border-t border-outline-variant">
                <span>Total</span>
                <span className="font-mono">
                  {currencySymbol}
                  {(subtotal + (amountToFreeShipping === 0 ? 0 : 15)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-primary text-on-primary py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#262627] transition-colors cursor-pointer font-bold active:scale-[0.99]"
            >
              PROCEED TO CHECKOUT
            </button>
            <p className="font-caption text-caption text-center text-secondary">
              Complimentary carbon-neutral DHL shipping &amp; 30-day atelier returns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
