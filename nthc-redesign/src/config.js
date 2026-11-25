// Central configuration. Change these when deploying.

// Backend that the current nthc.com.gh site talks to.
export const API_BASE = 'https://apibeta.nthc.com.gh';

// Where uploaded images and PDFs are served (same host as the live site uses).
export const MEDIA_BASE = `${API_BASE}/getimage`;

// Company code the management endpoints expect (taken from the live site).
export const COMPANY_CODE = 'NTHC_Ltd';

// How long API responses are cached in the visitor's session (ms).
export const CACHE_TTL = 10 * 60 * 1000;

// Request timeout before the site falls back to its bundled snapshot (ms).
export const REQUEST_TIMEOUT = 8000;
