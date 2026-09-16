// src/components/ProductSpecModal.jsx
import React, { useEffect } from 'react';

/**
 * Reusable Product / Garment Spec Detail Modal
 * @param {Object} item - Product or portfolio item data
 * @param {Function} onClose - Close modal callback
 * @param {Function} onAction - Action button callback (e.g., Navigate to RFQ)
 * @param {string} actionLabel - Label for primary action button
 */
export default function ProductSpecModal({
  item,
  onClose,
  onAction,
  actionLabel = 'Request Quote For This Style'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#fbf9f5] border border-[#c3c6ce] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#73777e] hover:text-[#1b1c1a] p-1.5 rounded-full hover:bg-[#e8e6e1] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="rounded-lg overflow-hidden border border-[#c3c6ce] bg-white h-[320px] sm:h-[360px]">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-4">
            <span className="inline-block font-['IBM_Plex_Mono'] text-[11px] text-[#1d3956] font-semibold uppercase tracking-widest bg-[#1d3956]/10 px-2.5 py-1 rounded-[2px]">
              {item.categoryLabel || item.category}
            </span>

            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#1b1c1a] leading-tight">
              {item.title}
            </h3>

            <div className="p-3.5 bg-white border border-[#c3c6ce] rounded-md space-y-1.5 font-['IBM_Plex_Mono'] text-xs">
              {item.gsm && (
                <div className="flex justify-between py-0.5 border-b border-[#f0eeea]">
                  <span className="text-[#73777e]">Weight / GSM:</span>
                  <span className="font-bold text-[#1b1c1a]">{item.gsm}</span>
                </div>
              )}
              {item.fabric && (
                <div className="flex justify-between py-0.5 border-b border-[#f0eeea]">
                  <span className="text-[#73777e]">Fabric Composition:</span>
                  <span className="font-bold text-[#1b1c1a]">{item.fabric}</span>
                </div>
              )}
              {item.moq && (
                <div className="flex justify-between py-0.5 border-b border-[#f0eeea]">
                  <span className="text-[#73777e]">Minimum Order:</span>
                  <span className="font-bold text-[#1b1c1a]">{item.moq}</span>
                </div>
              )}
              {item.leadTime && (
                <div className="flex justify-between py-0.5">
                  <span className="text-[#73777e]">Production Lead Time:</span>
                  <span className="font-bold text-[#1b1c1a]">{item.leadTime}</span>
                </div>
              )}
            </div>

            <p className="font-['Inter'] text-xs sm:text-sm text-[#43474d] leading-relaxed">
              {item.description}
            </p>

            {onAction && (
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onAction}
                  className="flex-1 bg-[#1d3956] hover:bg-[#263c55] text-white py-3 px-4 rounded-md font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-bold transition-colors text-center cursor-pointer shadow-xs"
                >
                  {actionLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
