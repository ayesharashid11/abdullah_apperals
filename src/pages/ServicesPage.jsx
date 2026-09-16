// src/pages/ServicesPage.jsx
import React, { useState } from 'react';
import HeroBottomBar from '../components/HeroBottomBar.jsx';
import FilmstripHeroBackground from '../components/FilmstripHeroBackground.jsx';
import PopularBrandsSlider from '../components/PopularBrandsSlider.jsx';
import ProcessSection from '../components/ProcessSection.jsx';

export default function ServicesPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[520px] md:min-h-[580px] flex flex-col justify-between overflow-hidden bg-black pt-32">
        {/* Continuous Looping Muted Filmstrip Video Background */}
        <FilmstripHeroBackground />

        <div className="max-w-7xl mx-auto px-5 md:px-20 z-20 relative w-full mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1d3956] border border-white"></span>
            Manufacturer & Supplier • End-to-End
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Technical Capabilities
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Full-package apparel manufacturing from raw yarn procurement and computerized grading to finished export garments.
          </p>
        </div>

        {/* Hero Bottom Bar */}
        <HeroBottomBar targetId="services-metrics-strip" exploreLabel="View Capabilities" />
      </section>

      {/* 2. Production Metrics Strip (Always 1 single row on all screen sizes including mobile) */}
      <section id="services-metrics-strip" className="bg-[#f0eeea] border-b border-[#c3c6ce] py-4 sm:py-6 px-3 sm:px-6 md:px-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-6 text-left">
          <div className="border-l-2 border-[#1d3956] pl-2 sm:pl-4">
            <span className="font-['Space_Grotesk'] text-xs sm:text-lg md:text-2xl font-bold text-[#1b1c1a] block leading-tight">
              300 UNITS
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[8px] sm:text-xs uppercase text-[#73777e] tracking-wider block mt-0.5 leading-tight">
              Lowest MOQ
            </span>
          </div>
          <div className="border-l-2 border-[#1d3956] pl-2 sm:pl-4">
            <span className="font-['Space_Grotesk'] text-xs sm:text-lg md:text-2xl font-bold text-[#1b1c1a] block leading-tight">
              4-6 WEEKS
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[8px] sm:text-xs uppercase text-[#73777e] tracking-wider block mt-0.5 leading-tight">
              Avg lead time
            </span>
          </div>
          <div className="border-l-2 border-[#1d3956] pl-2 sm:pl-4">
            <span className="font-['Space_Grotesk'] text-xs sm:text-lg md:text-2xl font-bold text-[#1b1c1a] block leading-tight">
              100%
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[8px] sm:text-xs uppercase text-[#73777e] tracking-wider block mt-0.5 leading-tight">
              QA Inspected
            </span>
          </div>
        </div>
      </section>

      {/* 3. Sub-Navigation Tabs */}
      <section className="bg-white border-b border-[#c3c6ce] sticky top-0 z-30 px-4 sm:px-5 md:px-20 py-2.5 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-1.5 sm:gap-2 items-center">
          <span className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-[#73777e] uppercase font-semibold mr-1 sm:mr-2">
            Jump to:
          </span>
          {[
            { key: 'wovens', label: 'Tailored Wovens & Cut & Sew' },
            { key: 'brand', label: 'Brand Consulting, Design & Marketing' },
            { key: 'apparel-design', label: 'Apparel Designs' },
            { key: 'finishing', label: 'Dyeing & Embellishment' },
            { key: 'process', label: 'Our Process' }
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => scrollToSection(tab.key)}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-['IBM_Plex_Mono'] uppercase tracking-wider rounded-[2px] transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#1d3956] text-white font-semibold'
                  : 'bg-[#f0eeea] text-[#43474d] hover:bg-[#e4e2de]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Section 1: Tailored Wovens & Cut & Sew */}
      <section id="wovens" className="py-12 md:py-20 px-5 md:px-20 max-w-7xl mx-auto scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column (6 cols): Specifications & Details */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#73777e] font-semibold">
              Category 01
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1b1c1a]">
              Tailored Wovens &amp; Cut &amp; Sew
            </h2>
            <p className="font-['Inter'] text-base text-[#43474d] leading-relaxed">
              We manufacture high-grade structured workwear, utility overshirts, tailored trousers, and chore jackets with computerized grading and millimeter-accurate needle feed systems.
            </p>

            <div className="space-y-3 font-['Inter'] text-sm text-[#1b1c1a]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Fabric Varieties:</strong> Japanese compact twills, high-density cotton duck canvas, yarn-dyed poplins, and ripstop blends (200-450 GSM).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Seam Engineering:</strong> Clean felled interior seams, double-needle chainstitch run-offs, reinforced bar-tacks on stress points.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Hardware &amp; Trims:</strong> Corozo nut buttons, heavy-gauge YKK metal zips, custom engraved rivets, and woven internal label packages.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="bg-[#1d3956] text-white px-7 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-semibold hover:bg-[#263c55] transition-colors"
              >
                Request Quote for Wovens
              </button>
            </div>
          </div>

          {/* Right Column (6 cols): 3 Stacked Process Photos */}
          <div className="md:col-span-6 space-y-4">
            <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Precision tailoring workstation"
                className="w-full h-36 sm:h-44 md:h-40 lg:h-44 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                  alt="Pattern grading on cutting table"
                  className="w-full h-28 sm:h-36 md:h-32 lg:h-36 object-cover"
                />
              </div>
              <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80"
                  alt="Finished woven garment details"
                  className="w-full h-28 sm:h-36 md:h-32 lg:h-36 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 2: Brand Consulting, Brand Design & Brand Marketing */}
      <section id="brand" className="bg-[#f0eeea] border-y border-[#c3c6ce] py-12 md:py-20 px-5 md:px-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Column (6 cols): Brand Identity Design Photo */}
          <div className="md:col-span-6">
            <div className="border border-[#c3c6ce] bg-white p-2 rounded-[2px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"
                alt="Brand consulting, design strategy and creative identity studio"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] object-cover"
              />
            </div>
          </div>

          {/* Right Column (6 cols): Specs and Details */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#73777e] font-semibold">
              Category 02
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1b1c1a]">
              Brand Consulting, Brand Design &amp; Brand Marketing
            </h2>
            <p className="font-['Inter'] text-base text-[#43474d] leading-relaxed">
              We guide emerging labels and established global brands through holistic identity architecture, positioning strategies, packaging development, and multi-channel marketing campaigns.
            </p>

            <div className="space-y-3 font-['Inter'] text-sm text-[#1b1c1a]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Brand Consulting &amp; Strategy:</strong> Market positioning analysis, pricing architecture, SKU assortment planning, and wholesale go-to-market roadmaps.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Brand Design &amp; Packaging:</strong> Custom visual identity systems, typography guides, branded trims, woven labels, hangtags, and eco-friendly packaging.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Brand Marketing &amp; Launch:</strong> High-impact visual campaign direction, digital asset production, social launch playbooks, and lookbook curation.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="bg-[#1d3956] text-white px-7 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-semibold hover:bg-[#263c55] transition-colors"
              >
                Start Brand Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 3: Apparel Designs */}
      <section id="apparel-design" className="py-12 md:py-20 px-5 md:px-20 max-w-7xl mx-auto scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column (6 cols): Specs and Details */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#73777e] font-semibold">
              Category 03
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1b1c1a]">
              Apparel Designs
            </h2>
            <p className="font-['Inter'] text-base text-[#43474d] leading-relaxed">
              Complete fashion design solutions converting conceptual moodboards into production-ready technical dossiers, 3D virtual fittings, and precision CAD flat sketches.
            </p>

            <div className="space-y-3 font-['Inter'] text-sm text-[#1b1c1a]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>BOM &amp; Technical Specs:</strong> Comprehensive Bill of Materials, measurement tables, stitch tolerances, and graded manufacturing dossiers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>3D Virtual Sampling:</strong> 3D CLO and Browzwear digital garment simulation, drape physics analysis, and rapid digital sample sign-offs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>CAD Flats &amp; Silhouette Architecture:</strong> Detailed vector flat drawings with construction callouts and seasonal colorway palettes.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="bg-[#1d3956] text-white px-7 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-semibold hover:bg-[#263c55] transition-colors"
              >
                Request Apparel Design Scope
              </button>
            </div>
          </div>

          {/* Right Column (6 cols): Process & CAD Photos */}
          <div className="md:col-span-6 space-y-4">
            <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                alt="Apparel pattern design and CAD technical sketches"
                className="w-full h-36 sm:h-44 md:h-40 lg:h-44 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
                  alt="Garment construction and fabric drape testing"
                  className="w-full h-28 sm:h-36 md:h-32 lg:h-36 object-cover"
                />
              </div>
              <div className="border border-[#c3c6ce] bg-white p-1 rounded-[2px]">
                <img
                  src="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&w=600&q=80"
                  alt="Fashion design moodboards and color palettes"
                  className="w-full h-28 sm:h-36 md:h-32 lg:h-36 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section 4: Dyeing & Embellishment */}
      <section id="finishing" className="bg-[#f0eeea] border-y border-[#c3c6ce] py-12 md:py-20 px-5 md:px-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Left Column (6 cols): Embellishment / Dyeing Photo */}
          <div className="md:col-span-6">
            <div className="border border-[#c3c6ce] bg-white p-2 rounded-[2px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80"
                alt="Silk screen printing and embroidery embellishment workshop"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[440px] object-cover"
              />
            </div>
          </div>

          {/* Right Column (6 cols): Specs and Details */}
          <div className="md:col-span-6 space-y-4 sm:space-y-6">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-[#73777e] font-semibold">
              Category 04
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1b1c1a]">
              Dyeing &amp; Embellishment
            </h2>
            <p className="font-['Inter'] text-base text-[#43474d] leading-relaxed">
              In-house reactive dyeing, pigment dye vintage fading, 3D high-density puff screen printing, chenille patches, and micro-precision computerized embroidery.
            </p>

            <div className="space-y-3 font-['Inter'] text-sm text-[#1b1c1a]">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Color Lab &amp; Dyeing:</strong> Pantone D65/TL84 certified light box matching, reactive piece dyeing, acid wash, and vintage sun-fade treatments.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Screen &amp; Digital Printing:</strong> High-density 3D puff prints, discharge water-based ink, soft silicone transfers, and metallic foils.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#3f7a4e] text-lg shrink-0 mt-0.5">check_circle</span>
                <span><strong>Tajima Computerized Embroidery:</strong> Multi-head 12-color precision embroidery, chenille chainstitch patches, and 3D foam appliques.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('quote')}
                className="bg-[#1d3956] text-white px-7 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-semibold hover:bg-[#263c55] transition-colors"
              >
                Request Quote for Embellishment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section 5: Our Process */}
      <ProcessSection />

      {/* Popular Brands Slider before footer */}
      <PopularBrandsSlider />
    </div>
  );
}
