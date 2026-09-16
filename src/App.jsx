// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import DirectContactCTA from './components/DirectContactCTA.jsx';
import Footer from './components/Footer.jsx';

// Page Modules
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import QuotePage from './pages/QuotePage.jsx';

export default function App() {
  // Determine initial page from URL path
  const getInitialPage = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('quote') || path.includes('request-a-quote')) return 'quote';
    if (path.includes('portfolio')) return 'portfolio';
    if (path.includes('services')) return 'services';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Sync state with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle URL hash on initial load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#about' || hash === '#process') {
      setTimeout(() => {
        const targetId = hash.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, []);

  // Navigation handler
  const handleNavigate = (pageKey) => {
    if (pageKey === 'about-section' || pageKey === 'about') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        window.history.pushState({ page: 'home' }, '', '/#about');
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({ page: 'home' }, '', '/#about');
      }
      return;
    }

    if (pageKey === 'process-section' || pageKey === 'process') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        window.history.pushState({ page: 'home' }, '', '/#process');
        setTimeout(() => {
          const el = document.getElementById('process');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('process');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({ page: 'home' }, '', '/#process');
      }
      return;
    }

    setCurrentPage(pageKey);
    const pathMap = {
      home: '/',
      portfolio: '/portfolio',
      services: '/services',
      quote: '/request-a-quote'
    };
    const newPath = pathMap[pageKey] || '/';
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page: pageKey }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'quote':
        return <QuotePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] antialiased">
      {/* 1. Transparent Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* 3. Direct Contact CTA (Reach by WhatsApp or Email) */}
      <DirectContactCTA />

      {/* 4. Production Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
