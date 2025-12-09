import { useCallback } from 'react';

import { useFetch } from '@/hooks/use-fetch';

const DEFAULT_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://your-api.example.com/api/';

export const useApiClient = (baseURL: string = DEFAULT_BASE_URL) => {
  const client = useFetch({ baseURL });

  const get = useCallback(
    async <T>(path: string, options?: RequestInit) => {
      return client.get(path, options) as Promise<T | null>;
    },
    [client],
  );

  const post = useCallback(
    async <T>(path: string, body?: any, options?: RequestInit) => {
      return client.post(path, body, options) as Promise<T | null>;
    },
    [client],
  );

  const put = useCallback(
    async <T>(path: string, body?: any, options?: RequestInit) => {
      return client.put(path, body, options) as Promise<T | null>;
    },
    [client],
  );

  const patch = useCallback(
    async <T>(path: string, body?: any, options?: RequestInit) => {
      return client.patch(path, body, options) as Promise<T | null>;
    },
    [client],
  );

  const del = useCallback(
    async <T>(path: string, options?: RequestInit) => {
      return client.delete(path, options) as Promise<T | null>;
    },
    [client],
  );

  return {
    ...client,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

