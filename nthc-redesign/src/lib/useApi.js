import { useEffect, useState } from 'react';

// Runs one of the api.* loaders and tracks { loading, data, source }.
export function useApi(loader, deps = []) {
  const [state, setState] = useState({ loading: true, data: [], source: null });

  useEffect(() => {
    let active = true;
    setState((previous) => ({ ...previous, loading: true }));
    loader().then((result) => active && setState({ loading: false, ...result }));
    return () => { active = false; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
