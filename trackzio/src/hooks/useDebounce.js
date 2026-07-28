import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value by the specified delay.
 * Useful for search inputs to avoid filtering on every keystroke.
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default 300ms)
 * @returns {any} The debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
