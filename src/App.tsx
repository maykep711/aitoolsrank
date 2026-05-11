import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/Layout/MainLayout';
import { trackPageView, initGTM, initClarity, TRACKING_CONFIG } from './lib/tracking';

// ── Lazy page imports (code splitting per page type) ──────────────────
const HomePage = lazy(() => import('./pages/HomePage'));
const ClusterPage = lazy(() => import('./pages/ClusterPage'));
const ToolReviewPage = lazy(() => import('./pages/ToolReviewPage'));
const ToolAlternativesPage = lazy(() => import('./pages/ToolAlternativesPage'));
const ToolPricingPage = lazy(() => import('./pages/ToolPricingPage'));
const ToolComparisonPage = lazy(() => import('./pages/ToolComparisonPage'));
const ToolBestForPage = lazy(() => import('./pages/ToolBestForPage'));
const ToolIntegrationsPage = lazy(() => import('./pages/ToolIntegrationsPage'));
const ToolUseCasesPage = lazy(() => import('./pages/ToolUseCasesPage'));
const CompareVsPage = lazy(() => import('./pages/CompareVsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

// ── SPA route tracker ─────────────────────────────────────────────────
function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);
  return null;
}

// ── App shell ─────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    if (TRACKING_CONFIG.GTM_ID) initGTM(TRACKING_CONFIG.GTM_ID);
    if (TRACKING_CONFIG.CLARITY_ID) initClarity(TRACKING_CONFIG.CLARITY_ID);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouteTracker />
          <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

              {/* Cluster landing pages — e.g. /ai-writing-tools */}
              <Route path="/:cluster" element={<MainLayout><ClusterPage /></MainLayout>} />

              {/* Tool review (default) — e.g. /tools/jasper-ai */}
              <Route path="/tools/:slug" element={<MainLayout><ToolReviewPage /></MainLayout>} />

              {/* Tool sub-pages */}
              <Route path="/tools/:slug/alternatives" element={<MainLayout><ToolAlternativesPage /></MainLayout>} />
              <Route path="/tools/:slug/pricing" element={<MainLayout><ToolPricingPage /></MainLayout>} />
              <Route path="/tools/:slug/comparison" element={<MainLayout><ToolComparisonPage /></MainLayout>} />
              <Route path="/tools/:slug/best-for" element={<MainLayout><ToolBestForPage /></MainLayout>} />
              <Route path="/tools/:slug/integrations" element={<MainLayout><ToolIntegrationsPage /></MainLayout>} />
              <Route path="/tools/:slug/use-cases" element={<MainLayout><ToolUseCasesPage /></MainLayout>} />

              {/* Head-to-head comparisons — e.g. /compare/jasper-ai-vs-copy-ai */}
              <Route path="/compare/:vsSlug" element={<MainLayout><CompareVsPage /></MainLayout>} />

              {/* 404 */}
              <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
