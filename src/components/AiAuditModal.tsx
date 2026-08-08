import React, { useState } from 'react';
import { Bot, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AiAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const AiAuditModal: React.FC<AiAuditModalProps> = ({ isOpen, onClose, onSelectService }) => {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('Fashion & D2C E-Commerce');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategyResult, setStrategyResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStrategyResult(null);

    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, industry, currentGoals: goals })
      });
      const data = await res.json();
      if (data.success && data.strategy) {
        setStrategyResult(data.strategy);
      }
    } catch (err) {
      console.error('Audit Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-paper border-2 border-ink p-8 shadow-[16px_16px_0_0_#111111] space-y-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-ink hover:bg-ink hover:text-paper transition-colors border-2 border-transparent hover:border-ink"
          id="close-ai-audit-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b-2 border-ink pb-6 pr-12">
          <div className="p-4 border-2 border-ink bg-ink text-paper">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-serif uppercase text-ink mb-1">
              Instant AI Social Growth Audit
            </h2>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 text-ink font-bold">
              Powered by g4creative Intelligence Engine & Gemini AI
            </p>
          </div>
        </div>

        {strategyResult ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-8 bg-paper border-2 border-ink space-y-4">
              <span className="px-4 py-2 bg-ink text-paper font-mono text-[0.65rem] font-bold border-2 border-ink uppercase tracking-[0.15em] inline-block">
                {strategyResult.estimatedReach}
              </span>
              <h3 className="text-3xl font-serif uppercase text-ink">{strategyResult.headline}</h3>
              <p className="text-sm text-ink leading-relaxed font-bold italic border-l-4 border-ink pl-4 opacity-80">
                "{strategyResult.viralHook}"
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold opacity-60 text-ink">Recommended Action Plan</h4>
              <div className="space-y-3">
                {strategyResult.actionPlan.map((step: string, i: number) => (
                  <div key={i} className="p-4 bg-transparent border-2 border-ink text-sm text-ink flex items-start gap-4 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-ink flex-shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-ink/20">
              <button
                onClick={() => {
                  onClose();
                  onSelectService(strategyResult.recommendedServices[0] || 'Short-Form Viral Content Matrix');
                }}
                className="w-full bg-ink text-paper text-[0.8rem] font-extrabold py-4 uppercase border-2 border-ink hover:bg-transparent hover:text-ink transition-colors flex items-center justify-center gap-2"
                id="audit-execute-strategy-btn"
              >
                <span>Execute This Strategy with g4creative</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold text-ink">Brand Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Aura Beauty"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                id="audit-brand-input"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold text-ink">Industry / Niche</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold appearance-none"
                id="audit-industry-select"
              >
                <option value="Fashion & D2C E-Commerce">Fashion & D2C E-Commerce</option>
                <option value="SaaS & B2B Tech">SaaS & B2B Tech</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Hospitality & Food/Beverage">Hospitality & Food/Beverage</option>
                <option value="Health & Fitness">Health & Fitness</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold text-ink">Primary Goal</label>
              <input
                type="text"
                placeholder="e.g. Scale TikTok shop sales and drive 1,000 email leads/month"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                id="audit-goals-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper text-[0.8rem] font-extrabold py-4 uppercase border-2 border-ink hover:bg-transparent hover:text-ink transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              id="audit-generate-btn"
            >
              {loading ? (
                <span>Generating Strategy via AI...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Custom Growth Strategy</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
