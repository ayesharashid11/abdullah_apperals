// src/components/WhatHappensNext.jsx
import React from 'react';

export default function WhatHappensNext() {
  const steps = [
    {
      num: '1',
      icon: 'check_circle',
      title: 'Review (24 Hours)',
      desc: 'Our technical team reviews your files for completeness and manufacturing feasibility.'
    },
    {
      num: '2',
      icon: 'engineering',
      title: 'Engineering Call',
      desc: 'We schedule a brief call to clarify any technical ambiguities and discuss material sourcing.'
    },
    {
      num: '3',
      icon: 'request_quote',
      title: 'Formal Quote',
      desc: 'You receive a detailed, itemized quote including sampling costs, MOQ tiers, and estimated lead times.'
    }
  ];

  return (
    <aside className="bg-[#f0eeea] border border-[#c3c6ce] p-6 md:p-8 rounded-[2px] sticky top-8" aria-label="RFQ Next Steps Information">
      <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#1b1c1a] mb-6 border-b border-[#c3c6ce] pb-3">
        What Happens Next
      </h3>

      <ul className="space-y-6 relative">
        {steps.map((step) => (
          <li key={step.num} className="relative flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-white border border-[#c3c6ce] flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[#1d3956] text-lg">
                {step.icon}
              </span>
            </div>
            <div>
              <h4 className="font-['Inter'] text-sm font-semibold text-[#1b1c1a]">
                {step.title}
              </h4>
              <p className="font-['Inter'] text-xs text-[#43474d] mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Production Status */}
      <div className="mt-8 pt-6 border-t border-[#c3c6ce]">
        <p className="font-['IBM_Plex_Mono'] text-xs font-semibold text-[#43474d] uppercase tracking-wider mb-2">
          Current Production Status
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1d3956] animate-pulse"></span>
          <span className="font-['IBM_Plex_Mono'] text-xs font-medium text-[#1b1c1a]">
            Accepting new projects for Q3
          </span>
        </div>
      </div>

      {/* Factory Quick Specs */}
      <div className="mt-6 pt-4 border-t border-[#c3c6ce] space-y-2 text-xs font-['IBM_Plex_Mono'] text-[#43474d]">
        <div className="flex justify-between">
          <span>Capacity:</span>
          <span className="text-[#1b1c1a] font-medium">60,000 pcs/yr</span>
        </div>
        <div className="flex justify-between">
          <span>Facility:</span>
          <span className="text-[#1b1c1a] font-medium">Lahore, PK</span>
        </div>
        <div className="flex justify-between">
          <span>Defect Rate:</span>
          <span className="text-[#1b1c1a] font-medium">&lt; 0.5%</span>
        </div>
      </div>
    </aside>
  );
}
