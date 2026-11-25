import { Link } from '../lib/router.jsx';
import Icon from './Icon.jsx';
import { Logo } from './Photo.jsx';
import { company, subsidiaries } from '../data/content.js';

const SOCIAL_ICONS = { Facebook: 'facebook', Instagram: 'instagram', LinkedIn: 'linkedin', 'X (Twitter)': 'x' };

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <div className="site-footer__about">
          <Logo />
          <p>{company.fullName}. Investment banking, fund management, pension trusteeship and related services in Ghana since {company.founded}.</p>
          <div className="social-links">
            {company.social.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noreferrer" aria-label={`NTHC on ${link.name}`}>
                <Icon name={SOCIAL_ICONS[link.name]} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2>Company</h2>
          <ul>
            <li><Link to="about">About us</Link></li>
            <li><Link to="leadership">Leadership</Link></li>
            <li><Link to="market-review">Market review</Link></li>
            <li><Link to="forms">Forms download</Link></li>
            <li><Link to="calculator">Investment calculator</Link></li>
            <li><Link to="contact">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h2>Subsidiaries</h2>
          <ul>
            {subsidiaries.map((subsidiary) => (
              <li key={subsidiary.id}><a href={subsidiary.url} target="_blank" rel="noreferrer">{subsidiary.name}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Head office</h2>
          <address>
            <p>{company.address.join(', ')}<br />GPS {company.gps}</p>
            <p>{company.postal.join(', ')}</p>
            <p>
              <a href={company.phoneHref}>{company.phone}</a><br />
              <a href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a>
            </p>
          </address>
        </div>
      </div>
      <div className="site-footer__base">
        <div className="container">
          <span>© {new Date().getFullYear()} {company.fullName}</span>
          <span>{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
