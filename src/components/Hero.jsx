// src/components/Hero.jsx
import React from 'react';
import HeroBottomBar from './HeroBottomBar.jsx';
import FilmstripHeroBackground from './FilmstripHeroBackground.jsx';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[540px] md:min-h-[600px] flex flex-col justify-between overflow-hidden bg-black">
      {/* Continuous Looping Muted Filmstrip Video Background */}
      <FilmstripHeroBackground />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-20 pt-32 pb-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white font-['IBM_Plex_Mono'] text-[11px] sm:text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#35506e] animate-pulse"></span>
           Submit Your Inquiry
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight mb-3 sm:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Request a Quote
          </h1>
          <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Submit your technical specifications for manufacturing evaluation. Our engineers typically respond within 24-48 hours with initial feasibility and pricing estimates.
          </p>
        </div>
      </div>

      {/* Reusable Hero Bottom Bar */}
      <HeroBottomBar exploreLabel="Fill RFQ Form" targetId="rfq-form-section" />
    </section>
  );
}
