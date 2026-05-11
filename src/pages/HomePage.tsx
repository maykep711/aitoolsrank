import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { clusters } from '../data/clusters';
import { tools } from '../data/tools';
import ToolCard from '../components/Review/ToolCard';
import { SITE_NAME, SITE_URL } from '../lib/seo';

export default function HomePage() {
  const featured = tools.filter(t => t.badge);
  return (
    <>
      <Helmet>
        <title>Best AI Tools & SaaS Reviews 2026 | {SITE_NAME}</title>
        <meta name="description" content="Independent reviews and comparisons of the best AI tools in 2026. Expert analysis on pricing, features and who each tool is best for." />
        <link rel="canonical" href={SITE_URL} />
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL })}</script>
      </Helmet>
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/20 border border-indigo-600/30 px-3 py-1 mb-6">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300">Updated May 2026</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find the Best AI Tools <br /><span className="text-indigo-400">for Your Business</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Independent, expert reviews of AI writing, meeting, sales and productivity tools. Compare pricing, features and real-world performance.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/ai-writing-tools" className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-500 transition-colors">Browse AI Writing Tools</Link>
            <Link to="/ai-sales-tools" className="rounded-lg bg-gray-800 border border-gray-700 px-6 py-3 text-base font-semibold text-gray-300 hover:text-white transition-colors">Explore AI Sales Tools</Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clusters.map(c => (
              <Link key={c.slug} to={`/${c.slug}`} className="group rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-indigo-600/50 hover:bg-gray-800/50 transition-all">
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{c.name}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-indigo-400">Compare tools →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Editor's Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{stat:'50+',label:'Tools Reviewed'},{stat:'7',label:'Page Types/Tool'},{stat:'5',label:'AI Categories'},{stat:'Monthly',label:'Updates'}].map(i => (
              <div key={i.label}><div className="text-2xl font-bold text-indigo-400">{i.stat}</div><div className="mt-1 text-sm text-gray-500">{i.label}</div></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
