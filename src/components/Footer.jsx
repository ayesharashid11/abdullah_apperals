// src/components/Footer.jsx
import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer({ onNavigate }) {
  const handleLink = (e, key) => {
    if (onNavigate && key) {
      e.preventDefault();
      onNavigate(key);
      if (key !== 'about' && key !== 'process' && key !== 'about-section' && key !== 'process-section') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#e4e2de] border-t border-[#c3c6ce] text-[#43474d] w-full">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand with Crest Logo above Business Name */}
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="button"
              onClick={(e) => handleLink(e, 'home')}
              className="flex flex-col items-start gap-2.5 text-left hover:opacity-90 transition-opacity group cursor-pointer mb-3.5"
              aria-label="Abdullah Apparels Networks Home"
            >
              <BrandLogo className="h-10 sm:h-12 w-auto text-[#1d3956] group-hover:scale-105 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#1b1c1a] tracking-tight leading-tight uppercase">
                  Abdullah Apparels
                </span>
                <span className="font-['IBM_Plex_Mono'] text-[10px] sm:text-[11px] tracking-[0.25em] text-[#1d3956] font-semibold uppercase leading-tight mt-0.5">
                  Networks
                </span>
              </div>
            </button>
            <p className="font-['IBM_Plex_Mono'] text-xs leading-relaxed text-[#73777e] max-w-sm">
              Quality manufacturing. Reliable supply. Built for your business. Established 2021.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col space-y-2.5 text-sm font-['Inter']">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase font-semibold text-[#1b1c1a] mb-1 tracking-wider">
              Navigation
            </span>
            <button type="button" onClick={(e) => handleLink(e, 'home')} className="text-left hover:text-[#1d3956] transition-colors cursor-pointer">
              Home
            </button>
            <button type="button" onClick={(e) => handleLink(e, 'about')} className="text-left hover:text-[#1d3956] transition-colors cursor-pointer">
              About Us
            </button>
            <button type="button" onClick={(e) => handleLink(e, 'services')} className="text-left hover:text-[#1d3956] transition-colors cursor-pointer">
              What We Make
            </button>
          </div>

          {/* Col 3: Manufacturing & Output */}
          <div className="lg:col-span-3 flex flex-col space-y-2.5 text-sm font-['Inter']">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase font-semibold text-[#1b1c1a] mb-1 tracking-wider">
              Manufacturing
            </span>
            <button type="button" onClick={(e) => handleLink(e, 'portfolio')} className="text-left hover:text-[#1d3956] transition-colors cursor-pointer">
              Recent Output
            </button>
            <button type="button" onClick={(e) => handleLink(e, 'process')} className="text-left hover:text-[#1d3956] transition-colors cursor-pointer">
              Manufacturing Process
            </button>
            <button type="button" onClick={(e) => handleLink(e, 'quote')} className="text-left hover:text-[#1d3956] transition-colors font-semibold text-[#1d3956] cursor-pointer">
              Request a Quote
            </button>
          </div>

          {/* Col 4: Direct Desk & Socials */}
          <div className="sm:col-span-2 lg:col-span-3 flex flex-col space-y-2.5 text-sm font-['Inter']">
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase font-semibold text-[#1b1c1a] mb-1 tracking-wider">
              Direct Desk
            </span>
            <span className="text-xs text-[#1b1c1a]">Lahore, Pakistan</span>
            <a href="mailto:malikabdullah1@hotmail.com" className="text-xs font-['IBM_Plex_Mono'] text-[#1d3956] hover:underline break-all">
              malikabdullah1@hotmail.com
            </a>
            <a href="tel:+923008467725" className="text-xs font-['IBM_Plex_Mono'] text-[#1b1c1a] hover:text-[#1d3956]">
              +923008467725
            </a>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                id="footer-facebook-link"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-8 h-8 rounded-[2px] bg-white border border-[#c3c6ce] flex items-center justify-center text-[#1b1c1a] hover:text-white hover:bg-[#1d3956] hover:border-[#1d3956] transition-all shadow-2xs cursor-pointer"
              >
                <Facebook size={15} />
              </a>
              <a
                id="footer-instagram-link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-8 h-8 rounded-[2px] bg-white border border-[#c3c6ce] flex items-center justify-center text-[#1b1c1a] hover:text-white hover:bg-[#1d3956] hover:border-[#1d3956] transition-all shadow-2xs cursor-pointer"
              >
                <Instagram size={15} />
              </a>
              <a
                id="footer-linkedin-link"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-8 h-8 rounded-[2px] bg-white border border-[#c3c6ce] flex items-center justify-center text-[#1b1c1a] hover:text-white hover:bg-[#1d3956] hover:border-[#1d3956] transition-all shadow-2xs cursor-pointer"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#c3c6ce] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-['IBM_Plex_Mono']">
          <p>© 2021 ABDULLAH APPARELS NETWORKS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
