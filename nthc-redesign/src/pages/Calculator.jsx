import { useEffect, useMemo, useState } from 'react';
import { Link } from '../lib/router.jsx';
import { formatMoney } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';

const TENORS = [91, 182, 365];
const STORAGE_KEY = 'nthc:calculator';

// Same method as the original NTHC calculator: simple interest on a 365-day year,
// with principal and interest rolled over at the end of each tenor.
export function buildSchedule(principal, ratePercent, totalDays, tenorDays) {
  const periods = [];
  let balance = principal;
  let daysLeft = totalDays;
  while (daysLeft > 0) {
    const days = Math.min(tenorDays, daysLeft);
    const interest = balance * (ratePercent / 100) * (days / 365);
    periods.push({ days, opening: balance, interest, closing: balance + interest });
    balance += interest;
    daysLeft -= days;
  }
  return periods;
}

function readSavedInputs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function validate({ principal, rate, days }) {
  return {
    principal: Number(principal) > 0 ? '' : 'Enter an amount greater than zero.',
    rate: Number(rate) > 0 && Number(rate) <= 200 ? '' : 'Enter an annual rate between 0 and 200%.',
    days: Number.isInteger(Number(days)) && Number(days) > 0 && Number(days) <= 3650 ? '' : 'Enter a whole number of days up to 3,650.',
  };
}

function NumberField({ id, label, hint, value, error, onChange, ...inputProps }) {
  const showError = value !== '' && error;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode="decimal" min="0" value={value} required
        aria-invalid={Boolean(showError)} aria-describedby={`${id}-note`}
        onChange={(event) => onChange(event.target.value)} {...inputProps} />
      <span id={`${id}-note`} className={showError ? 'field__error' : 'field__hint'}>{showError || hint}</span>
    </div>
  );
}

export default function Calculator() {
  const [inputs, setInputs] = useState(() => ({ principal: '10000', rate: '', days: '365', tenor: 91, ...readSavedInputs() }));
  const update = (name) => (value) => setInputs((current) => ({ ...current, [name]: value }));

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs)); } catch { /* storage unavailable */ }
  }, [inputs]);

  const errors = validate(inputs);
  const isValid = Object.values(errors).every((message) => !message);
  const schedule = useMemo(
    () => (isValid ? buildSchedule(Number(inputs.principal), Number(inputs.rate), Number(inputs.days), inputs.tenor) : []),
    [isValid, inputs],
  );
  const maturityValue = schedule.at(-1)?.closing ?? 0;

  return (
    <>
      <PageHeader title="Investment calculator" trail={[{ label: 'Services', to: 'services' }]}
        intro="Estimate the interest on a fixed-rate investment. Principal and interest are rolled over at the end of each tenor." />
      <section className="section">
        <div className="container calculator">
          <form className="form-stack" onSubmit={(event) => event.preventDefault()} noValidate aria-label="Investment details">
            <NumberField id="principal" label="Amount to invest (GHS)" value={inputs.principal} error={errors.principal}
              onChange={update('principal')} step="any" />
            <NumberField id="rate" label="Expected annual rate (%)" value={inputs.rate} error={errors.rate}
              onChange={update('rate')} step="any" hint="The rate is assumed to stay the same throughout." />
            <NumberField id="days" label="Number of days invested" value={inputs.days} error={errors.days}
              onChange={update('days')} step="1" hint="Total time the money stays invested." />
            <fieldset className="field">
              <legend>Tenor</legend>
              <div className="tenor-options">
                {TENORS.map((tenor) => (
                  <button key={tenor} type="button" aria-pressed={inputs.tenor === tenor} onClick={() => update('tenor')(tenor)}>
                    {tenor} days
                  </button>
                ))}
              </div>
            </fieldset>
          </form>

          <div className="calculator__result" aria-live="polite">
            <h2>Estimated value at maturity</h2>
            {isValid ? (
              <>
                <p className="calculator__total">GHS {formatMoney(maturityValue)}</p>
                <p className="calculator__summary">
                  <span>Interest <strong>GHS {formatMoney(maturityValue - Number(inputs.principal))}</strong></span>
                  <span><strong>{schedule.length}</strong> {schedule.length === 1 ? 'period' : 'periods'} of up to {inputs.tenor} days</span>
                </p>
                <div className="table-scroll">
                  <table className="data-table">
                    <caption className="visually-hidden">Value by tenor period</caption>
                    <thead>
                      <tr>
                        <th scope="col">Period</th><th scope="col" className="num">Days</th>
                        <th scope="col" className="num">Opening</th><th scope="col" className="num">Interest</th>
                        <th scope="col" className="num">Closing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((period, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td><td className="num">{period.days}</td>
                          <td className="num">{formatMoney(period.opening)}</td><td className="num">{formatMoney(period.interest)}</td>
                          <td className="num">{formatMoney(period.closing)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : <p>Enter an amount, a rate and the number of days to see an estimate.</p>}
            <p className="field__hint">
              For illustration only, before taxes and fees. <Link to="contact">Ask us for current rates</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
