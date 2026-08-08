import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Testimonial } from '../types';
import { Star, Quote, CheckCircle2, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[activeIdx];

  return (
    <section id="testimonials" className="py-24 bg-paper relative border-t-2 border-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
              Verified Client Endorsements
            </div>
            <h2 className="text-5xl sm:text-[4rem] font-serif uppercase text-ink leading-[0.9]">
              What founders say about{' '}
              <span className="text-ink opacity-60">
                g4creative.
              </span>
            </h2>
            <p className="text-ink text-sm max-w-md">
              Real commercial proof from CMOs, founders, and growth leaders who trust us with their brand social presence.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-3 border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
              id="testimonial-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-[0.65rem] text-ink uppercase tracking-[0.15em] font-bold">
              0{activeIdx + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
              id="testimonial-next-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlighted Featured Testimonial Card */}
        <div className="p-8 sm:p-12 bg-paper border-2 border-ink mb-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Author Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="w-24 h-24 overflow-hidden border-2 border-ink grayscale bg-ink">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-3xl font-serif uppercase text-ink mb-1">
                  {activeTestimonial.author}
                </h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80">{activeTestimonial.role}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] mt-1 font-bold">{activeTestimonial.company}</p>
              </div>

              {/* Metric Badge */}
              <div className="pt-6 border-t-2 border-ink/20">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-2">Key Attributed Impact</div>
                <div className="text-3xl font-serif uppercase text-ink">{activeTestimonial.featuredMetric}</div>
              </div>
            </div>

            {/* Right Quote Content */}
            <div className="lg:col-span-8 space-y-6 pt-6 lg:pt-0">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold block mb-4">
                Service: {activeTestimonial.serviceProvided}
              </span>

              <p className="text-2xl sm:text-[2.5rem] font-serif uppercase text-ink leading-[1]">
                "{activeTestimonial.quote}"
              </p>
            </div>

          </div>
        </div>

        {/* Secondary Grid of All Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setActiveIdx(idx)}
              className={`p-6 cursor-pointer transition-colors border-2 ${
                activeIdx === idx
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper text-ink border-ink hover:bg-ink hover:text-paper'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.author} className={`w-10 h-10 object-cover border-2 grayscale ${activeIdx === idx ? 'border-paper' : 'border-ink'}`} />
                <div>
                  <div className="text-sm font-bold">{t.author}</div>
                  <div className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] mt-1 ${activeIdx === idx ? 'opacity-80' : 'opacity-60'}`}>{t.company}</div>
                </div>
              </div>
              <p className={`text-xs line-clamp-3 leading-relaxed mb-6 ${activeIdx === idx ? 'opacity-90' : 'opacity-80'}`}>
                "{t.quote}"
              </p>
              <div className={`pt-4 border-t-2 flex items-center justify-between font-mono text-[0.65rem] font-bold uppercase tracking-[0.15em] ${activeIdx === idx ? 'border-paper/20' : 'border-ink/20'}`}>
                <span>{t.featuredMetric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
