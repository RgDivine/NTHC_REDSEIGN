import { api } from '../lib/api.js';
import { useApi } from '../lib/useApi.js';
import { Link } from '../lib/router.jsx';
import Icon from '../components/Icon.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { SnapshotNotice, Loading, EmptyState } from '../components/Status.jsx';
import { MEDIA_BASE } from '../config.js';
import { company } from '../data/content.js';

const formUrl = (path) => `${MEDIA_BASE}/downloads/${encodeURIComponent(path)}`;

export default function Forms() {
  const forms = useApi(() => api.forms());

  return (
    <>
      <PageHeader title="Forms download" trail={[{ label: 'Services', to: 'services' }]}
        intro="Know-Your-Client and Central Securities Depository forms for opening and maintaining an account with an NTHC subsidiary." />
      <section className="section">
        <div className="container">
          <SnapshotNotice source={forms.source} />
          {forms.loading && <Loading label="Loading forms…" />}
          {!forms.loading && forms.data.length === 0 && (
            <EmptyState title="Forms are not available right now">
              <p>Please <Link to="contact">contact us</Link> and we will send you the forms you need.</p>
            </EmptyState>
          )}
          {forms.data.map((group) => (
            <div key={group.company} className="form-group">
              <h2>{String(group.company).replaceAll('_', ' ')}</h2>
              <table className="data-table data-table--stack">
                <thead>
                  <tr><th scope="col">Form</th><th scope="col">Purpose</th><th scope="col"><span className="visually-hidden">Download</span></th></tr>
                </thead>
                <tbody>
                  {group.product.map((form) => (
                    <tr key={form.form_path}>
                      <td className="data-table__primary data-table__title">{form.form_name}</td>
                      <td>{form.description}</td>
                      <td className="data-table__action num">
                        <a className="text-link" href={formUrl(form.form_path)} target="_blank" rel="noreferrer"
                          aria-label={`Download ${form.form_name} (PDF)`}>
                          <Icon name="download" /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <p className="help-note">
            Need help with a form? Call <a href={company.phoneHref}>{company.phone}</a> or <Link to="contact">send us a message</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
