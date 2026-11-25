import { Link } from '../lib/router.jsx';

export default function PageHeader({ title, intro, trail = [] }) {
  return (
    <header className="page-header">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumbs">
            <li><Link to="home">Home</Link></li>
            {trail.map((item) => <li key={item.label}><Link to={item.to}>{item.label}</Link></li>)}
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  );
}
