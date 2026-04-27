/* ============================================================
   HOME PAGE: 湘超互动中心 - Cyber Arena Design
   Single-page layout with section-based navigation
   ============================================================ */
import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Dashboard from '@/components/Dashboard';
import MatchCenter from '@/components/MatchCenter';
import InteractiveCenter from '@/components/InteractiveCenter';
import CultureSection from '@/components/CultureSection';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';

const SECTIONS = ['hero', 'dashboard', 'matches', 'interactive', 'culture', 'leaderboard'];

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background hex grid - subtle */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663342549613/maCaBegFg79dkZmom7ZdUj/hex-pattern-4u44sLCNj2wS6TCSNF528i.webp")`,
          backgroundSize: '500px 500px',
        }}
      />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection onNavigate={handleNavigate} />

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[oklch(1_0_0/8%)] to-transparent" />

        <Dashboard />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[oklch(1_0_0/8%)] to-transparent" />

        <MatchCenter />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[oklch(1_0_0/8%)] to-transparent" />

        <InteractiveCenter />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[oklch(1_0_0/8%)] to-transparent" />

        <CultureSection />

        <div className="h-[1px] bg-gradient-to-r from-transparent via-[oklch(1_0_0/8%)] to-transparent" />

        <Leaderboard />
      </main>

      <Footer />
    </div>
  );
}
