import { useState } from 'react';
import { company } from '../data/content.js';

const initialsOf = (name) =>
  name
    .replace(/\(.*?\)|\b(Mr|Mrs|Ms|Dr)\.?\s/g, '')
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word) && !/^(I|II|III|IV)$/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

// Shows a photo, or a neutral placeholder if it is missing or fails to load.
export default function Photo({ src, alt = '', caption, portraitOf, eager = false }) {
  const [failed, setFailed] = useState(!src);

  if (failed && portraitOf) {
    return <div className="photo-placeholder photo-placeholder--portrait" role="img" aria-label={portraitOf}>{initialsOf(portraitOf)}</div>;
  }
  if (failed) {
    return <div className="photo-placeholder" role={alt ? 'img' : undefined} aria-label={alt || undefined}>{caption}</div>;
  }
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}

// The official NTHC logo. Falls back to the company name in text, never a substitute mark.
export function Logo() {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="logo-text">{company.name}</span>;
  return <img className="logo" src={company.logo} alt={company.name} onError={() => setFailed(true)} />;
}
