// src/components/FilmstripHeroBackground.jsx
import React from 'react';

const LOOKBOOK_ITEMS = [
  {
    id: 'f1',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80',
    title: 'Burgundy Tracksuit / Peace Set',
    code: '01'
  },
  {
    id: 'f2',
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
    title: 'Mandala Print Heavyweight Tee',
    code: '02'
  },
  {
    id: 'f3',
    img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=500&q=80',
    title: 'Pastel Rose Tee & Cargo Trousers',
    code: '03'
  },
  {
    id: 'f4',
    img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80',
    title: 'Minimalist Button-Up & Wide Trouser',
    code: '04'
  },
  {
    id: 'f5',
    img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=500&q=80',
    title: 'Technical Storm Parka Shell',
    code: '05'
  },
  {
    id: 'f6',
    img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80',
    title: 'Utility Cargo & Loose Fleece',
    code: '06'
  },
  {
    id: 'f7',
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80',
    title: 'Custom Screenprint Graphic Crew',
    code: '07'
  },
  {
    id: 'f8',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80',
    title: 'Structured Workwear Overshirt',
    code: '08'
  }
];

function FilmStripRow({ items, reverse = false }) {
  // Duplicate array for seamless infinite looping marquee
  const sequence = [...items, ...items, ...items];

  return (
    <div className={`flex items-center ${reverse ? 'animate-filmstrip-right' : 'animate-filmstrip-left'}`}>
      {sequence.map((item, idx) => (
        <div
          key={`${item.id}-${idx}`}
          className="relative bg-[#111111] border-y-[10px] border-x-[5px] border-[#0a0a0a] shadow-2xl shrink-0 flex flex-col justify-between"
          style={{ width: '220px', height: '300px', margin: '0 4px' }}
        >
          {/* Top 35mm Sprocket Holes */}
          <div className="w-full h-5 bg-[#0a0a0a] flex items-center justify-between px-2 overflow-hidden select-none">
            <div className="flex gap-2.5">
              {[...Array(6)].map((_, sIdx) => (
                <div
                  key={sIdx}
                  className="w-3.5 h-2.5 bg-[#e5e5e5]/80 rounded-[1.5px] border border-black/40"
                />
              ))}
            </div>
            <span className="font-['IBM_Plex_Mono'] text-[8px] text-[#f59e0b] font-bold tracking-tighter">
              KODAK {item.code}A
            </span>
          </div>

          {/* Film Negative Frame */}
          <div className="relative w-full flex-1 overflow-hidden bg-[#1a1a1a] p-1">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover contrast-105 brightness-100"
            />
            <div className="absolute bottom-1.5 left-2 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded-[1px]">
              <span className="font-['IBM_Plex_Mono'] text-[8px] text-white/90 font-mono">
                FRAME #{((idx % items.length) + 1).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Bottom 35mm Sprocket Holes */}
          <div className="w-full h-5 bg-[#0a0a0a] flex items-center justify-between px-2 overflow-hidden select-none">
            <span className="font-['IBM_Plex_Mono'] text-[8px] text-[#f59e0b] font-bold tracking-tighter">
              SAFETY FILM • 400
            </span>
            <div className="flex gap-2.5">
              {[...Array(6)].map((_, sIdx) => (
                <div
                  key={sIdx}
                  className="w-3.5 h-2.5 bg-[#e5e5e5]/80 rounded-[1.5px] border border-black/40"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FilmstripHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0d0f12]"
    >
      {/* Studio Lighting Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#323640] via-[#1a1c22] to-[#0d0f12] opacity-80" />

      {/* Two Diagonal Crossing Film Strips matching video */}
      <div className="absolute inset-0 flex items-center justify-center scale-110 sm:scale-125 md:scale-135 opacity-90">
        {/* Strip 1: Top-Left to Bottom-Right (Rotated -24 deg) */}
        <div
          className="absolute w-[240%] -translate-y-24 md:-translate-y-28 transform -rotate-[24deg] shadow-2xl"
          style={{ willChange: 'transform' }}
        >
          <FilmStripRow items={LOOKBOOK_ITEMS} reverse={false} />
        </div>

        {/* Strip 2: Bottom-Left to Top-Right (Rotated +24 deg) */}
        <div
          className="absolute w-[240%] translate-y-24 md:translate-y-28 transform rotate-[24deg] shadow-2xl"
          style={{ willChange: 'transform' }}
        >
          <FilmStripRow items={[...LOOKBOOK_ITEMS].reverse()} reverse={true} />
        </div>
      </div>

      {/* Lightened Translucent Glass Overlay for enhanced visibility of background animation */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12]/85 via-black/35 to-black/20 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/40 z-10" />
    </div>
  );
}
