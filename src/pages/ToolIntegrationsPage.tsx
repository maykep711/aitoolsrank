import { useParams, Navigate, Link } from 'react-router-dom';
import { getToolBySlug } from '../data/tools';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME } from '../lib/seo';

export default function ToolIntegrationsPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;
  if (!tool) return <Navigate to="/404" replace />;
  return (
    <>
      <Helmet>
        <title>{tool.name} Integrations {new Date().getFullYear()} | {SITE_NAME}</title>
        <meta name="description" content={`${tool.name} integrates with ${tool.integrations.slice(0,5).join(', ')} and more.`} />
        <link rel="canonical" href={`https://aitoolsrank.com/tools/${tool.slug}/integrations`} />
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <nav className="text-xs text-gray-500 flex gap-2">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <Link to={`/tools/${tool.slug}`} className="hover:text-gray-300">{tool.name}</Link><span>/</span><span>Integrations</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-white">{tool.name} Integrations</h1>
        <p className="text-gray-400">{tool.name} integrates with {tool.integrations.length} apps natively.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {tool.integrations.map(i => (
            <div key={i} className="rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-center">
              <div className="font-medium text-white text-sm">{i}</div>
              <div className="text-xs text-gray-500 mt-1">Native</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-900 border border-gray-800 p-5">
          <h3 className="font-semibold text-white mb-2">API & Zapier</h3>
          <p className="text-sm text-gray-400">{tool.name} {tool.features.some(f=>f.name.toLowerCase().includes('api')&&f.available)?'offers a public API.':'does not currently offer a public API.'} Connect to 5,000+ apps via Zapier.</p>
        </div>
        <Link to={`/tools/${tool.slug}`} className="inline-flex text-sm text-indigo-400 hover:text-indigo-300">← Back to {tool.name} Review</Link>
      </div>
    </>
  );
}
