// src/pages/PortfolioPage.jsx
import React, { useState } from 'react';
import HeroBottomBar from '../components/HeroBottomBar.jsx';
import FilmstripHeroBackground from '../components/FilmstripHeroBackground.jsx';
import PopularBrandsSlider from '../components/PopularBrandsSlider.jsx';
import FilterTabs from '../components/FilterTabs.jsx';
import MasonryGallery from '../components/MasonryGallery.jsx';
import ProductSpecModal from '../components/ProductSpecModal.jsx';
import { portfolioItems, filterOptions } from '../data/portfolioData.js';

export default function PortfolioPage({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="w-full bg-[#fbf9f5]">
      {/* 1. Hero Section (Kept strictly intact) */}
      <section className="relative w-full min-h-[520px] md:min-h-[580px] flex flex-col justify-between overflow-hidden bg-black pt-32">
        {/* Continuous Looping Muted Filmstrip Video Background */}
        <FilmstripHeroBackground />

        <div className="max-w-7xl mx-auto px-5 md:px-20 z-20 relative w-full mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#3f7a4e]"></span>
            Manufacturer & Supplier • 2021–Present
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Apparel Delivered
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            A curated collection of technical outerwear, loopback knitwear, and precision-constructed cut and sew garments produced for global brands.
          </p>
        </div>

        {/* Hero Bottom Bar */}
        <HeroBottomBar targetId="portfolio-filter-section" exploreLabel="Filter Items" />
      </section>

      {/* 2. Main Portfolio Section with Filter Bar & Masonry Gallery */}
      <section id="portfolio-filter-section" className="py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto scroll-mt-20">
        {/* Reusable Centered Filter Tabs Bar */}
        <FilterTabs
          options={filterOptions}
          activeKey={filter}
          onChange={(newFilter) => setFilter(newFilter)}
          className="mb-10 sm:mb-14"
        />

        {/* Reusable Masonry Gallery Grid */}
        <MasonryGallery
          items={filteredItems}
          onItemClick={(item) => setSelectedItem(item)}
        />

        {/* Centered "Request a Quote" Button at the End of Gallery */}
        <div className="mt-14 sm:mt-18 md:mt-20 text-center flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#14161a] hover:bg-[#1d3956] text-white rounded-[4px] sm:rounded-md font-['Space_Grotesk'] text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
          >
            <span>Request a Quote</span>
            <span className="material-symbols-outlined text-base sm:text-lg group-hover:translate-x-1.5 transition-transform">
              arrow_forward
            </span>
          </button>
          <p className="mt-3 font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-[#73777e] uppercase tracking-wider">
            Custom Tech Packs, Fabric Blends & Bulk Production Inquiries Welcome
          </p>
        </div>
      </section>

      {/* Reusable Product Spec Detail Modal */}
      <ProductSpecModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAction={() => {
          setSelectedItem(null);
          onNavigate('quote');
        }}
        actionLabel="Request Quote For This Style"
      />

      {/* Popular Brands Slider before footer (Kept strictly intact) */}
      <PopularBrandsSlider />
    </div>
  );
}
