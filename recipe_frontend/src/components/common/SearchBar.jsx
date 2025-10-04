import React, { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

/**
 * PUBLIC_INTERFACE
 * SearchBar is an accessible search input with clear and debounced output.
 */
export default function SearchBar({ value = '', onChange }) {
  const [local, setLocal] = useState(value);
  const debounced = useDebounce(local, 300);

  useEffect(() => {
    onChange && onChange(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <div className="row" role="search" aria-label="Search recipes">
      <label className="sr-only" htmlFor="search">Search</label>
      <input
        id="search"
        className="input"
        type="search"
        placeholder="Search recipes..."
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      {local && (
        <button className="btn ghost" onClick={() => setLocal('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
