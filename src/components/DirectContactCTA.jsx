// src/components/DirectContactCTA.jsx
import React from 'react';

export default function DirectContactCTA() {
  return (
    <section className="bg-[#dbdad6] py-16 md:py-24 px-5 md:px-20 text-[#1b1c1a] border-t border-[#c3c6ce]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-bold mb-4 max-w-3xl leading-tight">
          Tell us what you&apos;re building — we&apos;ll respond directly.
        </h2>
        <p className="font-['Inter'] text-base md:text-lg text-[#43474d] mb-8 max-w-2xl leading-relaxed">
          No account, no portal — reach us by phone, WhatsApp or email and our merchandising team will follow up with next steps for your category and quantity.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1d3956] text-white px-6 py-3.5 rounded-[2px] font-['Inter'] font-semibold text-sm hover:bg-[#263c55] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Message on WhatsApp
          </a>
          <a
            href="mailto:contact@stitchworks.com?subject=Apparel%20Manufacturing%20Inquiry"
            className="inline-flex items-center gap-2 border border-[#1d3956] text-[#1d3956] bg-transparent px-6 py-3.5 rounded-[2px] font-['Inter'] font-semibold text-sm hover:bg-[#1d3956]/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}
