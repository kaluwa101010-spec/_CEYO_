import React, { useState } from 'react';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  currency: string;
  onCurrencyChange: (currency: 'USD' | 'EUR' | 'GBP' | 'JPY') => void;
  onOpenSizeGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenSizeGuide,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-surface-container-lowest dark:bg-primary-container text-primary dark:text-inverse-primary border-t border-outline-variant dark:border-outline">
      <div className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-2xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-gutter">
        {/* Brand & Mission Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between pr-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display-hero text-2xl font-extrabold tracking-widest text-primary uppercase">
                CEYO
              </span>
              <span className="text-outline-variant font-light text-xl">|</span>
              <span className="font-mono text-xs tracking-[0.25em] text-on-surface-variant font-normal uppercase">
                STUDIO
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mb-6 leading-relaxed">
              Architectural streetwear atelier. Designed between Tokyo and Paris. Rooted in structural balance, heavyweight custom textiles, and pure negative space.
            </p>
          </div>

          {/* Regional Currency Selector */}
          <div className="flex items-center space-x-3 pt-2">
            <span className="font-label-caps text-label-caps uppercase text-secondary">REGION / CURRENCY:</span>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as 'USD' | 'EUR' | 'GBP' | 'JPY')}
              aria-label="Regional Currency Selector"
              className="bg-surface-container-low border border-outline-variant text-primary font-caption text-caption py-1.5 px-3 rounded-none focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="USD">USD ($) — United States</option>
              <option value="EUR">EUR (€) — European Union</option>
              <option value="GBP">GBP (£) — United Kingdom</option>
              <option value="JPY">JPY (¥) — Japan</option>
            </select>
          </div>
        </div>

        {/* Links: Collections (2 cols) */}
        <div className="lg:col-span-2">
          <h4 className="font-headline-sm text-headline-sm uppercase text-primary mb-4">COLLECTIONS</h4>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer"
              >
                Lookbook Archive
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer"
              >
                Autumn / Winter &apos;25
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer"
              >
                Core Disciplines
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer"
              >
                Limited Editions
              </button>
            </li>
          </ul>
        </div>

        {/* Links: Client Service (3 cols) */}
        <div className="lg:col-span-3">
          <h4 className="font-headline-sm text-headline-sm uppercase text-primary mb-4">CLIENT SERVICE</h4>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => onNavigate('checkout')}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer"
              >
                Complimentary Shipping &amp; Returns
              </button>
            </li>
            <li>
              <button
                onClick={onOpenSizeGuide}
                className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-sm text-body-sm cursor-pointer underline underline-offset-2"
              >
                Atelier Size Guide &amp; Metrics
              </button>
            </li>
            <li>
              <span className="text-on-surface-variant font-body-sm text-body-sm">
                Garment Care &amp; Repair Concierge
              </span>
            </li>
            <li>
              <span className="text-on-surface-variant font-body-sm text-body-sm">
                Legal &amp; Privacy Protections
              </span>
            </li>
          </ul>
        </div>

        {/* Ateliers Coordinates (2 cols) */}
        <div className="lg:col-span-2">
          <h4 className="font-headline-sm text-headline-sm uppercase text-primary mb-4">ATELIERS</h4>
          <div className="space-y-4 font-body-sm text-body-sm text-on-surface-variant">
            <div>
              <p className="font-medium text-primary">PARIS</p>
              <p>18 Rue du Bourg-Tibourg</p>
              <p>75004 Paris, France</p>
            </div>
            <div>
              <p className="font-medium text-primary">TOKYO</p>
              <p>5-7-22 Minamiaoyama</p>
              <p>Minato-ku, Tokyo 107-0062</p>
            </div>
          </div>
        </div>

        {/* Newsletter Inline Box */}
        <div className="col-span-full border-t border-outline-variant/60 pt-8 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
              ATELIER DISPATCH
            </span>
            <p className="font-body-md text-body-md text-primary font-medium mt-1">
              Receive confidential invitations to seasonal capsule drops and Tokyo studio showings.
            </p>
          </div>
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-3 bg-surface-container border border-primary text-primary font-body-sm">
                ✓ Thank you. You are registered for the CEYO confidential atelier archive.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  required
                  className="flex-1 bg-surface-container-lowest border border-primary rounded-none px-4 py-3 font-body-sm text-primary placeholder:text-secondary focus:ring-0 focus:border-primary outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#262627] transition-colors cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="col-span-full border-t border-outline-variant pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-secondary">
          <p className="font-caption text-caption uppercase">
            © 2025 CEYO CLOTHING. ALL RIGHTS RESERVED. ARCHITECTURAL STREETWEAR ATELIER.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-caption text-caption uppercase">
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
