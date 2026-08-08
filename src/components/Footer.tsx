import React, { useState } from 'react';
import { ArrowUp, Sparkles, Check, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink border-t-2 border-ink text-paper py-16 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-serif uppercase text-paper">
                g4creative.
              </span>
            </div>

            <p className="text-sm text-paper opacity-80 max-w-sm leading-relaxed font-bold">
              Social Media Growth Agency specializing in short-form viral video, micro-influencer seeding, high-ROAS paid media scaling, and direct webhook CRM lead capture.
            </p>

            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 pt-4">
              © 2026 g4creative studio. All Rights Reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold bg-accent text-accent-foreground">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-bold opacity-80">
              <li><a href="#work" className="hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors">Case Studies & Metrics</a></li>
              <li><a href="#services" className="hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors">Social Growth Capabilities</a></li>
              <li><a href="#testimonials" className="hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors">Verified Testimonials</a></li>
              <li><a href="#blog" className="hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors">SEO Insights & Playbooks</a></li>
              <li><a href="#contact" className="hover:opacity-100 hover:bg-accent hover:text-accent-foreground transition-colors">Direct CRM Contact Form</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold bg-accent text-accent-foreground">
              Social Growth Playbook
            </h4>
            <p className="text-sm opacity-80 font-bold">
              Get weekly breakdown teardowns on TikTok algorithm shifts & paid ad strategies.
            </p>

            {subscribed ? (
              <div className="p-4 bg-transparent border-2 border-accent bg-accent text-accent-foreground font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold flex items-center gap-3">
                <Check className="w-4 h-4 bg-accent text-accent-foreground" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border-2 border-paper text-sm text-paper focus:outline-none placeholder:opacity-60 font-bold"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-paper text-ink font-extrabold text-[0.8rem] uppercase border-2 border-paper hover:bg-transparent hover:text-paper transition-colors flex items-center justify-center gap-2"
                  id="newsletter-submit-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Scroll To Top Button */}
        <div className="pt-12 mt-12 border-t-2 border-paper/20 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 font-bold">
          <div>Built with React, Tailwind CSS, and Node CRM Integration</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-100 hover:text-paper transition-colors"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
