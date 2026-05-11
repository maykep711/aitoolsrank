// Core tool/product type
export interface Tool {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    logo: string;
    website: string;
    affiliateUrl?: string;
    category: ToolCategory;
    clusters: Cluster[];
    rating: number;
    reviewCount: number;
    pricing: PricingInfo;
    pros: string[];
    cons: string[];
    features: Feature[];
    integrations: string[];
    bestFor: string[];
    useCases: UseCase[];
    alternatives: string[]; // slugs
  publishedAt: string;
    updatedAt: string;
    sponsored?: boolean;
    badge?: 'best-overall' | 'best-value' | 'editors-choice' | 'rising-star';
}

export type ToolCategory =
    | 'ai-writing'
  | 'ai-meeting'
  | 'ai-resume'
  | 'ai-creators'
  | 'ai-sales';

export type Cluster =
    | 'ai-writing-tools'
  | 'ai-meeting-assistants'
  | 'ai-resume-builders'
  | 'ai-for-creators'
  | 'ai-sales-tools';

export interface PricingInfo {
    hasFree: boolean;
    freeLabel?: string;
    plans: PricingPlan[];
    pricingUrl?: string;
    notes?: string;
}

export interface PricingPlan {
    name: string;
    price: number | null; // null = custom/enterprise
  period: 'month' | 'year' | 'one-time' | 'custom';
    features: string[];
    highlighted?: boolean;
    cta?: string;
    ctaUrl?: string;
}

export interface Feature {
    name: string;
    description: string;
    available: boolean;
}

export interface UseCase {
    title: string;
    description: string;
    audience: string;
}

// Page types for routing
export type PageType =
    | 'review'
  | 'alternatives'
  | 'pricing'
  | 'comparison'
  | 'best-for'
  | 'integrations'
  | 'use-cases';

// Comparison type
export interface ComparisonItem {
    toolSlug: string;
    feature: string;
    value: string | boolean | number;
}

// SEO metadata
export interface SEOMeta {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    schema?: object;
    noindex?: boolean;
}

// Internal link
export interface InternalLink {
    text: string;
    href: string;
    type: PageType;
}

// Cluster landing page
export interface ClusterMeta {
    slug: Cluster;
    name: string;
    description: string;
    heroTitle: string;
    heroSubtitle: string;
    keywords: string[];
    toolCount: number;
}

// RSS feed item
export interface RSSItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    category: string;
}

// Analytics events
export interface TrackingEvent {
    event: string;
    category: string;
    label?: string;
    value?: number;
    toolSlug?: string;
    pageType?: PageType;
}
