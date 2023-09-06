import { useEffect, useState } from 'react';

interface debounceProps {
  value: string;
  delay: number;
}

export default function useDebounce({ value, delay }: debounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(hanlder);
    };
  }, [value]);
  return debouncedValue;
}
