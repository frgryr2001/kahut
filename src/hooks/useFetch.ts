import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import httpClient from '../services/utils/httpClient';
import {RequestResponse} from '../types/common';

export const useFetch = <T>(
  url: string,
  options: {
    onSuccess?: (data: T) => void;
  },
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveOnSuccess = useRef(options.onSuccess);

  useLayoutEffect(() => {
    saveOnSuccess.current = options.onSuccess;
  }, [options.onSuccess]);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await httpClient.get<RequestResponse<T>>(url);
          if (saveOnSuccess.current) {
            saveOnSuccess.current(res.data);
          }
          setData(res.data);
          setIsLoading(false);
          // eslint-disable-next-line no-catch-shadow
        } catch (error) {
          console.log('USE FETCH ERROR', error);

          setError(error);
        }
      };
      fetchData();
    }
  }, [url, options]);
  return {data, error, isLoading};
};
