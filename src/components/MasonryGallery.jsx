// src/components/MasonryGallery.jsx
import React from 'react';

/**
 * Reusable Masonry Gallery Component
 * @param {Array<Object>} items - Array of gallery items
 * @param {Function} onItemClick - Callback when an item is clicked
 * @param {string} className - Optional container styling
 */
export default function MasonryGallery({
  items = [],
  onItemClick,
  className = ''
}) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 text-[#73777e] font-['IBM_Plex_Mono'] text-sm">
        No garments found in this category.
      </div>
    );
  }

  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance] ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick && onItemClick(item)}
          className="break-inside-avoid mb-4 sm:mb-6 rounded-xl sm:rounded-2xl overflow-hidden bg-[#e4e2de] border border-[#c3c6ce]/70 shadow-xs hover:shadow-2xl transition-all duration-500 group relative cursor-pointer"
        >
          {/* Image Frame with variable height */}
          <div className={`relative w-full ${item.heightClass || 'h-[360px] sm:h-[420px]'} overflow-hidden`}>
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Top Category Badge */}
            {(item.categoryLabel || item.category) && (
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] bg-black/60 backdrop-blur-md border border-white/20 text-white font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] font-medium tracking-wider uppercase">
                  {item.categoryLabel || item.category}
                </span>
              </div>
            )}

            {/* Top Right Spec Tag (e.g., GSM) */}
            {item.gsm && (
              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] bg-[#1d3956]/80 backdrop-blur-md text-white font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] font-medium tracking-wider">
                  {item.gsm}
                </span>
              </div>
            )}

            {/* Bottom Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-white">
              <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-[#a7c2e5] transition-colors">
                {item.title}
              </h3>

              {item.fabric && (
                <p className="font-['IBM_Plex_Mono'] text-[11px] sm:text-xs text-gray-300 line-clamp-1 mb-2">
                  {item.fabric}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[11px] font-['IBM_Plex_Mono']">
                <span className="text-gray-300">{item.moq || 'Custom MOQ'}</span>
                <span className="text-[#a7c2e5] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Specs <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
