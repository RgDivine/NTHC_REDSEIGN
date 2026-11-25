import { Link } from '../lib/router.jsx';
import Icon from '../components/Icon.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { services, subsidiaries } from '../data/content.js';

export default function Services() {
  return (
    <>
      <PageHeader title="Our services"
        intro="Our foremost pre-occupation is investment banking. Each line of business is carried out by a specialist subsidiary." />

      <section className="section">
        <div className="container">
          <ul className="line-list">
            {services.map((service) => {
              const subsidiary = subsidiaries.find((item) => item.id === service.subsidiaryId);
              return (
                <li key={service.id} id={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.text}</p>
                  <p className="line-list__by">
                    {subsidiary ? (
                      <>Provided by {subsidiary.name}
                        <a href={subsidiary.url} target="_blank" rel="noreferrer">Visit website <Icon name="external" size={14} /></a>
                      </>
                    ) : (
                      <>Enquiries to NTHC Limited
                        <Link to="contact">Contact us</Link>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--alt section--ruled" aria-label="Client tools">
        <div className="container two-col two-col--even">
          <div>
            <h2>Forms download</h2>
            <p>SEC Know-Your-Client and CSD account forms for individuals and institutions.</p>
            <Link to="forms" className="text-link">Go to forms <Icon name="arrow" /></Link>
          </div>
          <div>
            <h2>Investment calculator</h2>
            <p>Estimate interest on a fixed-rate placement over a 91, 182 or 365-day tenor.</p>
            <Link to="calculator" className="text-link">Open the calculator <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
