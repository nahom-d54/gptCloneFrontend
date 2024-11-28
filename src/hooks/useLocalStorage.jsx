import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] =
    useState <
    T >
    (() => {
      // Check if window is defined to ensure running on the client-side
      if (typeof window === "undefined") {
        return initialValue;
      }

      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

  useEffect(() => {
    // Check if window is defined to ensure running on the client-side
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
