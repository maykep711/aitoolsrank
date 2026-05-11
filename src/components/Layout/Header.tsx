import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { clusters } from '../../data/clusters';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-white">AI<span className="text-indigo-400">Tools</span>Rank</span>
            <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-xs font-semibold text-white">2026</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {clusters.map(c => (
              <NavLink key={c.slug} to={`/${c.slug}`}
                className={({ isActive }) => isActive ? 'text-sm font-medium text-indigo-400' : 'text-sm font-medium text-gray-400 hover:text-white transition-colors'}>
                {c.name.replace('AI ', '')}
              </NavLink>
            ))}
          </nav>
          <Link to="/ai-writing-tools" className="hidden md:block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
            Browse Tools
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {clusters.map(c => (
              <Link key={c.slug} to={`/${c.slug}`} className="block px-2 py-3 text-sm text-gray-400 hover:text-white" onClick={() => setOpen(false)}>
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
