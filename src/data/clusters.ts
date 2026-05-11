import type { ClusterMeta } from '../types';

export const clusters: ClusterMeta[] = [
  {
    slug: 'ai-writing-tools',
    name: 'AI Writing Tools',
    description: 'The best AI writing tools and assistants for content creation, copywriting, SEO, and marketing in 2026.',
    heroTitle: 'Best AI Writing Tools in 2026',
    heroSubtitle: 'Compare the top AI writing assistants for blog posts, ads, emails, and long-form content. Reviewed, ranked and updated monthly.',
    keywords: ['ai writing tools','best ai writer','ai content generator','ai copywriting software','jasper ai alternatives','ai blog post writer','ai writing assistant'],
    toolCount: 0,
  },
  {
    slug: 'ai-meeting-assistants',
    name: 'AI Meeting Assistants',
    description: 'The best AI meeting assistants that record, transcribe, summarize and analyze your video calls automatically.',
    heroTitle: 'Best AI Meeting Assistants in 2026',
    heroSubtitle: 'Stop taking manual notes. These AI tools automatically join your Zoom, Meet and Teams calls to record, transcribe and summarize every meeting.',
    keywords: ['ai meeting assistant','ai meeting recorder','meeting transcription software','ai notetaker','fireflies ai alternatives','otter ai alternatives','zoom transcription tool'],
    toolCount: 0,
  },
  {
    slug: 'ai-resume-builders',
    name: 'AI Resume Builders',
    description: 'The best AI-powered resume builders that help you create ATS-optimized resumes and cover letters to land more interviews.',
    heroTitle: 'Best AI Resume Builders in 2026',
    heroSubtitle: 'AI resume tools that optimize for ATS systems, match keywords to job descriptions, and help you stand out in competitive job markets.',
    keywords: ['ai resume builder','ats resume builder','ai cv maker','best resume builder 2026','ai resume writer','resume builder with ai','ats optimized resume tool'],
    toolCount: 0,
  },
  {
    slug: 'ai-for-creators',
    name: 'AI Tools for Creators',
    description: 'The best AI tools built for content creators, YouTubers, podcasters, and social media influencers to grow faster.',
    heroTitle: 'Best AI Tools for Content Creators in 2026',
    heroSubtitle: 'From video editing to social media automation, these are the top AI tools that help creators produce more content in less time.',
    keywords: ['ai tools for creators','ai video editing tool','ai for youtubers','ai social media tool','content creator ai software','ai tools for podcasters','best ai for influencers'],
    toolCount: 0,
  },
  {
    slug: 'ai-sales-tools',
    name: 'AI Sales Tools',
    description: 'The best AI-powered sales tools for prospecting, outreach automation, lead enrichment and pipeline acceleration.',
    heroTitle: 'Best AI Sales Tools in 2026',
    heroSubtitle: 'Supercharge your outbound sales with AI tools for prospect finding, email sequencing, call intelligence and CRM enrichment.',
    keywords: ['ai sales tools','ai prospecting tool','ai email outreach','b2b sales ai software','apollo io alternatives','ai sdr tool','sales automation ai'],
    toolCount: 0,
  },
];

export function getClusterBySlug(slug: string): ClusterMeta | undefined {
  return clusters.find((c) => c.slug === slug);
}

export const CLUSTER_SLUGS = clusters.map((c) => c.slug);
