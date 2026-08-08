import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactCrmSection } from './components/ContactCrmSection';
import { Footer } from './components/Footer';
import { AiAuditModal } from './components/AiAuditModal';
import CookieConsent from './components/CookieConsent';
import { INITIAL_LEADS } from './data/mockData';
import { isBackendEnabled, readStoredLeads } from './lib/deployment';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [crmOpenModal, setCrmOpenModal] = useState<boolean>(false);
  const [aiAuditModalOpen, setAiAuditModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [newLeadsCount, setNewLeadsCount] = useState<number>(3);

  // Fetch lead count from backend
  const fetchLeadCount = async () => {
    if (!isBackendEnabled()) {
      const localLeads = readStoredLeads();
      setNewLeadsCount(localLeads.filter((lead) => lead.status === 'New').length || INITIAL_LEADS.filter((lead) => lead.status === 'New').length);
      return;
    }

    try {
      const res = await fetch('/api/crm/leads');
      const data = await res.json();
      if (data.success && data.stats) {
        setNewLeadsCount(data.stats.newLeads || 0);
      } else {
        setNewLeadsCount(INITIAL_LEADS.filter((lead) => lead.status === 'New').length);
      }
    } catch (err) {
      console.error('Failed to fetch lead count:', err);
      setNewLeadsCount(INITIAL_LEADS.filter((lead) => lead.status === 'New').length);
    }
  };

  useEffect(() => {
    fetchLeadCount();
  }, []);

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setActiveTab('contact');
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-400 selection:text-zinc-950">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCrm={() => setCrmOpenModal(true)}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreWork={() => {
            setActiveTab('work');
            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAuditModal={() => setAiAuditModalOpen(true)}
        />

        {/* Case Studies Section */}
        <CaseStudiesSection
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* Services & ROI Estimator Section */}
        <ServicesSection
          onSelectService={handleSelectServiceForContact}
        />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* SEO Blog & Insights Section */}
        <BlogSection />

        {/* Contact Form & Direct CRM Integration */}
        <ContactCrmSection
          preselectedService={preselectedService}
          crmOpenModal={crmOpenModal}
          onCloseCrmModal={() => setCrmOpenModal(false)}
          onLeadAdded={() => {
            fetchLeadCount();
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Strategy Audit Modal */}
      <AiAuditModal
        isOpen={aiAuditModalOpen}
        onClose={() => setAiAuditModalOpen(false)}
        onSelectService={handleSelectServiceForContact}
      />
      <CookieConsent />
    </div>
  );
}
