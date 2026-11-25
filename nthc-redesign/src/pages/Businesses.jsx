import Icon from '../components/Icon.jsx';
import Photo from '../components/Photo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { Link } from '../lib/router.jsx';
import { about, subsidiaries, services } from '../data/content.js';

export default function Businesses() {
  return (
    <>
      <PageHeader title="Our businesses" intro={about.intro[1]} />

      <section className="section">
        <div className="container">
          {subsidiaries.map((subsidiary) => {
            const service = services.find((item) => item.subsidiaryId === subsidiary.id);
            return (
              <article key={subsidiary.id} className="business" aria-labelledby={`${subsidiary.id}-title`}>
                <div className="business__image">
                  <Photo src={subsidiary.image} alt="" caption={subsidiary.name} />
                </div>
                <div className="measure">
                  <p className="business__line">{subsidiary.line}</p>
                  <h2 id={`${subsidiary.id}-title`}>{subsidiary.name}</h2>
                  {service && <p>{service.text}</p>}
                  <a className="text-link business__site" href={subsidiary.url} target="_blank" rel="noreferrer">
                    {new URL(subsidiary.url).hostname} <Icon name="external" size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section--alt section--ruled">
        <div className="container two-col">
          <h2>Opening an account?</h2>
          <div>
            <p>Account opening and KYC forms for NTHC Securities, NTHC Asset Management and NTHC Registrars are available to download.</p>
            <Link to="forms" className="button">Download forms</Link>
          </div>
        </div>
      </section>
    </>
  );
}
