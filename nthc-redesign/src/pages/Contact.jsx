import { useState } from 'react';
import { api } from '../lib/api.js';
import Icon from '../components/Icon.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { company } from '../data/content.js';

const FIELDS = [
  { name: 'first_name', label: 'First name', autoComplete: 'given-name', check: (v) => v.trim().length >= 2 || 'Enter your first name.' },
  { name: 'last_name', label: 'Last name', autoComplete: 'family-name', check: (v) => v.trim().length >= 2 || 'Enter your last name.' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address.' },
  { name: 'telephone', label: 'Telephone', type: 'tel', autoComplete: 'tel', check: (v) => v.replace(/\D/g, '').length >= 9 || 'Enter a phone number with at least 9 digits.' },
  { name: 'message', label: 'Message', multiline: true, check: (v) => v.trim().length >= 10 || 'Write a message of at least 10 characters.' },
];
const EMPTY_FORM = Object.fromEntries(FIELDS.map((field) => [field.name, '']));

function getErrors(values) {
  return Object.fromEntries(FIELDS.map(({ name, check }) => {
    const result = check(values[name]);
    return [name, result === true ? '' : result];
  }));
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | invalid | sending | sent | failed
  const [reply, setReply] = useState('');

  const errors = getErrors(values);
  const visibleError = (name) => (touched[name] || status === 'invalid' ? errors[name] : '');

  async function handleSubmit(event) {
    event.preventDefault();
    const firstInvalid = FIELDS.find(({ name }) => errors[name]);
    if (firstInvalid) {
      setStatus('invalid');
      document.getElementById(firstInvalid.name).focus();
      return;
    }
    setStatus('sending');
    try {
      const trimmed = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
      const response = await api.contact(trimmed);
      setReply(typeof response === 'string' && response.length < 300 ? response : '');
      setStatus('sent');
      setValues(EMPTY_FORM);
      setTouched({});
    } catch {
      setStatus('failed');
    }
  }

  return (
    <>
      <PageHeader title="Contact us" intro="Send us a message, call, or visit our head office in Ringway Estates, Osu." />
      <section className="section">
        <div className="container contact-layout">
          <form onSubmit={handleSubmit} noValidate aria-labelledby="form-title">
            <h2 id="form-title">Send a message</h2>
            <p className="field__hint">All fields are required.</p>

            {status === 'sent' && (
              <p className="notice notice--success" role="status"><Icon name="check" />
                {reply || 'Thank you. Your message has been received and a member of our team will respond.'}
              </p>
            )}
            {status === 'failed' && (
              <p className="notice notice--error" role="alert"><Icon name="alert" />
                <span>Your message could not be sent. Please try again, or email <a href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a> or call {company.phone}.</span>
              </p>
            )}
            {status === 'invalid' && <p className="notice notice--error" role="alert"><Icon name="alert" />Please correct the fields marked below.</p>}

            <div className="form-grid">
              {FIELDS.map((field) => {
                const error = visibleError(field.name);
                const shared = {
                  id: field.name,
                  name: field.name,
                  value: values[field.name],
                  required: true,
                  'aria-invalid': Boolean(error),
                  'aria-describedby': error ? `${field.name}-error` : undefined,
                  onChange: (event) => setValues({ ...values, [field.name]: event.target.value }),
                  onBlur: () => setTouched({ ...touched, [field.name]: true }),
                };
                return (
                  <div key={field.name} className={`field${field.multiline ? ' full' : ''}`}>
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.multiline
                      ? <textarea {...shared} />
                      : <input {...shared} type={field.type ?? 'text'} autoComplete={field.autoComplete} />}
                    {error && <span id={`${field.name}-error`} className="field__error">{error}</span>}
                  </div>
                );
              })}
              <div className="full">
                <button type="submit" className="button" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </div>
          </form>

          <dl className="contact-details">
            <div><dt>Head office</dt><dd>{company.address.join(', ')}<br />GPS {company.gps}<br />
              <a href={company.mapUrl} target="_blank" rel="noreferrer">View on Google Maps</a></dd></div>
            <div><dt>Postal address</dt><dd>{company.postal.join(', ')}</dd></div>
            <div><dt>Telephone</dt><dd><a href={company.phoneHref}>{company.phone}</a></dd></div>
            <div><dt>Email</dt><dd>{company.emails.map((email) => <span key={email}><a href={`mailto:${email}`}>{email}</a><br /></span>)}</dd></div>
          </dl>
        </div>
      </section>
    </>
  );
}
