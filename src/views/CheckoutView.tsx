import React, { useState } from 'react';
import { CartItem, Product, ScreenType, OrderConfirmationData } from '../types';

interface CheckoutViewProps {
  items: CartItem[];
  allProducts: Product[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddProductToCart: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
  onOrderCompleted: (orderData: OrderConfirmationData) => void;
  currencySymbol: string;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  allProducts,
  onUpdateQuantity,
  onRemoveItem,
  onAddProductToCart,
  onNavigate,
  onOrderCompleted,
  currencySymbol,
}) => {
  // Form state pre-populated with realistic atelier client data
  const [formData, setFormData] = useState({
    email: 'kenzo.takahashi@atelier-avant.com',
    keepUpdated: true,
    country: 'United States (USD $)',
    firstName: 'Kenzo',
    lastName: 'Takahashi',
    address: '742 Evergreen Terrace, Atelier Floor',
    apartment: 'Penthouse 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    phone: '+1 (555) 234-5678',
    shippingMethod: 'express', // express | overnight
    paymentMethod: 'card', // card | paypal | klarna
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12 / 28',
    cardCvc: '•••',
    cardName: 'KENZO TAKAHASHI',
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoAppliedMsg, setPromoAppliedMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = formData.shippingMethod === 'overnight' ? 25 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const estimatedTax = taxableSubtotal * 0.08;
  const total = taxableSubtotal + shippingCost + estimatedTax;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'CEYO10' || code === 'ATELIER' || code === 'ARCHIVE10') {
      setDiscountPercent(10);
      setPromoAppliedMsg('10% Inaugural Atelier Privilege discount applied!');
    } else if (code) {
      setDiscountPercent(15);
      setPromoAppliedMsg(`Promo code "${code}" active (15% applied).`);
    }
  };

  const handleFormChange = (field: string, val: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData: OrderConfirmationData = {
      orderNumber: `CY-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      customerName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      address: `${formData.address}, ${formData.apartment ? formData.apartment + ', ' : ''}${formData.city}, ${formData.state}`,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      items: [...items],
      subtotal,
      shipping: shippingCost,
      tax: estimatedTax,
      total,
      paymentMethod:
        formData.paymentMethod === 'card'
          ? 'Credit Card (Ending in 4242)'
          : formData.paymentMethod === 'paypal'
          ? 'PayPal Express'
          : 'Klarna Pay in 4',
    };

    onOrderCompleted(orderData);
  };

  const sockAddOn = allProducts.find((p) => p.id === 'ceyo-heavyweight-socks') || allProducts[allProducts.length - 3];
  const balmAddOn = allProducts.find((p) => p.id === 'leather-care-balm') || allProducts[allProducts.length - 2];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Checkout Stepper Bar */}
      <div className="w-full bg-surface border-b border-outline-variant py-2.5 px-gutter md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between sm:justify-center sm:gap-space-2xl font-label-caps text-label-caps uppercase tracking-widest">
          <button
            onClick={() => onNavigate('shop')}
            className="text-primary font-bold flex items-center gap-1.5 border-b-2 border-primary pb-0.5 cursor-pointer"
          >
            <span className="w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center text-[9px] font-bold">
              1
            </span>
            Cart Review
          </button>
          <span className="text-outline-variant hidden sm:inline">→</span>
          <span className="text-primary font-bold flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center text-[9px] font-bold">
              2
            </span>
            Shipping &amp; Details
          </span>
          <span className="text-outline-variant hidden sm:inline">→</span>
          <span className="text-on-surface-variant flex items-center gap-1.5 opacity-60">
            <span className="w-4 h-4 rounded-full border border-outline flex items-center justify-center text-[9px]">
              3
            </span>
            Payment &amp; Confirmation
          </span>
        </div>
      </div>

      {/* Main Checkout View Container */}
      <main className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-gutter-desktop items-start">
          {/* LEFT COLUMN: Order Items & Checkout Forms (7 Columns) */}
          <section className="lg:col-span-7 flex flex-col gap-space-xl">
            {/* Free Shipping Qualified Banner */}
            <div className="bg-surface-container-low border border-outline-variant p-4 flex items-center justify-between">
              <div className="flex items-center gap-space-sm text-primary">
                <span className="material-symbols-outlined text-headline-sm">local_shipping</span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
                  ✓ Qualified for Free Worldwide Express Delivery
                </span>
              </div>
              <span className="font-caption text-caption text-secondary hidden sm:inline">
                Automatic at checkout
              </span>
            </div>

            {/* Section 1: Cart Items Editorial Review */}
            <div className="border border-outline-variant bg-surface-container-lowest p-space-lg">
              <div className="flex items-center justify-between pb-space-md border-b border-outline-variant">
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                  1. Cart Items Review ({items.reduce((s, i) => s + i.quantity, 0)})
                </h2>
                <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                  Atelier Inventory Reserved
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="font-body-sm text-secondary">Your cart is currently empty.</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="mt-4 px-6 py-2 border border-primary text-primary font-label-caps uppercase text-xs"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-outline-variant">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="py-space-md flex flex-col sm:flex-row gap-space-md items-start sm:items-center justify-between"
                    >
                      <div className="flex gap-space-md items-center">
                        <div className="w-20 h-24 bg-surface-container flex-shrink-0 relative overflow-hidden border border-outline-variant">
                          <img
                            src={item.product.primaryImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-body-md font-bold text-primary uppercase tracking-tight">
                            {item.product.name}
                          </h3>
                          <p className="font-caption text-caption text-on-surface-variant mt-0.5">
                            Size: <span className="text-primary font-medium">{item.selectedSize}</span> &nbsp;|&nbsp; Color:{' '}
                            <span className="text-primary font-medium">{item.selectedColor}</span>
                          </p>
                          <p className="font-label-caps text-label-caps uppercase text-secondary mt-1 tracking-wider">
                            SKU: {item.product.sku}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-space-lg">
                        {/* Qty Selector */}
                        <div className="flex items-center border border-outline-variant bg-surface">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-variant transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[14px]">remove</span>
                          </button>
                          <span className="w-8 text-center font-label-ui text-label-ui text-primary font-semibold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-variant transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="text-right flex items-center sm:flex-col sm:items-end gap-space-md sm:gap-1">
                          <span className="font-headline-sm text-body-md font-bold text-primary tracking-tight font-mono">
                            {currencySymbol}{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            className="text-outline hover:text-error transition-colors flex items-center gap-0.5 cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            <span className="font-label-caps text-label-caps uppercase">Remove</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: Express Checkout Shortcuts & Form */}
            <div className="border border-outline-variant bg-surface-container-lowest p-space-lg">
              <p className="font-label-caps text-label-caps uppercase tracking-widest text-center text-on-surface-variant mb-3 font-semibold">
                Accelerated Express Checkout
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => alert('Apple Pay express authenticated with Apple Touch ID.')}
                  className="h-12 bg-primary text-on-primary font-label-ui text-body-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#262627] transition-colors rounded-none cursor-pointer"
                >
                  <span className="font-bold tracking-tight"> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Shop Pay credentials retrieved.')}
                  className="h-12 bg-[#5A31F4] text-white font-label-ui text-body-sm font-semibold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity rounded-none cursor-pointer"
                >
                  <span className="font-bold tracking-tight">Shop</span>
                  <span className="font-light italic text-surface-variant">Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Google Pay authenticated.')}
                  className="h-12 bg-surface-container-low text-primary border border-outline-variant font-label-ui text-body-sm font-semibold flex items-center justify-center gap-1 hover:bg-surface-variant transition-colors rounded-none cursor-pointer"
                >
                  <span className="text-[#4285F4] font-bold">G</span>
                  <span className="text-primary font-bold">Pay</span>
                </button>
              </div>

              <div className="relative flex py-space-md items-center">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="flex-shrink mx-4 font-label-caps text-label-caps uppercase tracking-widest text-outline">
                  or standard checkout
                </span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmitOrder} className="space-y-space-lg">
                {/* Contact Section */}
                <div>
                  <div className="flex justify-between items-baseline mb-space-sm">
                    <label className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                      2. Contact Information
                    </label>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Atelier Member: <strong className="text-primary font-medium">Kenzo Takahashi</strong>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="Email or mobile phone number"
                      className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary placeholder:text-outline focus:border-primary focus:ring-0 rounded-none transition-colors"
                    />
                  </div>
                  <label className="flex items-center gap-3 mt-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.keepUpdated}
                      onChange={(e) => handleFormChange('keepUpdated', e.target.checked)}
                      className="w-4 h-4 rounded-none border border-primary text-primary focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-body-sm text-body-sm text-on-surface">
                      Keep me updated on exclusive drops, atelier archive access, and seasonal lookbooks
                    </span>
                  </label>
                </div>

                {/* Delivery Address */}
                <div className="pt-space-md border-t border-outline-variant">
                  <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary mb-space-sm">
                    Shipping Destination
                  </h3>
                  <div className="space-y-3">
                    {/* Country */}
                    <div>
                      <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                        Country / Region
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleFormChange('country', e.target.value)}
                        className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none transition-colors cursor-pointer"
                      >
                        <option>United States (USD $)</option>
                        <option>Japan (JPY ¥)</option>
                        <option>France (EUR €)</option>
                        <option>United Kingdom (GBP £)</option>
                        <option>Germany (EUR €)</option>
                        <option>Canada (CAD $)</option>
                      </select>
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => handleFormChange('firstName', e.target.value)}
                          className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                          placeholder="Kenzo"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => handleFormChange('lastName', e.target.value)}
                          className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                          placeholder="Takahashi"
                        />
                      </div>
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => handleFormChange('address', e.target.value)}
                        className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                        placeholder="742 Evergreen Terrace, Atelier Floor"
                      />
                    </div>

                    {/* Apartment / Suite */}
                    <div>
                      <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => handleFormChange('apartment', e.target.value)}
                        className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                        placeholder="Penthouse 4B"
                      />
                    </div>

                    {/* City, State, Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => handleFormChange('city', e.target.value)}
                          className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => handleFormChange('state', e.target.value)}
                          className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                          placeholder="NY"
                        />
                      </div>
                      <div>
                        <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => handleFormChange('postalCode', e.target.value)}
                          className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1">
                        Phone (For Delivery Updates)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        className="w-full h-12 bg-surface border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                        placeholder="+1 (555) 234-5678"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method Selector */}
                <div className="pt-space-md border-t border-outline-variant">
                  <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary mb-space-sm">
                    Shipping Method
                  </h3>
                  <div className="space-y-2">
                    <label
                      onClick={() => handleFormChange('shippingMethod', 'express')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === 'express'
                          ? 'border-2 border-primary bg-surface-container-low'
                          : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingMethod === 'express'}
                          onChange={() => handleFormChange('shippingMethod', 'express')}
                          className="w-4 h-4 text-primary focus:ring-0"
                        />
                        <div>
                          <p className="font-body-md text-body-md font-semibold text-primary">
                            Express Courier (2-3 Business Days)
                          </p>
                          <p className="font-caption text-caption text-on-surface-variant">
                            Signature required upon arrival, temperature controlled
                          </p>
                        </div>
                      </div>
                      <span className="font-label-caps text-label-caps uppercase font-bold text-primary">
                        FREE
                      </span>
                    </label>

                    <label
                      onClick={() => handleFormChange('shippingMethod', 'overnight')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                        formData.shippingMethod === 'overnight'
                          ? 'border-2 border-primary bg-surface-container-low'
                          : 'border-outline-variant bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={formData.shippingMethod === 'overnight'}
                          onChange={() => handleFormChange('shippingMethod', 'overnight')}
                          className="w-4 h-4 text-primary focus:ring-0"
                        />
                        <div>
                          <p className="font-body-md text-body-md font-semibold text-primary">Overnight Priority</p>
                          <p className="font-caption text-caption text-on-surface-variant">
                            Next morning dispatch via dedicated courier
                          </p>
                        </div>
                      </div>
                      <span className="font-label-caps text-label-caps uppercase font-bold text-primary font-mono">
                        {currencySymbol}25.00
                      </span>
                    </label>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="pt-space-md border-t border-outline-variant">
                  <div className="flex items-center justify-between mb-space-sm">
                    <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                      3. Payment Method
                    </h3>
                    <div className="flex items-center gap-2 text-outline">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                      <span className="font-caption text-caption uppercase">Encrypted</span>
                    </div>
                  </div>

                  {/* Payment Tabs / Radios */}
                  <div className="border border-outline-variant divide-y divide-outline-variant">
                    {/* Credit Card Option */}
                    <div
                      className={`p-4 transition-colors ${
                        formData.paymentMethod === 'card' ? 'bg-surface-container-low' : 'bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="payment_method"
                            checked={formData.paymentMethod === 'card'}
                            onChange={() => handleFormChange('paymentMethod', 'card')}
                            className="w-4 h-4 text-primary focus:ring-0"
                          />
                          <span className="font-body-md text-body-md font-bold text-primary">Credit / Debit Card</span>
                        </label>
                        <div className="flex gap-2">
                          <span className="font-label-caps text-[10px] border border-outline-variant px-1.5 py-0.5 bg-surface-container-lowest font-mono">
                            VISA
                          </span>
                          <span className="font-label-caps text-[10px] border border-outline-variant px-1.5 py-0.5 bg-surface-container-lowest font-mono">
                            MC
                          </span>
                          <span className="font-label-caps text-[10px] border border-outline-variant px-1.5 py-0.5 bg-surface-container-lowest font-mono">
                            AMEX
                          </span>
                        </div>
                      </div>

                      {/* Card Fields */}
                      {formData.paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => handleFormChange('cardNumber', e.target.value)}
                              className="w-full h-12 bg-surface-container-lowest border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none font-mono"
                              placeholder="Card Number"
                            />
                            <span className="material-symbols-outlined absolute right-3 top-3 text-outline text-[20px]">
                              credit_card
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => handleFormChange('cardExpiry', e.target.value)}
                              className="w-full h-12 bg-surface-container-lowest border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none font-mono"
                              placeholder="MM / YY"
                            />
                            <input
                              type="text"
                              value={formData.cardCvc}
                              onChange={(e) => handleFormChange('cardCvc', e.target.value)}
                              className="w-full h-12 bg-surface-container-lowest border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none font-mono"
                              placeholder="Security Code (CVC)"
                            />
                          </div>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleFormChange('cardName', e.target.value)}
                            className="w-full h-12 bg-surface-container-lowest border border-outline-variant px-4 text-body-md text-primary focus:border-primary focus:ring-0 rounded-none"
                            placeholder="Name on Card"
                          />
                        </div>
                      )}
                    </div>

                    {/* PayPal Option */}
                    <div
                      onClick={() => handleFormChange('paymentMethod', 'paypal')}
                      className={`p-4 transition-colors cursor-pointer ${
                        formData.paymentMethod === 'paypal' ? 'bg-surface-container-low' : 'bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={() => handleFormChange('paymentMethod', 'paypal')}
                            className="w-4 h-4 text-primary focus:ring-0"
                          />
                          <span className="font-body-md text-body-md font-semibold text-primary">PayPal</span>
                        </div>
                        <span className="font-caption text-caption text-secondary">Instant redirect</span>
                      </label>
                    </div>

                    {/* Klarna Option */}
                    <div
                      onClick={() => handleFormChange('paymentMethod', 'klarna')}
                      className={`p-4 transition-colors cursor-pointer ${
                        formData.paymentMethod === 'klarna' ? 'bg-surface-container-low' : 'bg-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment_method"
                            checked={formData.paymentMethod === 'klarna'}
                            onChange={() => handleFormChange('paymentMethod', 'klarna')}
                            className="w-4 h-4 text-primary focus:ring-0"
                          />
                          <span className="font-body-md text-body-md font-semibold text-primary">
                            Klarna: 4 interest-free installments of {currencySymbol}{(total / 4).toFixed(2)}
                          </span>
                        </div>
                        <span className="font-label-caps text-label-caps uppercase text-secondary font-bold">
                          KLARNA
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Primary Place Order CTA Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={items.length === 0}
                    className="w-full h-14 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest font-bold flex items-center justify-center gap-3 hover:bg-[#262627] active:scale-[0.99] transition-all rounded-none cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    <span>
                      PLACE ORDER — {currencySymbol}{total.toFixed(2)}
                    </span>
                  </button>
                  <p className="font-caption text-caption text-center text-on-surface-variant mt-2">
                    By placing your order you agree to CEYO&apos;s Terms of Service and Archive Sales Policy.
                  </p>
                </div>
              </form>
            </div>
          </section>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY & TRANSPARENCY (5 Columns) */}
          <aside className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-28">
            {/* Order Summary Card */}
            <div className="border border-outline-variant bg-surface-container-lowest p-space-lg">
              <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant">
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                  Order Summary
                </h2>
                <span className="font-label-caps text-label-caps uppercase text-secondary font-mono">
                  {items.reduce((s, i) => s + i.quantity, 0)} Items
                </span>
              </div>

              {/* Promo Code Input */}
              <div className="py-space-md border-b border-outline-variant">
                <label className="block font-label-caps text-label-caps uppercase tracking-wider text-secondary mb-1.5">
                  Promotion / Atelier Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. CEYO10"
                    className="flex-grow h-11 bg-surface border border-outline-variant px-3 text-body-sm text-primary uppercase placeholder:normal-case focus:border-primary focus:ring-0 rounded-none font-mono"
                  />
                  <button
                    onClick={handleApplyPromo}
                    type="button"
                    className="h-11 px-5 bg-surface text-primary border border-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors rounded-none cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoAppliedMsg && (
                  <p className="font-caption text-caption text-primary font-semibold mt-1.5">
                    ✓ {promoAppliedMsg}
                  </p>
                )}
              </div>

              {/* Calculation Lines */}
              <div className="py-space-md space-y-2.5 font-body-sm text-body-sm text-on-surface-variant border-b border-outline-variant">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-semibold text-primary font-mono">
                    {currencySymbol}{subtotal.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-800">
                    <span>Privilege Voucher ({discountPercent}%)</span>
                    <span className="font-mono">-{currencySymbol}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Shipping ({formData.shippingMethod === 'overnight' ? 'Overnight' : 'Express Courier'})</span>
                  <span className="text-primary font-bold uppercase font-label-caps text-label-caps tracking-wider">
                    {shippingCost === 0 ? 'Free ($0.00)' : `${currencySymbol}${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Sales Tax (8.0%)</span>
                  <span className="font-semibold text-primary font-mono">
                    {currencySymbol}{estimatedTax.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className="pt-space-md flex justify-between items-baseline">
                <div>
                  <span className="block font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
                    Total Amount
                  </span>
                  <span className="font-caption text-caption text-secondary">
                    Includes all global customs duties &amp; export VAT
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight font-mono">
                    {currencySymbol}{total.toFixed(2)}
                  </span>
                  <span className="block font-label-caps text-[10px] text-secondary uppercase font-mono">USD</span>
                </div>
              </div>
            </div>

            {/* Recommended Add-ons Micro-Cards (High-Conversion Up-sells) */}
            <div className="border border-outline-variant bg-surface-container-lowest p-space-md">
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold mb-space-sm">
                Curated Add-Ons (Atelier Essentials)
              </h3>
              <div className="space-y-3">
                {/* Add-on 1: Heavyweight Socks */}
                {sockAddOn && (
                  <div className="flex items-center justify-between p-2.5 bg-surface border border-outline-variant">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-surface-container flex-shrink-0 relative overflow-hidden border border-outline-variant">
                        <img
                          src={sockAddOn.primaryImage}
                          alt={sockAddOn.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-body-sm text-body-sm font-bold text-primary">{sockAddOn.name}</h4>
                        <p className="font-caption text-caption text-secondary">
                          {sockAddOn.subtitle} &nbsp;|&nbsp; {currencySymbol}{sockAddOn.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddProductToCart(sockAddOn)}
                      className="h-9 px-3 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-caps text-label-caps uppercase tracking-wider transition-colors rounded-none cursor-pointer"
                      type="button"
                    >
                      + Add
                    </button>
                  </div>
                )}

                {/* Add-on 2: Leather Care Balm */}
                {balmAddOn && (
                  <div className="flex items-center justify-between p-2.5 bg-surface border border-outline-variant">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-surface-container flex-shrink-0 relative overflow-hidden border border-outline-variant">
                        <img
                          src={balmAddOn.primaryImage}
                          alt={balmAddOn.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-body-sm text-body-sm font-bold text-primary">{balmAddOn.name}</h4>
                        <p className="font-caption text-caption text-secondary">
                          {balmAddOn.subtitle} &nbsp;|&nbsp; {currencySymbol}{balmAddOn.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onAddProductToCart(balmAddOn)}
                      className="h-9 px-3 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-caps text-label-caps uppercase tracking-wider transition-colors rounded-none cursor-pointer"
                      type="button"
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trust & Atelier Transparency Guarantees */}
            <div className="border border-outline-variant bg-surface-container-low p-space-md space-y-3">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">sync</span>
                <div>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">30-Day In-Hand Return Policy</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Complimentary pre-printed return labels included in all domestic shipments.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
                <div>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">Carbon-Neutral Delivery</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    100% of transport emissions offset via verified reforestation projects.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
                <div>
                  <p className="font-body-sm text-body-sm font-semibold text-primary">Plastic-Free Recycled Packaging</p>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Constructed from unbleached FSC-certified craft board with cotton ties.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
