import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { CaseStudy } from '../types';
import { ArrowUpRight, CheckCircle2, Layers, Filter, Sparkles, X, ChevronRight, BarChart, Calendar, Tag } from 'lucide-react';

interface CaseStudiesSectionProps {
  onSelectServiceForContact: (serviceName: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSelectServiceForContact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = ['All', 'Fashion & Lifestyle', 'Tech & SaaS', 'B2B Growth', 'Hospitality'];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.category === selectedCategory);

  const handleApplyCampaign = (study: CaseStudy) => {
    setActiveModalStudy(null);
    onSelectServiceForContact(study.tags[0] || 'Short-Form Viral Content Matrix');
  };

  return (
    <section id="work" className="py-24 bg-paper relative border-t-2 border-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
              Proven Client Results
            </div>
            <h2 className="text-5xl sm:text-[4rem] font-serif uppercase text-ink leading-[0.9]">
              Case studies that prove{' '}
              <span className="text-ink opacity-60">our velocity.</span>
            </h2>
            <p className="text-ink text-sm max-w-md">
              Explore how we engineer viral content, scale paid ROAS, and convert social engagement into direct business revenue.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] transition-colors font-bold ${
                  selectedCategory === cat
                    ? 'bg-accent text-accent-foreground border-b-2 border-accent pb-1 opacity-100'
                    : 'text-ink opacity-60 hover:opacity-100 pb-1'
                }`}
                id={`case-study-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((cs) => (
            <div
              key={cs.id}
              onClick={() => setActiveModalStudy(cs)}
              className="group cursor-pointer bg-paper border-2 border-ink p-8 flex flex-col justify-between hover:bg-ink hover:text-paper transition-colors relative"
              id={`case-study-card-${cs.id}`}
            >
              <div className="absolute top-4 right-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 z-10 bg-paper text-ink px-2 py-1 border-2 border-ink group-hover:bg-ink group-hover:text-paper group-hover:border-paper">
                {cs.category}
              </div>
              
              <div>
                {/* Image */}
                <div className="h-48 border-2 border-ink flex items-center justify-center mb-8 overflow-hidden relative bg-ink">
                  {(() => {
                    // build srcset from Unsplash URL pattern (w=1200)
                    const src480 = cs.image.replace('w=1200', 'w=480')
                    const src800 = cs.image.replace('w=1200', 'w=800')
                    const src1200 = cs.image
                    return (
                      <img
                        src={src800}
                        srcSet={`${src480} 480w, ${src800} 800w, ${src1200} 1200w`}
                        sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
                        alt={cs.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale"
                        loading="lazy"
                      />
                    )
                  })()}
                </div>

                {/* Body Content */}
                <h3 className="text-3xl font-serif uppercase mb-2 line-clamp-2">
                  {cs.title}
                </h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 mb-6">
                  {cs.clientName}
                </p>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 gap-4 border-t-2 border-ink/20 group-hover:border-paper/20 pt-6">
                  {cs.results.slice(0, 2).map((res, idx) => (
                    <div key={idx}>
                      <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-1">{res.label}</div>
                      <div className="text-xl font-bold">{res.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold">
                <span>View Breakdown</span>
                <div className="w-8 h-8 border-2 border-ink group-hover:border-paper flex items-center justify-center transition-colors">→</div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Modal Detail View */}
        {activeModalStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-paper border-2 border-ink p-8 sm:p-12 space-y-12">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalStudy(null)}
                className="absolute top-8 right-8 text-ink border-2 border-ink p-2 hover:bg-ink hover:text-paper transition-colors"
                id="close-case-study-modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80">
                  <span>{activeModalStudy.category}</span>
                  <span className="text-ink/40">/</span>
                  <span>{activeModalStudy.timeline}</span>
                </div>
                <h2 className="text-4xl sm:text-[4rem] font-serif uppercase text-ink leading-[0.9]">
                  {activeModalStudy.title}
                </h2>
                <p className="text-ink text-lg max-w-md">
                  {activeModalStudy.tagline}
                </p>
              </div>

              {/* Results Grid Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-8 border-y-2 border-ink">
                {activeModalStudy.results.map((res, i) => (
                  <div key={i}>
                    <div className="text-3xl font-serif uppercase text-ink">
                      {res.value}
                    </div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mt-2">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge & Strategy Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold mb-4">The Challenge</h3>
                  <p className="text-ink text-sm leading-relaxed">
                    {activeModalStudy.challenge}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold mb-4">Deliverables</h3>
                  <ul className="space-y-3 text-sm text-ink">
                    {activeModalStudy.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="bg-accent text-accent-foreground mt-1 text-xs font-bold">→</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Strategic Execution Steps */}
              <div className="space-y-6 pt-12 border-t-2 border-ink/20">
                <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold mb-8">Strategic Execution</h3>
                <div className="space-y-8">
                  {activeModalStudy.strategy.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-6 border-l-2 border-ink pl-6">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mt-1">
                        0{idx + 1}
                      </span>
                      <p className="text-ink text-sm leading-relaxed max-w-2xl">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-12 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap gap-4">
                  {activeModalStudy.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleApplyCampaign(activeModalStudy)}
                  className="w-full sm:w-auto bg-ink text-paper border-2 border-ink text-[0.8rem] font-extrabold py-4 px-8 uppercase transition-colors hover:bg-transparent hover:text-ink flex items-center justify-center gap-4"
                  id="modal-request-similar-growth-btn"
                >
                  <span>Build Similar Growth Engine</span>
                  <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center text-sm">→</div>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
