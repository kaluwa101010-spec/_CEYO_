import React, { useState } from 'react';
import { Product, ScreenType } from '../types';

interface ProductViewProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenSizeGuide: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currencySymbol: string;
}

export const ProductView: React.FC<ProductViewProps> = ({
  product,
  allProducts,
  onAddToCart,
  onSelectProduct,
  onNavigate,
  onOpenSizeGuide,
  isWishlisted,
  onToggleWishlist,
  currencySymbol,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Washed Charcoal');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes.includes('M') ? 'M' : product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    fabric: true,
    shipping: false,
    sustainability: false,
  });

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [userReviews, setUserReviews] = useState<
    Array<{
      id: string;
      name: string;
      verified: boolean;
      date: string;
      color: string;
      size: string;
      heightWeight: string;
      title: string;
      body: string;
      rating: number;
    }>
  >([
    {
      id: 'rev-1',
      name: 'Julian V.',
      verified: true,
      date: '3 days ago',
      color: 'Washed Charcoal',
      size: 'L',
      heightWeight: '6\'1" / 185 lbs',
      title: 'THE HOOD STRUCTURE ACTUALLY STANDS ON ITS OWN',
      body: 'Hands down the heaviest organic cotton hoodie in my wardrobe. The 460GSM weight gives it this architectural boxiness that doesn\'t collapse at the collar. Exactly the silhouette Japanese and Parisian ateliers aim for. Washed charcoal has that perfect faded vintage depth without looking worn out.',
      rating: 5,
    },
    {
      id: 'rev-2',
      name: 'Kenji M.',
      verified: true,
      date: '1 week ago',
      color: 'Vintage Chalk',
      size: 'M',
      heightWeight: '5\'10" / 160 lbs',
      title: 'IMPECCABLE PORTUGUESE MILLING',
      body: 'Took a chance on size M following the size table. The dropped shoulder is tailored without looking sloppy, and the cuff elasticity holds firmly above the wrist. Even after initial cold washing, zero shrinkage occurred. Worth every dollar of the price tag.',
      rating: 5,
    },
    {
      id: 'rev-3',
      name: 'Marcus R.',
      verified: true,
      date: '2 weeks ago',
      color: 'Washed Charcoal',
      size: 'XL',
      heightWeight: '6\'4" / 210 lbs',
      title: 'SUBTLE FOREARM BRANDING IS IMMACULATE',
      body: 'The lack of loud chest graphics makes this versatile for styling under tailored overcoats. The micro-embroidery on the forearm cuff is pure understated luxury. Fast shipping to Toronto too.',
      rating: 5,
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewBody, setNewReviewBody] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewBody) return;
    setUserReviews([
      {
        id: `rev-${Date.now()}`,
        name: newReviewAuthor,
        verified: true,
        date: 'Just now',
        color: selectedColor,
        size: selectedSize,
        heightWeight: 'Client Verified',
        title: newReviewTitle || 'EXCEPTIONAL ATELIER CRAFTSMANSHIP',
        body: newReviewBody,
        rating: 5,
      },
      ...userReviews,
    ]);
    setShowReviewModal(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewBody('');
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddBag = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
  };

  // Complete The Look items (Cargo, Drop-shoulder Tee, Leather Sacoche)
  const completeLookItems = [
    allProducts.find((p) => p.id === 'essential-cargo-pants') || allProducts[2],
    allProducts.find((p) => p.id === 'ceyo-oversized-essential-tee') || allProducts[1],
    allProducts.find((p) => p.id === 'atelier-leather-sacoche') || allProducts[allProducts.length - 1],
  ];

  return (
    <div className="w-full">
      {/* EDITORIAL BREADCRUMBS */}
      <div className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-4 border-b border-outline-variant/40 bg-surface">
        <div className="flex items-center space-x-2 font-caption text-caption uppercase tracking-wider text-on-surface-variant">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-primary transition-colors cursor-pointer">
            Shop
          </button>
          <span>/</span>
          <span className="text-secondary">{product.category}</span>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>
      </div>

      {/* MAIN PRODUCT DETAILS DUAL-COLUMN LAYOUT */}
      <main className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-desktop">
          {/* LEFT COLUMN: Staggered Multi-Angle Photography Gallery (Col 1-7) */}
          <section className="lg:col-span-7 space-y-4">
            {/* Primary Image: Front Fit */}
            <div
              onClick={() => setZoomedImage(product.primaryImage)}
              className="relative group bg-surface-container-low overflow-hidden cursor-crosshair border border-outline-variant"
            >
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-surface-container-lowest text-primary text-[10px] tracking-widest uppercase font-semibold font-label-caps border border-outline-variant/50">
                  ANGULAR SILHOUETTE 01
                </span>
              </div>
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 px-3 py-1.5 bg-surface/90 backdrop-blur-sm border border-outline-variant/40 text-on-surface font-caption text-caption uppercase">
                <span className="material-symbols-outlined text-sm">zoom_in</span>
                <span>Click to Inspect Loom</span>
              </div>
              <img
                src={product.primaryImage}
                alt={`${product.name} primary angle`}
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Two Column Spread: Back Silhouette & Cotton Macro Texture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setZoomedImage(product.secondaryImage)}
                className="relative group bg-surface-container-low overflow-hidden border border-outline-variant cursor-pointer"
              >
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 bg-surface-container-lowest/90 text-primary text-[9px] tracking-widest uppercase font-semibold font-label-caps">
                    REAR PROFILE 02
                  </span>
                </div>
                <img
                  src={product.secondaryImage}
                  alt={`${product.name} rear profile view`}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div
                onClick={() =>
                  setZoomedImage(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuBQMUekMXAx8Q_K4uJceNvC4TM2moXHrbPrNZcyrVpdhWwx4xc05qkLYkelO4Q5GUs1Gosj9mJIuZJl3PY55Eb8Z59d7G8TV7ofZji9GSfNyTeKuaYpSJRj4_eokfxnOfvKf1wYqu2_sunGIPKx3Te6mtPXbsvCdUD3gU2PsXWCNXex3IpLuMNsU10YqJv4wTnQDJDEdN9o7Esa3TWpIQYouP7sK2Ze5kaoW__fWADFzqAZBwwMgtuA'
                  )
                }
                className="relative group bg-surface-container-low overflow-hidden border border-outline-variant cursor-pointer"
              >
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 bg-surface-container-lowest/90 text-primary text-[9px] tracking-widest uppercase font-semibold font-label-caps">
                    460GSM TERRY MACRO
                  </span>
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQMUekMXAx8Q_K4uJceNvC4TM2moXHrbPrNZcyrVpdhWwx4xc05qkLYkelO4Q5GUs1Gosj9mJIuZJl3PY55Eb8Z59d7G8TV7ofZji9GSfNyTeKuaYpSJRj4_eokfxnOfvKf1wYqu2_sunGIPKx3Te6mtPXbsvCdUD3gU2PsXWCNXex3IpLuMNsU10YqJv4wTnQDJDEdN9o7Esa3TWpIQYouP7sK2Ze5kaoW__fWADFzqAZBwwMgtuA"
                  alt="460GSM loopback terry fabric macro detail"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Wide Lifestyle Motion Spread */}
            <div className="relative group bg-surface-container-low overflow-hidden border border-outline-variant">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-surface-container-lowest text-primary text-[10px] tracking-widest uppercase font-semibold font-label-caps border border-outline-variant/50">
                  ATELIER IN SITU • PARIS
                </span>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmpT7NlCEFzENXHkruhyQcxjHoQYXDvcG9Glajx0owKh6q1bk3OpTc72yr3hOuxNSW4bJhFXsxMlNF1sKsRIPnWQgeXaE8LAMQ8tdXtcVGxq7NLJypMSWJPq0KAdUrT0Mz9ukviptN6dGj-zvo8y_zBSy-J-eEoJQeRXKwqz4PCCP0xEm3ZC58Jxo0lOgmMvkBVpAuZn2_ziObRHgt2qubvtiXc1CTtQaly8l6SdgzF--3EoglIgFN"
                alt="Editorial model walking in brutalist interior wearing CEYO hoodie"
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Two Column Flat Lay Details & Forearm Tonal Embroidery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group bg-surface-container-low overflow-hidden border border-outline-variant">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 bg-surface-container-lowest/90 text-primary text-[9px] tracking-widest uppercase font-semibold font-label-caps">
                    ARCHIVAL FLAT LAY
                  </span>
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1-nC1koQfNmZvjcru8ejM8UaUpQqu_R16LZqkfv2bKkGUu19RUQPFfanFbGf0jiMrHN-dQ5rlZsI77psnF57UyIvXSHYhOi_fjPRUkehDactk-zVXnAbrKTOwgJ0zE4i-chz-1mXBD8acprHUSfHXZRaXE4wu3Wv03UWep-UvHRd74ooQHg398QT--2URz2c9dqhv-0_DWcabP1JnhqQYppr-a-UJ6-sHH59NUHE1V5VVRSFgLp7r"
                  alt="Flat lay photograph of the hoodie"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative group bg-surface-container-low overflow-hidden border border-outline-variant">
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 bg-surface-container-lowest/90 text-primary text-[9px] tracking-widest uppercase font-semibold font-label-caps">
                    FOREARM EMBROIDERY SPEC
                  </span>
                </div>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdNV07rilGxKJpWzKciHvDxzLCm_6bEkc3uylWyxRewpSN3Wa-cabhRuEQdNBDHs4wHn1J2nyKltUiWZsdRvFYj2haouYhidMPWBGV-OfthThLDA7Bj6YJR4N9unyiqwQwkD5c65LGKngeqwsjOaXgJ8EVTsR8U-d3t4TVI0HVAtNdCkqq_ZZSULcLDWPBMFbuYAHVpiFup_sq7pSCeN5aCRnfE2fwxfoOsNpqN3-q-NKYZboJQvIU"
                  alt="Forearm sleeve tonal embroidery detail"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Sticky Purchase & Garment Details (Col 8-12) */}
          <section className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              {/* Core Collection Pill & Rating */}
              <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps tracking-widest uppercase font-semibold">
                  CORE COLLECTION • DROP 04
                </span>
                <div className="flex items-center gap-1.5 font-caption text-caption text-on-surface">
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold text-primary">{product.rating.toFixed(1)}</span>
                  <a href="#reviews-section" className="text-on-surface-variant hover:underline cursor-pointer">
                    ({userReviews.length + 181} Reviews)
                  </a>
                </div>
              </div>

              {/* Title & Price Block */}
              <div className="border-b border-outline-variant/60 pb-5 space-y-2">
                <h1 className="font-headline-md text-headline-md text-primary uppercase tracking-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-display-hero text-2xl font-bold tracking-tight text-primary font-mono">
                    {currencySymbol}{product.price.toFixed(2)} USD
                  </span>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                    Taxes Included
                  </span>
                </div>
                {/* Installment Notice */}
                <div className="pt-1 flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span>
                    Or 4 interest-free payments of <strong>{currencySymbol}{(product.price / 4).toFixed(2)}</strong> with
                  </span>
                  <span className="font-bold tracking-tighter text-primary border border-outline-variant px-1.5 py-0.5 text-xs bg-surface-container-low">
                    Klarna
                  </span>
                  <span className="text-xs">/</span>
                  <span className="font-bold tracking-tighter text-primary border border-outline-variant px-1.5 py-0.5 text-xs bg-surface-container-low">
                    Afterpay
                  </span>
                </div>
              </div>

              {/* Description Excerpt */}
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector Section */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                    Color: <span className="text-primary font-bold">{selectedColor}</span>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant uppercase">
                    {product.colors.find((c) => c.name === selectedColor)?.atelierCode || 'Atelier Dye #04'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={c.name}
                      className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-primary ring-2 ring-primary/20 scale-105'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className="sr-only">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector Section */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-label-caps uppercase text-on-surface tracking-wider">
                    Select Size
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="font-label-caps text-label-caps uppercase text-primary underline underline-offset-4 hover:opacity-75 flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">straighten</span>
                    Size Guide
                  </button>
                </div>
                {/* Size Options Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    const isPopular = size === 'M';
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative h-12 font-label-caps text-label-caps uppercase transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'border-2 border-primary bg-primary text-on-primary font-bold'
                            : 'border border-outline-variant hover:border-primary text-on-surface'
                        }`}
                        type="button"
                      >
                        {size}
                        {isPopular && (
                          <span className="absolute -top-2.5 right-1 px-1.5 bg-surface-container-high text-primary text-[8px] font-bold tracking-widest border border-outline-variant">
                            POPULAR
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Model Fit Info */}
                <div className="flex items-center gap-2 pt-1 font-caption text-caption text-on-surface-variant bg-surface-container-low p-2.5 border-l-2 border-primary">
                  <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                  <span>
                    Model is <strong>6&apos;2&quot; (188cm)</strong> wearing size <strong>Large</strong>. Designed with an intentional oversized drape.
                  </span>
                </div>
              </div>

              {/* Quantity & Stock Status */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center border border-outline-variant bg-surface">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="w-10 text-center font-label-caps text-label-caps text-primary font-bold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 font-caption text-caption text-primary">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
                  <span className="uppercase tracking-wider font-semibold">In Stock — Ships within 24h</span>
                </div>
              </div>

              {/* Primary & Secondary CTA Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddBag}
                  className="w-full h-14 bg-primary text-on-primary hover:bg-[#262627] transition-all flex items-center justify-center gap-2 font-label-caps text-label-caps uppercase tracking-widest font-bold active:scale-[0.99] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>
                    ADD TO BAG — {currencySymbol}{(product.price * quantity).toFixed(2)}
                  </span>
                </button>
                <button
                  onClick={() => {
                    handleAddBag();
                    onNavigate('checkout');
                  }}
                  className="w-full h-14 bg-surface-container-lowest border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 font-label-caps text-label-caps uppercase tracking-widest font-bold active:scale-[0.99] cursor-pointer"
                  type="button"
                >
                  <span>BUY WITH APPLE PAY</span>
                </button>
              </div>

              {/* Wishlist Toggle */}
              <div className="pt-1">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="w-full py-2.5 flex items-center justify-center gap-2 text-on-surface hover:text-primary transition-colors font-label-caps text-label-caps uppercase tracking-widest cursor-pointer"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isWishlisted ? 'favorite' : 'favorite_border'}
                  </span>
                  <span>{isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
                </button>
              </div>

              {/* Structural Hairline Accordions */}
              <div className="border-t border-outline-variant/60 pt-4 divide-y divide-outline-variant/40">
                {/* Accordion 1: Fabric & Care */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('fabric')}
                    className="w-full flex justify-between items-center text-left font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold cursor-pointer"
                    type="button"
                  >
                    <span>Fabric &amp; Care Specifications</span>
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                        openAccordions.fabric ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions.fabric && (
                    <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant space-y-2">
                      {product.fabricCare ? (
                        product.fabricCare.map((item, idx) => <p key={idx}>• {item}</p>)
                      ) : (
                        <>
                          <p>• 100% GOTS-Certified Portuguese Organic Cotton (460GSM loopback terry).</p>
                          <p>• Pre-shrunk atelier washing process with zero shrinkage risk.</p>
                          <p>
                            • Cold machine wash with mild detergent inside-out. Reshape and flat-dry only. Do not tumble dry.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Accordion 2: Shipping & Returns */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center text-left font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold cursor-pointer"
                    type="button"
                  >
                    <span>Shipping &amp; Complimentary Returns</span>
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                        openAccordions.shipping ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions.shipping && (
                    <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant space-y-2">
                      <p>• Complimentary express DHL carbon-neutral courier on orders exceeding $250.</p>
                      <p>• Delivery window: 1–3 business days within North America &amp; EU, 3–5 days internationally.</p>
                      <p>• 30-day effortless returns with prepaid courier pickup from your residence.</p>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Sustainability */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('sustainability')}
                    className="w-full flex justify-between items-center text-left font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold cursor-pointer"
                    type="button"
                  >
                    <span>Sustainability &amp; Atelier Sourcing</span>
                    <span
                      className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                        openAccordions.sustainability ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openAccordions.sustainability && (
                    <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant space-y-2">
                      <p>• Spun and knitted exclusively in Guimarães, Portugal at a wind-powered family heritage atelier.</p>
                      <p>• Non-toxic reactive garment dyeing minimizing freshwater extraction by 62% against industry standards.</p>
                      <p>• Plastic-free compostable unboxing packaging.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* COMPLETE THE LOOK / STYLED WITH SECTION */}
      <section className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-2xl border-t border-outline-variant/60 bg-surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant block mb-1">
              Curated Silhouette
            </span>
            <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-tight">
              Complete The Look
            </h2>
          </div>
          <p className="font-caption text-caption uppercase text-on-surface-variant mt-2 md:mt-0 tracking-wider">
            Engineered to pair seamlessly with Drop 04 Foundations
          </p>
        </div>

        {/* Recommendations Bento-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completeLookItems.map((item, idx) => {
            const badges = ['COMPLEMENTARY', 'BASE LAYER', 'ACCESSORY'];
            return (
              <article
                key={item.id}
                className="group bg-surface-container-lowest border border-outline-variant/50 p-4 transition-all hover:border-primary flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => onSelectProduct(item)}
                    className="relative aspect-[3/4] bg-surface-container-low overflow-hidden mb-4 border border-outline-variant cursor-pointer"
                  >
                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-surface-container-lowest text-primary text-[9px] font-label-caps uppercase tracking-widest font-semibold border border-outline-variant/40">
                      {badges[idx]}
                    </span>
                    <img
                      src={item.primaryImage}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(item)}
                        className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary cursor-pointer hover:underline"
                      >
                        {item.name}
                      </h3>
                      <p className="font-caption text-caption text-on-surface-variant uppercase mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-body-md text-body-md font-bold text-primary font-mono">
                      {currencySymbol}{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectProduct(item)}
                  className="w-full mt-4 py-2.5 border border-outline-variant hover:border-primary hover:bg-primary hover:text-on-primary text-primary font-label-caps text-label-caps uppercase tracking-wider transition-all cursor-pointer font-semibold"
                  type="button"
                >
                  Quick View &amp; Tailor
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER REVIEWS & FIT BREAKDOWN */}
      <section id="reviews-section" className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-2xl border-t border-outline-variant/60 bg-surface-container-low">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-desktop">
          {/* Left Review Breakdown Panel (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant block mb-1">
                Client Verification
              </span>
              <h2 className="font-headline-md text-headline-md uppercase tracking-tight text-primary">
                Reviews &amp; Fit
              </h2>
            </div>
            <div className="bg-surface-container-lowest p-6 border border-outline-variant/50 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display-hero text-5xl font-bold tracking-tight text-primary">
                  {product.rating.toFixed(1)}
                </span>
                <div className="space-y-1">
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
                    Based on {userReviews.length + 181} verified purchases
                  </p>
                </div>
              </div>

              {/* Rating Meters */}
              <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                <div className="flex items-center gap-3 font-caption text-caption">
                  <span className="w-8 text-on-surface">5 ★</span>
                  <div className="flex-1 h-1.5 bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '91%' }} />
                  </div>
                  <span className="w-8 text-right text-on-surface-variant font-mono">91%</span>
                </div>
                <div className="flex items-center gap-3 font-caption text-caption">
                  <span className="w-8 text-on-surface">4 ★</span>
                  <div className="flex-1 h-1.5 bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '7%' }} />
                  </div>
                  <span className="w-8 text-right text-on-surface-variant font-mono">7%</span>
                </div>
                <div className="flex items-center gap-3 font-caption text-caption">
                  <span className="w-8 text-on-surface">3 ★</span>
                  <div className="flex-1 h-1.5 bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '2%' }} />
                  </div>
                  <span className="w-8 text-right text-on-surface-variant font-mono">2%</span>
                </div>
                <div className="flex items-center gap-3 font-caption text-caption">
                  <span className="w-8 text-on-surface">2 ★</span>
                  <div className="flex-1 h-1.5 bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '0%' }} />
                  </div>
                  <span className="w-8 text-right text-on-surface-variant font-mono">0%</span>
                </div>
                <div className="flex items-center gap-3 font-caption text-caption">
                  <span className="w-8 text-on-surface">1 ★</span>
                  <div className="flex-1 h-1.5 bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '0%' }} />
                  </div>
                  <span className="w-8 text-right text-on-surface-variant font-mono">0%</span>
                </div>
              </div>

              {/* Fit Spectrum */}
              <div className="pt-4 border-t border-outline-variant/40 space-y-2">
                <span className="font-label-caps text-label-caps uppercase text-primary font-bold block">
                  Fit Consensus
                </span>
                <div className="relative h-2 bg-surface-container-high w-full mt-2">
                  <div className="absolute top-0 bottom-0 left-[68%] w-2 bg-primary" />
                </div>
                <div className="flex justify-between font-caption text-[10px] text-on-surface-variant uppercase tracking-wider">
                  <span>Runs Small</span>
                  <span className="text-primary font-bold">True to Drape (Oversized)</span>
                  <span>Runs Huge</span>
                </div>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full mt-2 py-3 bg-surface border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-caps text-label-caps uppercase tracking-widest transition-all cursor-pointer font-semibold"
                type="button"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Right Customer Testimonials Feed (Col 5-12) */}
          <div className="lg:col-span-8 space-y-4">
            {userReviews.map((rev) => (
              <article key={rev.id} className="bg-surface-container-lowest p-6 border border-outline-variant/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                      {rev.name}
                    </span>
                    {rev.verified && (
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-label-caps uppercase tracking-wider font-semibold">
                        Verified Owner
                      </span>
                    )}
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">{rev.date}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-caption text-on-surface-variant">
                  <span>
                    Color: <strong>{rev.color}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Size: <strong>{rev.size}</strong>
                  </span>
                  <span>•</span>
                  <span>{rev.heightWeight}</span>
                </div>
                <div className="flex text-primary">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <h4 className="font-body-md text-body-md font-bold text-primary uppercase tracking-tight">
                  {rev.title}
                </h4>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {rev.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest w-full max-w-lg p-6 border border-outline-variant shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm uppercase text-primary">
                Write Client Review
              </h3>
              <button onClick={() => setShowReviewModal(false)} className="text-secondary hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddReview} className="py-4 space-y-4">
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-secondary mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Kenji Mori"
                  className="w-full p-2.5 border border-outline-variant bg-surface text-body-sm focus:border-primary focus:ring-0"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-secondary mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Masterful heavyweight drape"
                  className="w-full p-2.5 border border-outline-variant bg-surface text-body-sm focus:border-primary focus:ring-0"
                />
              </div>
              <div>
                <label className="block font-label-caps text-label-caps uppercase text-secondary mb-1">Review Feedback</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewBody}
                  onChange={(e) => setNewReviewBody(e.target.value)}
                  placeholder="Share details on texture, milling weight, fit drape, and sizing recommendations..."
                  className="w-full p-2.5 border border-outline-variant bg-surface text-body-sm focus:border-primary focus:ring-0"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-outline-variant font-label-caps text-label-caps uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest font-bold hover:bg-[#262627]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Inspection Lightbox */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-md cursor-zoom-out"
        >
          <img
            src={zoomedImage}
            alt="Enlarged textile detail"
            className="max-h-[90vh] max-w-[90vw] object-contain border border-outline-variant"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
