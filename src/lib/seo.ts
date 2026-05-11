import type { Tool, ClusterMeta, PageType, SEOMeta } from '../types';

const SITE_URL = 'https://aitoolsrank.com';
const SITE_NAME = 'AIToolsRank';
const DEFAULT_OG = '/og-default.png';

// ── Title templates by page type ────────────────────────────────────
export function buildTitle(tool: Tool, pageType: PageType): string {
  const y = new Date().getFullYear();
  switch (pageType) {
    case 'review':
      return `${tool.name} Review ${y}: Pricing, Features & Verdict`;
    case 'alternatives':
      return `Best ${tool.name} Alternatives in ${y} (Free & Paid)`;
    case 'pricing':
      return `${tool.name} Pricing ${y}: All Plans Compared`;
    case 'comparison':
      return `${tool.name} vs Competitors ${y}: Full Comparison`;
    case 'best-for':
      return `Is ${tool.name} Worth It? Best For & Use Cases ${y}`;
    case 'integrations':
      return `${tool.name} Integrations ${y}: Complete List`;
    case 'use-cases':
      return `${tool.name} Use Cases ${y}: Who Should Use It?`;
    default:
      return `${tool.name} - ${SITE_NAME}`;
  }
}

// ── Description templates by page type ────────────────────────────────
export function buildDescription(tool: Tool, pageType: PageType): string {
  switch (pageType) {
    case 'review':
      return `Independent review of ${tool.name}. We tested pricing, features and real-world performance. Rating: ${tool.rating}/5. Is it worth it?`;
    case 'alternatives':
      return `Looking for ${tool.name} alternatives? We compared the ${tool.alternatives.length + 1} best options on pricing, features and use cases.`;
    case 'pricing':
      return `${tool.name} pricing breakdown: ${tool.pricing.plans.map(p => p.name + ' $' + (p.price ?? 'Custom')).join(', ')}. Free plan: ${tool.pricing.hasFree ? 'Yes' : 'No'}.`;
    case 'comparison':
      return `Compare ${tool.name} vs top alternatives. Side-by-side feature comparison, pricing and verdict to help you choose the right tool.`;
    case 'best-for':
      return `${tool.name} is best for ${tool.bestFor.slice(0, 3).join(', ')}. See if it fits your use case with our expert analysis.`;
    case 'integrations':
      return `${tool.name} integrates with ${tool.integrations.slice(0, 5).join(', ')} and more. Full list of native integrations and API options.`;
    case 'use-cases':
      return `Discover how ${tool.name} is used by ${tool.bestFor.slice(0, 3).join(', ')}. Real-world use cases, examples and ROI.`;
    default:
      return tool.description;
  }
}

// ── Canonical URL builder ──────────────────────────────────────────────
export function buildCanonical(tool: Tool, pageType: PageType): string {
  const base = `${SITE_URL}/tools/${tool.slug}`;
  if (pageType === 'review') return base;
  return `${base}/${pageType}`;
}

export function buildClusterCanonical(cluster: ClusterMeta): string {
  return `${SITE_URL}/${cluster.slug}`;
}

// ── Full SEOMeta builder ───────────────────────────────────────────────
export function buildSEOMeta(tool: Tool, pageType: PageType): SEOMeta {
  return {
    title: buildTitle(tool, pageType),
    description: buildDescription(tool, pageType),
    canonical: buildCanonical(tool, pageType),
    ogImage: tool.logo || DEFAULT_OG,
    schema: buildSchema(tool, pageType),
  };
}

export function buildClusterSEOMeta(cluster: ClusterMeta): SEOMeta {
  return {
    title: cluster.heroTitle + ' | ' + SITE_NAME,
    description: cluster.description,
    canonical: buildClusterCanonical(cluster),
    ogImage: DEFAULT_OG,
    schema: buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: cluster.name, url: buildClusterCanonical(cluster) },
    ]),
  };
}

// ── Schema.org builders ───────────────────────────────────────────────
export function buildSchema(tool: Tool, pageType: PageType): object {
  const schemas: object[] = [buildSoftwareApplicationSchema(tool)];

  if (pageType === 'review') {
    schemas.push(buildReviewSchema(tool));
    schemas.push(buildBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: tool.name + ' Review', url: buildCanonical(tool, 'review') },
    ]));
  }

  if (pageType === 'pricing') {
    schemas.push(buildFAQSchema([
      { q: `How much does ${tool.name} cost?`, a: tool.pricing.plans.map(p => `${p.name}: $${p.price ?? 'Custom'}/${p.period}`).join('. ') },
      { q: `Does ${tool.name} have a free plan?`, a: tool.pricing.hasFree ? (tool.pricing.freeLabel || 'Yes, there is a free plan.') : 'No, there is no free plan.' },
      { q: `What is the cheapest ${tool.name} plan?`, a: (() => { const paid = tool.pricing.plans.filter(p => p.price !== null && p.price > 0); if (!paid.length) return 'See pricing page.'; const min = paid.sort((a,b) => (a.price||0)-(b.price||0))[0]; return `The ${min.name} plan starts at $${min.price}/${min.period}.`; })() },
    ]));
  }

  if (pageType === 'alternatives') {
    schemas.push(buildFAQSchema([
      { q: `What are the best alternatives to ${tool.name}?`, a: `Top alternatives include: ${tool.alternatives.join(', ')}. Each has different strengths depending on your use case.` },
      { q: `Is there a free alternative to ${tool.name}?`, a: `Yes, several alternatives offer free plans. We cover them in detail above.` },
    ]));
  }

  return schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas };
}

function buildSoftwareApplicationSchema(tool: Tool): object {
  const lowestPaid = tool.pricing.plans.filter(p => p.price !== null && p.price > 0).sort((a,b) => (a.price||0)-(b.price||0))[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    ...(lowestPaid ? {
      offers: {
        '@type': 'Offer',
        price: lowestPaid.price,
        priceCurrency: 'USD',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      },
    } : {}),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

function buildReviewSchema(tool: Tool): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${tool.name} Review`,
    reviewBody: tool.description,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    itemReviewed: { '@type': 'SoftwareApplication', name: tool.name, url: tool.website },
  };
}

function buildFAQSchema(items: { q: string; a: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function buildBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── Internal linking engine ────────────────────────────────────────────
export function buildInternalLinks(tool: Tool) {
  const links = [];

  // Link to alternatives page
  links.push({ text: `Best ${tool.name} Alternatives`, href: `/tools/${tool.slug}/alternatives`, type: 'alternatives' as const });

  // Link to pricing page
  links.push({ text: `${tool.name} Pricing`, href: `/tools/${tool.slug}/pricing`, type: 'pricing' as const });

  // Link to comparison pages for each alternative
  tool.alternatives.slice(0, 2).forEach((altSlug) => {
    links.push({ text: `${tool.name} vs ${altSlug}`, href: `/compare/${tool.slug}-vs-${altSlug}`, type: 'comparison' as const });
  });

  // Link to cluster
  tool.clusters.forEach((cluster) => {
    links.push({ text: `Best ${cluster.replace(/-/g, ' ')}`, href: `/${cluster}`, type: 'best-for' as const });
  });

  return links;
}

export { SITE_URL, SITE_NAME };
