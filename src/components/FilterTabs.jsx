// src/components/FilterTabs.jsx
import React from 'react';

/**
 * Reusable Filter Tabs Component
 * @param {Array<{ key: string, label: string }>} options - Tab items
 * @param {string} activeKey - Currently active tab key
 * @param {Function} onChange - Callback when a tab is clicked
 * @param {string} className - Optional container styling
 */
export default function FilterTabs({
  options = [],
  activeKey = 'all',
  onChange,
  className = ''
}) {
  return (
    <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 ${className}`}>
      {options.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange && onChange(tab.key)}
            className={`px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-['IBM_Plex_Mono'] uppercase tracking-wider rounded-[4px] sm:rounded-md transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[#1d3956] text-white font-semibold shadow-sm border border-[#1d3956]'
                : 'bg-white text-[#43474d] hover:bg-[#eae8e4] hover:text-[#1b1c1a] border border-[#c3c6ce]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
