import Icon from './Icon.jsx';

export function SnapshotNotice({ source }) {
  if (source !== 'snapshot') return null;
  return (
    <p className="notice notice--info" role="status">
      <Icon name="alert" />
      Live records could not be loaded, so this shows the most recently published list.
    </p>
  );
}

export function Loading({ label = 'Loading…' }) {
  return <p className="loading" aria-busy="true">{label}</p>;
}

export function EmptyState({ title, children }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
