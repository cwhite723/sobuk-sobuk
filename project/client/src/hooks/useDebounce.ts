import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [decbouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return decbouncedValue;
};
