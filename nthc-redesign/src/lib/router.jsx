// Hash-based routing (#about, #leadership). Works on any static host without rewrite rules.
import { createContext, useContext, useEffect, useState } from 'react';

const RouteContext = createContext('home');

const currentRoute = () => window.location.hash.replace(/^#\/?/, '') || 'home';

export function Router({ children }) {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(currentRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

export const useRouter = () => ({ route: useContext(RouteContext) });

// `to` is a route name ("about") or a route plus an element id ("about:shareholders").
export function Link({ to, className, onClick, children, ...props }) {
  const route = useContext(RouteContext);
  const [page, anchorId] = to.split(':');
  const isActive = page === route;

  function handleClick(event) {
    onClick?.(event);
    if (!anchorId) return;
    event.preventDefault();
    const scrollToAnchor = () => document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
    if (isActive) {
      scrollToAnchor();
    } else {
      window.location.hash = page;
      setTimeout(scrollToAnchor, 150);
    }
  }

  const classes = [className, isActive && 'is-active'].filter(Boolean).join(' ') || undefined;
  return (
    <a href={`#${page}`} className={classes} aria-current={isActive && !anchorId ? 'page' : undefined} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
