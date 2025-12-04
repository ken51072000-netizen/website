export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  metrics: string;
  description: string;
}

export interface SiteContent {
  // Home / Hero
  heroTitle: string;
  heroDescription: string;
  
  // Company / About
  aboutTitle: string;
  aboutDescription: string;
  
  // Product 1: Device Anomaly Diagnosis Engine
  engineTitle: string;
  engineDescription: string;

  // Product 2: Predictive Maintenance Software
  softwareTitle: string;
  softwareDescription: string;

  // Case Studies
  caseStudies: CaseStudy[];

  // Contact
  contactEmail: string;
  contactAddress: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}

export type ViewMode = 'public' | 'admin';

export type AdminTab = 'content' | 'comments' | 'architecture';
export type PublicPage = 'home' | 'company' | 'products' | 'cases' | 'contact';