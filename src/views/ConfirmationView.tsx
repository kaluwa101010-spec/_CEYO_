import React from 'react';
import { OrderConfirmationData, ScreenType } from '../types';

interface ConfirmationViewProps {
  orderData: OrderConfirmationData | null;
  onNavigate: (screen: ScreenType) => void;
  currencySymbol: string;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  orderData,
  onNavigate,
  currencySymbol,
}) => {
  if (!orderData) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-headline-sm uppercase text-primary">No Recent Order Found</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-6 border border-primary px-8 py-3 font-label-caps uppercase text-xs"
        >
          Return to Atelier Archive
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen py-space-2xl px-gutter md:px-margin-tablet lg:px-margin-desktop">
      <div className="max-w-3xl mx-auto border border-outline-variant bg-surface-container-lowest p-6 sm:p-10 shadow-2xl">
        {/* Top Stamp */}
        <div className="text-center pb-8 border-b border-outline-variant">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container border border-primary mb-4">
            <span className="material-symbols-outlined text-3xl text-primary">check</span>
          </div>
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block mb-1">
            ATELIER COMMISSION CONFIRMED
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg uppercase text-primary tracking-tight">
            THANK YOU, {orderData.customerName.toUpperCase()}.
          </h1>
          <p className="font-body-md text-secondary mt-2">
            Your archive reservation has been logged into our Paris and Tokyo logistics ledger.
          </p>
          <div className="mt-4 inline-block px-4 py-1.5 bg-surface-container-low border border-outline-variant font-mono text-sm text-primary font-bold">
            REFERENCE: {orderData.orderNumber}
          </div>
        </div>

        {/* Dispatch Coordinates & Status */}
        <div className="py-6 border-b border-outline-variant grid grid-cols-1 sm:grid-cols-3 gap-6 font-body-sm text-body-sm">
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary block mb-1">
              ESTIMATED DISPATCH
            </span>
            <p className="font-semibold text-primary">Within 24 Hours</p>
            <p className="font-caption text-secondary">DHL Worldwide Carbon-Neutral</p>
          </div>
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary block mb-1">
              DELIVERY RESIDENCE
            </span>
            <p className="font-semibold text-primary">{orderData.customerName}</p>
            <p className="font-caption text-secondary">{orderData.address}</p>
          </div>
          <div>
            <span className="font-label-caps text-label-caps uppercase text-secondary block mb-1">
              PAYMENT AUTHORIZATION
            </span>
            <p className="font-semibold text-primary">{orderData.paymentMethod}</p>
            <p className="font-caption text-secondary">Verification token 256-SSL</p>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="py-6 border-b border-outline-variant">
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold mb-4">
            COMMISSIONED GARMENTS ({orderData.items.reduce((s, i) => s + i.quantity, 0)})
          </h3>
          <div className="divide-y divide-outline-variant/60">
            {orderData.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-surface-container shrink-0 overflow-hidden border border-outline-variant">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-body-sm font-semibold text-primary uppercase">{item.product.name}</h4>
                    <p className="font-caption text-secondary">
                      Size: {item.selectedSize} &nbsp;|&nbsp; Color: {item.selectedColor} &nbsp;|&nbsp; Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-body-sm font-bold text-primary font-mono">
                  {currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Receipt Totals */}
        <div className="py-4 space-y-2 font-body-sm text-on-surface-variant border-b border-outline-variant">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono">{currencySymbol}{orderData.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{orderData.shipping === 0 ? 'Complimentary ($0.00)' : `${currencySymbol}${orderData.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Taxes</span>
            <span className="font-mono">{currencySymbol}{orderData.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-primary font-bold text-base pt-2 border-t border-outline-variant">
            <span>Total Authorized</span>
            <span className="font-mono">{currencySymbol}{orderData.total.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest font-bold hover:bg-[#262627] transition-colors cursor-pointer"
          >
            Explore Next Collection Drop
          </button>
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3.5 border border-outline-variant hover:border-primary text-primary font-label-caps text-label-caps uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
