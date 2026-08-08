import { CaseStudy, Testimonial, BlogPost, ServiceItem, LeadCRM } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'luxe-beauty-viral',
    title: 'Scaling Luxe Beauty to 3.2M Organic TikTok Views & $420k Month 1 Revenue',
    clientName: 'Luxe Beauty Co.',
    category: 'Fashion & Lifestyle',
    tagline: 'Short-form viral content matrix & micro-creator seeding',
    overview: 'Luxe Beauty Co. wanted to launch their new eco-hydrating lip gloss series without reliance on high customer acquisition cost (CAC) meta ads.',
    challenge: 'Zero brand awareness on short-form video platforms, oversaturated beauty market, and strict CAC targets under $18.',
    strategy: [
      'Produced 45 dynamic hooks testing 3 core messaging pillars: formula breakdown, ASMR application, and raw customer reactions.',
      'Seeded product kits to 120 targeted micro-influencers with custom creative briefs.',
      'Deployed automated comment routing to convert viral engagement directly into shop checkout links.'
    ],
    results: [
      { label: 'Organic Views', value: '3.2M+', change: '+840%' },
      { label: 'ROAS', value: '4.8x', change: 'VS 1.2x Benchmark' },
      { label: 'New Revenue', value: '$420,000', change: 'In 30 Days' },
      { label: 'CAC', value: '$12.40', change: '-31% Target' }
    ],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    tags: ['TikTok Growth', 'Short-Form Video', 'UGC Creator Network', 'E-Commerce'],
    featured: true,
    timeline: '3 Months',
    deliverables: ['Creative Direction', '45+ Video Assets', 'Influencer Seeding', 'Viral Scripting']
  },
  {
    id: 'aura-tech-b2b',
    title: '12,000+ Qualified App Signups for Aura AI Productivity Suite',
    clientName: 'Aura Tech',
    category: 'Tech & SaaS',
    tagline: 'High-converting B2B LinkedIn & Instagram Reel ecosystem',
    overview: 'Aura Tech launched an AI workflow assistant for founders and product teams, needing hyper-targeted user acquisition.',
    challenge: 'Communicating complex AI automation capabilities in under 30 seconds to busy executives.',
    strategy: [
      'Engineered "Problem-Solution-Proof" visual carousels for LinkedIn featuring real workflow teardowns.',
      'Created cinematic 4K motion graphics explaining AI time savings.',
      'Implemented retargeting funnels driving direct interactive web demo completions.'
    ],
    results: [
      { label: 'Qualified Leads', value: '12,450', change: '+310%' },
      { label: 'Click-Through Rate', value: '4.2%', change: '3x Industry Avg' },
      { label: 'Pipeline Value', value: '$1.8M', change: 'Attributed' },
      { label: 'Cost Per Lead', value: '$8.20', change: '-45%' }
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    tags: ['B2B Marketing', 'SaaS Growth', 'LinkedIn Authority', 'Motion Graphics'],
    featured: true,
    timeline: '4 Months',
    deliverables: ['LinkedIn Strategy', 'Motion Reels', 'Lead Magnet Funnel', 'Analytics Dashboard']
  },
  {
    id: 'veloce-streetwear',
    title: 'Generating $850k in 60 Days via Exclusive Drops & Instagram Broadcast Funnel',
    clientName: 'Veloce Apparel',
    category: 'Fashion & Lifestyle',
    tagline: 'Scarcity marketing, hype-building & Instagram Broadcast Channel tactics',
    overview: 'Veloce Streetwear required a launch campaign for their autumn capsule collection to drive immediate sell-outs.',
    challenge: 'Low email list engagement and high ad competition during Q4 peak season.',
    strategy: [
      'Built a VIP Instagram Broadcast channel gaining 28,000 active members in 14 days.',
      'Executed a 10-day countdown teaser series featuring behind-the-scenes design studio clips.',
      'Partnered with 8 key streetwear creators for synchronized unboxing moments.'
    ],
    results: [
      { label: 'Launch Revenue', value: '$850,000', change: 'In 60 Days' },
      { label: 'Sell-Out Speed', value: '14 Hours', change: 'Record High' },
      { label: 'IG Broadcast Opt-ins', value: '28,400', change: '82% Engagement' },
      { label: 'Paid Meta ROAS', value: '5.2x', change: '+180%' }
    ],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    tags: ['Streetwear Drop', 'Instagram Funnel', 'Creator Co-Ops', 'E-Commerce Scaling'],
    featured: true,
    timeline: '2 Months',
    deliverables: ['Drop Playbook', 'Broadcast Growth', 'Meta Ad Creative', 'Influencer Gifting']
  },
  {
    id: 'ecobrew-organic',
    title: '4.5x Instagram Paid ROAS & Omni-Channel Local Buzz for EcoBrew',
    clientName: 'EcoBrew Organic Coffee',
    category: 'Hospitality',
    tagline: 'Geo-targeted Reels & subscription customer acquisition engine',
    overview: 'EcoBrew needed to expand their cold-brew concentrate subscription model nationwide while boosting foot traffic in 15 flagship cafes.',
    challenge: 'Balancing hyper-local café promotion with nationwide D2C subscription scaling.',
    strategy: [
      'Created geo-fenced Instagram Reels targeting espresso enthusiasts within a 5-mile radius of each café.',
      'Offered a "First Bottle Free" D2C trial funnel backed by automated SMS nurturing.',
      'Hosted a viral TikTok Barista Latte Art Competition generating 1,400 user video submissions.'
    ],
    results: [
      { label: 'Subscribers Added', value: '6,200+', change: '+240%' },
      { label: 'Café Foot Traffic', value: '+38%', change: 'MoM Increase' },
      { label: 'Ad ROAS', value: '4.5x', change: 'Across Meta/TikTok' },
      { label: 'UGC Submissions', value: '1,400+', change: 'Viral Contest' }
    ],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    tags: ['Hospitality & D2C', 'Local Social Ads', 'TikTok Contests', 'SMS Automation'],
    featured: false,
    timeline: '6 Months',
    deliverables: ['D2C Ad Creative', 'Geo Ad Campaigns', 'TikTok Contest Playbook', 'Influencer Events']
  },
  {
    id: 'hyperx-b2b-saas',
    title: 'Scale-up B2B Tech Brand: 400% Organic Reach & C-Suite Authority Building',
    clientName: 'HyperX Data Systems',
    category: 'B2B Growth',
    tagline: 'Executive thought leadership & data-driven infographic stories',
    overview: 'HyperX sought to position its executive leadership team as industry visionaries to attract Series B enterprise clients.',
    challenge: 'B2B tech content was dry, generic, and failing to engage C-level decision makers.',
    strategy: [
      'Ghostwrote weekly high-impact LinkedIn posts for CEO and CTO analyzing tech market shifts.',
      'Designed custom branded data visualization carousels explaining enterprise cloud trends.',
      'Launched "Tech Unfiltered" monthly video podcast clips on YouTube Shorts and LinkedIn.'
    ],
    results: [
      { label: 'Profile Views', value: '450,000+', change: '+520%' },
      { label: 'Enterprise Inquiries', value: '48', change: 'High Intent' },
      { label: 'Average Deal Size', value: '$120k', change: '+35%' },
      { label: 'Follower Growth', value: '+18,500', change: 'Decision Makers' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['B2B Authority', 'LinkedIn Thought Leadership', 'Executive Branding'],
    featured: false,
    timeline: '5 Months',
    deliverables: ['Executive Ghostwriting', 'Infographic Design', 'Short Video Clips', 'CRM Integration']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena Rostova',
    role: 'Chief Marketing Officer',
    company: 'Luxe Beauty Co.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'g4creative studio completely transformed our brand trajectory on TikTok. Within 30 days of launching their creative matrix, we achieved 3.2M organic views and $420k in net new revenue. They are not just an agency — they are growth partners who treat your budget like their own.',
    rating: 5,
    featuredMetric: '4.8x Campaign ROAS',
    serviceProvided: 'Short-Form Viral Video & Seeding'
  },
  {
    id: 'test-2',
    author: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'Aura Tech AI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Finding an agency that truly understands B2B tech SaaS is rare. g4creative took our complex AI software, translated it into compelling visual stories, and drove over 12,000 qualified app signups. Their direct CRM integration and transparent reporting keep us aligned every day.',
    rating: 5,
    featuredMetric: '12,450 B2B App Leads',
    serviceProvided: 'B2B LinkedIn & Motion Reels'
  },
  {
    id: 'test-3',
    author: 'Sienna Blake',
    role: 'Creative Director',
    company: 'Veloce Apparel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    quote: 'The team at g4creative built our Instagram Broadcast Channel strategy from scratch and executed our biggest drop in company history ($850k in 60 days). Their speed, aesthetic eye, and social mechanics expertise are unmatched in the industry.',
    rating: 5,
    featuredMetric: '$850,000 Drop Sales',
    serviceProvided: 'Social Drop Strategy & Community'
  },
  {
    id: 'test-4',
    author: 'David Chen',
    role: 'VP of Growth',
    company: 'EcoBrew Organic Coffee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    quote: 'g4creative delivered a 4.5x ROAS across Meta and TikTok while increasing our café foot traffic by 38%. Their creative team produces content that feels completely authentic to our community while driving massive commercial results.',
    rating: 5,
    featuredMetric: '4.5x D2C Paid ROAS',
    serviceProvided: 'Omni-Channel Social Ads & Content'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-tiktok-algorithm-2026',
    title: 'The 2026 TikTok & Instagram Reel Algorithm Manual: Decoding Hook Retention & Audio Velocity',
    slug: '2026-tiktok-instagram-algorithm-manual',
    summary: 'Discover the exact ranking signals, view-duration thresholds, and visual pacing techniques needed to generate 1M+ organic views in 2026.',
    content: `
### The New Social Video Landscape in 2026

The era of random viral clips is officially over. In 2026, recommendation engines on TikTok, Instagram, and YouTube Shorts prioritize **retention velocity** and **semantic engagement context**.

Here are the 4 core pillars g4creative studio uses across all client campaigns:

#### 1. The 1.8-Second Visual Hook Rule
Viewers decide whether to scroll within 1,800 milliseconds. Standard verbal intros ("Hey guys, today I am going to show you...") guarantee a 70% drop-off rate. Instead:
- Start with **motion in frame** (movement towards camera or rapid action).
- Use dynamic text overlays with key trigger keywords in the first frame.
- High-contrast visual juxtaposition (Before vs After teaser).

#### 2. Pattern Interruption Every 2.4 Seconds
To sustain watch-time beyond 15 seconds, introduce subtle shifts:
- Sound effects (whoosh, click, pop).
- Camera angle alternations or micro-zooms.
- Text color emphasis on power verbs.

#### 3. AI Comment Seed Mechanics
Algorithms treat active comment sections as high value. Prompt your audience with divisive or opinionated micro-questions ("Would you try Option A or Option B?").

#### 4. The Audio Velocity Factor
Trending audio isn't just about popular songs. It's about using **low-competition trending audio tracks** that have fewer than 2,000 videos created, allowing your post to dominate the audio feed.
    `,
    category: 'Viral Content',
    author: {
      name: 'Julian Vance',
      role: 'Head of Social Strategy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    },
    date: 'August 2, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop',
    tags: ['TikTok Strategy', 'Reels Algorithm', 'Short-Form Video', 'Organic Reach'],
    featured: true,
    seoScore: 98,
    metaDescription: 'Complete 2026 guide to mastering TikTok and Instagram Reel recommendation algorithms for explosive organic reach.'
  },
  {
    id: 'post-crm-social-lead-conversion',
    title: 'How to Bridge Social Media Ads Directly into your CRM Pipeline for 3x Faster Lead Conversion',
    slug: 'bridge-social-ads-to-crm-pipeline',
    summary: 'Stop letting qualified social leads turn cold. Learn how instant CRM webhook routing and automated lead scoring can slash acquisition costs.',
    content: `
### Why 80% of Social Leads Go Cold Within 1 Hour

The average response time to a social media inquiry is over 4 hours. Yet research shows that contacting a prospect within **5 minutes** increases conversion probability by 900%.

#### The g4creative Direct CRM Integration Architecture

When a prospective client fills out a lead form on Meta, LinkedIn, or our agency website:
1. **Instant Webhook Ingestion**: The lead data is parsed in real-time.
2. **Automated Lead Scoring**: High-intent indicators (e.g. budget > $10k/mo, urgent timeframe) automatically trigger a "Hot Lead" badge.
3. **Instant SMS/Email Acknowledgment**: A personalized response is dispatched within 30 seconds.
4. **CRM Pipeline Assignment**: The deal card is created in the sales column with assigned owner and recommended strategy template.

#### Result
Our clients experience an average **3.2x reduction in cost per acquired customer** simply by fixing their post-click CRM funnel.
    `,
    category: 'Paid Ads',
    author: {
      name: 'Sophia Sterling',
      role: 'Director of Growth & Analytics',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop'
    },
    date: 'July 28, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    tags: ['CRM Integration', 'Lead Nurturing', 'Marketing Automation', 'ROAS Optimization'],
    featured: false,
    seoScore: 95,
    metaDescription: 'Learn how connecting social campaign lead forms directly to CRM automation drives higher close rates and lower CAC.'
  },
  {
    id: 'post-influencer-seeding-roi',
    title: 'Beyond Paid Posts: The Micro-Influencer Seeding Playbook That Generated $1.2M in Earned Media',
    slug: 'micro-influencer-seeding-playbook',
    summary: 'Forget paying mega-influencers $10k per post. Here is how product seeding to hyper-niche creators delivers 5x higher engagement and authentic trust.',
    content: `
### The Death of Traditional Sponsored Posts

Modern digital consumers have developed extreme banner blindness toward labeled #ad posts from mega-celebrities. 

#### Why Micro-Seeding Wins
Micro-creators (5k–30k followers) possess intimate community trust. When gifted a product they genuinely love:
- Unboxing posts feel authentic, not scripted.
- Engagement rates average 6.8% compared to 0.9% for mega-influencers.
- Whitelisting rights can be acquired at a fraction of the cost.

#### Step-by-Step Seeding Workflow
1. **Curate Tier-1 Niche Creators**: Identify creators whose aesthetic aligns 100% with your brand identity.
2. **Custom Unboxing Experience**: Design packaging that begs to be filmed (scent, opening reveal, handwritten note).
3. **No-Strings Gifting with Incentive**: Offer exclusive affiliate commissions for sales driven.
    `,
    category: 'Influencer ROI',
    author: {
      name: 'Liam Sterling',
      role: 'Head of Creator Partnerships',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    date: 'July 15, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    tags: ['Influencer Marketing', 'Creator Seeding', 'UGC Content', 'Brand Growth'],
    featured: false,
    seoScore: 92,
    metaDescription: 'Step-by-step strategy for high-ROI micro-influencer product seeding and UGC asset creation.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'short-form-video',
    title: 'Short-Form Viral Content Matrix',
    tag: 'TikTok, IG Reels, YouTube Shorts',
    description: 'End-to-end studio video production, viral hook scripting, high-velocity editing, and daily publishing optimized for algorithmic recommendation.',
    deliverables: ['15-30 Custom 4K Videos / Month', 'Viral Hook & Concept Development', 'Professional Color & Sound FX', 'Algorithmic Publishing & SEO Captions'],
    iconName: 'Video',
    priceRange: '$3,500 - $8,500 / mo',
    expectedRoi: '3x - 6x Organic Reach'
  },
  {
    id: 'paid-social-scaling',
    title: 'Paid Social Ads & ROAS Engine',
    tag: 'Meta Ads, TikTok Ads, LinkedIn Ads',
    description: 'Data-driven paid media management combining dynamic ad creative testing, high-converting lander optimization, and direct CRM lead capture.',
    deliverables: ['Custom Ad Creative Variations (30+/mo)', 'Audience Segmentation & Retargeting', 'Direct Webhook CRM Integration', 'Live ROAS Attribution Dashboard'],
    iconName: 'TrendingUp',
    priceRange: '$4,000 - $12,000 / mo',
    expectedRoi: '3.5x - 5.5x Target ROAS'
  },
  {
    id: 'influencer-seeding',
    title: 'Creator Seeding & UGC Network',
    tag: 'Micro-Influencers & Whitelisting',
    description: 'Turn creators into your loudest brand champions. We manage creator sourcing, product gifting, usage rights licensing, and ad whitelisting.',
    deliverables: ['50-150 Creator Outreaches / Month', 'UGC Asset Library Rights', 'Whitelisted Creator Meta Ads', 'Affiliate Tracking Infrastructure'],
    iconName: 'Users',
    priceRange: '$3,000 - $7,000 / mo',
    expectedRoi: '5x Earned Media Value'
  },
  {
    id: 'b2b-executive-branding',
    title: 'B2B Social & C-Suite Authority',
    tag: 'LinkedIn & Executive Branding',
    description: 'Position your founders and executive team as industry category leaders through high-impact commentary, visual carousels, and strategic networking.',
    deliverables: ['4 Executive Posts / Week per Leader', 'Custom Data Infographics', 'C-Suite Engagement Networking', 'Monthly Pipeline Attribution'],
    iconName: 'Briefcase',
    priceRange: '$2,500 - $6,000 / mo',
    expectedRoi: '10x Inbound Pipeline Value'
  }
];

export const INITIAL_LEADS: LeadCRM[] = [
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
    submittedAt: 'Today, 10:42 AM',
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
    services: ['Short-Form Viral Content Matrix', 'Creator Seeding & UGC Network', 'Paid Social Ads & ROAS Engine'],
    message: 'We are looking for a full-service social agency to take over our entire D2C funnel. Need influencer seeding and TikTok viral creators.',
    status: 'Closed Won',
    leadScore: 98,
    submittedAt: 'Aug 3, 2026',
    notes: 'Contract signed! Onboarding call set for next Monday.',
    source: 'Referral Case Study'
  }
];
