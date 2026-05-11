import type { Tool } from '../types';

export const tools: Tool[] = [
    // ── AI WRITING TOOLS ──────────────────────────────────────────────
  {
        slug: 'jasper-ai',
        name: 'Jasper AI',
        tagline: 'The AI writing assistant built for marketing teams',
        description:
                'Jasper is an AI content platform that helps marketing teams create on-brand content faster. It features Brand Voice, campaign workflows, and 50+ templates for blog posts, ads, emails and more.',
        logo: '/logos/jasper.svg',
        website: 'https://www.jasper.ai',
        affiliateUrl: 'https://www.jasper.ai?ref=aitoolsrank',
        category: 'ai-writing',
        clusters: ['ai-writing-tools'],
        rating: 4.6,
        reviewCount: 2847,
        pricing: {
                hasFree: false,
                plans: [
                  {
                              name: 'Creator',
                              price: 49,
                              period: 'month',
                              features: ['1 user seat', 'Brand Voice', '50+ templates', 'Browser extension'],
                  },
                  {
                              name: 'Pro',
                              price: 69,
                              period: 'month',
                              features: ['Up to 5 users', 'AI image generation', 'Collaboration', 'SEO mode'],
                              highlighted: true,
                              cta: 'Start Free Trial',
                  },
                  {
                              name: 'Business',
                              price: null,
                              period: 'custom',
                              features: ['Unlimited users', 'Custom AI model', 'API access', 'Dedicated CSM'],
                  },
                        ],
        },
        pros: [
                'Best-in-class Brand Voice feature',
                'Deep marketing workflow integrations',
                'Large template library (50+)',
                'Strong team collaboration tools',
              ],
        cons: [
                'No free plan — free trial only',
                'Can feel expensive for solo creators',
                'Output quality varies by template',
              ],
        features: [
          { name: 'Brand Voice', description: 'Train Jasper on your brand tone and style', available: true },
          { name: 'SEO Mode', description: 'Integrates with Surfer SEO for optimized content', available: true },
          { name: 'AI Image Generation', description: 'Generate images alongside copy', available: true },
          { name: 'Plagiarism Checker', description: 'Check content originality', available: true },
          { name: 'API Access', description: 'Programmatic access to Jasper capabilities', available: true },
              ],
        integrations: ['Surfer SEO', 'Webflow', 'Google Docs', 'Chrome Extension', 'Zapier', 'HubSpot'],
        bestFor: ['Marketing teams', 'Content agencies', 'E-commerce brands', 'Growth marketers'],
        useCases: [
          { title: 'Blog post creation', description: 'Draft full SEO blog posts in minutes with the Blog Post Workflow', audience: 'Content marketers' },
          { title: 'Ad copy at scale', description: 'Generate dozens of ad variants for A/B testing', audience: 'Performance marketers' },
          { title: 'Product descriptions', description: 'Write consistent, on-brand product pages at scale', audience: 'E-commerce teams' },
              ],
        alternatives: ['copy-ai', 'writesonic', 'rytr'],
        publishedAt: '2025-01-15',
        updatedAt: '2026-04-20',
        badge: 'editors-choice',
  },
  {
        slug: 'copy-ai',
        name: 'Copy.ai',
        tagline: 'AI-powered GTM workflows for sales and marketing',
        description:
                'Copy.ai has evolved from a copy generator into a full GTM (Go-To-Market) AI platform with automated workflows for sales sequences, content pipelines, and lead enrichment.',
        logo: '/logos/copyai.svg',
        website: 'https://www.copy.ai',
        affiliateUrl: 'https://www.copy.ai?ref=aitoolsrank',
        category: 'ai-writing',
        clusters: ['ai-writing-tools'],
        rating: 4.4,
        reviewCount: 1923,
        pricing: {
                hasFree: true,
                freeLabel: 'Free forever — 2,000 words/month',
                plans: [
                  { name: 'Free', price: 0, period: 'month', features: ['2,000 words/month', '90+ copywriting tools', '25+ languages'] },
                  { name: 'Pro', price: 49, period: 'month', features: ['Unlimited words', 'Priority support', 'Workflow automations'], highlighted: true },
                  { name: 'Team', price: 249, period: 'month', features: ['5 users', 'Custom workflows', 'API access'] },
                        ],
        },
        pros: ['Free plan available', 'Strong GTM workflow automation', '90+ templates', '25+ languages'],
        cons: ['Free plan is very limited', 'UI can be overwhelming for new users', 'Quality needs editing'],
        features: [
          { name: 'GTM Workflows', description: 'Automated go-to-market content pipelines', available: true },
          { name: 'Infobase', description: 'Store brand info for consistent outputs', available: true },
          { name: 'API Access', description: 'Programmatic content generation', available: true },
          { name: 'Brand Voice', description: 'Custom tone of voice training', available: false },
              ],
        integrations: ['HubSpot', 'Salesforce', 'Zapier', 'Slack', 'Chrome Extension'],
        bestFor: ['Freelancers', 'Startups', 'Sales teams', 'Small businesses'],
        useCases: [
          { title: 'Cold email sequences', description: 'Generate personalized cold outreach at scale', audience: 'Sales teams' },
          { title: 'Social media content', description: 'Batch-create posts for LinkedIn, Twitter, Instagram', audience: 'Social media managers' },
              ],
        alternatives: ['jasper-ai', 'writesonic', 'rytr'],
        publishedAt: '2025-01-20',
        updatedAt: '2026-04-18',
  },
  {
        slug: 'writesonic',
        name: 'Writesonic',
        tagline: 'AI writer with real-time web data and SEO focus',
        description:
                'Writesonic combines AI writing with real-time Bing search access and a built-in AI article writer that produces factual, SEO-optimized content. Includes Chatsonic (ChatGPT alternative) and Botsonic (chatbot builder).',
        logo: '/logos/writesonic.svg',
        website: 'https://writesonic.com',
        affiliateUrl: 'https://writesonic.com?ref=aitoolsrank',
        category: 'ai-writing',
        clusters: ['ai-writing-tools'],
        rating: 4.3,
        reviewCount: 1456,
        pricing: {
                hasFree: true,
                freeLabel: '10,000 words free trial',
                plans: [
                  { name: 'Free', price: 0, period: 'month', features: ['10k words trial', 'Chatsonic access', '100+ templates'] },
                  { name: 'Small Team', price: 19, period: 'month', features: ['Unlimited words', '1 user', 'GPT-4 access', 'Botsonic'], highlighted: true },
                  { name: 'Freelancer', price: 20, period: 'month', features: ['Unlimited words', 'Priority access', 'Advanced AI article writer'] },
                        ],
        },
        pros: ['Best value for money in the category', 'Real-time web search integration', 'Article writer with factual accuracy', 'Includes chatbot builder'],
        cons: ['UI quality inconsistent across features', 'Botsonic limited on lower plans', 'Support response time can be slow'],
        features: [
          { name: 'Real-time Web Search', description: 'Access live web data while writing', available: true },
          { name: 'AI Article Writer', description: 'Long-form SEO articles with citations', available: true },
          { name: 'Botsonic', description: 'Custom AI chatbot builder', available: true },
          { name: 'Brand Voice', description: 'Custom tone settings', available: true },
              ],
        integrations: ['WordPress', 'Semrush', 'Surfer SEO', 'Zapier', 'Chrome Extension'],
        bestFor: ['SEO content teams', 'Bloggers', 'Agencies', 'Startups on a budget'],
        useCases: [
          { title: 'SEO blog articles', description: 'Write factual, cited long-form blog posts', audience: 'SEO marketers' },
          { title: 'Customer support bots', description: 'Build no-code AI chatbots for websites', audience: 'SaaS companies' },
              ],
        alternatives: ['jasper-ai', 'copy-ai', 'rytr'],
        publishedAt: '2025-02-01',
        updatedAt: '2026-04-15',
        badge: 'best-value',
  },

    // ── AI MEETING ASSISTANTS ─────────────────────────────────────────
  {
        slug: 'fireflies-ai',
        name: 'Fireflies.ai',
        tagline: 'AI notetaker that records, transcribes and analyzes meetings',
        description:
                'Fireflies.ai automatically joins your video calls to record, transcribe, summarize and analyze conversations. It supports Zoom, Google Meet, Teams and 40+ integrations with searchable transcripts.',
        logo: '/logos/fireflies.svg',
        website: 'https://fireflies.ai',
        affiliateUrl: 'https://fireflies.ai?ref=aitoolsrank',
        category: 'ai-meeting',
        clusters: ['ai-meeting-assistants'],
        rating: 4.5,
        reviewCount: 3102,
        pricing: {
                hasFree: true,
                freeLabel: 'Free — 800 mins storage',
                plans: [
                  { name: 'Free', price: 0, period: 'month', features: ['800 min storage', 'Unlimited transcription', 'AI summaries'] },
                  { name: 'Pro', price: 18, period: 'month', features: ['Unlimited storage', 'Video recording', 'CRM sync'], highlighted: true },
                  { name: 'Business', price: 29, period: 'month', features: ['Team analytics', 'Custom vocabulary', 'API access'] },
                        ],
        },
        pros: ['Generous free plan', 'Excellent transcription accuracy', '40+ integrations including CRMs', 'AI soundbites and clips'],
        cons: ['Free plan storage limit', 'Bot joining can feel intrusive to guests', 'Video storage costs extra'],
        features: [
          { name: 'Auto-join meetings', description: 'Bot joins scheduled calls automatically', available: true },
          { name: 'AI summaries', description: 'Action items, decisions and key points', available: true },
          { name: 'CRM sync', description: 'Sync notes to HubSpot, Salesforce, etc.', available: true },
          { name: 'Conversation analytics', description: 'Talk time, sentiment, topics', available: true },
              ],
        integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'HubSpot', 'Salesforce', 'Slack', 'Notion', 'Zapier'],
        bestFor: ['Sales teams', 'Remote teams', 'Recruiting teams', 'Customer success'],
        useCases: [
          { title: 'Sales call intelligence', description: 'Capture and analyze sales conversations for coaching', audience: 'Sales managers' },
          { title: 'Meeting documentation', description: 'Auto-generate meeting notes and action items', audience: 'Project managers' },
              ],
        alternatives: ['otter-ai', 'fathom', 'krisp'],
        publishedAt: '2025-01-25',
        updatedAt: '2026-04-22',
        badge: 'best-overall',
  },
  {
        slug: 'otter-ai',
        name: 'Otter.ai',
        tagline: 'Real-time AI meeting transcription and collaboration',
        description:
                'Otter.ai provides real-time transcription with speaker identification, live captions, and AI-generated meeting summaries. Widely used in education and business for accessible, searchable meeting records.',
        logo: '/logos/otter.svg',
        website: 'https://otter.ai',
        affiliateUrl: 'https://otter.ai?ref=aitoolsrank',
        category: 'ai-meeting',
        clusters: ['ai-meeting-assistants'],
        rating: 4.3,
        reviewCount: 2234,
        pricing: {
                hasFree: true,
                freeLabel: 'Free — 300 mins/month',
                plans: [
                  { name: 'Basic', price: 0, period: 'month', features: ['300 min/month', '3 imports/month', 'AI meeting assistance'] },
                  { name: 'Pro', price: 16.99, period: 'month', features: ['1,200 min/month', 'Advanced search', 'Custom vocabulary'], highlighted: true },
                  { name: 'Business', price: 30, period: 'month', features: ['6,000 min/month', 'Admin panel', 'Priority support'] },
                        ],
        },
        pros: ['Real-time live transcription', 'Strong education use case', 'Live captions for accessibility', 'Good free tier'],
        cons: ['Accuracy lower on technical terms', 'Mobile app less polished', 'Less CRM integrations than competitors'],
        features: [
          { name: 'Real-time transcription', description: 'Live transcript as meeting progresses', available: true },
          { name: 'Speaker identification', description: 'Identifies and labels who is speaking', available: true },
          { name: 'Automated summaries', description: 'Key points extracted post-meeting', available: true },
          { name: 'Live captions', description: 'Accessibility-focused real-time captions', available: true },
              ],
        integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Dropbox', 'Slack'],
        bestFor: ['Students', 'Journalists', 'Remote teams', 'Accessibility-focused orgs'],
        useCases: [
          { title: 'Lecture transcription', description: 'Auto-transcribe class lectures for study notes', audience: 'Students' },
          { title: 'Interview recording', description: 'Transcribe journalist and research interviews', audience: 'Journalists & researchers' },
              ],
        alternatives: ['fireflies-ai', 'fathom', 'krisp'],
        publishedAt: '2025-02-10',
        updatedAt: '2026-04-10',
  },

    // ── AI RESUME BUILDERS ────────────────────────────────────────────
  {
        slug: 'resumai',
        name: 'Rezi',
        tagline: 'AI resume builder with ATS optimization',
        description:
                'Rezi is an AI-powered resume platform that creates ATS-optimized resumes with real-time scoring, keyword matching, and AI content suggestions tailored to specific job descriptions.',
        logo: '/logos/rezi.svg',
        website: 'https://www.rezi.ai',
        affiliateUrl: 'https://www.rezi.ai?ref=aitoolsrank',
        category: 'ai-resume',
        clusters: ['ai-resume-builders'],
        rating: 4.4,
        reviewCount: 1876,
        pricing: {
                hasFree: true,
                freeLabel: 'Free — 1 resume',
                plans: [
                  { name: 'Free', price: 0, period: 'month', features: ['1 active resume', 'ATS scoring', 'Basic templates'] },
                  { name: 'Pro', price: 29, period: 'month', features: ['Unlimited resumes', 'AI writer', 'Cover letters', 'LinkedIn review'], highlighted: true },
                  { name: 'Lifetime', price: 129, period: 'one-time', features: ['Everything in Pro', 'Lifetime updates', 'Priority support'] },
                        ],
        },
        pros: ['Real-time ATS score feedback', 'Job description matching', 'Lifetime plan available', 'Clean professional templates'],
        cons: ['Free plan very limited', 'Template variety could be better', 'Mobile editing not ideal'],
        features: [
          { name: 'ATS scoring', description: 'Real-time applicant tracking system optimization score', available: true },
          { name: 'AI content writer', description: 'AI generates bullet points and summaries', available: true },
          { name: 'Job matching', description: 'Tailor resume to specific job descriptions', available: true },
          { name: 'Cover letter builder', description: 'AI-generated cover letters', available: true },
              ],
        integrations: ['LinkedIn', 'Google Drive'],
        bestFor: ['Job seekers', 'Career changers', 'Recent graduates', 'HR professionals'],
        useCases: [
          { title: 'ATS optimization', description: 'Pass automated resume screening systems', audience: 'Active job seekers' },
          { title: 'Career pivot resumes', description: 'Reframe experience for new industries', audience: 'Career changers' },
              ],
        alternatives: ['kickresume', 'enhancv', 'resume-worded'],
        publishedAt: '2025-03-01',
        updatedAt: '2026-04-05',
        badge: 'best-overall',
  },

    // ── AI SALES TOOLS ────────────────────────────────────────────────
  {
        slug: 'apollo-io',
        name: 'Apollo.io',
        tagline: 'All-in-one AI sales intelligence and engagement platform',
        description:
                'Apollo.io combines a 270M+ contact database with AI-powered sales sequences, email finder, dialer, and CRM enrichment. The go-to tool for outbound sales teams doing prospecting and automated outreach.',
        logo: '/logos/apollo.svg',
        website: 'https://www.apollo.io',
        affiliateUrl: 'https://www.apollo.io?ref=aitoolsrank',
        category: 'ai-sales',
        clusters: ['ai-sales-tools'],
        rating: 4.6,
        reviewCount: 4521,
        pricing: {
                hasFree: true,
                freeLabel: 'Free — 10 email credits/month',
                plans: [
                  { name: 'Free', price: 0, period: 'month', features: ['10 email exports/month', 'Basic sequences', 'Chrome extension'] },
                  { name: 'Basic', price: 59, period: 'month', features: ['1,200 email credits', 'Sequences', 'AI writing assist'] },
                  { name: 'Professional', price: 99, period: 'month', features: ['Unlimited emails', 'Dialer', 'Advanced analytics'], highlighted: true },
                  { name: 'Organization', price: 149, period: 'month', features: ['Custom permissions', 'API access', 'SSO'] },
                        ],
        },
        pros: ['Largest B2B contact database (270M+)', 'All-in-one: prospecting + sequences + dialer', 'Strong free tier', 'Best-in-class email finder accuracy'],
        cons: ['UI can be complex for new users', 'Data accuracy varies by region', 'Higher plans expensive for small teams'],
        features: [
          { name: 'Contact database', description: '270M+ verified B2B contacts', available: true },
          { name: 'Email sequences', description: 'Automated multi-step outreach', available: true },
          { name: 'AI email writer', description: 'AI-personalized outreach at scale', available: true },
          { name: 'Built-in dialer', description: 'Make calls directly from the platform', available: true },
          { name: 'CRM enrichment', description: 'Enrich existing CRM records with data', available: true },
              ],
        integrations: ['Salesforce', 'HubSpot', 'Outreach', 'Salesloft', 'Slack', 'Gmail', 'Chrome Extension'],
        bestFor: ['SDR teams', 'B2B startups', 'Sales managers', 'Revenue ops'],
        useCases: [
          { title: 'Outbound prospecting', description: 'Find and contact ideal customers with verified data', audience: 'SDR/BDR teams' },
          { title: 'CRM data enrichment', description: 'Fill in missing contact and company data automatically', audience: 'Revenue operations' },
              ],
        alternatives: ['instantly-ai', 'lemlist', 'outreach'],
        publishedAt: '2025-01-10',
        updatedAt: '2026-05-01',
        badge: 'editors-choice',
  },
  ];

export function getToolBySlug(slug: string): Tool | undefined {
    return tools.find((t) => t.slug === slug);
}

export function getToolsByCluster(cluster: string): Tool[] {
    return tools.filter((t) => t.clusters.includes(cluster as any));
}

export function getToolsByCategory(category: string): Tool[] {
    return tools.filter((t) => t.category === category);
}

export function getAlternativesFor(slug: string): Tool[] {
    const tool = getToolBySlug(slug);
    if (!tool) return [];
    return tools.filter((t) => tool.alternatives.includes(t.slug));
}

export function getRelatedTools(slug: string, limit = 3): Tool[] {
    const tool = getToolBySlug(slug);
    if (!tool) return [];
    return tools
      .filter((t) => t.slug !== slug && t.clusters.some((c) => tool.clusters.includes(c)))
      .slice(0, limit);
}
