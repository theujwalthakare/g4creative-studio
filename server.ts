import express from 'express';
import path from 'path';
import helmet from 'helmet';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { LeadCRM } from './src/types';

const INITIAL_SERVER_LEADS: LeadCRM[] = [
  {
    id: 'G4-9081',
    name: 'Sarah Jenkins',
    email: 'sarah@kineticsports.com',
    phone: '+1 (555) 382-9912',
    company: 'Kinetic Sports Wear',
    budget: '$10,000 - $25,000 / mo',
    services: ['Short-Form Viral Content Matrix', 'Paid Social Ads & ROAS Engine'],
    message: 'We are launching our new compression athletic line next month and need aggressive TikTok short-form video scaling and meta ad campaigns.',
    status: 'New',
    leadScore: 92,
    submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
    notes: 'High intent lead. Wants to launch in 3 weeks.',
    source: 'Agency Portfolio Website'
  },
  {
    id: 'G4-9078',
    name: 'Alexander Ross',
    email: 'aross@cloudscale.io',
    phone: '+1 (555) 891-2200',
    company: 'CloudScale AI',
    budget: '$5,000 - $10,000 / mo',
    services: ['B2B Social & C-Suite Authority'],
    message: 'Looking to build CEO thought leadership on LinkedIn to support our Series B funding round.',
    status: 'Proposal Sent',
    leadScore: 88,
    submittedAt: 'Yesterday, 3:15 PM',
    notes: 'Proposal emailed. Meeting scheduled for Thursday.',
    source: 'Agency Portfolio Website'
  },
  {
    id: 'G4-9072',
    name: 'Mia Thorne',
    email: 'm.thorne@bloomskin.co',
    phone: '+1 (555) 772-1099',
    company: 'Bloom Organic Skincare',
    budget: '$25,000+ / mo',
    services: ['Short-Form Viral Content Matrix', 'Creator Seeding & UGC Network'],
    message: 'We are looking for a full-service social agency to take over our entire D2C funnel. Need influencer seeding and TikTok viral creators.',
    status: 'Closed Won',
    leadScore: 98,
    submittedAt: 'Aug 3, 2026',
    notes: 'Contract signed! Onboarding call set for next Monday.',
    source: 'Referral Case Study'
  }
];

