import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { getClusterBySlug } from '../data/clusters';
import { getToolsByCluster } from '../data/tools';
import { buildClusterSEOMeta } from '../lib/seo';
import ToolCard from '../components/Review/ToolCard';
import type { Tool } from '../types';

type Sort = 'rating' | 'price-asc' | 'reviews';

export default function ClusterPage() {
  const { cluster } = useParams<{ cluster: string }>();
  const meta = cluster ? getClusterBySlug(cluster) : undefined;
  const all = cluster ? getToolsByCluster(cluster) : [];
  const [sort, setSort] = useState<Sort>('rating');
  const [freeOnly, setFreeOnly] = useState(false);
  if (!meta) return <Navigate to="/404" replace />;
  const seo = buildClusterSEOMeta(meta);
  const sorted = (freeOnly ? all.filter(t => t.pricing.hasFree) : [...all]).sort((a: Tool, b: Tool) => {
    if (sort === 'price-asc') { const pa = a.pricing.plans.filter(p=>p.price&&p.price>0).sort((x,y)=>(x.price||0)-(y.price||0))[0]?.price||9999; const pb = b.pricing.plans.filter(p=>p.price&&p.price>0).sort((x,y)=>(x.price||0)-(y.price||0))[0]?.price||9999; return pa-pb; }
    if (sort === 'reviews') return b.reviewCount - a.reviewCount;
    return b.rating - a.rating;
  });
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', name: meta.heroTitle, numberOfItems: sorted.length, itemListElement: sorted.map((t, i) => ({ '@type': 'ListItem', position: i+1, name: t.name, url: `https://aitoolsrank.com/tools/${t.slug}` })) };
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-14 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-gray-300">Home</Link><span>/</span>
            <span className="text-gray-400">{meta.name}</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{meta.heroTitle}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl">{meta.heroSubtitle}</p>
        </div>
      </section>
      <section className="py-10 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm text-gray-400">{sorted.length} tools</span>
            <div className="flex items-center gap-2 ml-auto">
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} className="rounded border-gray-600 bg-gray-800 text-indigo-600" />
                Free only
              </label>
              <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-300 focus:outline-none">
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price Low-High</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((t, i) => <ToolCard key={t.slug} tool={t} rank={i+1} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">No tools match filters. <button onClick={() => setFreeOnly(false)} className="text-indigo-400">Clear</button></div>
          )}
          {sorted.length >= 2 && (
            <div className="mt-10 rounded-xl border border-indigo-600/30 bg-indigo-950/20 p-6 text-center">
              <h2 className="text-lg font-semibold text-white">Compare head-to-head</h2>
              <Link to={`/compare/${sorted[0]?.slug}-vs-${sorted[1]?.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                {sorted[0]?.name} vs {sorted[1]?.name}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
