import { Link } from '../lib/router.jsx';
import Icon from '../components/Icon.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { about, values, shareholders, services } from '../data/content.js';

export default function About() {
  return (
    <>
      <PageHeader title="About NTHC"
        intro="National Trust Holding Company Limited was established in 1976. Today it is the holding company of a group of six subsidiaries." />

      <section className="section" aria-labelledby="history-title">
        <div className="container">
          <h2 id="history-title" className="visually-hidden">Our history</h2>
          <div className="history">
            <span className="history__year">1976</span>
            <div className="measure">
              <p className="lead">{about.history}</p>
              {about.intro.map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="purpose-title">
        <div className="container two-col">
          <div>
            <p className="section-label">Purpose</p>
            <h2 id="purpose-title">Mission and vision</h2>
          </div>
          <div>
            <div className="statement"><h3>Mission</h3><p>{about.mission}</p></div>
            <div className="statement"><h3>Vision</h3><p>{about.vision}</p></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <div className="section-intro">
            <p className="section-label">Core values</p>
            <h2 id="values-title">Excellence, Teamwork, Integrity, Responsibility, Innovation</h2>
            <p>{about.pledge}</p>
          </div>
          <dl className="values">
            {values.map((value) => (
              <div key={value.name}><dt>{value.name}</dt><dd>{value.text}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="functions-title">
        <div className="container two-col">
          <div>
            <p className="section-label">Core functions</p>
            <h2 id="functions-title">What the group does</h2>
            <p>Our strategic business units are incorporated as subsidiary companies to provide diversity of investment opportunities.</p>
            <Link to="services" className="text-link">How each service is delivered <Icon name="arrow" /></Link>
          </div>
          <ul className="plain-list">
            {services.map((service) => <li key={service.id}>{service.name}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="shareholders">
        <div className="container">
          <div className="section-intro">
            <p className="section-label">Ownership</p>
            <h2 id="shareholders">Our shareholders</h2>
            <p>{about.stakeholders[1]}</p>
          </div>
          <table className="data-table data-table--stack">
            <thead>
              <tr><th scope="col">Shareholder</th><th scope="col">About</th><th scope="col" className="num">Holding</th></tr>
            </thead>
            <tbody>
              {shareholders.map((holder) => (
                <tr key={holder.name}>
                  <td className="data-table__primary data-table__title">{holder.name}</td>
                  <td>{holder.text}</td>
                  <td className="num data-table__action">{holder.share.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
