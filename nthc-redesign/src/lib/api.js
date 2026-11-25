// API layer. Endpoints and payloads mirror the existing nthc.com.gh React app,
// so the redesign keeps working with the same backend.
//
//   GET  /api/research/market_review | newsletters | articles | equity_research
//   GET  /api/downloads/get_download_forms
//   GET  /api/gallery/categories
//        /api/gallery/group_photos            { group }
//        /api/management/board                { company }
//        /api/management/executives           { company }
//        /api/management/group_business_committee { company }
//   POST /api/contact/contact_us  { first_name, last_name, email, telephone, message }
//
// Every read falls back to the snapshot in data/content.js if the API is unreachable,
// so visitors never see a blank page.
import { API_BASE, CACHE_TTL, REQUEST_TIMEOUT, COMPANY_CODE } from '../config.js';
import { snapshot } from '../data/content.js';

async function request(path, { method = 'GET', body, params } = {}) {
  const url = new URL(path, API_BASE);
  if (params && method === 'GET') Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT);
  try {
    const res = await fetch(url, {
      method,
      signal: ctrl.signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get('content-type') || '';
    return type.includes('json') ? res.json() : res.text();
  } finally {
    clearTimeout(timer);
  }
}

const cacheGet = (key) => {
  try {
    const raw = sessionStorage.getItem(`nthc:${key}`);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    return Date.now() - t < CACHE_TTL ? v : null;
  } catch { return null; }
};
const cacheSet = (key, v) => {
  try { sessionStorage.setItem(`nthc:${key}`, JSON.stringify({ t: Date.now(), v })); } catch { /* storage unavailable */ }
};

// The live app sends `{ company }` to the management endpoints; try GET with
// query params first, then POST with a JSON body, which covers both conventions.
async function requestWithParams(path, params) {
  try { return await request(path, { params }); }
  catch { return request(path, { method: 'POST', body: params }); }
}

async function load(key, fetcher, fallback) {
  const cached = cacheGet(key);
  if (cached) return { data: cached, source: 'live' };
  try {
    const data = await fetcher();
    if (!Array.isArray(data)) throw new Error('Unexpected response');
    cacheSet(key, data);
    return { data, source: 'live' };
  } catch (error) {
    return { data: fallback, source: 'snapshot', error };
  }
}

const byRank = (list) => [...list].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

export const api = {
  research: (kind) => load(`research:${kind}`, () => request(`/api/research/${kind}`), snapshot[kind] || []),
  forms: () => load('forms', () => request('/api/downloads/get_download_forms'), snapshot.forms),
  gallery: () => load('gallery', () => request('/api/gallery/categories'), snapshot.gallery),
  galleryGroup: (group) => load(`gallery:${group}`, () => requestWithParams('/api/gallery/group_photos', { group }), []),
  people: async (kind) => {
    const path = { board: 'board', executives: 'executives', group: 'group_business_committee' }[kind];
    const res = await load(`people:${kind}`, () => requestWithParams(`/api/management/${path}`, { company: COMPANY_CODE }), snapshot[kind]);
    return { ...res, data: byRank(res.data) };
  },
  contact: (payload) => request('/api/contact/contact_us', { method: 'POST', body: payload }),
};
