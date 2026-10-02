import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  currencySymbol: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAdd,
  currencySymbol,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-primary/60 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-3xl border border-outline-variant shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 md:p-6 border-b border-outline-variant flex items-center gap-3 bg-surface-container-low">
          <span className="material-symbols-outlined text-[24px] text-primary">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archive by garment, textile, or silhouette (e.g. Hoodie, Denim, Cargo, 500GSM)..."
            className="flex-1 bg-transparent border-none text-base md:text-lg text-primary placeholder:text-outline focus:ring-0 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-secondary hover:text-primary p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary font-caption text-caption uppercase tracking-wider px-2 py-1 border border-outline-variant"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scroll space-y-4">
          <div className="flex justify-between items-center text-xs font-label-caps uppercase text-secondary">
            <span>{query ? `Results (${filtered.length})` : 'Popular Atelier Curations'}</span>
            <span>Archive 04</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-secondary">
              <p className="font-body-md text-body-md">No archive pieces matching &ldquo;{query}&rdquo;</p>
              <p className="font-caption text-caption mt-1">
                Try searching for &quot;Tee&quot;, &quot;Hoodie&quot;, &quot;Denim&quot;, or &quot;Wool&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 border border-outline-variant/60 hover:border-primary transition-colors bg-surface group cursor-pointer"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="w-16 h-20 bg-surface-container shrink-0 overflow-hidden border border-outline-variant">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-body-sm text-body-sm font-semibold text-primary uppercase line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="font-caption text-caption text-secondary mt-0.5 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-body-sm text-body-sm font-bold text-primary font-mono">
                        {currencySymbol}{product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(product);
                        }}
                        className="px-2 py-1 bg-primary text-on-primary text-[10px] font-label-caps uppercase tracking-wider hover:bg-[#262627] transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
