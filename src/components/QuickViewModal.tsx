import React, { useState } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  currencySymbol: string;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onViewDetails,
  currencySymbol,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const activeColor = selectedColor || product.colors[0]?.name || 'Standard';
  const activeSize = selectedSize || product.sizes[0] || 'M';

  const handleAdd = () => {
    onAddToCart(product, activeSize, activeColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-3xl border border-outline-variant shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          aria-label="Close preview"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-[3/4] bg-surface-container overflow-hidden border-b md:border-b-0 md:border-r border-outline-variant">
            <img
              src={product.primaryImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-caps text-label-caps uppercase tracking-widest border border-outline-variant">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right: Info and Quick Add Options */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">
                {product.category} • {product.gender || 'Unisex'}
              </span>
              <h3 className="font-headline-sm text-headline-sm uppercase text-primary tracking-tight mt-1">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display-hero text-xl font-bold text-primary font-mono">
                  {currencySymbol}{product.price.toFixed(2)}
                </span>
                <span className="font-caption text-caption text-secondary uppercase">VAT Included</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 line-clamp-3">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mt-4">
                <span className="font-label-caps text-label-caps uppercase text-primary font-semibold block mb-2">
                  Color: <span className="text-secondary font-normal">{activeColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                        activeColor === c.name ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-outline-variant'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-4">
                <span className="font-label-caps text-label-caps uppercase text-primary font-semibold block mb-2">
                  Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 h-9 px-2 text-xs font-label-caps uppercase transition-colors cursor-pointer flex items-center justify-center ${
                        activeSize === s
                          ? 'bg-primary text-on-primary font-bold'
                          : 'border border-outline-variant hover:border-primary text-on-surface'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mt-4">
                <span className="font-label-caps text-label-caps uppercase text-secondary">Quantity:</span>
                <div className="flex items-center border border-outline-variant bg-surface">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-surface-container"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-xs hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-outline-variant/60">
              <button
                onClick={handleAdd}
                className="w-full bg-primary text-on-primary py-3.5 font-label-caps text-label-caps uppercase tracking-widest font-bold hover:bg-[#262627] transition-colors cursor-pointer"
              >
                Add To Bag — {currencySymbol}{(product.price * quantity).toFixed(2)}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewDetails(product);
                }}
                className="w-full border border-outline-variant py-2.5 font-label-caps text-label-caps uppercase tracking-wider text-primary hover:border-primary transition-colors cursor-pointer"
              >
                View Complete Archive Specs →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
