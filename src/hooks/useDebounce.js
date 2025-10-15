import { useState, useEffect } from 'react';

// This custom hook takes a value (like a search term) and a delay
// and only returns the latest value after the specified delay has passed.
export function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. It runs every time the 'value' changes.
    // It clears the previous timer, so if the user is still typing,
    // the debounced value is not updated.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}