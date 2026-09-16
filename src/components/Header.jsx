// src/components/Header.jsx
import React, { useState } from 'react';
import BrandLogo from './BrandLogo';

export default function Header({ currentPage = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/#about', isSection: true, targetId: 'about-section' },
    { key: 'portfolio', label: 'Portfolio', href: '/portfolio' },
    { key: 'services', label: 'Services', href: '/services' },
    { key: 'process', label: 'Process', href: '/#process', isSection: true, targetId: 'process-section' }
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      if (link.isSection) {
        onNavigate(link.targetId || `${link.key}-section`);
      } else {
        onNavigate(link.key);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent border-b border-white/20">
      <div className="flex justify-between items-center w-full h-20 px-4 sm:px-6 md:px-20 max-w-7xl mx-auto">
        {/* Brand Logo & Name */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0"
          aria-label="Abdullah Apparels Networks Home"
        >
          <BrandLogo className="h-7 sm:h-8 md:h-10 w-auto text-white group-hover:scale-105 transition-transform drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] shrink-0" />
          <div className="flex flex-col text-left justify-center">
            <span className="font-['Space_Grotesk'] text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-tight text-white group-hover:text-white/90 transition-colors leading-tight uppercase whitespace-nowrap">
              Abdullah Apparels
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-[#a7c2e5] font-semibold uppercase leading-tight whitespace-nowrap">
              Networks
            </span>
          </div>
        </a>

        {/* Right side: Desktop Navigation Links + CTA Button */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 ml-auto">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = !link.isSection && currentPage === link.key;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`font-['IBM_Plex_Mono'] text-xs lg:text-sm uppercase tracking-wider transition-all relative py-1 ${
                    isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#a7c2e5]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Action */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('quote');
            }}
            className={`hidden sm:inline-flex items-center justify-center font-['IBM_Plex_Mono'] text-xs font-semibold px-4 lg:px-5 py-2.5 rounded-[2px] border transition-all uppercase tracking-widest ${
              currentPage === 'quote'
                ? 'bg-white text-[#1d3956] border-white'
                : 'bg-[#1d3956] text-white hover:bg-[#263c55] border-[#35506e]'
            }`}
          >
            Request a Quote
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none focus:ring-1 focus:ring-white/40"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#14161a] border-b border-white/20 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="font-['IBM_Plex_Mono'] text-sm uppercase tracking-wider py-2 border-b border-white/10 text-white/90 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('quote');
                setMobileMenuOpen(false);
              }}
              className="block text-center w-full bg-[#1d3956] text-white font-['IBM_Plex_Mono'] text-xs font-semibold px-4 py-3 rounded-[2px] uppercase tracking-widest hover:bg-[#263c55]"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
