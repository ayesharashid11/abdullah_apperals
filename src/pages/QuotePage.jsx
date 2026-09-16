// src/pages/QuotePage.jsx
import React from 'react';
import Hero from '../components/Hero.jsx';
import RfqForm from '../components/RfqForm.jsx';
import WhatHappensNext from '../components/WhatHappensNext.jsx';

export default function QuotePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <Hero />

      {/* Main Two-Column RFQ Layout */}
      <main id="rfq-form-section" className="w-full max-w-7xl mx-auto px-5 md:px-20 py-12 md:py-16 scroll-mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (8 cols): RFQ Form */}
          <div className="lg:col-span-8">
            <RfqForm />
          </div>

          {/* Right Column (4 cols): Reassuring Timeline & Status Panel */}
          <div className="lg:col-span-4">
            <WhatHappensNext />
          </div>
        </div>
      </main>
    </div>
  );
}
