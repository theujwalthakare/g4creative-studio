import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { Video, TrendingUp, Users, Briefcase, CheckCircle, Calculator, Sparkles, ArrowRight, DollarSign, Eye, Target } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  // Calculator State
  const [budget, setBudget] = useState<number>(7500);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('Short-Form Viral Content Matrix');

  // Estimate calculations
  const estimatedImpressions = Math.round((budget / 1000) * 125000);
  const estimatedLeads = Math.round((budget / 1000) * 85);
  const estimatedRoas = (3.2 + (budget > 10000 ? 1.4 : 0.8)).toFixed(1);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video className="w-6 h-6 text-violet-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      case 'Users': return <Users className="w-6 h-6 text-pink-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-violet-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-paper relative border-t-2 border-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-[4rem] font-serif uppercase text-ink mb-6">
            Our Services
          </h2>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-paper border-2 border-ink p-8 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-ink">
                    {getServiceIcon(srv.iconName)}
                  </div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
                    {srv.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-serif uppercase text-ink mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-ink text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-6 border-t-2 border-ink/20">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 block mb-4">Key Deliverables:</span>
                  {srv.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-ink">
                      <span className="bg-accent text-accent-foreground mt-0.5 text-xs font-bold">→</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-8 mt-8 border-t-2 border-ink flex items-center justify-between">
                <div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 block mb-1">Investment</span>
                  <span className="text-lg font-bold text-ink">{srv.priceRange}</span>
                </div>
                <button
                  onClick={() => onSelectService(srv.title)}
                  className="bg-transparent border-2 border-ink text-ink text-[0.7rem] font-extrabold py-3 px-6 uppercase transition-colors hover:bg-ink hover:text-paper"
                  id={`select-service-${srv.id}`}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Campaign Budget & ROI Estimator Box */}
        <div className="p-8 sm:p-12 bg-paper border-2 border-ink relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-8">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
                Interactive Estimator
              </div>

              <h3 className="text-4xl font-serif uppercase text-ink leading-[0.9]">
                Calculate your prospective campaign reach & ROAS
              </h3>

              <p className="text-ink text-sm max-w-md">
                Adjust your intended monthly investment to view projected social impressions, qualified CRM lead yield, and target return on ad spend.
              </p>

              {/* Slider Input */}
              <div className="space-y-4 pt-4 border-t-2 border-ink/20">
                <div className="flex items-center justify-between text-sm font-bold text-ink">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">Monthly Budget</span>
                  <span className="font-mono text-lg">${budget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="35000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1 bg-ink/20 rounded-none cursor-pointer appearance-none accent-ink"
                  id="budget-estimator-slider"
                />
                <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
                  <span>$3,000</span>
                  <span>$15,000</span>
                  <span>$35,000+</span>
                </div>
              </div>

              {/* Service Selection for Estimator */}
              <div className="space-y-3">
                <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">Primary Focus Area</label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-ink bg-transparent text-ink text-sm focus:outline-none appearance-none font-bold"
                  id="estimator-service-select"
                >
                  <option value="Short-Form Viral Content Matrix">Short-Form Viral Content Matrix</option>
                  <option value="Paid Social Ads & ROAS Engine">Paid Social Ads & ROAS Engine</option>
                  <option value="Creator Seeding & UGC Network">Creator Seeding & UGC Network</option>
                  <option value="B2B Social & C-Suite Authority">B2B Social & C-Suite Authority</option>
                </select>
              </div>
            </div>

            {/* Right Output Projections */}
            <div className="lg:col-span-6 bg-paper p-8 sm:p-12 border-2 border-ink space-y-8">
              <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 border-b-2 border-ink/20 pb-4">
                Projected 30-Day Performance
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-2">Est. Views</div>
                  <div className="text-4xl font-serif uppercase text-ink">{(estimatedImpressions / 1000).toFixed(0)}k+</div>
                </div>

                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-2">Est. CRM Leads</div>
                  <div className="text-4xl font-serif uppercase text-ink">{estimatedLeads}</div>
                </div>

                <div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-2">Target ROAS</div>
                  <div className="text-4xl font-serif uppercase bg-accent text-accent-foreground">{estimatedRoas}x</div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-ink/20 space-y-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ink block font-bold">Performance Guarantee</span>
                <p className="text-ink opacity-80 text-xs leading-relaxed max-w-sm">Includes weekly analytics teardowns, direct Slack channel access, and custom lead webhook pipeline integration.</p>
              </div>

              <button
                onClick={() => onSelectService(selectedServiceType)}
                className="w-full bg-ink text-paper text-[0.8rem] font-extrabold py-4 uppercase border-2 border-ink hover:bg-transparent hover:text-ink transition-colors block text-center mt-8"
                id="estimator-lock-in-btn"
              >
                Lock In This Strategy & Get Proposal
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
