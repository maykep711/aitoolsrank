import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { getToolBySlug } from '../data/tools';
import { buildSEOMeta } from '../lib/seo';
import { trackToolView, trackAffiliateClick } from '../lib/tracking';
import PricingTable from '../components/Review/PricingTable';

export default function ToolPricingPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  useEffect(() => { if (tool) trackToolView(tool.slug, 'pricing'); }, [tool]);
  if (!tool) return <Navigate to="/404" replace />;
  const meta = buildSEOMeta(tool, 'pricing');
  const y = new Date().getFullYear();
  const paid = tool.pricing.plans.filter(p=>p.price&&p.price>0).sort((a,b)=>(a.price||0)-(b.price||0));
  const faqItems = [
    { q: `How much does ${tool.name} cost in ${y}?`, a: paid[0] ? `${tool.name} starts at $${paid[0].price}/${paid[0].period} for the ${paid[0].name} plan.` : 'Contact for pricing.' },
    { q: `Does ${tool.name} have a free plan?`, a: tool.pricing.hasFree ? (tool.pricing.freeLabel||'Yes, a free plan is available.') : `No, ${tool.name} does not have a free plan.` },
    { q: `What is the best ${tool.name} plan?`, a: (() => { const h = tool.pricing.plans.find(p=>p.highlighted); return h ? `The ${h.name} plan is generally the best option.` : 'Compare the plans above for your needs.'; })() },
  ];
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        {meta.schema && <script type="application/ld+json">{JSON.stringify(meta.schema)}</script>}
      </Helmet>
      <nav className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <Link to={`/tools/${tool.slug}`} className="hover:text-gray-300">{tool.name}</Link><span>/</span>
          <span className="text-gray-400">Pricing</span>
        </div>
      </nav>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header>
          <h1 className="text-3xl font-extrabold text-white">{tool.name} Pricing {y}: All Plans Compared</h1>
          <p className="mt-3 text-gray-400">Complete breakdown of all {tool.name} plans, features at each tier, and our recommendation.</p>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[{label:'Plans',value:tool.pricing.plans.length},{label:'Free Plan',value:tool.pricing.hasFree?'Yes':'No'},{label:'Starting',value:paid[0]?`$${paid[0].price}/mo`:'Custom'},{label:'Enterprise',value:tool.pricing.plans.some(p=>p.price===null)?'Yes':'No'}].map(i => (
            <div key={i.label} className="rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-center">
              <div className="text-xs text-gray-500">{i.label}</div>
              <div className="mt-1 text-lg font-bold text-white">{i.value}</div>
            </div>
          ))}
        </div>
        <PricingTable pricing={tool.pricing} toolSlug={tool.slug} toolName={tool.name} />
        {tool.affiliateUrl && (
          <div className="rounded-xl bg-indigo-950/30 border border-indigo-600/30 p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1"><h3 className="font-semibold text-white">Ready to start with {tool.name}?</h3><p className="mt-1 text-sm text-gray-400">{tool.pricing.hasFree?'Free plan available':'Free trial available'}.</p></div>
            <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap"
              onClick={() => trackAffiliateClick(tool.slug, tool.affiliateUrl!, 'pricing-cta')}>
              {tool.pricing.hasFree ? 'Start for Free' : 'Start Free Trial'}
            </a>
          </div>
        )}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">{tool.name} Pricing FAQ</h2>
          <div className="space-y-4">
            {faqItems.map(item => (
              <details key={item.q} className="group rounded-xl bg-gray-900 border border-gray-800 p-5 cursor-pointer">
                <summary className="font-medium text-white list-none flex items-center justify-between gap-3">
                  {item.q}
                  <svg className="h-5 w-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-3 text-sm text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <nav className="flex flex-wrap gap-3 text-sm">
          <Link to={`/tools/${tool.slug}`} className="text-indigo-400 hover:text-indigo-300">{tool.name} Review</Link>
          <span className="text-gray-700">·</span>
          <Link to={`/tools/${tool.slug}/alternatives`} className="text-indigo-400 hover:text-indigo-300">Alternatives</Link>
          <span className="text-gray-700">·</span>
          <Link to={`/tools/${tool.slug}/comparison`} className="text-indigo-400 hover:text-indigo-300">vs Competitors</Link>
        </nav>
      </div>
    </>
  );
}
