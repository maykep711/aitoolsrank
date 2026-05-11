import { useParams, Navigate, Link } from 'react-router-dom';
import { getToolBySlug, getAlternativesFor } from '../data/tools';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/seo';

export default function ToolComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return <Navigate to="/404" replace />;
  const alternatives = getAlternativesFor(tool.slug);
  return (
    <>
      <Helmet>
        <title>{tool.name} vs Competitors {new Date().getFullYear()} | {SITE_NAME}</title>
        <meta name="description" content={`Compare ${tool.name} vs top alternatives side by side.`} />
        <link rel="canonical" href={`https://aitoolsrank.com/tools/${tool.slug}/comparison`} />
      </Helmet>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-6 text-xs text-gray-500 flex gap-2">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <Link to={`/tools/${tool.slug}`} className="hover:text-gray-300">{tool.name}</Link><span>/</span>
          <span>Comparison</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-white mb-4">{tool.name} vs Competitors ({new Date().getFullYear()})</h1>
        <p className="text-gray-400 mb-8">Compare {tool.name} with its top alternatives. Click any comparison for a full breakdown.</p>
        <div className="flex flex-wrap gap-3">
          {alternatives.map(alt => (
            <Link key={alt.slug} to={`/compare/${tool.slug}-vs-${alt.slug}`} className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              {tool.name} vs {alt.name} →
            </Link>
          ))}
          {alternatives.length === 0 && <p className="text-gray-500 text-sm">No comparisons available yet. Check back soon.</p>}
        </div>
      </div>
    </>
  );
}