let crmLeadsDb: LeadCRM[] = [...INITIAL_SERVER_LEADS];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Security headers
  app.use(helmet());

  // Lightweight Content Security Policy — conservative by default
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://cdn.jsdelivr.net'],
        connectSrc: ["'self'", 'https://api.github.com', 'https://*.googleapis.com', 'ws:'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      }
    })
  );

  // Admin key for protecting mutate CRM routes
  const CRM_ADMIN_KEY = process.env.CRM_ADMIN_KEY || '';

  const requireCrmAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!CRM_ADMIN_KEY) {
      // If no admin key configured, deny destructive actions in production
      return res.status(403).json({ error: 'CRM admin operations are disabled on this instance.' });
    }
    const provided = (req.headers['x-crm-admin-key'] || req.query.admin_key || req.headers['authorization']) as string | undefined;
    if (!provided) return res.status(401).json({ error: 'Missing CRM admin key.' });
    // allow passing raw key or Bearer <key>
    const normalized = provided.replace(/^Bearer\s+/i, '').trim();
    if (normalized !== CRM_ADMIN_KEY) return res.status(401).json({ error: 'Invalid CRM admin key.' });
    return next();
  };

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', agency: 'g4creative studio', time: new Date().toISOString() });
  });

  // Direct CRM Lead Submission Route
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, phone, company, budget, services, message, leadSource } = req.body;

      if (!name || !email || !company) {
        return res.status(400).json({ error: 'Name, Email, and Company are required fields.' });
      }

      // Calculate automated Lead Score
      let score = 60;
      if (budget === '$25,000+ / mo') score += 25;
      else if (budget === '$10,000 - $25,000 / mo') score += 20;
      else if (budget === '$5,000 - $10,000 / mo') score += 10;

      if (Array.isArray(services) && services.length > 1) score += services.length * 5;
      if (message && message.length > 50) score += 5;
      score = Math.min(score, 99);

      const newLeadId = `G4-${Math.floor(1000 + Math.random() * 9000)}`;

      const newLead: LeadCRM = {
        id: newLeadId,
        name: String(name).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : '',
        company: String(company).trim(),
        budget: budget || '$5,000 - $10,000 / mo',
        services: Array.isArray(services) && services.length > 0 ? services : ['Short-Form Viral Content Matrix'],
        message: message ? String(message).trim() : '',
        status: 'New',
        leadScore: score,
        submittedAt: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
        notes: `Automated CRM Entry: Score ${score}/100. Direct web form submission.`,
        source: leadSource || 'g4creative Web Portfolio'
      };

      crmLeadsDb.unshift(newLead);

      res.status(201).json({
        success: true,
        message: 'Lead successfully routed and stored in g4creative CRM pipeline.',
        lead: newLead,
        totalLeads: crmLeadsDb.length
      });
    } catch (err: any) {
      console.error('Error saving contact lead:', err);
      res.status(500).json({ error: 'Failed to process lead submission.' });
    }
  });

  // Fetch all CRM leads
  app.get('/api/crm/leads', (req, res) => {
    res.json({
      success: true,
      leads: crmLeadsDb,
      stats: {
        totalLeads: crmLeadsDb.length,
        newLeads: crmLeadsDb.filter(l => l.status === 'New').length,
        proposalsSent: crmLeadsDb.filter(l => l.status === 'Proposal Sent').length,
        closedWon: crmLeadsDb.filter(l => l.status === 'Closed Won').length
      }
    });
  });

  // Update lead status or notes
  app.patch('/api/crm/leads/:id', requireCrmAdmin, (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const leadIndex = crmLeadsDb.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found.' });
    }

    if (status) crmLeadsDb[leadIndex].status = status;
    if (notes !== undefined) crmLeadsDb[leadIndex].notes = notes;

    res.json({
      success: true,
      lead: crmLeadsDb[leadIndex],
      message: 'CRM Lead updated.'
    });
  });

  // Delete lead
  app.delete('/api/crm/leads/:id', requireCrmAdmin, (req, res) => {
    const { id } = req.params;
    crmLeadsDb = crmLeadsDb.filter(l => l.id !== id);
    res.json({ success: true, message: 'Lead removed from CRM.' });
  });

  // AI Instant Social Strategy Audit Generator
  app.post('/api/ai/audit', async (req, res) => {
    try {
      const { brandName, industry, currentGoals } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // High quality deterministic fallback strategy if API key not present
        return res.json({
          success: true,
          strategy: {
            headline: `3-Pillar Growth Matrix for ${brandName || 'Your Brand'}`,
            viralHook: `The 1.8s pattern interrupt: Highlight the #1 pain point in ${industry || 'your industry'} visually within frame 1.`,
            recommendedServices: ['Short-Form Viral Content Matrix', 'Creator Seeding & UGC Network'],
            estimatedReach: '250,000 - 1,200,000 monthly organic impressions',
            actionPlan: [
              'Deploy 20 high-retention short-form videos with custom audio hooks.',
              'Seed product samples to 50 micro-creators in your niche.',
              'Route all engagement into an automated CRM & DM lead magnet.'
            ]
          }
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead Growth Director at g4creative studio, an elite social media marketing agency.
Generate a concise, high-converting 3-point social media strategy proposal for a prospective client.
Brand Name: ${brandName || 'Client Brand'}
Industry: ${industry || 'E-Commerce / D2C'}
Goals: ${currentGoals || 'Viral reach, ROAS scaling, higher lead conversion'}

Return JSON format with:
{
  "headline": string,
  "viralHook": string,
  "recommendedServices": array of strings,
  "estimatedReach": string,
  "actionPlan": array of 3 actionable strategic steps
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const responseText = response.text || '';
      const parsed = JSON.parse(responseText);

      res.json({ success: true, strategy: parsed });
    } catch (err: any) {
      console.error('Gemini Strategy Audit error:', err);
      res.json({
        success: true,
        strategy: {
          headline: `Custom Viral Growth Matrix for ${req.body.brandName || 'Your Brand'}`,
          viralHook: 'Hook within 1.8 seconds with unexpected visual motion & audio trigger.',
          recommendedServices: ['Short-Form Viral Content Matrix', 'Paid Social Ads & ROAS Engine'],
          estimatedReach: '350,000+ targeted organic views',
          actionPlan: [
            'Audit existing content & isolate high-retention audience triggers.',
            'Script and film 25 high-contrast 4K video assets.',
            'Scale high-performing posts with whitelisted paid social ads.'
          ]
        }
      });
    }
  });

  // Vite Middleware for Dev / Static Serving for Prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`g4creative studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
