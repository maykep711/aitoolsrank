import { useParams, Navigate, Link } from 'react-router-dom';
import { getToolBySlug } from '../data/tools';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/seo';
import { trackAffiliateClick } from '../lib/tracking';

export default function ToolBestForPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return <Navigate to="/404" replace />;
  return (
    <>
      <Helmet>
        <title>Is {tool.name} Worth It? Best For {new Date().getFullYear()} | {SITE_NAME}</title>
        <meta name="description" content={`${tool.name} is best for ${tool.bestFor.slice(0,3).join(', ')}.`} />
        <link rel="canonical" href={`https://aitoolsrank.com/tools/${tool.slug}/best-for`} />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <nav className="text-xs text-gray-500 flex gap-2">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <Link to={`/tools/${tool.slug}`} className="hover:text-gray-300">{tool.name}</Link><span>/</span><span>Best For</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-white">Who Is {tool.name} Best For?</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.bestFor.map(bf => <div key={bf} className="rounded-xl bg-gray-900 border border-indigo-600/20 p-5 font-semibold text-white">{bf}</div>)}
        </div>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Use Cases</h2>
          <div className="space-y-4">
            {tool.useCases.map(uc => (
              <div key={uc.title} className="rounded-xl bg-gray-900 border border-gray-800 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-white">{uc.title}</span>
                  <span className="rounded-full bg-indigo-600/20 px-2 py-0.5 text-xs text-indigo-400">{uc.audience}</span>
                </div>
                <p className="text-sm text-gray-400">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>
        {tool.affiliateUrl && (
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            onClick={() => trackAffiliateClick(tool.slug, tool.affiliateUrl!, 'best-for-cta')}>
            Try {tool.name} {tool.pricing.hasFree ? 'Free' : '→'}
          </a>
        )}
      </div>
    </>
  );
}
