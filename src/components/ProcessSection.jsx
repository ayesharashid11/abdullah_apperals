import React from 'react';
import { PROCESS_STEPS } from '../data/processData.js';

export default function ProcessSection({ className = '', id = 'process', steps = PROCESS_STEPS }) {
  return (
    <section
      id={id}
      className={`py-14 md:py-24 px-5 md:px-20 bg-[#fbf9f5] border-b border-[#c3c6ce] scroll-mt-16 ${className}`}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1b1c1a] mb-4 sm:mb-6">
          Our Process
        </h2>
        <p className="font-['Inter'] text-sm sm:text-base md:text-lg text-[#43474d] max-w-2xl mx-auto mb-10 sm:mb-16">
          A streamlined, transparent approach to apparel manufacturing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 md:p-8 border border-[#c3c6ce] bg-[#fbf9f5] rounded-[2px]"
            >
              <div className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#1d3956] mb-4">
                {step.number}
              </div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#1b1c1a] mb-2">
                {step.title}
              </h3>
              <p className="font-['Inter'] text-sm text-[#43474d] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
