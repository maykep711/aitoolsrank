import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { getToolBySlug, getAlternativesFor, getRelatedTools } from '../data/tools';
import { buildSEOMeta } from '../lib/seo';
import { trackToolView } from '../lib/tracking';
import ToolCard from '../components/Review/ToolCard';

export default function ToolAlternativesPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  useEffect(() => { if (tool) trackToolView(tool.slug, 'alternatives'); }, [tool]);
  if (!tool) return <Navigate to="/404" replace />;
  const meta = buildSEOMeta(tool, 'alternatives');
  const alternatives = getAlternativesFor(tool.slug);
  const related = getRelatedTools(tool.slug, 4);
  const y = new Date().getFullYear();
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
          <span className="text-gray-400">Alternatives</span>
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header>
          <h1 className="text-3xl font-extrabold text-white">Best {tool.name} Alternatives in {y}</h1>
          <p className="mt-3 text-lg text-gray-400 max-w-3xl">Looking for {tool.name} alternatives? We compared the top options on pricing, features and use cases.</p>
        </header>
        <section className="rounded-xl bg-gray-900 border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-3">Why look for {tool.name} alternatives?</h2>
          <ul className="space-y-2">
            {[
              !tool.pricing.hasFree ? `${tool.name} has no free plan — some alternatives offer free tiers` : `${tool.name} free plan is limited — alternatives may offer more`,
              `Different integrations or workflow needs`,
              `Better pricing at your team size`,
            ].map((r, i) => <li key={i} className="flex items-start gap-2 text-sm text-gray-400"><span className="text-indigo-400">→</span>{r}</li>)}
          </ul>
        </section>
        {alternatives.length > 0 ? (
          <>
            <h2 className="text-xl font-bold text-white">Top {alternatives.length} {tool.name} Alternatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alternatives.map((alt, i) => <ToolCard key={alt.slug} tool={alt} rank={i+1} />)}
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-gray-900 border border-gray-800 p-8 text-center text-gray-500">More alternatives coming soon.</div>
        )}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">More Tools in This Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{related.map(t => <ToolCard key={t.slug} tool={t} showAffiliateBtn={false} />)}</div>
          </section>
        )}
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div><p className="text-sm font-medium text-white">Sticking with {tool.name}?</p><p className="text-xs text-gray-500 mt-1">Read our full review first.</p></div>
          <Link to={`/tools/${tool.slug}`} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap">
            Read Review →
          </Link>
        </div>
      </div>
    </>
  );
}
