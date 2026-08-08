import React, { useState } from 'react';
import { Sparkles, TrendingUp, ShieldCheck, Play, ArrowRight, Zap, Award, BarChart3, Bot, CheckCircle2 } from 'lucide-react';
import { ShaderAnimation } from './ShaderAnimation';

interface HeroProps {
  onExploreWork: () => void;
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenAuditModal }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-paper">
      <ShaderAnimation />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10 mix-blend-difference">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink">
              CREATE. CONNECT. CONVERT
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-[6rem] font-serif uppercase leading-[0.9] text-ink mb-8">
            We turn social attention<br className="hidden sm:block" /> into predictable revenue.
          </h1>

          {/* Subtitle */}
          <p className="text-ink text-lg sm:text-[1.2rem] leading-relaxed max-w-[600px] mx-auto mb-8 font-bold opacity-80">
            Average client 4.8x ROAS. Get a free content + ads audit to discover immediate uplift opportunities.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                try { localStorage.setItem('g4_lead_source', 'hero_get_audit'); } catch (e) {}
                onOpenAuditModal();
              }}
              className="w-full sm:w-auto text-[0.9rem] font-extrabold uppercase transition-colors focus:outline-none"
              id="hero-get-audit-cta"
              aria-label="Get a free growth audit"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)', height: '48px', padding: '0 28px', borderRadius: '10px' }}
            >
              Get Free Growth Audit
            </button>

            <button
              onClick={() => {
                try { localStorage.setItem('g4_lead_source', 'hero_explore_case_studies'); } catch (e) {}
                onExploreWork();
              }}
              className="w-full sm:w-auto text-[0.9rem] font-extrabold uppercase transition-colors border-2"
              id="hero-explore-work-cta"
              aria-label="Explore case studies"
              style={{ borderColor: 'var(--color-ink)', color: 'var(--color-ink)', height: '48px', padding: '0 28px', borderRadius: '10px', background: 'transparent' }}
            >
              Explore Case Studies
            </button>
          </div>

          {/* Core Agency Key Metrics Grid */}
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-8 border-2 border-ink bg-transparent backdrop-blur-sm text-center">
              <div className="text-4xl sm:text-[3rem] font-serif uppercase text-ink mb-2">
                $14.2M+
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink mt-4 font-bold">
                Revenue Generated
              </div>
            </div>

            <div className="p-8 border-2 border-ink bg-transparent backdrop-blur-sm text-center">
              <div className="text-4xl sm:text-[3rem] font-serif uppercase text-ink mb-2">
                250M+
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink mt-4 font-bold">
                Organic Views
              </div>
            </div>

            <div className="p-8 border-2 border-ink bg-transparent backdrop-blur-sm text-center">
              <div className="text-4xl sm:text-[3rem] font-serif uppercase text-ink mb-2">
                4.8x
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink mt-4 font-bold">
                Avg Ad ROAS
              </div>
            </div>

            <div className="p-8 border-2 border-ink bg-transparent backdrop-blur-sm text-center">
              <div className="text-4xl sm:text-[3rem] font-serif uppercase text-ink mb-2">
                98%
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink mt-4 font-bold">
                Retention Rate
              </div>
            </div>
          </div>

          {/* Trusted Brand Logotypes Banner */}
          <div className="pt-16 mt-16 border-t-2 border-ink">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink font-bold mb-8">
              Trusted by high-growth founders & category-defining brands
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-ink font-serif uppercase text-lg">LUXE BEAUTY</span>
              <span className="text-ink font-sans tracking-widest text-sm uppercase">AURA TECH</span>
              <span className="text-ink font-serif uppercase text-xl">VELOCE</span>
              <span className="text-ink font-sans text-lg uppercase">EcoBrew</span>
              <span className="text-ink font-mono uppercase tracking-tighter text-sm">HYPERX SYSTEMS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

