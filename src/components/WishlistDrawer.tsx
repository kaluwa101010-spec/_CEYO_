import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  currencySymbol: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  currencySymbol,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 transition-opacity duration-300">
      <div onClick={onClose} className="absolute inset-0 bg-[#0F0F10]/50 backdrop-blur-[8px]" />
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-surface border-l border-outline-variant flex flex-col justify-between shadow-2xl z-10">
        <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[20px] text-primary">favorite</span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary tracking-tight">
              SAVED PIECES ({wishlist.length})
            </h3>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary p-1 cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">favorite_border</span>
              <h4 className="font-headline-sm text-headline-sm uppercase text-primary">NO SAVED PIECES</h4>
              <p className="font-body-sm text-body-sm text-secondary mt-1">
                Save foundational garments from our archive for future reference.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="flex gap-4 border-b border-outline-variant/60 pb-4">
                <div className="w-16 h-20 bg-surface-container overflow-hidden border border-outline-variant shrink-0">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-body-sm font-semibold text-primary uppercase line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="font-caption text-secondary">{product.subtitle}</p>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="text-secondary hover:text-primary p-0.5"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-body-sm font-bold text-primary font-mono">
                      {currencySymbol}{product.price}
                    </span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider hover:bg-[#262627]"
                    >
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-outline-variant bg-surface-container-low text-center">
          <p className="font-caption text-caption text-secondary">
            Saved items remain in your browser session memory.
          </p>
        </div>
      </div>
    </div>
  );
};
