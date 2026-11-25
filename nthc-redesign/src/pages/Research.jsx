import { useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';
import { useApi } from '../lib/useApi.js';
import { useRouter, Link } from '../lib/router.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Tabs from '../components/Tabs.jsx';
import ReportTable from '../components/ReportTable.jsx';
import { SnapshotNotice, Loading, EmptyState } from '../components/Status.jsx';

const CATEGORIES = {
  'market-review': { endpoint: 'market_review', title: 'Market review', intro: 'NTHC weekly report summarising activities on Ghana’s money and capital markets during the specific period.' },
  newsletters: { endpoint: 'newsletters', title: 'Newsletters', intro: 'NTHC newsletters on Ghana’s money and capital markets.' },
  articles: { endpoint: 'articles', title: 'Articles', intro: 'NTHC articles on Ghana’s money and capital markets.' },
  'equity-research': { endpoint: 'equity_research', title: 'Equity research', intro: 'NTHC equity research on Ghana’s money and capital markets.' },
};
const PAGE_SIZE = 10;

export default function Research() {
  const { route } = useRouter();
  const current = route in CATEGORIES ? route : 'market-review';
  const category = CATEGORIES[current];
  const reports = useApi(() => api.research(category.endpoint), [category.endpoint]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => { setQuery(''); setPage(1); }, [current]);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...reports.data]
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .filter((report) => !term || `${report.description} ${report.edition} ${report.date}`.toLowerCase().includes(term));
  }, [reports.data, query]);

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const visible = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader title={category.title} intro={category.intro} trail={[{ label: 'Research', to: 'market-review' }]} />
      <section className="section">
        <div className="container">
          <Tabs label="Research" current={current}
            items={Object.entries(CATEGORIES).map(([to, item]) => ({ to, label: item.title }))} />
          <SnapshotNotice source={reports.source} />

          {reports.loading && <Loading label="Loading publications…" />}

          {!reports.loading && reports.data.length === 0 && (
            <EmptyState title={`No ${category.title.toLowerCase()} have been published yet`}>
              <p>New publications will be listed here when they are released.</p>
              {current !== 'market-review' && <Link to="market-review">See the weekly market review</Link>}
            </EmptyState>
          )}

          {!reports.loading && reports.data.length > 0 && (
            <>
              <div className="toolbar">
                <p aria-live="polite">{matches.length} {matches.length === 1 ? 'publication' : 'publications'}</p>
                <div className="field">
                  <label htmlFor="report-search" className="visually-hidden">Search publications</label>
                  <input id="report-search" type="search" placeholder="Search by edition or year" value={query}
                    onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
                </div>
              </div>
              {visible.length > 0
                ? <ReportTable reports={visible} />
                : <EmptyState title={`Nothing matches “${query}”`}><button type="button" className="button button--outline button--small" onClick={() => setQuery('')}>Clear search</button></EmptyState>}
              {pageCount > 1 && (
                <nav className="pagination" aria-label="Pages">
                  <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                    <button key={number} type="button" aria-current={number === page ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button>
                  ))}
                  <button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next</button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
