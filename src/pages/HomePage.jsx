// src/pages/HomePage.jsx
import React, { useState } from 'react';
import PopularBrandsSlider from '../components/PopularBrandsSlider.jsx';
import HeroBottomBar from '../components/HeroBottomBar.jsx';
import ProcessSection from '../components/ProcessSection.jsx';
import { whatWeMakeProducts, manufacturedCategories } from '../data/homeData.js';

export default function HomePage({ onNavigate }) {
  const [portfolioTab, setPortfolioTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 bg-black overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          poster="https://lh3.googleusercontent.com/aida-public/AB6AXuAax87uUjo9DW4558OpMxl3UuWFQD872rMm10dVzF1tHVPktWsr3yvDv89EL5FQQJiYzAy64bbhbLx8uJguYtYXUzilQKFwwIr8R2gymtnQaPeAgvqI7gQ9PoNxGv9w2qxkb3PJCRiANE8YM4YBM_vF4IrVA_du6lwQGPTXUU2SuSEctx1asEGiq3OCz5R6260YSyvE4SgR2tAvkH-a-D-ziDjUaFRgTYM0WJhGHS1QocaaNGhrBmwr"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-needle-in-slow-motion-41005-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Center Hero Content */}
        <div className="text-center px-4 sm:px-6 md:px-20 mb-8 sm:mb-12 z-20 relative flex-grow flex flex-col justify-center items-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6 rounded-[2px]">
            <span className="w-2 h-2 rounded-full bg-[#a7c2e5] animate-pulse"></span>
            Manufacturer & Supplier • Est. 2021
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight drop-shadow-md">
            Quality manufacturing. Reliable supply. Built for your business.
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Showcase your true brand identity with precision cut &amp; sew apparel manufacturing, custom knitwear, and scalable production.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="bg-[#1d3956] text-white font-['IBM_Plex_Mono'] text-xs sm:text-sm uppercase tracking-widest px-7 sm:px-10 py-3.5 sm:py-4 rounded-[2px] hover:bg-[#263c55] transition-all border border-[#35506e] inline-block shadow-lg cursor-pointer font-semibold"
          >
            Request a Quote
          </button>
        </div>

        {/* Bottom Bar inside Hero (Reusable Component) */}
        <HeroBottomBar targetId="about" />
      </section>

      {/* 2. Trust Bar (Strictly 1 row with 3 columns on all screen sizes including mobile) */}
      <section className="border-y border-[#c3c6ce] bg-[#fbf9f5] py-2.5 sm:py-5 md:py-6 px-2 sm:px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-1 sm:gap-4 md:gap-6 text-[#43474d] font-['IBM_Plex_Mono'] text-[9px] sm:text-xs md:text-sm items-center">
          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-center sm:text-left">
            <span className="material-symbols-outlined text-[#1d3956] !text-[11px] sm:!text-base md:!text-lg shrink-0">factory</span>
            <span className="leading-tight whitespace-nowrap">
              <span className="hidden sm:inline">60,000 garments/year capacity</span>
              <span className="sm:hidden">60,000/yr capacity</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-center">
            <span className="material-symbols-outlined text-[#1d3956] !text-[11px] sm:!text-base md:!text-lg shrink-0">history</span>
            <span className="leading-tight whitespace-nowrap">Since 2021</span>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-2 text-center sm:text-right">
            <span className="material-symbols-outlined text-[#1d3956] !text-[11px] sm:!text-base md:!text-lg shrink-0">location_on</span>
            <span className="leading-tight whitespace-nowrap">Lahore, Pakistan</span>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-10 md:py-16 px-5 md:px-20 max-w-7xl mx-auto scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1a] mb-4 sm:mb-6">
              About Us
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-[#43474d] leading-relaxed mb-6">
              Based in Lahore, Pakistan, Abdullah Apparels Networks is a premier apparel manufacturing facility established in 2021. We specialize in producing high-quality garments with a capacity of 60,000 units per year.
            </p>

            <div className="border-l-4 border-[#1d3956] pl-4 sm:pl-6 my-6 sm:my-8">
              <p className="font-['Space_Grotesk'] text-lg sm:text-xl md:text-2xl text-[#1b1c1a] italic mb-2 sm:mb-3 font-semibold leading-snug">
                &ldquo;Our commitment to quality and innovation drives every stitch we make.&rdquo;
              </p>
              <p className="font-['IBM_Plex_Mono'] text-xs text-[#73777e] uppercase tracking-widest font-semibold">
                — Abdullah Amin, Marketing Director
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-8 pt-6 sm:pt-8 border-t border-[#c3c6ce]">
              <div>
                <p className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs text-[#73777e] uppercase tracking-wider sm:tracking-widest mb-1 font-semibold">
                  Location
                </p>
                <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#1b1c1a] font-semibold whitespace-nowrap">
                  Lahore, Pakistan
                </p>
              </div>
              <div>
                <p className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs text-[#73777e] uppercase tracking-wider sm:tracking-widest mb-1 font-semibold">
                  Capacity
                </p>
                <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#1b1c1a] font-semibold whitespace-nowrap">
                  60,000 garments/year
                </p>
              </div>
            </div>
          </div>

          <div className="h-[400px] md:h-[500px] bg-[#e4e2de] rounded overflow-hidden shadow-xs">
            <img
              alt="Factory interior showing skilled workers producing garments"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAax87uUjo9DW4558OpMxl3UuWFQD872rMm10dVzF1tHVPktWsr3yvDv89EL5FQQJiYzAy64bbhbLx8uJguYtYXUzilQKFwwIr8R2gymtnQaPeAgvqI7gQ9PoNxGv9w2qxkb3PJCRiANE8YM4YBM_vF4IrVA_du6lwQGPTXUU2SuSEctx1asEGiq3OCz5R6260YSyvE4SgR2tAvkH-a-D-ziDjUaFRgTYM0WJhGHS1QocaaNGhrBmwr"
            />
          </div>
        </div>

        {/* Key Operational Departments */}
        <div className="mt-7 sm:mt-12 md:mt-12 pt-8 sm:pt-12 md:pt-16 border-t border-[#c3c6ce]">
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-12">
            {/* DEPT. 01 */}
            <div className="border-t-2 border-[#1d3956] pt-3 sm:pt-4 md:pt-5">
              <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs font-semibold text-[#1d3956] uppercase tracking-widest block mb-1.5 sm:mb-2">
                DEPT. 01
              </span>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-lg md:text-2xl font-bold text-[#1b1c1a] mb-1.5 sm:mb-2.5 leading-snug">
                Marketing &amp; Product Development
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#43474d] leading-relaxed">
                Seasonal development for existing clients, plus sourcing-show presence across Europe, N. America and Australia to shape the product line.
              </p>
            </div>

            {/* DEPT. 02 */}
            <div className="border-t-2 border-[#1d3956] pt-3 sm:pt-4 md:pt-5">
              <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs font-semibold text-[#1d3956] uppercase tracking-widest block mb-1.5 sm:mb-2">
                DEPT. 02
              </span>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-lg md:text-2xl font-bold text-[#1b1c1a] mb-1.5 sm:mb-2.5 leading-snug">
                Merchandising
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#43474d] leading-relaxed">
                Manages customer liaison post-order — approvals, production timelines, and status updates on prescribed formats.
              </p>
            </div>

            {/* DEPT. 03 */}
            <div className="border-t-2 border-[#1d3956] pt-3 sm:pt-4 md:pt-5">
              <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs font-semibold text-[#1d3956] uppercase tracking-widest block mb-1.5 sm:mb-2">
                DEPT. 03
              </span>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-lg md:text-2xl font-bold text-[#1b1c1a] mb-1.5 sm:mb-2.5 leading-snug">
                Quality Control
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#43474d] leading-relaxed">
                Reports directly to top management. In-process, incoming-material and final AQL audits at every phase.
              </p>
            </div>

            {/* DEPT. 04 */}
            <div className="border-t-2 border-[#1d3956] pt-3 sm:pt-4 md:pt-5">
              <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs font-semibold text-[#1d3956] uppercase tracking-widest block mb-1.5 sm:mb-2">
                DEPT. 04
              </span>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-lg md:text-2xl font-bold text-[#1b1c1a] mb-1.5 sm:mb-2.5 leading-snug">
                Logistics
              </h3>
              <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#43474d] leading-relaxed">
                Manages inbound trims/accessories and outbound shipments, customs documentation, and incoterms coordination.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 5. Capability Grid (What We Make / Recent Outputs) */}
      <section id="services-preview" className="py-0 md:py-10 px-5 md:px-20 max-w-7xl mx-auto">
        {/* Section Header matching reference design */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#73777e] font-semibold block mb-2 sm:mb-3">
            OUR PROJECTS
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1a] mb-3 sm:mb-5 tracking-tight">
            Recent Output
          </h2>
          <p className="font-['Inter'] text-xs sm:text-sm md:text-base text-[#43474d] leading-relaxed">
            High-precision garment manufacturing across technical cargo pants, fluid drape tailored trousers, fleece athletic sets, and luxury interlock knitwear.
          </p>
        </div>

        {/* 6-Item Grid (2 Cards on Mobile, 3 Cards on Tablet & Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 md:gap-y-16">
          {whatWeMakeProducts.map((product) => (
            <div key={product.id} className="group flex flex-col items-center">
              {/* Image Frame */}
              <div className="w-full h-[220px] sm:h-[290px] md:h-[350px] lg:h-[420px] rounded-[6px] sm:rounded-[8px] lg:rounded-[10px] overflow-hidden bg-[#e4e2de] shadow-xs border border-[#c3c6ce]">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Navy Spec Box */}
              <div className="relative -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 w-[94%] sm:w-[90%] md:w-[86%] bg-[#1a2938] hover:bg-[#15222f] transition-all duration-300 rounded-[6px] sm:rounded-[8px] p-2.5 sm:p-4 md:p-5 lg:p-6 text-white text-center shadow-xl border border-[#2b3e54] flex flex-col items-center justify-between min-h-[115px] sm:min-h-[135px] md:min-h-[145px] group-hover:-translate-y-1.5 z-10">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                    {product.title}
                  </h3>
                  <p className="font-['Inter'] text-[10px] sm:text-xs text-[#c3c6ce] leading-tight sm:leading-relaxed mb-2 sm:mb-3 line-clamp-2 md:line-clamp-none">
                    {product.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="font-['IBM_Plex_Mono'] text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#8eb0d8] group-hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <span className="material-symbols-outlined text-[10px] sm:text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Spec / Quote CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pt-12 ">
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="bg-[#1d3956] text-white font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest px-8 py-4 rounded-[2px] hover:bg-[#263c55] transition-all border border-[#35506e] font-semibold cursor-pointer flex items-center gap-2"
          >
            <span>Explore Full Tech Specs</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('quote')}
            className="bg-transparent text-[#1b1c1a] border border-[#c3c6ce] hover:border-[#1d3956] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest px-8 py-4 rounded-[2px] hover:bg-white transition-all font-semibold cursor-pointer"
          >
            Request Custom Quotation
          </button>
        </div>
      </section>

      {/* Product Spec Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div
            className="bg-[#fbf9f5] border border-[#c3c6ce] rounded-[4px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#73777e] hover:text-[#1b1c1a] p-1.5 rounded-full hover:bg-[#e8e6e1] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="rounded-[4px] overflow-hidden border border-[#c3c6ce] bg-white h-[320px]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-4">
                <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#1d3956] font-semibold uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#1b1c1a]">
                  {selectedProduct.title}
                </h3>
                <div className="p-3.5 bg-white border border-[#c3c6ce] rounded-[2px] space-y-1.5 font-['IBM_Plex_Mono'] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#73777e]">GSM:</span>
                    <span className="font-bold text-[#1b1c1a]">{selectedProduct.gsm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73777e]">Content:</span>
                    <span className="font-bold text-[#1b1c1a]">{selectedProduct.content}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#73777e]">Fabric Type:</span>
                    <span className="font-bold text-[#1b1c1a]">{selectedProduct.fabric}</span>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[#43474d] leading-relaxed">
                  {selectedProduct.details}
                </p>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      onNavigate('quote');
                    }}
                    className="flex-1 bg-[#1d3956] text-white py-3 px-4 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-semibold hover:bg-[#263c55] transition-colors text-center cursor-pointer"
                  >
                    Request Sample / Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. What We Manufacture Section */}
      <section id="manufacture" className="py-14 md:py-20 px-5 md:px-20 bg-[#fbf9f5] border-y border-[#c3c6ce]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10  pb-5 text-center">
            <span className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#73777e] font-semibold block mb-2">
              CORE PRODUCTION CAPABILITIES
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1a] tracking-tight">
              What We Manufacture
            </h2>
          </div>

          {/* 6-Card Category Showcase Grid (Matching Recent Output card style) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-3 sm:gap-x-5 md:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 md:gap-y-16">
            {manufacturedCategories.map((item) => (
              <div key={item.id} className="group flex flex-col items-center">
                {/* Image Frame */}
                <div className="w-full h-[220px] sm:h-[290px] md:h-[350px] lg:h-[420px] rounded-[6px] sm:rounded-[8px] lg:rounded-[10px] overflow-hidden bg-[#e4e2de] shadow-xs border border-[#c3c6ce]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Navy Spec Box */}
                <div className="relative -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 w-[94%] sm:w-[90%] md:w-[86%] bg-[#1a2938] hover:bg-[#15222f] transition-all duration-300 rounded-[6px] sm:rounded-[8px] p-2.5 sm:p-4 md:p-5 lg:p-6 text-white text-center shadow-xl border border-[#2b3e54] flex flex-col items-center justify-between min-h-[115px] sm:min-h-[135px] md:min-h-[145px] group-hover:-translate-y-1.5 z-10">
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs sm:text-sm md:text-base lg:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-['IBM_Plex_Mono'] text-[10px] sm:text-xs text-[#a7c2e5] font-semibold tracking-wider uppercase mb-2 sm:mb-3">
                      {item.tag} • {item.gsm}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct({
                      id: item.id,
                      title: item.name,
                      category: item.tag,
                      gsm: item.gsm,
                      content: item.fabric,
                      fabric: item.tag,
                      details: item.desc,
                      image: item.image,
                    })}
                    className="font-['IBM_Plex_Mono'] text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-[#8eb0d8] group-hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <span className="material-symbols-outlined text-[10px] sm:text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Centered See More Button */}
          <div className="flex justify-center mt-10 sm:mt-14">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="bg-[#1d3956] text-white font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest px-8 py-4 rounded-[2px] hover:bg-[#263c55] transition-all border border-[#35506e] font-semibold cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <span>See More</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
      {/* 4. Popular Brands Section (Slider Component) */}
      <PopularBrandsSlider />
      {/* 7. Process Section */}
      <ProcessSection />
    </div>
  );
}
