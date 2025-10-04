import { useCallback, useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage persists state by key.
 */
export default function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }, [key, value]);

  return [value, setValue];
}
