import type { TrackingEvent, PageType } from '../types';

// ── Config ────────────────────────────────────────────────────────────
export const TRACKING_CONFIG = {
  GA4_ID: import.meta.env.VITE_GA4_ID || '',
  GTM_ID: import.meta.env.VITE_GTM_ID || '',
  CLARITY_ID: import.meta.env.VITE_CLARITY_ID || '',
};

// ── Type declarations ──────────────────────────────────────────────────
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: (cmd: string, ...args: unknown[]) => void;
  }
}

// ── GTM / dataLayer push ───────────────────────────────────────────────
function push(obj: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
}

// ── SPA page view tracking ─────────────────────────────────────────────
export function trackPageView(path: string, title: string) {
  // GA4 via gtag
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href,
    });
  }

  // GTM virtual page view
  push({
    event: 'virtual_page_view',
    page_path: path,
    page_title: title,
  });

  // Microsoft Clarity page view
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'page_path', path);
  }
}

// ── Affiliate click tracking ───────────────────────────────────────────
export function trackAffiliateClick(toolSlug: string, destination: string, position?: string) {
  const event: TrackingEvent = {
    event: 'affiliate_click',
    category: 'monetization',
    label: toolSlug,
    toolSlug,
  };

  push({
    event: 'affiliate_click',
    tool_slug: toolSlug,
    destination_url: destination,
    click_position: position || 'unknown',
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      tool_slug: toolSlug,
      destination,
      position: position || 'unknown',
    });
  }

  return event;
}

// ── Generic event tracker ──────────────────────────────────────────────
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  push({ event: eventName, ...params });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// ── Tool-specific events ───────────────────────────────────────────────
export function trackToolView(toolSlug: string, pageType: PageType) {
  trackEvent('tool_page_view', {
    tool_slug: toolSlug,
    page_type: pageType,
    category: 'engagement',
  });
}

export function trackComparisonView(tool1: string, tool2: string) {
  trackEvent('comparison_view', {
    tool_1: tool1,
    tool_2: tool2,
    category: 'engagement',
  });
}

export function trackFilterUse(filterName: string, filterValue: string, cluster: string) {
  trackEvent('filter_used', {
    filter_name: filterName,
    filter_value: filterValue,
    cluster,
    category: 'engagement',
  });
}

export function trackSearchQuery(query: string, resultsCount: number) {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    category: 'engagement',
  });
}

// ── IndexNow ping ──────────────────────────────────────────────────────
export async function pingIndexNow(urls: string[]) {
  const INDEXNOW_KEY = import.meta.env.VITE_INDEXNOW_KEY;
  if (!INDEXNOW_KEY) return;

  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'aitoolsrank.com',
        key: INDEXNOW_KEY,
        keyLocation: `https://aitoolsrank.com/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
  } catch {
    // silent fail — IndexNow is best-effort
  }
}

// ── GTM snippet initializer ────────────────────────────────────────────
export function initGTM(gtmId: string) {
  if (!gtmId || document.querySelector(`script[src*="${gtmId}"]`)) return;

  push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(noscript);
}

// ── Clarity initializer ────────────────────────────────────────────────
export function initClarity(clarityId: string) {
  if (!clarityId) return;
  const script = document.createElement('script');
  script.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarityId}");`;
  document.head.appendChild(script);
}
