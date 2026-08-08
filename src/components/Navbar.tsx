import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Database, ArrowRight, Layers, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCrm: () => void;
  newLeadsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCrm,
  newLeadsCount
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'Case Studies' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'SEO Blog & Insights' },
    { id: 'contact', label: 'Contact & CRM' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/90 backdrop-blur-xl border-b-2 border-ink py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="G4 Creative Studio" 
                className="h-10 w-auto mix-blend-multiply dark:mix-blend-screen contrast-125 grayscale"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-text-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-text-fallback" className="hidden items-center gap-1">
                <span className="text-4xl font-sans font-black tracking-tighter text-ink leading-none">
                  G4
                </span>
                <div className="flex flex-col ml-1">
                  <span className="text-[0.65rem] font-sans font-black uppercase tracking-[0.2em] text-ink leading-tight">
                    CREATIVE STUDIO
                  </span>
                  <span className="text-[0.45rem] font-sans font-bold uppercase tracking-[0.1em] text-ink opacity-60 leading-tight">
                    Quality Over Quantity
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[0.7rem] font-bold uppercase tracking-widest text-ink">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors hover:bg-accent hover:text-accent-foreground ${
                  activeTab === link.id
                    ? 'bg-accent text-accent-foreground border-b-2 border-accent pb-1'
                    : 'pb-1 border-b-2 border-transparent'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
              className="text-[0.7rem] font-bold uppercase tracking-widest text-ink hover:bg-accent hover:text-accent-foreground flex items-center gap-1 p-2 border-2 border-transparent hover:border-ink rounded-full transition-colors"
              title="Toggle Theme"
              id="theme-toggle-btn"
            >
              <svg className="w-4 h-4 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg className="w-4 h-4 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </button>

            <button
              onClick={onOpenCrm}
              className="text-[0.7rem] font-bold uppercase tracking-widest text-ink hover:bg-accent hover:text-accent-foreground flex items-center gap-1"
              title="Open Live CRM Pipeline Portal"
              id="crm-portal-btn"
            >
              <span>CRM</span>
              {newLeadsCount > 0 && (
                <span className="bg-accent text-accent-foreground font-mono">({newLeadsCount})</span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="bg-ink text-paper border-2 border-ink text-[0.7rem] font-extrabold py-3 px-6 uppercase tracking-widest hover:bg-transparent hover:text-ink transition-colors"
              id="nav-cta-btn"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCrm}
              className="p-2 border-2 border-ink text-ink text-[0.7rem] uppercase tracking-widest font-bold hover:bg-accent hover:text-accent-foreground"
              id="mobile-crm-btn"
            >
              CRM ({newLeadsCount})
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink focus:outline-none"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper/95 backdrop-blur-2xl border-b-2 border-ink px-4 pt-4 pb-6 space-y-3 mt-3 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 text-[0.7rem] uppercase font-bold flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-accent text-accent-foreground border-l-4 border-accent'
                  : 'text-ink hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}
          <div className="pt-4 mt-2 border-t-2 border-ink/20 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenCrm();
                setMobileMenuOpen(false);
              }}
              className="w-full py-4 border-2 border-ink bg-transparent text-ink text-[0.7rem] uppercase font-bold flex items-center justify-center gap-2 hover:bg-ink hover:text-paper transition-colors"
            >
              <span>Agency CRM Pipeline ({newLeadsCount} Leads)</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-4 bg-ink border-2 border-ink text-paper text-[0.7rem] uppercase font-bold flex items-center justify-center gap-2 hover:bg-transparent hover:text-ink transition-colors"
            >
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
