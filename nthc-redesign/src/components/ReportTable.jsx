import Icon from './Icon.jsx';
import { MEDIA_BASE } from '../config.js';
import { formatDate } from '../lib/format.js';

export const reportUrl = (fileName) => `${MEDIA_BASE}/research/${encodeURIComponent(fileName)}`;

export default function ReportTable({ reports, caption }) {
  return (
    <table className="data-table data-table--stack">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">Publication</th>
          <th scope="col">Edition</th>
          <th scope="col">Date</th>
          <th scope="col"><span className="visually-hidden">Download</span></th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={`${report.file_name}-${report.edition}`}>
            <td className="data-table__primary data-table__title">{report.description}</td>
            <td data-label="Edition" className="nowrap">{report.edition}</td>
            <td data-label="Published" className="nowrap"><time dateTime={report.date}>{formatDate(report.date)}</time></td>
            <td className="data-table__action num">
              <a className="text-link" href={reportUrl(report.file_name)} target="_blank" rel="noreferrer"
                aria-label={`Download ${report.description}, edition ${report.edition} (PDF)`}>
                <Icon name="download" /> PDF
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
