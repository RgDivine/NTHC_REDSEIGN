import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App, { ROUTES } from './App.jsx';
import './styles/main.css';

// Old links such as nthc.com.gh/about or /board keep working: known paths become hash routes.
const KNOWN = new Set([...Object.keys(ROUTES), 'board', 'group', 'market_review', 'equity_research', 'form_downloads', 'investment_calculator', 'jobs']);
const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
if (KNOWN.has(path) && !window.location.hash) {
  try { window.history.replaceState(null, '', `/#${path}`); } catch { /* sandboxed */ }
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
