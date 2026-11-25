import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../lib/router.jsx';
import Icon from './Icon.jsx';
import { Logo } from './Photo.jsx';
import { company } from '../data/content.js';

export const NAVIGATION = [
  { label: 'Home', to: 'home' },
  {
    label: 'About Us',
    items: [
      { label: 'Who we are', to: 'about' },
      { label: 'Leadership', to: 'leadership' },
      { label: 'Shareholders', to: 'about:shareholders' },
      { label: 'Gallery', to: 'gallery' },
    ],
  },
  { label: 'Our Businesses', to: 'businesses' },
  {
    label: 'Services',
    items: [
      { label: 'Our services', to: 'services' },
      { label: 'Forms download', to: 'forms' },
      { label: 'Investment calculator', to: 'calculator' },
    ],
  },
  {
    label: 'Research',
    items: [
      { label: 'Market review', to: 'market-review' },
      { label: 'Newsletters', to: 'newsletters' },
      { label: 'Articles', to: 'articles' },
      { label: 'Equity research', to: 'equity-research' },
    ],
  },
  { label: 'Contact Us', to: 'contact' },
];

const SECTION_ROUTES = {
  'About Us': ['about', 'leadership', 'executives', 'group-team', 'gallery'],
  Services: ['services', 'forms', 'calculator'],
  Research: ['market-review', 'newsletters', 'articles', 'equity-research'],
};

function DropdownItem({ item, route }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isCurrentSection = SECTION_ROUTES[item.label]?.includes(route);

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsideClick = (event) => !ref.current.contains(event.target) && setOpen(false);
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        ref.current.querySelector('button').focus();
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <li ref={ref} className={`nav__item${open ? ' is-open' : ''}`}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className={`nav__link${isCurrentSection ? ' is-active' : ''}`}
        aria-expanded={open} onClick={() => setOpen(!open)}>
        {item.label} <Icon name="chevron" size={16} />
      </button>
      <ul className="nav__submenu">
        {item.items.map((child) => <li key={child.label}><Link to={child.to}>{child.label}</Link></li>)}
      </ul>
    </li>
  );
}

function MobileMenu({ onClose }) {
  useEffect(() => {
    document.body.classList.add('menu-open');
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const singleLinks = NAVIGATION.filter((item) => !item.items);

  return (
    <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="mobile-menu__top">
        <Logo />
        <button type="button" className="menu-button" onClick={onClose} aria-label="Close menu">
          <Icon name="close" size={22} />
        </button>
      </div>
      <nav aria-label="Mobile">
        <div className="mobile-menu__group">
          {singleLinks.map((item) => <Link key={item.to} to={item.to} onClick={onClose}>{item.label}</Link>)}
        </div>
        {NAVIGATION.filter((item) => item.items).map((section) => (
          <div key={section.label} className="mobile-menu__group">
            <h2>{section.label}</h2>
            {section.items.map((child) => <Link key={child.label} to={child.to} onClick={onClose}>{child.label}</Link>)}
          </div>
        ))}
      </nav>
      <p className="mobile-menu__contact">
        <a href={company.phoneHref}>{company.phone}</a><br />
        <a href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a>
      </p>
    </div>
  );
}

export default function Header() {
  const { route } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [route]);

  return (
    <>
      <a href="#main" className="skip-link" onClick={(event) => { event.preventDefault(); document.getElementById('main').focus(); }}>
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <a href={company.phoneHref}><Icon name="phone" size={14} />{company.phone}</a>
          <a href={`mailto:${company.emails[0]}`}><Icon name="mail" size={14} />{company.emails[0]}</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="home" className="site-header__logo" aria-label={`${company.name}, home`}><Logo /></Link>
          <nav aria-label="Main">
            <ul className="nav">
              {NAVIGATION.map((item) => (item.items
                ? <DropdownItem key={item.label} item={item} route={route} />
                : <li key={item.label} className="nav__item"><Link to={item.to} className="nav__link">{item.label}</Link></li>))}
            </ul>
          </nav>
          <Link to="forms" className="button button--small site-header__cta">Open an account</Link>
          <button type="button" className="menu-button" aria-label="Open menu" aria-expanded={menuOpen}
            aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
