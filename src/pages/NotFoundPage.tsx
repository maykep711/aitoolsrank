import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { clusters } from '../data/clusters';

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | AIToolsRank</title><meta name="robots" content="noindex" /></Helmet>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center py-20">
        <div className="text-6xl font-extrabold text-gray-700 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-500 max-w-md mb-8">Browse our AI tool categories below.</p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {clusters.map(c => (
            <Link key={c.slug} to={`/${c.slug}`} className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">{c.name}</Link>
          ))}
        </div>
        <Link to="/" className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">← Back to Home</Link>
      </div>
    </>
  );
}
