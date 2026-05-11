import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { getToolBySlug } from '../data/tools';
import { trackComparisonView, trackAffiliateClick } from '../lib/tracking';
import { SITE_URL, SITE_NAME } from '../lib/seo';
import { StarRating } from '../components/Review/ToolCard';

export default function CompareVsPage() {
  const { vsSlug } = useParams<{ vsSlug: string }>();
  const m = vsSlug?.match(/^(.+)-vs-(.+)$/);
  const tool1 = m?.[1] ? getToolBySlug(m[1]) : undefined;
  const tool2 = m?.[2] ? getToolBySlug(m[2]) : undefined;
  useEffect(() => { if (tool1 && tool2) trackComparisonView(tool1.slug, tool2.slug); }, [tool1, tool2]);
  if (!tool1 || !tool2) return <Navigate to="/404" replace />;
  const y = new Date().getFullYear();
  const title = `${tool1.name} vs ${tool2.name} (${y}): Full Comparison`;
  const canonical = `${SITE_URL}/compare/${tool1.slug}-vs-${tool2.slug}`;
  const matrix = [
    { f: 'Free Plan', t1: tool1.pricing.hasFree?'✓ Yes':'✗ No', t2: tool2.pricing.hasFree?'✓ Yes':'✗ No', w1: tool1.pricing.hasFree && !tool2.pricing.hasFree },
    { f: 'Rating', t1: tool1.rating+'/5', t2: tool2.rating+'/5', w1: tool1.rating > tool2.rating },
    { f: 'Reviews', t1: tool1.reviewCount.toLocaleString(), t2: tool2.reviewCount.toLocaleString(), w1: tool1.reviewCount > tool2.reviewCount },
    { f: 'Integrations', t1: tool1.integrations.length+' apps', t2: tool2.integrations.length+' apps', w1: tool1.integrations.length > tool2.integrations.length },
  ];
  return (
    <>
      <Helmet>
        <title>{title} | {SITE_NAME}</title>
        <meta name="description" content={`Side-by-side comparison of ${tool1.name} and ${tool2.name}. Features, pricing, pros & cons.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <nav className="border-b border-gray-800 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
          <span>{tool1.name} vs {tool2.name}</span>
        </div>
      </nav>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-white">{tool1.name} vs {tool2.name} ({y})</h1>
          <p className="mt-3 text-gray-400">Side-by-side to help you choose the right tool.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[tool1, tool2].map(t => (
            <div key={t.slug} className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 border border-gray-700">
                  <span className="text-xl font-bold text-indigo-400">{t.name.charAt(0)}</span>
                </div>
                <div><h2 className="font-bold text-white">{t.name}</h2><p className="text-xs text-gray-500">{t.tagline}</p></div>
              </div>
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm text-gray-400 line-clamp-3">{t.description}</p>
              {t.affiliateUrl && (
                <a href={t.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
                  className="mt-4 block w-full rounded-lg bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                  onClick={() => trackAffiliateClick(t.slug, t.affiliateUrl!, 'compare-cta')}>
                  Try {t.name}
                </a>
              )}
            </div>
          ))}
        </div>
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Feature Comparison</h2>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-800 bg-gray-900"><th className="px-5 py-3 text-left font-medium text-gray-400">Feature</th><th className="px-5 py-3 text-center font-medium text-white">{tool1.name}</th><th className="px-5 py-3 text-center font-medium text-white">{tool2.name}</th></tr></thead>
              <tbody className="divide-y divide-gray-800">
                {matrix.map(row => (
                  <tr key={row.f} className="bg-gray-950 hover:bg-gray-900">
                    <td className="px-5 py-3 text-gray-400 font-medium">{row.f}</td>
                    <td className={`px-5 py-3 text-center ${row.w1?'text-emerald-400 font-semibold':'text-gray-300'}`}>{row.t1}</td>
                    <td className={`px-5 py-3 text-center ${!row.w1?'text-emerald-400 font-semibold':'text-gray-300'}`}>{row.t2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-xl bg-gray-900 border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Verdict</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[tool1, tool2].map(t => (
              <div key={t.slug} className="rounded-lg bg-gray-950 border border-gray-800 p-4">
                <h3 className="font-semibold text-white text-sm mb-2">Choose {t.name} if...</h3>
                <ul className="space-y-1">{t.bestFor.map(bf => <li key={bf} className="text-xs text-gray-400">→ You are a <strong className="text-gray-300">{bf}</strong></li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <nav className="flex flex-wrap gap-3 text-sm">
          <Link to={`/tools/${tool1.slug}`} className="text-indigo-400">{tool1.name} Review</Link>
          <span className="text-gray-700">·</span>
          <Link to={`/tools/${tool2.slug}`} className="text-indigo-400">{tool2.name} Review</Link>
        </nav>
      </div>
    </>
  );
}
