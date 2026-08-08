import React, { useState, useEffect } from 'react';
import { LeadCRM } from '../types';
import { Send, CheckCircle2, Database, Sparkles, AlertCircle, RefreshCw, Filter, Phone, Mail, Building, DollarSign, Layers, Bot, Download, Trash2, ArrowRight } from 'lucide-react';

interface ContactCrmSectionProps {
  preselectedService?: string;
  crmOpenModal: boolean;
  onCloseCrmModal: () => void;
  onLeadAdded: () => void;
}

export const ContactCrmSection: React.FC<ContactCrmSectionProps> = ({
  preselectedService,
  crmOpenModal,
  onCloseCrmModal,
  onLeadAdded
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$10,000 - $25,000 / mo',
    message: ''
  });
  const [leadSource, setLeadSource] = useState<string>('website');

  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Short-Form Viral Content Matrix']
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadCRM | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // CRM Portal State
  const [leadsList, setLeadsList] = useState<LeadCRM[]>([]);
  const [crmLoading, setCrmLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedLeadForAi, setSelectedLeadForAi] = useState<LeadCRM | null>(null);
  const [aiDraftResponse, setAiDraftResponse] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    if (preselectedService && !selectedServices.includes(preselectedService)) {
      setSelectedServices((prev) => [...prev, preselectedService]);
    }
  }, [preselectedService]);

  useEffect(() => {
    try {
      const src = localStorage.getItem('g4_lead_source');
      if (src) setLeadSource(src);
      else {
        // fallback to temporary session storage (before consent)
        const tmp = sessionStorage.getItem('g4_lead_source_temp');
        if (tmp) setLeadSource(tmp);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const availableServices = [
    'Short-Form Viral Content Matrix',
    'Paid Social Ads & ROAS Engine',
    'Creator Seeding & UGC Network',
    'B2B Social & C-Suite Authority'
  ];

  const toggleServicePill = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmittedLead(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
          leadSource: leadSource || 'website'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedLead(data.lead);
        setFormData({ name: '', email: '', phone: '', company: '', budget: '$10,000 - $25,000 / mo', message: '' });
        try { localStorage.removeItem('g4_lead_source'); sessionStorage.removeItem('g4_lead_source_temp'); } catch (e) {}
        onLeadAdded();
        fetchCrmLeads();
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry to CRM.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCrmLeads = async () => {
    setCrmLoading(true);
    try {
      const res = await fetch('/api/crm/leads');
      const data = await res.json();
      if (data.success) {
        setLeadsList(data.leads);
      }
    } catch (err) {
      console.error('Failed to load CRM leads:', err);
    } finally {
      setCrmLoading(false);
    }
  };

  useEffect(() => {
    fetchCrmLeads();
  }, []);

  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadCRM['status']) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchCrmLeads();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      await fetch(`/api/crm/leads/${leadId}`, { method: 'DELETE' });
      fetchCrmLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleGenerateAiResponse = async (lead: LeadCRM) => {
    setSelectedLeadForAi(lead);
    setIsGeneratingAi(true);
    setAiDraftResponse('');

    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: lead.company,
          industry: lead.services.join(', '),
          currentGoals: lead.message
        })
      });
      const data = await res.json();
      if (data.success && data.strategy) {
        setAiDraftResponse(
          `Hi ${lead.name.split(' ')[0]},\n\nThank you for reaching out to g4creative studio! We reviewed your campaign goals for ${lead.company}.\n\nHere is our initial Growth Strategy Audit:\n• Strategy: ${data.strategy.headline}\n• Est. Reach: ${data.strategy.estimatedReach}\n• Action Plan:\n  1. ${data.strategy.actionPlan[0]}\n  2. ${data.strategy.actionPlan[1]}\n  3. ${data.strategy.actionPlan[2]}\n\nLet's schedule a 15-minute strategy call this week to finalize your rollout!`
        );
      }
    } catch (err) {
      setAiDraftResponse('Failed to generate AI proposal draft.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const filteredLeads = filterStatus === 'All'
    ? leadsList
    : leadsList.filter((l) => l.status === filterStatus);

  const exportLeadsCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Budget', 'Services', 'Status', 'Score', 'Date'];
    const rows = leadsList.map((l) => [
      l.id,
      `"${l.name}"`,
      l.email,
      `"${l.company}"`,
      `"${l.budget}"`,
      `"${l.services.join(';')}"`,
      l.status,
      l.leadScore,
      `"${l.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `g4creative_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 bg-paper relative border-t-2 border-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
              Direct CRM Lead Ingestion
            </div>
            <h2 className="text-5xl sm:text-[4rem] font-serif uppercase text-ink leading-[0.9]">
              Ready to scale your brand?{' '}
              <span className="text-ink opacity-60">
                Let's connect.
              </span>
            </h2>
            <p className="text-ink text-sm max-w-md">
              Submit your project brief below. Your inquiry routes directly into g4creative studio's CRM pipeline for a 30-minute response time.
            </p>
          </div>

          <button
            onClick={() => fetchCrmLeads()}
            className="px-6 py-4 bg-transparent border-2 border-ink hover:bg-ink text-ink hover:text-paper font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold flex items-center gap-2 transition-colors self-start md:self-auto"
            id="refresh-crm-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${crmLoading ? 'animate-spin' : ''}`} />
            <span>Sync CRM Data</span>
          </button>
        </div>

        {/* Contact Form & Side Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-paper p-8 sm:p-12 border-2 border-ink space-y-8">
            
            {submittedLead ? (
              <div className="p-8 bg-paper border-2 border-ink text-ink space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-4 text-ink border-b-2 border-ink/20 pb-4">
                  <CheckCircle2 className="w-8 h-8 bg-accent text-accent-foreground" />
                  <div>
                    <h3 className="text-3xl font-serif uppercase text-ink">Lead Ingested</h3>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mt-1">
                      ID: #{submittedLead.id} / Score: {submittedLead.leadScore}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-ink leading-relaxed">
                      Thank you, <strong className="font-bold">{submittedLead.name}</strong> from <strong className="font-bold">{submittedLead.company}</strong>. Our team has received your brief for <span className="font-bold">{submittedLead.services.join(', ')}</span>.
                </p>
                
                    <div className="p-4 bg-paper border-2 border-ink text-[0.65rem] font-mono uppercase tracking-[0.15em]">
                      <div className="opacity-80">Lead Source</div>
                      <div className="font-bold mt-1">{submittedLead.leadSource || leadSource}</div>
                    </div>
                <div className="p-6 bg-paper border-2 border-ink text-[0.65rem] font-mono uppercase tracking-[0.15em] space-y-2">
                  <div className="text-ink">Status: <span className="bg-accent text-accent-foreground font-bold ml-2">New Prospect (High Priority)</span></div>
                  <div className="text-ink">Assigned SLA: <span className="font-bold ml-2">Response within 30 minutes</span></div>
                </div>

                <button
                  onClick={() => setSubmittedLead(null)}
                  className="w-full bg-ink text-paper text-[0.8rem] font-extrabold py-4 uppercase border-2 border-ink hover:bg-transparent hover:text-ink transition-colors block text-center mt-8"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 bg-paper border-2 border-accent bg-accent text-accent-foreground text-xs font-mono flex items-center gap-3 font-bold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                      id="contact-form-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                      id="contact-form-email"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Company / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Apparel"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                      id="contact-form-company"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Phone (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold"
                      id="contact-form-phone"
                    />
                  </div>
                </div>

                {/* Services Selection Pills */}
                <div className="space-y-3 pt-2">
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">
                    Requested Agency Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleServicePill(srv)}
                          className={`px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold transition-colors border-2 ${
                            isSelected
                              ? 'bg-ink text-paper border-ink'
                              : 'bg-transparent text-ink border-ink hover:bg-ink hover:text-paper'
                          }`}
                          id={`service-pill-${srv.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          {isSelected ? '✓ ' : '+ '} {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-2 pt-2">
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Target Monthly Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold appearance-none"
                    id="contact-form-budget"
                  >
                    <option value="$3,500 - $5,000 / mo">$3,500 - $5,000 / mo</option>
                    <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                    <option value="$10,000 - $25,000 / mo">$10,000 - $25,000 / mo</option>
                    <option value="$25,000+ / mo">$25,000+ / mo (Enterprise)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2 pt-2">
                  <label className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">Project Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your timeline, goals, or current bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-4 bg-transparent border-2 border-ink text-ink text-sm focus:outline-none font-bold resize-none"
                    id="contact-form-message"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ink text-paper text-[0.8rem] font-extrabold py-4 uppercase border-2 border-ink hover:bg-transparent hover:text-ink transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Routing to CRM...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry to Pipeline</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Info & Operations Summary */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 sm:p-12 bg-paper border-2 border-ink space-y-8">
              <h3 className="text-4xl font-serif uppercase text-ink leading-[0.9]">g4creative HQ</h3>
              <p className="text-ink text-sm leading-relaxed font-bold">
                We operate as an embedded growth squad for D2C brands, B2B scale-ups, and creator-led companies worldwide.
              </p>

              <div className="space-y-6 pt-6 border-t-2 border-ink/20">
                <div className="flex items-center gap-4 text-ink font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold">
                  <Mail className="w-4 h-4" />
                  <span>growth@g4creative.studio</span>
                </div>
                <div className="flex items-center gap-4 text-ink font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold">
                  <Phone className="w-4 h-4" />
                  <span>+1 (888) 44-G4-GROW</span>
                </div>
                <div className="flex items-center gap-4 text-ink font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold">
                  <Building className="w-4 h-4" />
                  <span>New York / Los Angeles / London</span>
                </div>
              </div>
            </div>

            {/* Direct CRM Portal Quick Launcher Card */}
            <div className="p-8 sm:p-12 bg-ink text-paper border-2 border-ink space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold bg-accent text-accent-foreground">
                  Internal Ops
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80">{leadsList.length} Active</span>
              </div>

              <h4 className="text-4xl font-serif uppercase text-paper leading-[0.9]">
                Inspect CRM Pipeline
              </h4>

              <p className="text-paper opacity-80 text-sm leading-relaxed font-bold">
                Inspect incoming client leads, view automated lead scores, update deal stages, export CSVs, or generate AI response drafts.
              </p>

              <button
                onClick={onCloseCrmModal}
                className="w-full py-4 bg-transparent hover:bg-paper text-paper hover:text-ink font-extrabold text-[0.8rem] uppercase border-2 border-paper flex items-center justify-center gap-2 transition-colors mt-8"
                id="launch-crm-portal-drawer-btn"
              >
                <Database className="w-4 h-4" />
                <span>Open CRM Dashboard</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Agency CRM Operations Modal */}
      {crmOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-paper border-2 border-ink p-8 shadow-[16px_16px_0_0_#111111] space-y-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-ink pb-6">
              <div className="flex items-center gap-4">
                <div className="p-4 border-2 border-ink bg-ink text-paper">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif uppercase text-ink mb-1">
                    Agency CRM Portal
                  </h2>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80">
                    Real-Time Lead Pipeline
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={exportLeadsCsv}
                  className="px-4 py-3 bg-transparent border-2 border-ink font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold text-ink hover:bg-ink hover:text-paper transition-colors flex items-center gap-2"
                  id="export-leads-csv-btn"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={onCloseCrmModal}
                  className="p-2 border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
                  id="close-crm-portal-modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-paper p-4 border-2 border-ink">
              <div className="flex flex-wrap gap-2">
                {['All', 'New', 'Proposal Sent', 'Closed Won', 'Archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold transition-all border-2 ${
                      filterStatus === status
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-transparent text-ink border-transparent hover:border-ink'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-bold">
                Showing {filteredLeads.length} of {leadsList.length} Leads
              </span>
            </div>

            {/* Leads Table / List */}
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-6 bg-paper border-2 border-ink hover:bg-ink hover:text-paper group transition-all space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-ink/20 group-hover:border-paper/20 pb-4">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-ink text-paper font-mono text-[0.65rem] font-bold border-2 border-ink uppercase">
                        #{lead.id}
                      </span>
                      <div>
                        <h4 className="text-xl font-serif uppercase flex items-center gap-2">
                          {lead.name}
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80 font-sans">({lead.company})</span>
                        </h4>
                        <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 flex items-center gap-3 mt-1 font-bold">
                          <span>{lead.email}</span>
                          {lead.phone && <span>/ {lead.phone}</span>}
                          <span>/ {lead.submittedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Lead Score Badge */}
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold group-hover:bg-accent group-hover:text-accent-foreground px-1">
                        Score {lead.leadScore}/100
                      </span>

                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadCRM['status'])}
                        className="px-4 py-2 bg-transparent border-2 border-ink group-hover:border-paper font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold focus:outline-none appearance-none"
                      >
                        <option value="New" className="text-ink">New Prospect</option>
                        <option value="In Contact" className="text-ink">In Contact</option>
                        <option value="Proposal Sent" className="text-ink">Proposal Sent</option>
                        <option value="Closed Won" className="text-ink">Closed Won</option>
                        <option value="Archived" className="text-ink">Archived</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 border-2 border-ink group-hover:border-paper hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Services & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[0.65rem] uppercase tracking-[0.15em]">
                    <div className="space-y-1">
                      <span className="font-bold opacity-60">Target Budget:</span>
                      <span className="block font-bold">{lead.budget}</span>
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <span className="font-bold opacity-60">Services Requested:</span>
                      <span className="block font-bold">{lead.services.join(' / ')}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <p className="text-xs leading-relaxed italic border-l-2 border-ink group-hover:border-paper pl-4 font-bold opacity-80">
                      "{lead.message}"
                    </p>
                  )}

                  {/* AI Response Generator Trigger */}
                  <div className="pt-4 flex justify-end border-t-2 border-ink/20 group-hover:border-paper/20 mt-4">
                    <button
                      onClick={() => handleGenerateAiResponse(lead)}
                      className="px-4 py-3 bg-transparent border-2 border-ink group-hover:border-paper hover:bg-paper hover:text-ink transition-colors font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold flex items-center gap-2"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Draft AI Proposal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Proposal Drawer */}
            {selectedLeadForAi && (
              <div className="p-8 bg-paper border-2 border-ink space-y-6 animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between border-b-2 border-ink/20 pb-4">
                  <div className="flex items-center gap-3 text-ink">
                    <Bot className="w-5 h-5" />
                    <h3 className="text-xl font-serif uppercase text-ink">
                      AI Proposal Draft: {selectedLeadForAi.company}
                    </h3>
                  </div>
                  <button onClick={() => setSelectedLeadForAi(null)} className="font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold opacity-80 hover:opacity-100 border-2 border-ink px-2 py-1">
                    Close
                  </button>
                </div>

                {isGeneratingAi ? (
                  <div className="py-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.15em] font-bold bg-accent text-accent-foreground animate-pulse">
                    Synthesizing custom strategy via Gemini AI...
                  </div>
                ) : (
                  <textarea
                    rows={8}
                    value={aiDraftResponse}
                    onChange={(e) => setAiDraftResponse(e.target.value)}
                    className="w-full p-6 bg-transparent border-2 border-ink font-mono text-xs text-ink focus:outline-none resize-none font-bold"
                  />
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
