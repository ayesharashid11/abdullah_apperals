// src/components/PopularBrandsSlider.jsx
import React, { useRef, useState } from 'react';
import { BRANDS } from '../data/brandsData.js';

export default function PopularBrandsSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(25); // seconds for one loop

  const handleSpeedToggle = () => {
    setSpeed((prev) => (prev === 25 ? 15 : 25));
  };

  return (
    <section className="py-12 md:py-16 border-y border-[#c3c6ce] bg-[#fbf9f5] px-5 md:px-20 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8  pb-3 md:pb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1b1c1a] whitespace-nowrap">
              Popular Brands
            </h2>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] text-[#43474d] uppercase tracking-wider shrink-0">
            {/*   <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="hover:text-[#1d3956] transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white/70 border border-[#c3c6ce] rounded-[2px]"
              aria-label={isPaused ? 'Resume sliding' : 'Pause sliding'}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button> */}
            <span className="text-[#c3c6ce] hidden sm:inline">•</span>
            <span className="text-[#73777e] hidden sm:inline">Production Partners</span>
          </div>
        </div>

        {/* Smooth Infinite Marquee Track with Edge Gradients */}
        <div
          className="relative w-full overflow-hidden py-2 sm:py-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left / Right Soft Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-r from-[#fbf9f5] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-20 bg-gradient-to-l from-[#fbf9f5] to-transparent z-10 pointer-events-none" />

          {/* Marquee Inner Container (Duplicated array for seamless continuous loop) */}
          <div
            className="animate-brand-marquee flex items-center gap-4 sm:gap-8 md:gap-12"
            style={{
              animationDuration: `${speed}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="group flex flex-col justify-center items-start px-3.5 py-2.5 sm:px-6 sm:py-4 bg-white/80 border border-[#c3c6ce] hover:border-[#1d3956] rounded-[2px] min-w-[150px] sm:min-w-[190px] md:min-w-[230px] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
                  <span className="font-['IBM_Plex_Mono'] text-[9px] sm:text-[10px] text-[#73777e] tracking-widest uppercase">
                    {brand.year}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c3c6ce] group-hover:bg-[#1d3956] transition-colors" />
                </div>
                <div className="font-['Space_Grotesk'] text-sm sm:text-lg md:text-xl font-bold tracking-tight text-[#1b1c1a] group-hover:text-[#1d3956] transition-colors whitespace-nowrap">
                  {brand.name}
                </div>
                <div className="font-['Inter'] text-[11px] sm:text-xs text-[#43474d] mt-0.5 sm:mt-1 font-medium whitespace-nowrap">
                  {brand.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

