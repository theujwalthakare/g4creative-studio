import { INITIAL_LEADS } from '../data/mockData';
import { LeadCRM } from '../types';

const LOCAL_LEADS_KEY = 'g4_local_crm_leads';

export const isBackendEnabled = () => import.meta.env.VITE_BACKEND_ENABLED !== 'false';

export const getFallbackStrategy = (brandName: string, industry: string, currentGoals: string) => ({
  headline: `3-Pillar Growth Matrix for ${brandName || 'Your Brand'}`,
  viralHook: `The 1.8s pattern interrupt: highlight the #1 pain point in ${industry || 'your industry'} visually within frame 1.`,
  recommendedServices: ['Short-Form Viral Content Matrix', 'Creator Seeding & UGC Network'],
  estimatedReach: '250,000 - 1,200,000 monthly organic impressions',
  actionPlan: [
    `Deploy 20 high-retention short-form videos tailored to ${currentGoals || 'your offer'}.`,
    'Seed product samples to 50 micro-creators in your niche.',
    'Route all engagement into an automated CRM & DM lead magnet.'
  ]
});

export const makeFallbackLead = (
  formData: {
    name: string;
    email: string;
    phone?: string;
    company: string;
    budget: string;
    message: string;
  },
  services: string[],
  leadSource: string,
) : LeadCRM => {
  const scoreBase = 60;
  const budget = formData.budget;
  let score = scoreBase;
  if (budget === '$25,000+ / mo') score += 25;
  else if (budget === '$10,000 - $25,000 / mo') score += 20;
  else if (budget === '$5,000 - $10,000 / mo') score += 10;
  if (services.length > 1) score += services.length * 5;
  if (formData.message && formData.message.length > 50) score += 5;
  score = Math.min(score, 99);

  return {
    id: `G4-${Math.floor(1000 + Math.random() * 9000)}`,
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone?.trim() || '',
    company: formData.company.trim(),
    budget,
    services: services.length ? services : ['Short-Form Viral Content Matrix'],
    message: formData.message.trim(),
    status: 'New',
    leadScore: score,
    submittedAt: 'Just now',
    notes: `Static site fallback. Score ${score}/100.`,
    source: leadSource || 'g4creative Web Portfolio'
  };
};

export const readStoredLeads = (): LeadCRM[] => {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    if (!raw) return INITIAL_LEADS;
    const parsed = JSON.parse(raw) as LeadCRM[];
    return Array.isArray(parsed) && parsed.length ? parsed : INITIAL_LEADS;
  } catch {
    return INITIAL_LEADS;
  }
};

export const writeStoredLeads = (leads: LeadCRM[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads));
  } catch {
    // ignore storage failures
  }
};
