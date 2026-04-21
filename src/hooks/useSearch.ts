import { useMemo, useState } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';

interface SearchOptions<T> {
  data: T[];
  keys: string[];
  options?: IFuseOptions<T>;
}

export const useSearch = <T extends object>({ data, keys, options }: SearchOptions<T>) => {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(data, {
      threshold: 0.3,
      keys,
      ...options,
    });
  }, [data, keys, options]);

  const results = useMemo(() => {
    if (!query) return data;
    return fuse.search(query).map(result => result.item);
  }, [fuse, query, data]);

  return {
    query,
    setQuery,
    results,
  };
};
