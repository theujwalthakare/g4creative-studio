import React, { useEffect, useState } from 'react';

export const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    try { const c = localStorage.getItem('g4_cookie_consent'); setConsent(c); } catch (e) { setConsent(null); }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem('g4_cookie_consent', 'accepted');
      // notify any listeners (tracking script)
      window.dispatchEvent(new Event('g4-cookie-consent'));
      // make a global flag
      (window as any).g4_tracking_enabled = true;
      setConsent('accepted');
    } catch (e) {
      setConsent('accepted');
    }
  };

  const reject = () => {
    try { localStorage.setItem('g4_cookie_consent', 'rejected'); } catch (e) {}
    setConsent('rejected');
  };

  if (consent === 'accepted' || consent === 'rejected') return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 bg-paper border-2 border-ink p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-ink">
        We use cookies to improve site performance and measure CTA conversions. Accepting enables analytics and personalized features. Read our <a href="/privacy" className="underline">privacy policy</a>.
      </div>
      <div className="flex items-center gap-3">
        <button onClick={reject} className="px-4 py-2 border-2 border-ink bg-transparent text-ink">Reject</button>
        <button onClick={accept} className="px-4 py-2 bg-ink text-paper font-bold">Accept</button>
      </div>
    </div>
  );
};

export default CookieConsent;
