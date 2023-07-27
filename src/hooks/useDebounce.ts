import {useState, useEffect} from 'react';

export const useDebounce = (input: string = '', time: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<string>(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debounceValue;
};
