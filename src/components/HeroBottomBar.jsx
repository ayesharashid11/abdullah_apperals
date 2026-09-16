// src/components/HeroBottomBar.jsx
import React, { useId } from 'react';

export default function HeroBottomBar({
  targetId,
  onExploreClick,
  exploreLabel = 'Explore More',
  reviewCount = '10K+ Reviews',
  reviewSubtext = 'Customers are satisfied',
  badgeText = 'BEST QUALITY • BEST DESIGN • BEST QUALITY • BEST DESIGN •',
  className = ''
}) {
  const uniqueId = useId().replace(/:/g, '-');
  const pathId = `hero-circle-path-${uniqueId}`;

  const handleScroll = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Fallback: smooth scroll down by viewport height
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
  };

  return (
    <div
      id="hero-bottom-bar"
      className={`w-full px-4 sm:px-6 md:px-20 py-4 sm:py-6 md:py-8 flex flex-col sm:flex-row justify-between items-center z-20 relative border-t border-white/20 gap-4 sm:gap-6 ${className}`}
    >
      {/* 1. Reviews Strip */}
      <div id="hero-reviews-strip" className="flex items-center gap-4">
        <div className="flex -space-x-3">
          <img
            alt="Client review avatar 1"
            className="w-10 h-10 rounded-full border-2 border-[#fbf9f5] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRm4XE3KfRLe0oRcC61ALIKz8ElZlgvKbWDThCpJPLQ9XYv57Wf_EeT2EEC-q7_h-9PH8tNlWGo7a1s5PYuNNwNPqHKrBtQi1S80LuvZcLdY6SIIaFDdB3u3NskOcCrF9Ftw0NHm3DLaH9sJHsxnjNiVbf-te7in8VhYaJm92cucH5Yyl55lF1HTnfw6r2PLjjxodFQxOlg5sYRN488iC9sqIwiH6y0-XSmubRBmQUN8XBsv3wFyBd"
          />
          <img
            alt="Client review avatar 2"
            className="w-10 h-10 rounded-full border-2 border-[#fbf9f5] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvzgc2b99IvQtx-IO9drXcMvct_oWNMy04umGNq9UETUzyt5W3N9TeBaM9UP2CyJ0trbZCT8drTlXieBb_NQF-Fc3zDFKOJVZMeaPsK_Aew0WQoAeLtKXrLWB5zoLH23UVpEJgKabXMTLkj61zMJXTy9Afjouphq2m4ZE4zXbFx40ShLlBGjElmte-1EVhhmLdrB6iDA4uddeIdH1VfGDdY34Dh8mfMc3QZhJDwBuRSBgeKmdTUfar"
          />
          <img
            alt="Client review avatar 3"
            className="w-10 h-10 rounded-full border-2 border-[#fbf9f5] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1iX4hNSb7Zkf7W8BzyHhnjnvCULg6kt6xIsg0Wi0MoOHFA_YD1e1DNtrO0ArztcYb7Xep7Olpv6WVF3hob9Z9GFAx7xz02VY8IwEkl-odFkicxzhwuObxKpLi60dvTuOrTNbGIuQ-Ml9deHO8eZxuYoFIj9x4uYx4t9Lu5lA4nnlL2URehnqpU7mxSaf4gv5xYJzh9XzSBfE75v657ug5VmSTy2-COPQntzwe5InQzq_T1CdIhcvp"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-['IBM_Plex_Mono'] text-sm font-bold text-white tracking-wide">
            {reviewCount}
          </span>
          <span className="font-['Inter'] text-xs text-white/80">
            {reviewSubtext}
          </span>
        </div>
      </div>

      {/* 2. Center Explore More Button */}
      <div id="hero-explore-control" className="flex flex-col items-center">
        <span className="font-['IBM_Plex_Mono'] text-xs text-white mb-2 uppercase tracking-wider font-medium">
          {exploreLabel}
        </span>
        <button
          type="button"
          onClick={handleScroll}
          className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 hover:border-white transition-all cursor-pointer shadow-xs active:scale-95"
          aria-label={`Scroll down to ${exploreLabel}`}
        >
          <span className="material-symbols-outlined text-lg leading-none">keyboard_arrow_down</span>
        </button>
      </div>

      {/* 3. Right Rotating Seal Badge */}
      <div id="hero-rotating-seal" className="hidden md:flex w-28 h-28 relative items-center justify-center shrink-0">
        <svg className="w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 100 100">
          <path
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            fill="transparent"
            id={pathId}
          />
          <text>
            <textPath
              className="font-['IBM_Plex_Mono'] text-[9.5px] tracking-widest uppercase fill-white font-medium"
              href={`#${pathId}`}
            >
              {badgeText}
            </textPath>
          </text>
        </svg>
        <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>
      </div>
    </div>
  );
}
