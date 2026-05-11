import { useParams, Navigate, Link } from 'react-router-dom';
import { getToolBySlug } from '../data/tools';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/seo';
import { trackAffiliateClick } from '../lib/tracking';

export default function ToolUseCasesPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return <Navigate to="/404" replace />;
  return (
    <>
      <Helmet>
        <title>{tool.name} Use Cases {new Date().getFullYear()} | {SITE_NAME}</title>
        <meta name="description" content={`Discover how ${tool.name} is used by ${tool.bestFor.slice(0,3).join(', ')}.`} />
        <link rel="canonical" href={`https://aitoolsrank.com/tools/${tool.slug}/use-cases`} />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <nav className="text-xs text-gray-500 flex gap-2">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <Link to={`/tools/${tool.slug}`} className="hover:text-gray-300">{tool.name}</Link><span>/</span><span>Use Cases</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-white">{tool.name} Use Cases: Who Should Use It?</h1>
        <p className="text-gray-400">{tool.name} is used by {tool.bestFor.join(', ')}.</p>
        <div className="space-y-5">
          {tool.useCases.map((uc, i) => (
            <div key={uc.title} className="rounded-xl bg-gray-900 border border-gray-800 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm flex-shrink-0">{i+1}</div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-white">{uc.title}</h3>
                    <span className="rounded-full bg-indigo-600/20 px-2 py-0.5 text-xs text-indigo-400">{uc.audience}</span>
                  </div>
                  <p className="text-sm text-gray-400">{uc.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {tool.affiliateUrl && (
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            onClick={() => trackAffiliateClick(tool.slug, tool.affiliateUrl!, 'use-cases-cta')}>
            Get Started with {tool.name}
          </a>
        )}
      </div>
    </>
  );
}
