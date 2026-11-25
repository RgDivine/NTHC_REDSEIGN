import { Link } from '../lib/router.jsx';
import { api } from '../lib/api.js';
import { useApi } from '../lib/useApi.js';
import { formatDate } from '../lib/format.js';
import Icon from '../components/Icon.jsx';
import Photo from '../components/Photo.jsx';
import ReportTable from '../components/ReportTable.jsx';
import { Loading } from '../components/Status.jsx';
import { company, heroSlides, welcome, about, subsidiaries, shareholders, horizonFund } from '../data/content.js';

function HorizonFundPanel() {
  return (
    <aside className="fund-panel" aria-labelledby="fund-title">
      <div className="fund-panel__head">
        <h2 id="fund-title">{horizonFund.name}</h2>
        <span className="fund-panel__date">As at {formatDate(horizonFund.asAt)}</span>
      </div>
      <dl>
        <div><dt>Net asset value</dt><dd>GHS {horizonFund.nav.toFixed(2)}m</dd></div>
        <div><dt>Price per unit</dt><dd>GHS {horizonFund.price.toFixed(2)}</dd></div>
        <div><dt>Return, year to date</dt><dd>{horizonFund.ytd.toFixed(2)}%</dd></div>
      </dl>
      <p className="fund-panel__note">As published by NTHC. Past performance does not guarantee future returns.</p>
    </aside>
  );
}

function MarketFeed() {
  return (
    <section className="market-feed" aria-label="Ghana Stock Exchange share prices">
      <div className="container">
        <span className="market-feed__label">GSE share prices</span>
        <iframe src="https://gsestockfeed.com/" title="Ghana Stock Exchange share prices, provided by gsestockfeed.com" loading="lazy" />
      </div>
    </section>
  );
}

export default function Home() {
  const reports = useApi(() => api.research('market_review'));
  const latestReports = [...reports.data].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <p className="section-label">{company.fullName} · Est. {company.founded}</p>
            <h1>Investment banking and asset management in Ghana since {company.founded}</h1>
            <p className="hero__lead">
              Through six subsidiaries, NTHC provides fund management, pension trusteeship, securities trading,
              share registry and corporate finance advisory, with interests in commodities and real estate.
            </p>
            <div className="hero__actions">
              <Link to="businesses" className="button">Our businesses</Link>
              <Link to="contact" className="text-link">Speak to our team <Icon name="arrow" /></Link>
            </div>
          </div>
          <HorizonFundPanel />
        </div>
      </section>

      <MarketFeed />

      <figure className="photo-band">
        <div className="photo-band__image">
          <Photo src={heroSlides[0]} alt="NTHC Limited" caption="NTHC Limited" eager />
        </div>
      </figure>

      <section className="section" aria-labelledby="group-title">
        <div className="container two-col">
          <div>
            <p className="section-label">The NTHC Group</p>
            <h2 id="group-title">One holding company, six specialist subsidiaries</h2>
            <p>{about.intro[1]}</p>
            <Link to="businesses" className="text-link">About each business <Icon name="arrow" /></Link>
          </div>
          <div className="directory">
            {subsidiaries.map((subsidiary) => (
              <div key={subsidiary.id} className="directory__row">
                <span className="directory__name">{subsidiary.name}</span>
                <span className="directory__line">{subsidiary.line}</span>
                <a className="text-link directory__link" href={subsidiary.url} target="_blank" rel="noreferrer"
                  aria-label={`Visit the ${subsidiary.name} website`}>
                  Website <Icon name="external" size={15} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="welcome-title">
        <div className="container welcome">
          <div className="welcome__portrait">
            <Photo src={welcome.image} alt={welcome.name} portraitOf={welcome.name} />
          </div>
          <div className="measure">
            <p className="section-label">From the Group Managing Director</p>
            <h2 id="welcome-title" className="visually-hidden">A welcome from the Group Managing Director</h2>
            <blockquote>
              {welcome.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
            </blockquote>
            <p className="welcome__name"><strong>{welcome.name}</strong>{welcome.role}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ownership-title">
        <div className="container two-col">
          <div>
            <p className="section-label">Ownership</p>
            <h2 id="ownership-title">Owned by Ghanaian institutions and our staff</h2>
            <p>{about.history}</p>
            <Link to="about:shareholders" className="text-link">More about our shareholders <Icon name="arrow" /></Link>
          </div>
          <table className="data-table">
            <caption className="visually-hidden">Shareholding in NTHC Limited</caption>
            <thead>
              <tr><th scope="col">Shareholder</th><th scope="col" className="num">Holding</th></tr>
            </thead>
            <tbody>
              {shareholders.map((holder) => (
                <tr key={holder.name}>
                  <td>
                    <span className="data-table__title">{holder.name}</span>
                    <span className="share-bar" aria-hidden="true"><span style={{ width: `${holder.share}%` }} /></span>
                  </td>
                  <td className="num">{holder.share.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="research-title">
        <div className="container">
          <div className="section-intro section-intro--split">
            <div>
              <p className="section-label">Research</p>
              <h2 id="research-title">Weekly market review</h2>
              <p>A weekly summary of activity on Ghana’s money and capital markets, from NTHC’s research desk.</p>
            </div>
            <Link to="market-review" className="text-link">All publications <Icon name="arrow" /></Link>
          </div>
          {reports.loading ? <Loading label="Loading publications…" /> : <ReportTable reports={latestReports} />}
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <div className="container">
          <div>
            <h2 id="contact-title">Visit or call us</h2>
            <Link to="contact" className="button button--light">Send an enquiry</Link>
          </div>
          <div>
            <h3>Head office</h3>
            <p>{company.address.join(', ')}<br />GPS {company.gps}</p>
          </div>
          <div>
            <h3>Telephone</h3>
            <p><a href={company.phoneHref}>{company.phone}</a></p>
          </div>
          <div>
            <h3>Email</h3>
            <p><a href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
