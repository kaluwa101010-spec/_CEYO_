import React, { useState } from 'react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'tier'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md">
      <div className="bg-surface-container-lowest w-full max-w-xl border border-outline-variant shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-outline-variant bg-surface-container-low">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary">
              Atelier Client Portal
            </span>
            <h3 className="font-headline-sm text-headline-sm uppercase text-primary">
              Kenzo Takahashi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-outline-variant text-xs font-label-caps uppercase tracking-wider bg-surface">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'border-primary text-primary font-bold' : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            Client Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'border-primary text-primary font-bold' : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            Archive Orders (2)
          </button>
          <button
            onClick={() => setActiveTab('tier')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tier' ? 'border-primary text-primary font-bold' : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            VIP Privilege
          </button>
        </div>

        <div className="p-6 space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-3 font-body-sm text-body-sm text-on-surface">
              <div className="flex justify-between py-2 border-b border-outline-variant/60">
                <span className="text-secondary">Email</span>
                <span className="font-medium text-primary">kenzo.t@atelier-avant.com</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/60">
                <span className="text-secondary">Shipping Residence</span>
                <span className="font-medium text-primary text-right">742 Evergreen Terrace, New York, NY 10001</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/60">
                <span className="text-secondary">Default Size Metric</span>
                <span className="font-medium text-primary">Large / 32 Waist</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-secondary">Concierge Representative</span>
                <span className="font-medium text-primary">Clara V. (Paris Atelier)</span>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="p-3 border border-outline-variant/80 bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-secondary">ORDER #CY-89421</span>
                  <p className="font-body-sm font-semibold text-primary">Minimal Wool Overcoat — Pitch Black</p>
                  <p className="font-caption text-secondary">Delivered March 14, 2026 • DHL Express</p>
                </div>
                <span className="font-body-sm font-bold text-primary">$480.00</span>
              </div>
              <div className="p-3 border border-outline-variant/80 bg-surface-container-low flex justify-between items-center">
                <div>
                  <span className="font-label-caps text-label-caps uppercase text-secondary">ORDER #CY-84192</span>
                  <p className="font-body-sm font-semibold text-primary">Classic Selvedge Denim Jacket</p>
                  <p className="font-caption text-secondary">Delivered January 28, 2026 • DHL Express</p>
                </div>
                <span className="font-body-sm font-bold text-primary">$260.00</span>
              </div>
            </div>
          )}

          {activeTab === 'tier' && (
            <div className="space-y-3 text-center py-4">
              <span className="inline-block px-3 py-1 bg-surface-container border border-primary text-primary font-label-caps text-label-caps uppercase tracking-widest">
                Tier 03 Atelier Patron
              </span>
              <h4 className="font-headline-sm uppercase text-primary mt-2">Private Studio Invitation</h4>
              <p className="font-body-sm text-body-sm text-secondary max-w-sm mx-auto">
                Your commissions exceed $740. You have unlocked 48-hour advance access to Drop 05 and private showroom viewings in Paris and Tokyo.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-outline-variant bg-surface-container-low flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest font-bold hover:bg-[#262627]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
