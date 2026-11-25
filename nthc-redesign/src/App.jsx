import { useEffect, useRef } from 'react';
import { Router, useRouter, Link } from './lib/router.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Businesses from './pages/Businesses.jsx';
import Services from './pages/Services.jsx';
import Leadership from './pages/Leadership.jsx';
import Research from './pages/Research.jsx';
import Forms from './pages/Forms.jsx';
import Calculator from './pages/Calculator.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';

function NotFound() {
  return (
    <section className="container not-found">
      <p className="section-label">Page not found</p>
      <h1>We could not find that page</h1>
      <p>The page may have moved. Try the homepage or the main menu.</p>
      <Link to="home" className="button">Go to the homepage</Link>
    </section>
  );
}

// route -> [component, document title]
export const ROUTES = {
  home: [Home, 'NTHC Limited | Where Your Money Grows'],
  about: [About, 'About Us'],
  businesses: [Businesses, 'Our Businesses'],
  services: [Services, 'Services'],
  leadership: [Leadership, 'Board of Directors'],
  executives: [Leadership, 'Executive Team'],
  'group-team': [Leadership, 'Group Business Team'],
  'market-review': [Research, 'Market Review'],
  newsletters: [Research, 'Newsletters'],
  articles: [Research, 'Articles'],
  'equity-research': [Research, 'Equity Research'],
  forms: [Forms, 'Forms Download'],
  calculator: [Calculator, 'Investment Calculator'],
  gallery: [Gallery, 'Gallery'],
  contact: [Contact, 'Contact Us'],
};

// Old URLs from the previous site (e.g. /board) map to new routes.
const LEGACY = { board: 'leadership', group: 'group-team', market_review: 'market-review', equity_research: 'equity-research', form_downloads: 'forms', investment_calculator: 'calculator', jobs: 'contact' };

function Shell() {
  const { route } = useRouter();
  const mainRef = useRef(null);
  const resolved = LEGACY[route] || route;
  const [Page, title] = ROUTES[resolved] || [NotFound, 'Page not found'];
  const first = useRef(true);

  useEffect(() => {
    if (LEGACY[route]) window.location.replace(`#${LEGACY[route]}`);
  }, [route]);

  useEffect(() => {
    document.title = resolved === 'home' ? title : `${title} | NTHC Limited`;
    if (first.current) { first.current = false; return; }
    window.scrollTo({ top: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [resolved, title]);

  return (
    <>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Page key={resolved} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return <Router><Shell /></Router>;
}
