export interface Metric {
  label: string;
  value: string;
  change?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  clientLogo?: string;
  category: 'E-Commerce' | 'Tech & SaaS' | 'Fashion & Lifestyle' | 'B2B Growth' | 'Hospitality';
  tagline: string;
  overview: string;
  challenge: string;
  strategy: string[];
  results: Metric[];
  image: string;
  tags: string[];
  featured?: boolean;
  timeline: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  quote: string;
  rating: number;
  featuredMetric: string;
  serviceProvided: string;
  videoThumbnail?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'Social Strategy' | 'Viral Content' | 'Paid Ads' | 'Brand Growth' | 'Influencer ROI';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  seoScore: number;
  metaDescription: string;
}

export interface LeadCRM {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  budget: string;
  services: string[];
  message: string;
  status: 'New' | 'In Contact' | 'Proposal Sent' | 'Closed Won' | 'Archived';
  leadScore: number;
  submittedAt: string;
  notes?: string;
  source?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  iconName: string;
  priceRange: string;
  expectedRoi: string;
}
