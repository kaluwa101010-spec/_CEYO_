import React, { useState, useMemo } from 'react';
import { Product, ScreenType } from '../types';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
  currencySymbol: string;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onNavigate,
  currencySymbol,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(650);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [gridColumns, setGridColumns] = useState<2 | 4>(4);
  const [displayCount, setDisplayCount] = useState<number>(12);

  // Accordion toggle states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    size: true,
    palette: true,
    price: true,
    fit: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSizeToggle = (size: string) => {
    if (size === 'XXL') return; // out of stock in design
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleFitToggle = (fit: string) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(650);
    setSelectedFits([]);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'All Garments') {
      if (selectedCategory === 'Men') {
        result = result.filter((p) => p.gender === 'Men' || p.gender === 'Unisex');
      } else if (selectedCategory === 'Women') {
        result = result.filter((p) => p.gender === 'Women' || p.gender === 'Unisex');
      } else if (selectedCategory === 'New Arrivals') {
        result = result.filter((p) => p.tag === 'NEW' || p.tag === 'NEW RELEASE');
      } else if (selectedCategory === 'Outerwear') {
        result = result.filter((p) => p.category === 'Outerwear');
      } else if (selectedCategory === 'Hoodies & Sweats') {
        result = result.filter((p) => p.id.includes('hoodie') || p.id.includes('sweat'));
      } else if (selectedCategory === 'Tees') {
        result = result.filter((p) => p.id.includes('tee'));
      } else if (selectedCategory === 'Trousers & Cargos') {
        result = result.filter((p) => p.category === 'Trousers');
      } else if (selectedCategory === 'Accessories') {
        result = result.filter((p) => p.category === 'Accessories');
      }
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s) || selectedSizes.some((sel) => s.includes(sel)))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sel) => c.name.toLowerCase().includes(sel.toLowerCase()))
        )
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Fit filter
    if (selectedFits.length > 0) {
      result = result.filter((p) => p.fit && selectedFits.includes(p.fit));
    }

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest Drop') {
      result.sort((a, b) => (b.tag ? 1 : 0) - (a.tag ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedSizes, selectedColors, maxPrice, selectedFits, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' && selectedCategory !== 'All Garments' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < 650 ? 1 : 0) +
    selectedFits.length;

  return (
    <div className="w-full">
      {/* Breadcrumbs & Architectural Header */}
      <section className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop pt-space-xl pb-space-lg border-b border-outline-variant bg-surface">
        {/* Breadcrumb Pathway */}
        <nav aria-label="Breadcrumb" className="mb-space-md">
          <ol className="flex items-center space-x-2 font-caption text-caption uppercase text-on-surface-variant">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors cursor-pointer">
                Home
              </button>
            </li>
            <li className="select-none text-outline">/</li>
            <li>
              <button onClick={() => setSelectedCategory('All')} className="hover:text-primary transition-colors cursor-pointer">
                Shop
              </button>
            </li>
            <li className="select-none text-outline">/</li>
            <li className="text-primary font-semibold tracking-wider">
              All Products ({filteredProducts.length} Items)
            </li>
          </ol>
        </nav>

        {/* Page Title & Curatorial Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight leading-none">
              COLLECTIONS &amp; ALL PRODUCTS
            </h1>
            <p className="font-body-md text-body-md text-secondary mt-space-sm max-w-2xl leading-relaxed">
              Engineered silhouettes and foundational garments crafted from heavyweight organic textiles. Designed with mathematical precision in our Tokyo and Paris design bureaus.
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-space-sm pb-1">
            <span className="font-caption text-caption text-outline uppercase tracking-widest">
              ATELIER ARCHIVE EDITION 04
            </span>
            <span className="w-8 h-px bg-outline-variant" />
          </div>
        </div>
      </section>

      {/* Main Catalog Workspace */}
      <main className="w-full px-gutter md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="flex flex-col lg:flex-row gap-gutter-desktop items-start">
          {/* Sticky Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-28 space-y-space-xl pb-space-2xl bg-surface">
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-space-sm border-b border-primary">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  FILTERS APPLIED ({activeFilterCount})
                </span>
              </div>
              <button
                onClick={clearAllFilters}
                className="font-caption text-caption uppercase underline text-on-surface-variant hover:text-primary cursor-pointer"
                type="button"
              >
                Reset
              </button>
            </div>

            {/* 1. Categories Accordion */}
            <div className="border-b border-outline-variant pb-space-md">
              <div
                onClick={() => toggleSection('category')}
                className="flex items-center justify-between mb-space-sm cursor-pointer select-none"
              >
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  Category
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {openSections.category ? 'remove' : 'add'}
                </span>
              </div>
              {openSections.category && (
                <ul className="space-y-2 pt-space-xs font-body-sm text-body-sm">
                  {[
                    { label: 'All Garments', val: 'All', count: products.length },
                    { label: 'Outerwear', val: 'Outerwear', count: 24 },
                    { label: 'Hoodies & Sweats', val: 'Hoodies & Sweats', count: 32 },
                    { label: 'Tees', val: 'Tees', count: 18 },
                    { label: 'Trousers & Cargos', val: 'Trousers & Cargos', count: 28 },
                    { label: 'Accessories', val: 'Accessories', count: 16 },
                  ].map((cat) => (
                    <li
                      key={cat.label}
                      onClick={() => setSelectedCategory(cat.val)}
                      className={`flex items-center justify-between cursor-pointer transition-colors ${
                        selectedCategory === cat.val
                          ? 'font-semibold text-primary'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="font-caption text-caption text-outline">{cat.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Size Filter Grid */}
            <div className="border-b border-outline-variant pb-space-md">
              <div
                onClick={() => toggleSection('size')}
                className="flex items-center justify-between mb-space-sm cursor-pointer select-none"
              >
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  Size Metric
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {openSections.size ? 'remove' : 'add'}
                </span>
              </div>
              {openSections.size && (
                <div className="grid grid-cols-3 gap-1.5 pt-space-xs">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`py-2 text-center font-body-sm text-body-sm uppercase transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-on-primary font-semibold'
                            : 'border border-outline-variant hover:border-primary text-on-surface'
                        }`}
                        type="button"
                      >
                        {size}
                      </button>
                    );
                  })}
                  {/* XXL Strike-through */}
                  <button
                    disabled
                    className="py-2 text-center border border-outline-variant text-outline relative overflow-hidden font-body-sm text-body-sm uppercase cursor-not-allowed opacity-60"
                    type="button"
                    title="XXL Archive Depleted"
                  >
                    XXL
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-full h-px bg-outline -rotate-45" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Color Swatches */}
            <div className="border-b border-outline-variant pb-space-md">
              <div
                onClick={() => toggleSection('palette')}
                className="flex items-center justify-between mb-space-sm cursor-pointer select-none"
              >
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  Atelier Palette
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {openSections.palette ? 'remove' : 'add'}
                </span>
              </div>
              {openSections.palette && (
                <div className="grid grid-cols-2 gap-2 pt-space-xs font-body-sm text-body-sm">
                  {[
                    { name: 'Washed Black', hex: '#141416' },
                    { name: 'Bone White', hex: '#ede8df' },
                    { name: 'Mineral Gray', hex: '#6c6f73' },
                    { name: 'Dark Earth', hex: '#4a3f35' },
                    { name: 'Deep Navy', hex: '#1c2836' },
                    { name: 'Olive', hex: '#3d4234' },
                  ].map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <label
                        key={color.name}
                        onClick={() => handleColorToggle(color.name)}
                        className={`flex items-center space-x-2.5 cursor-pointer p-1 border transition-colors ${
                          isSelected ? 'border-primary bg-surface-container-low font-semibold' : 'border-transparent'
                        }`}
                      >
                        <span
                          className="w-4 h-4 border border-outline-variant inline-block shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-on-surface text-xs leading-none">{color.name}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Price Range Slider */}
            <div className="border-b border-outline-variant pb-space-md">
              <div
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between mb-space-sm cursor-pointer select-none"
              >
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  Price Interval
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {openSections.price ? 'remove' : 'add'}
                </span>
              </div>
              {openSections.price && (
                <div className="pt-space-xs space-y-space-sm">
                  <input
                    type="range"
                    min="50"
                    max="650"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-primary bg-outline-variant h-1 cursor-pointer"
                  />
                  <div className="flex items-center justify-between font-caption text-caption text-secondary">
                    <span>$50</span>
                    <span className="font-semibold text-primary font-body-sm font-mono">
                      ${maxPrice} CAP
                    </span>
                    <span>$650</span>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Fit Architecture */}
            <div className="pb-space-sm">
              <div
                onClick={() => toggleSection('fit')}
                className="flex items-center justify-between mb-space-sm cursor-pointer select-none"
              >
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  Silhouette &amp; Fit
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {openSections.fit ? 'remove' : 'add'}
                </span>
              </div>
              {openSections.fit && (
                <div className="space-y-2 pt-space-xs font-body-sm text-body-sm">
                  {['Oversized', 'Relaxed', 'Tailored', 'Boxy'].map((fit) => (
                    <label key={fit} className="flex items-center space-x-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedFits.includes(fit)}
                        onChange={() => handleFitToggle(fit)}
                        className="w-4 h-4 rounded-none border border-primary text-primary focus:ring-0"
                      />
                      <span className={selectedFits.includes(fit) ? 'text-on-surface font-medium' : 'text-secondary'}>
                        {fit}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Products Content Stream */}
          <section className="flex-1 w-full">
            {/* Top Control Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-space-md pb-space-lg mb-space-lg border-b border-outline-variant">
              {/* Active Filter Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-caption text-caption uppercase text-outline tracking-wider mr-1">
                  Active:
                </span>
                {selectedCategory !== 'All' && selectedCategory !== 'All Garments' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full font-label-caps text-label-caps uppercase tracking-widest">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="hover:text-surface-variant flex items-center cursor-pointer"
                      type="button"
                      aria-label="Remove category filter"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {maxPrice < 650 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full font-label-caps text-label-caps uppercase tracking-widest">
                    Under ${maxPrice}
                    <button
                      onClick={() => setMaxPrice(650)}
                      className="hover:text-surface-variant flex items-center cursor-pointer"
                      type="button"
                      aria-label="Remove price cap"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                )}
                {selectedSizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full font-label-caps text-label-caps uppercase tracking-widest"
                  >
                    Size {s}
                    <button
                      onClick={() => handleSizeToggle(s)}
                      className="hover:text-surface-variant flex items-center cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                {selectedColors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-full font-label-caps text-label-caps uppercase tracking-widest"
                  >
                    {c}
                    <button
                      onClick={() => handleColorToggle(c)}
                      className="hover:text-surface-variant flex items-center cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="font-caption text-caption uppercase tracking-wider text-secondary hover:text-primary ml-2 underline cursor-pointer"
                    type="button"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Controls: Grid Density Switcher & Dropdown */}
              <div className="flex items-center space-x-space-lg ml-auto">
                {/* Grid Density Switcher */}
                <div className="hidden sm:flex items-center border border-outline-variant p-0.5 space-x-0.5">
                  <button
                    onClick={() => setGridColumns(2)}
                    aria-label="2 Column Editorial Grid"
                    className={`p-1.5 focus:outline-none cursor-pointer transition-colors ${
                      gridColumns === 2 ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    title="2-Column Editorial View"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button
                    onClick={() => setGridColumns(4)}
                    aria-label="4 Column Standard Grid"
                    className={`p-1.5 focus:outline-none cursor-pointer transition-colors ${
                      gridColumns === 4 ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    title="4-Column Grid"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_compact</span>
                  </button>
                </div>

                {/* Sort By Select Box */}
                <div className="flex items-center space-x-2">
                  <label className="font-label-caps text-label-caps uppercase tracking-widest text-outline">
                    Sort:
                  </label>
                  <div className="relative inline-block">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-surface border-0 border-b border-primary py-1 pr-6 pl-1 font-body-sm text-body-sm font-semibold text-primary focus:ring-0 cursor-pointer"
                    >
                      <option>Featured</option>
                      <option>Newest Drop</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-primary">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Listing Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-outline-variant bg-surface-container-low">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">filter_alt_off</span>
                <h3 className="font-headline-sm text-headline-sm uppercase text-primary">NO PIECES MATCH CRITERIA</h3>
                <p className="font-body-sm text-body-sm text-secondary mt-1 max-w-sm mx-auto">
                  Adjust your active filters or clear them to view the complete atelier archive.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 border border-primary px-6 py-2.5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
                } gap-x-space-md gap-y-space-xl`}
              >
                {filteredProducts.slice(0, displayCount).map((product) => (
                  <article key={product.id} className="group relative flex flex-col">
                    <div
                      onClick={() => onSelectProduct(product)}
                      className="relative w-full aspect-[3/4] bg-surface-container overflow-hidden border border-outline-variant cursor-pointer"
                    >
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="product-img-primary absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <img
                        src={product.secondaryImage}
                        alt={`${product.name} alternate view`}
                        className="product-img-secondary absolute inset-0 w-full h-full object-cover opacity-0"
                        referrerPolicy="no-referrer"
                      />
                      {product.tag && (
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`px-2.5 py-1 font-label-caps text-label-caps uppercase tracking-widest border border-outline-variant ${
                              product.tagType === 'new'
                                ? 'bg-primary text-on-primary font-bold'
                                : 'bg-surface-container-lowest text-primary'
                            }`}
                          >
                            {product.tag}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(product);
                        }}
                        className="absolute bottom-0 inset-x-0 bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer font-bold hover:bg-[#262627]"
                        type="button"
                      >
                        Quick Add +
                      </button>
                    </div>

                    <div className="pt-space-sm flex flex-col flex-1">
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="flex justify-between items-start cursor-pointer group-hover:underline"
                      >
                        <h3 className="font-body-md text-body-md font-semibold text-primary uppercase line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="font-body-md text-body-md text-primary font-medium font-mono shrink-0 ml-2">
                          {currencySymbol}{product.price}
                        </span>
                      </div>
                      <p className="font-caption text-caption text-secondary mt-0.5 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Editorial Pagination & Progress Bar */}
            {filteredProducts.length > 0 && (
              <div className="mt-space-2xl pt-space-xl border-t border-outline-variant flex flex-col items-center">
                <p className="font-body-sm text-body-sm text-secondary mb-space-sm">
                  Showing {Math.min(displayCount, filteredProducts.length)} of {filteredProducts.length} items
                </p>
                {/* Precision Progress Bar */}
                <div className="w-64 h-0.5 bg-surface-variant mb-space-lg relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-300"
                    style={{
                      width: `${(Math.min(displayCount, filteredProducts.length) / filteredProducts.length) * 100}%`,
                    }}
                  />
                </div>
                {/* Primary Load More Action Button */}
                {displayCount < filteredProducts.length && (
                  <button
                    onClick={() => setDisplayCount((prev) => prev + 8)}
                    className="bg-primary text-on-primary px-space-2xl py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all duration-150 cursor-pointer font-bold"
                    type="button"
                  >
                    LOAD MORE PIECES
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Value Props / Atelier Commitments Banner */}
      <section className="w-full bg-surface-container-low border-y border-outline-variant py-space-xl px-gutter md:px-margin-tablet lg:px-margin-desktop mt-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="flex items-center space-x-space-md pt-space-md md:pt-0 md:px-space-md">
            <span className="material-symbols-outlined text-[28px] text-primary">factory</span>
            <div>
              <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                CRAFTED IN PORTUGAL
              </h4>
              <p className="font-caption text-caption text-secondary mt-0.5">
                Family-owned atelier workshops using zero toxic wastewater dyeing.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-space-md pt-space-md md:pt-0 md:px-space-md">
            <span className="material-symbols-outlined text-[28px] text-primary">texture</span>
            <div>
              <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                CUSTOM HEAVYWEIGHT FABRICS
              </h4>
              <p className="font-caption text-caption text-secondary mt-0.5">
                Custom-knitted 280GSM to 500GSM combed organic long-staple cotton.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-space-md pt-space-md md:pt-0 md:px-space-md">
            <span className="material-symbols-outlined text-[28px] text-primary">verified</span>
            <div>
              <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                LIFETIME HARDWARE GUARANTEE
              </h4>
              <p className="font-caption text-caption text-secondary mt-0.5">
                Swiss-engineered Raccagni zippers and solid forged brass closures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
