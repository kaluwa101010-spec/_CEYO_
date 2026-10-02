import React, { useState } from 'react';
import { Product, ScreenType } from '../types';
import { INSTAGRAM_POSTS } from '../data/products';

interface HomeViewProps {
  products: Product[];
  onNavigate: (screen: ScreenType) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  currencySymbol: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onQuickAdd,
  currencySymbol,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Tops' | 'Outerwear' | 'Trousers'>('All');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filteredProducts = selectedFilter === 'All'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === selectedFilter).slice(0, 8);

  const trenchProduct = products.find((p) => p.id === 'minimal-wool-overcoat') || products[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-end justify-start bg-primary overflow-hidden border-b border-outline-variant">
        {/* Full-bleed Luxury Photography & Atmospheric Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0HTlnvG58Go1mqaOkdtwh90ewtrBPwBRZIqcvWU7amXfmsx_fbxq9DNVRyfeyeD2fP3nL6GAqYJH7ytEJTfJRoFMCx_hSno7Ha5SV7rIbaOiBdFhXJe3WA7jKAGYL85VW60K6egNsOHM5blCz5Az_UYmKBo7OmkGA68AXulBR9_XOES97kIMhmoDHGfCzG_5_ZxDIl8xYBGOIHeoSeTjpyKq0qD-uVEe-sWSh6C16UYDcZias_mJF"
            alt="Editorial fashion trench coat model in Paris concrete architecture"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          <div className="absolute inset-0 bg-primary/20 backdrop-brightness-95" />
        </div>

        {/* Live Floating Lookbook Tag Pin on Model */}
        <div
          onClick={() => onSelectProduct(trenchProduct)}
          className="absolute top-[35%] right-[15%] md:right-[26%] z-20 group cursor-pointer hidden sm:block"
        >
          <div className="relative flex items-center">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-surface opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-surface border-2 border-primary" />
            </span>
            <div className="ml-3 bg-surface text-primary px-3 py-1.5 border border-primary flex items-center space-x-2 backdrop-blur-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">
                Oversized Wool Trench — $420
              </span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full px-gutter md:px-margin-tablet lg:px-margin-desktop pb-space-2xl md:pb-space-3xl pt-space-3xl max-w-5xl">
          <div className="inline-block mb-4">
            <span className="px-3 py-1 bg-surface/10 text-surface border border-surface/30 backdrop-blur-sm font-label-caps text-label-caps uppercase tracking-widest">
              Autumn / Winter &apos;25 Archive Drop
            </span>
          </div>
          <h1 className="text-on-primary font-display-hero-mobile md:font-display-hero text-display-hero-mobile md:text-display-hero tracking-tighter uppercase mb-6 leading-none">
            DEFINE YOUR STYLE.
          </h1>
          <p className="text-surface-variant font-body-lg text-body-lg max-w-xl mb-10 leading-relaxed text-balance">
            Contemporary essentials designed for the way you live. Engineered with architectural precision, Japanese heavy-gauge textiles, and raw minimalism.
          </p>
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-surface text-primary px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest text-center hover:bg-surface-variant transition-colors duration-150 cursor-pointer font-bold"
            >
              SHOP NOW
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-transparent text-on-primary border border-surface px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest text-center hover:bg-surface hover:text-primary transition-colors duration-150 cursor-pointer font-bold"
            >
              EXPLORE COLLECTION
            </button>
          </div>
        </div>

        {/* Editorial Coordinate Stamp */}
        <div className="hidden xl:flex absolute bottom-12 right-16 z-10 flex-col items-end text-surface-variant">
          <span className="font-label-caps text-label-caps tracking-widest">ATELIER LAT. 48.8566° N, 2.3522° E</span>
          <span className="font-caption text-caption text-outline">LIMITED ARCHIVE EDITION 04 // 2025</span>
        </div>
      </section>

      {/* BRAND PILLARS / METRICS STRIP */}
      <section className="border-b border-outline-variant bg-surface-container-low py-6 px-gutter md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="border-r border-outline-variant/60 last:border-none pr-4">
            <p className="font-label-caps text-label-caps uppercase text-secondary">TEXTILE DISCIPLINE</p>
            <p className="font-body-md text-body-md font-medium text-primary mt-1">450–600 GSM Combed Cotton</p>
          </div>
          <div className="border-r border-outline-variant/60 last:border-none pr-4">
            <p className="font-label-caps text-label-caps uppercase text-secondary">CRAFT METHODOLOGY</p>
            <p className="font-body-md text-body-md font-medium text-primary mt-1">Single-Needle Atelier Finish</p>
          </div>
          <div className="border-r border-outline-variant/60 last:border-none pr-4">
            <p className="font-label-caps text-label-caps uppercase text-secondary">GLOBAL LOGISTICS</p>
            <p className="font-body-md text-body-md font-medium text-primary mt-1">Priority DHL Worldwide Express</p>
          </div>
          <div className="pr-4">
            <p className="font-label-caps text-label-caps uppercase text-secondary">SUSTAINABLE HARVEST</p>
            <p className="font-body-md text-body-md font-medium text-primary mt-1">100% GOTS Certified Fiber</p>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES (Visual Bento Grid) */}
      <section className="py-space-2xl md:py-space-3xl px-gutter md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-2">
              CURATED ARCHITECTURE
            </p>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tight uppercase text-primary">
              FEATURED SPACES
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mt-4 md:mt-0">
            Distinct structural categories distilled into functional uniforms. Tailored drape meets monolithic streetwear silhouette.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Category 1: Men (7 cols) */}
          <div
            onClick={() => onNavigate('shop')}
            className="group relative md:col-span-7 h-[460px] md:h-[540px] overflow-hidden bg-surface-container border border-outline-variant cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvOBmOJQsT90kJRveVNStlc9OPQV0olf2czGPfHmFgsOSuLShqcZt3Z8dHEQrGAc1FLPpqhoaqjyA6RiiHMt08WZdyIYBHDy3-TdOlPMaEOiYPf8QAxZMtGr4oOl6udjvG-I4_ieL7uF3xITivcD593EVa_ZwR37qUdD-hEcnoAh544hb7WSH1uaWQt97ZhEw3wjPWiQ6n5zbzXg-IodWUOL7ykem4lvdI_QtmGZU2BCF0d9iIAXdv"
              alt="Editorial men fashion lookbook shot"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-105 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="rounded-full px-3 py-1 bg-surface text-primary font-label-caps text-label-caps uppercase">
                Collection 01
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-primary uppercase tracking-tight">Men</h3>
                <p className="font-body-sm text-body-sm text-surface-variant mt-1">
                  Architectural streetwear, tailored cargos, heavyweight hoodies.
                </p>
              </div>
              <span className="w-10 h-10 rounded-full border border-surface text-on-primary flex items-center justify-center group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">north_east</span>
              </span>
            </div>
          </div>

          {/* Category 2: Women (5 cols) */}
          <div
            onClick={() => onNavigate('shop')}
            className="group relative md:col-span-5 h-[460px] md:h-[540px] overflow-hidden bg-surface-container border border-outline-variant cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ-zZx4ZWFa4r6CHuLNGPh-z2h5NxHy_STdiuU3mDxB-wbA8Kp7Z1sNGRh-luruPi_I3eESVgtVmfDNrUI9dG-_htVHoz2QuaNkYCqFEsOlRKpc2f0Hb_KeS04c56Oj4Bsu88luDoHHQCmVmHEYpc3TqmF2cZitNPlr0AYV_k_LUlJT9nJpu85dAl_sxvggzIPaeVJm2DoVsZP_kb2i8cAGDLZknGu7uG8nymR3TZpOkubCh-SPo5w"
              alt="High fashion female model in a sharp minimalist oversized structured blazer"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-105 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="rounded-full px-3 py-1 bg-surface text-primary font-label-caps text-label-caps uppercase">
                Collection 02
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-primary uppercase tracking-tight">Women</h3>
                <p className="font-body-sm text-body-sm text-surface-variant mt-1">
                  Minimalist drape, oversized blazers, relaxed denim.
                </p>
              </div>
              <span className="w-10 h-10 rounded-full border border-surface text-on-primary flex items-center justify-center group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">north_east</span>
              </span>
            </div>
          </div>

          {/* Category 3: New Arrivals (5 cols) */}
          <div
            onClick={() => onNavigate('shop')}
            className="group relative md:col-span-5 h-[420px] overflow-hidden bg-surface-container border border-outline-variant cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLWgBbleEIrLvAxE-42LurTHNbxm48M3axAQGaH2kTz2N9TVhe-jk6rjCeZQM6k9Fx3niZ9aZy4jZrC6HSu9MYixiu6cSFmhh2IC8yB9oWU_WK7-yXBfG1w8fLgD3MIjV5goQ5sXbDXNrDTO0nM6tYj0_x65uftiTt6RUC3CaGlaws_ImwQXVh2OeVH2e3s6B83cp2gaYt6n1PPsEcKY9foXg5I9HL0Mgc65N7yNRCKI4T_TXZPoI"
              alt="Flat lay macro editorial detail of technical streetwear garment"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="rounded-full px-3 py-1 bg-primary text-on-primary font-label-caps text-label-caps uppercase">
                Limited Drop 04
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-primary uppercase tracking-tight">New Arrivals</h3>
                <p className="font-body-sm text-body-sm text-surface-variant mt-1">Limited release drop 04 archive pieces.</p>
              </div>
              <span className="w-10 h-10 rounded-full border border-surface text-on-primary flex items-center justify-center group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">north_east</span>
              </span>
            </div>
          </div>

          {/* Category 4: Best Sellers (7 cols) */}
          <div
            onClick={() => onNavigate('shop')}
            className="group relative md:col-span-7 h-[420px] overflow-hidden bg-surface-container border border-outline-variant cursor-pointer"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJf9FwVpwBJL2fpII9ZmOxkxESlm9C1k0GRZyMbVAxIq6lGeMI_rzczXMnKNXn67562NFRqAlDaDP9nqBHzhcnrlka--8oAftntHLY3-Ajxglo1_C22YcHmJxayNzPCZTtrayDSvkAcXJX0B6lIwp-SjtIm3Wt66cJHPFSHVh2_Vlty-UKlIvMzMaQ09OjpZ89ahX2RoNAUrqICyKX3nBCqsEFqszrFt8REUOvNciyrwy5brre-MGg"
              alt="Two streetwear models in monochrome black heavy hoodies and pants"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
            <div className="absolute top-6 left-6">
              <span className="rounded-full px-3 py-1 bg-surface text-primary font-label-caps text-label-caps uppercase">
                Permanent Uniform
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-primary uppercase tracking-tight">Best Sellers</h3>
                <p className="font-body-sm text-body-sm text-surface-variant mt-1">Timeless core pieces engineered for infinite rotation.</p>
              </div>
              <span className="w-10 h-10 rounded-full border border-surface text-on-primary flex items-center justify-center group-hover:bg-surface group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">north_east</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED 4-COLUMN PRODUCT GRID (ARCHIVE CATALOG) */}
      <section className="py-space-2xl md:py-space-3xl px-gutter md:px-margin-tablet lg:px-margin-desktop bg-surface-bright border-t border-b border-outline-variant">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-outline-variant">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary">
                ARCHIVE CATALOG
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tight uppercase text-primary mt-1">
                CORE DISCIPLINE
              </h2>
            </div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {(['All', 'Tops', 'Outerwear', 'Trousers'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`rounded-full px-4 py-1.5 font-label-caps text-label-caps uppercase transition-colors cursor-pointer ${
                    selectedFilter === cat
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface border border-outline-variant text-on-surface hover:border-primary'
                  }`}
                >
                  {cat === 'All' ? `All (${products.slice(0, 8).length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant cursor-pointer"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src={product.secondaryImage}
                    alt={`${product.name} secondary angle`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full px-2.5 py-1 bg-surface text-primary font-label-caps text-label-caps uppercase text-[10px] font-bold border border-outline-variant/60">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Quick Add Slide-up Overlay Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(product);
                    }}
                    className="quick-add-btn absolute bottom-0 inset-x-0 bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex items-center justify-center space-x-2 cursor-pointer font-bold hover:bg-[#262627]"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>QUICK ADD</span>
                  </button>
                </div>

                <div className="pt-4 flex flex-col flex-1">
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="flex justify-between items-start cursor-pointer group-hover:opacity-90"
                  >
                    <h3 className="font-body-md text-body-md font-semibold text-primary uppercase line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="font-body-md text-body-md font-medium text-primary font-mono ml-2 shrink-0">
                      {currencySymbol}{product.price}
                    </span>
                  </div>
                  <p className="font-caption text-caption text-secondary mt-1 line-clamp-1">
                    {product.subtitle}
                  </p>
                  <div className="flex space-x-1.5 mt-3">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        className="w-3 h-3 rounded-full border border-outline-variant"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More / Full Archive CTA */}
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-block border border-primary bg-transparent text-primary hover:bg-primary hover:text-on-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-150 cursor-pointer font-bold"
            >
              EXPLORE COMPLETE ARCHIVE (48 PIECES)
            </button>
          </div>
        </div>
      </section>

      {/* THE ATELIER STORY (Split Narrative Editorial Section) */}
      <section className="py-space-2xl md:py-space-3xl px-gutter md:px-margin-tablet lg:px-margin-desktop bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Image Collage (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-8 overflow-hidden border border-outline-variant">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC05mWdVW_d_fJQzLPVigYo4NKOOfEecyMQSjqLOAx3X6mYtxClMSyfRlhvmE_6m0Kte4D07c4sABx978be-rT_kt_oUrZEIx2mYWpkiTTqRMypgzRUdGPrEG8W4lKs6DHos671_FF-Qe0nHDE1lG2tZtzFZZ2hFgtypLUReGQXzf2HHHgt4PdxX3W4CcVmeqqn_h_lyZwVU4PXIYHdvGNYSJjyt8kUkhkIQVqPDFLOAEmpjxtZI0Lp"
                alt="Behind the scenes fashion atelier workspace in Tokyo"
                className="w-full h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-4 flex flex-col justify-between">
              <div className="overflow-hidden border border-outline-variant mb-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlGspDCytPHO_TREQ3ira1oWpe-hse-pTOBBTUA5AWxCtk1zz1IFkRfJhxek5TKAnEvK1OxrQ2UHKBur6Wmss3ZbGrpR-nt7QVT3loBUvezIhcoHyag2eCrboxXzB3RVBTHcDs31ymZRYPsTHz92F_iLlM9tCPfHCLAPmWFccGf6DRegKbzGygm5LxnlKTmzpFRRknXzzI45hdbGzE4dnwUb-K9Ra04WVEjNnGg-0xeUKR8-rM6J4R"
                  alt="Macro detail of Japanese loopwheel knitting machinery"
                  className="w-full h-[220px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-surface-container border border-outline-variant">
                <span className="font-label-caps text-label-caps uppercase text-secondary">SPECS</span>
                <p className="font-caption text-caption text-primary font-medium mt-1">
                  Zero synthetic blends. 100% custom-milled long-staple cotton.
                </p>
              </div>
            </div>
          </div>

          {/* Right Narrative & Quote (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-3">
              ATELIER PHILOSOPHY
            </span>
            <blockquote className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md uppercase text-primary leading-tight mb-8">
              &ldquo;Clothing is an architectural dialogue between human form and negative space.&rdquo;
            </blockquote>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Founded on the intersection of Tokyo structural minimalism and European couture engineering, CEYO CLOTHING reimagines everyday apparel as permanent architectural objects. We discard cyclical trends in favor of disciplined forms, deliberate drape, and museum-grade tactile finishes.
            </p>
            <div className="flex items-center space-x-6 pt-4 border-t border-outline-variant">
              <div>
                <p className="font-label-caps text-label-caps uppercase text-primary font-bold">
                  KENJI MORI &amp; CLARA VASSEUR
                </p>
                <p className="font-caption text-caption text-secondary">Creative Directors, Paris / Tokyo</p>
              </div>
              <div className="h-8 w-[1px] bg-outline-variant" />
              <div className="font-display-hero text-headline-sm uppercase text-primary tracking-tighter">
                CEYO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS / CRITICAL ACCLAIM */}
      <section className="border-t border-b border-outline-variant bg-surface-container-low py-12 px-gutter md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border-l border-primary">
            <span className="font-display-hero text-headline-sm uppercase text-primary tracking-tighter font-extrabold">
              VOGUE
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 italic leading-relaxed">
              &ldquo;CEYO bridges the chasm between raw industrial streetwear and immaculate Parisian tailoring with staggering restraint.&rdquo;
            </p>
          </div>
          <div className="p-6 border-l border-primary">
            <span className="font-display-hero text-headline-sm uppercase text-primary tracking-tighter font-extrabold">
              GQ
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 italic leading-relaxed">
              &ldquo;The heavyweight tees and architectural cargo trousers are not just wardrobe items—they are foundational sculptures.&rdquo;
            </p>
          </div>
          <div className="p-6 border-l border-primary">
            <span className="font-display-hero text-headline-sm uppercase text-primary tracking-tighter font-extrabold">
              HYPEBEAST
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 italic leading-relaxed">
              &ldquo;A masterclass in proportions. CEYO is rapidly defining the aesthetic lexicon of high-concept street uniforms.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY & INSTAGRAM HOTSPOTS GRID (#CEYOFRAMES) */}
      <section className="py-space-2xl md:py-space-3xl px-gutter md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-1">
              COMMUNITY VISUAL ARCHIVE
            </p>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase text-primary">
              #CEYOFRAMES
            </h2>
          </div>
          <div className="font-label-caps text-label-caps uppercase tracking-widest text-primary flex items-center space-x-2 mt-4 md:mt-0">
            <span>DISPATCH ARCHIVE</span>
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </div>
        </div>

        {/* 4 Hotspot Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => {
            const prod = products.find((p) => p.id === post.productId);
            return (
              <div
                key={post.id}
                onMouseEnter={() => setActiveHotspot(post.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => {
                  if (prod) onSelectProduct(prod);
                }}
                className="group relative aspect-square bg-surface-container overflow-hidden border border-outline-variant cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={`Street fashion lookbook ${post.productName}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`absolute inset-0 bg-primary/40 transition-opacity flex items-center justify-center p-4 ${
                    activeHotspot === post.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <div className="bg-surface text-primary p-3 w-full text-center border border-primary shadow-lg">
                    <span className="font-label-caps text-label-caps uppercase block font-bold">
                      {post.productName}
                    </span>
                    <span className="font-caption text-caption text-secondary">
                      {currencySymbol}{post.price} — Shop Now
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-surface/80 p-1.5 backdrop-blur-sm rounded-full">
                  <span className="material-symbols-outlined text-[14px]">local_mall</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEWSLETTER / MEMBER PERK BANNER */}
      <section className="border-t border-outline-variant bg-surface-container-high py-space-2xl px-gutter md:px-margin-tablet lg:px-margin-desktop">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block rounded-full bg-surface px-4 py-1 border border-outline-variant mb-4">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-semibold">
              ATELIER PRIVILEGE ACCESS
            </span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase text-primary tracking-tight mb-4">
            STAY IN THE CEYO LOOP.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
            Subscribe to receive strictly curated invitations: early access to limited seasonal archives, private Tokyo studio showings, and 10% off your inaugural commission.
          </p>
          {newsletterSubmitted ? (
            <div className="max-w-md mx-auto p-4 bg-surface border border-primary text-primary font-body-sm">
              ✓ Welcome to the CEYO Atelier archive registry. Check your inbox for private coordinates.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                required
                className="flex-1 bg-surface-container-lowest border border-primary rounded-none px-4 py-3.5 font-body-sm text-body-sm text-primary placeholder:text-secondary focus:ring-0 focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-8 py-3.5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-[#262627] transition-colors cursor-pointer font-bold"
              >
                JOIN
              </button>
            </form>
          )}
          <p className="font-caption text-caption text-secondary mt-3">We respect negative space. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};
