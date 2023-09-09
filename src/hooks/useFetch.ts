import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import httpClient from '../services/utils/httpClient';
import {RequestResponse} from '../types/common';

export const useFetch = <T>(
  url: string,
  queryKey?: string,
  query?: string,
  options?: {
    onSuccess?: (data: T) => void;
  },
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveOnSuccess = useRef(options?.onSuccess);

  useLayoutEffect(() => {
    saveOnSuccess.current = options?.onSuccess;
  }, [options?.onSuccess]);

  useEffect(() => {
    if (url) {
      if (query === undefined || query === '') {
        return;
      }
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await httpClient.get<RequestResponse<T>>(
            `${url}${queryKey}${query}`,
          );
          if (saveOnSuccess.current) {
            saveOnSuccess.current(res.data);
          }
          setData(res.data);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setData(undefined);
          setError(err);
        }
      };
      fetchData();
    }
  }, [url, options, query, queryKey]);
  return {data, error, isLoading};
};
