import { Link } from '../lib/router.jsx';

// Section navigation between closely related pages (e.g. Board / Executives).
export default function Tabs({ items, current, label }) {
  return (
    <nav className="tabs" aria-label={label}>
      {items.map((item) => (
        <Link key={item.to} to={item.to} aria-current={item.to === current ? 'page' : undefined}>{item.label}</Link>
      ))}
    </nav>
  );
}
