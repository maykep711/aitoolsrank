import { Link } from 'react-router-dom';
import type { Tool } from '../../types';
import { trackAffiliateClick } from '../../lib/tracking';
import clsx from 'clsx';

const BADGE: Record<string, string> = {
  'best-overall': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'editors-choice': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'best-value': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'rising-star': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};
const BADGE_LABEL: Record<string, string> = {
  'best-overall': 'Best Overall', 'editors-choice': "Editor's Choice",
  'best-value': 'Best Value', 'rising-star': 'Rising Star',
};

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={clsx('h-4 w-4', rating >= s ? 'text-amber-400' : 'text-gray-600')} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-300">{rating.toFixed(1)}</span>
    </div>
  );
}

interface Props { tool: Tool; showAffiliateBtn?: boolean; rank?: number; }

export default function ToolCard({ tool, showAffiliateBtn = true, rank }: Props) {
  const lowestPrice = tool.pricing.plans.filter(p => p.price && p.price > 0).sort((a,b)=>(a.price||0)-(b.price||0))[0];
  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-800 bg-gray-900 hover:border-gray-700 transition-all overflow-hidden">
      {tool.badge && (
        <div className={clsx('absolute top-3 right-3 rounded-full border px-2 py-0.5 text-xs font-medium', BADGE[tool.badge])}>
          {BADGE_LABEL[tool.badge]}
        </div>
      )}
      {rank && (
        <div className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          #{rank}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 border border-gray-700 flex-shrink-0">
            <span className="text-lg font-bold text-indigo-400">{tool.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <Link to={`/tools/${tool.slug}`} className="font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-1">{tool.name}</Link>
            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{tool.tagline}</p>
          </div>
        </div>
        <StarRating rating={tool.rating} />
        <p className="mt-1 text-xs text-gray-600">{tool.reviewCount.toLocaleString()} reviews</p>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {tool.pricing.hasFree && <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">Free plan</span>}
          {lowestPrice && <span className="text-xs text-gray-500">From <span className="font-medium text-gray-300">${lowestPrice.price}/mo</span></span>}
        </div>
      </div>
      <div className="mt-auto border-t border-gray-800 p-4 flex gap-2">
        <Link to={`/tools/${tool.slug}`} className="flex-1 text-center rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
          Read Review
        </Link>
        {showAffiliateBtn && tool.affiliateUrl && (
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow"
            className="flex-1 text-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            onClick={() => trackAffiliateClick(tool.slug, tool.affiliateUrl!, 'card-cta')}>
            Try Free
          </a>
        )}
      </div>
    </div>
  );
}
