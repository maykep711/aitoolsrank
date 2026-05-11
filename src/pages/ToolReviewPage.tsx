import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { getToolBySlug, getAlternativesFor, getRelatedTools } from '../data/tools';
import { buildSEOMeta, buildInternalLinks } from '../lib/seo';
import { trackToolView, trackAffiliateClick } from '../lib/tracking';
import PricingTable from '../components/Review/PricingTable';
import ToolCard, { StarRating } from '../components/Review/ToolCard';

export default function ToolReviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  useEffect(() => { if (tool) trackToolView(tool.slug, 'review'); }, [tool]);
  if (!tool) return <Navigate to="/404" replace />;
  const meta = buildSEOMeta(tool, 'review');
  const alternatives = getAlternativesFor(tool.slug);
  const related = getRelatedTools(tool.slug, 3);
  const links = buildInternalLinks(tool);
  const lowestPaid = tool.pricing.plans.filter(p=>p.price&&p.price>0).sort((a,b)=>(a.price||0)-(b.price||0))[0];
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
          {tool.clusters[0] && <><Link to={`/${tool.clusters[0]}`} className="hover:text-gray-300 capitalize">{tool.clusters[0].replace(/-/g,' ')}</Link><span>/</span></>}
          <span className="text-gray-400">{tool.name}</span>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2 space-y-10">
            <header>
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-800 border border-gray-700 flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-400">{tool.name.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-white">{tool.name} Review ({new Date().getFullYear()})</h1>
                  <p className="mt-2 text-lg text-gray-400">{tool.tagline}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <StarRating rating={tool.rating} />
                    <span className="text-sm text-gray-500">· {tool.reviewCount.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{label:'Free Plan',value:tool.pricing.hasFree?'Yes':'No'},{label:'Starting Price',value:lowestPaid?`$${lowestPaid.price}/mo`:'Custom'},{label:'Best For',value:tool.bestFor[0]||'—'},{label:'Rating',value:tool.rating+'/5'}].map(f => (
                  <div key={f.label} className="rounded-lg bg-gray-900 border border-gray-800 px-4 py-3">
                    <div className="text-xs text-gray-500 mb-1">{f.label}</div>
                    <div className="text-sm font-semibold text-white">{f.value}</div>
                  </div>
                ))}
              </div>
            </header>
            <section><h2 className="text-xl font-bold text-white mb-3">What is {tool.name}?</h2><p className="text-gray-400 leading-relaxed">{tool.description}</p></section>
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-emerald-950/30 border border-emerald-800/30 p-5">
                  <h3 className="font-semibold text-emerald-400 mb-3">Pros</h3>
                  <ul className="space-y-2">{tool.pros.map(p => <li key={p} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-emerald-400">+</span>{p}</li>)}</ul>
                </div>
                <div className="rounded-xl bg-red-950/30 border border-red-800/30 p-5">
                  <h3 className="font-semibold text-red-400 mb-3">Cons</h3>
                  <ul className="space-y-2">{tool.cons.map(c => <li key={c} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-red-400">–</span>{c}</li>)}</ul>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-4">{tool.name} Pricing</h2>
              <PricingTable pricing={tool.pricing} toolSlug={tool.slug} toolName={tool.name} />
              <p className="mt-3 text-sm text-gray-500">See our <Link to={`/tools/${tool.slug}/pricing`} className="text-indigo-400">full {tool.name} pricing breakdown →</Link></p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
              <div className="space-y-3">
                {tool.features.map(f => (
                  <div key={f.name} className="flex items-start gap-3 p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 mt-0.5 ${f.available ? 'bg-emerald-600/20 text-emerald-400' : 'bg-gray-800 text-gray-600'}`}>{f.available ? '✓' : '✗'}</div>
                    <div><div className="font-medium text-white text-sm">{f.name}</div><div className="text-xs text-gray-500 mt-0.5">{f.description}</div></div>
                  </div>
                ))}
              </div>
            </section>
            {alternatives.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-white mb-4">Best {tool.name} Alternatives</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {alternatives.map(alt => <ToolCard key={alt.slug} tool={alt} />)}
                </div>
                <p className="mt-3 text-sm"><Link to={`/tools/${tool.slug}/alternatives`} className="text-indigo-400">See all {tool.name} alternatives →</Link></p>
              </section>
            )}
            <section className="rounded-xl bg-gray-900 border border-gray-800 p-5">
              <h3 className="font-semibold text-white mb-3 text-sm">Related pages</h3>
              <div className="flex flex-wrap gap-2">
                {links.map(l => <Link key={l.href} to={l.href} className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2">{l.text}</Link>)}
              </div>
            </section>
          </article>
          <aside className="space-y-6">
            <div className="sticky top-20 rounded-2xl border border-indigo-600/30 bg-indigo-950/30 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-900 mb-4">
                <span className="text-xl font-bold text-indigo-400">{tool.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-white">{tool.name}</h3>
              <StarRating rating={tool.rating} />
              <p className="mt-3 text-sm text-gray-400">{tool.tagline}</p>
              <div className="mt-4 space-y-2">
                {tool.affiliateUrl && (
                  <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
                    className="block w-full rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                    onClick={() => trackAffiliateClick(tool.slug, tool.affiliateUrl!, 'sidebar-cta')}>
                    {tool.pricing.hasFree ? 'Try Free' : 'Start Free Trial'}
                  </a>
                )}
                <Link to={`/tools/${tool.slug}/pricing`} className="block w-full rounded-lg bg-gray-800 px-4 py-3 text-center text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  View All Plans
                </Link>
              </div>
            </div>
            {related.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Related Tools</h3>
                <div className="space-y-3">{related.map(t => <ToolCard key={t.slug} tool={t} showAffiliateBtn={false} />)}</div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
