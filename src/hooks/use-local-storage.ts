import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const valueRef = useRef<T>(storedValue);

  // hydrating from localStorage requires a post-mount effect because `window` is unavailable during SSR; the value cannot be derived during render on the server.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item) as T;
        valueRef.current = parsed;
        // post-mount hydration from localStorage; value cannot exist during SSR render.
        // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
        setStoredValue(parsed);
      }
    } catch (error) {
      console.error(`useLocalStorage: failed to read "${key}"`, error);
    }
    // hydration flag must flip after the read attempt; cannot be derived during SSR render.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    setHydrated(true);
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    const next = value instanceof Function ? value(valueRef.current) : value;
    valueRef.current = next;
    setStoredValue(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.error(`useLocalStorage: failed to write "${key}"`, error);
    }
  };

  return [storedValue, setValue, hydrated];
}
