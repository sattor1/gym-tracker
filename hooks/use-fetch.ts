import { useState, useCallback, useRef } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, options?: RequestInit) => Promise<T | null>;
  get: (url: string, options?: RequestInit) => Promise<T | null>;
  post: (url: string, body?: any, options?: RequestInit) => Promise<T | null>;
  put: (url: string, body?: any, options?: RequestInit) => Promise<T | null>;
  patch: (url: string, body?: any, options?: RequestInit) => Promise<T | null>;
  delete: (url: string, options?: RequestInit) => Promise<T | null>;
  reset: () => void;
}

interface UseFetchConfig {
  baseURL?: string;
  defaultHeaders?: Record<string, string>;
  mode?: RequestMode;
  credentials?: RequestCredentials;
}

export const useFetch = <T = any>(
  config: UseFetchConfig = {},
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { baseURL = "http://147.45.136.208:3000/api/", defaultHeaders = {} } =
    config;

  const buildUrl = (url: string): string => {
    if (url.startsWith("http")) {
      return url;
    }
    return baseURL ? `${baseURL}${url}` : url;
  };

  const execute = useCallback(
    async (url: string, options: RequestInit = {}): Promise<T | null> => {
      // Отменяем предыдущий запрос если он есть
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setLoading(true);
      setError(null);

      try {
        const fullUrl = buildUrl(url);

        // CORS-friendly настройки по умолчанию
        const defaultOptions: RequestInit = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...defaultHeaders,
          },
          signal: abortController.signal,
        };

        const fetchOptions = { ...defaultOptions, ...options };

        console.log("Making request to:", fullUrl);
        console.log("Request options:", fetchOptions);

        const response = await fetch(fullUrl, fetchOptions);

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries()),
        );

        if (!response.ok) {
          let errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;

          // Попробуем получить больше информации об ошибке
          try {
            const errorData = await response.text();
            if (errorData) {
              errorMessage += ` - ${errorData}`;
            }
          } catch (e) {
            console.error(e);
          }

          throw new Error(errorMessage);
        }

        const contentType = response.headers.get("content-type");
        let result;

        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          result = await response.text();
        }

        setData(result);
        return result;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          const errorMessage = err.message || "An error occurred";
          console.error("Request failed:", errorMessage);
          setError(errorMessage);
        }
        return null;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [baseURL, defaultHeaders],
  );

  const get = useCallback(
    (url: string, options: RequestInit = {}) => {
      return execute(url, { ...options, method: "GET" });
    },
    [execute],
  );

  const post = useCallback(
    (url: string, body?: any, options: RequestInit = {}) => {
      return execute(url, {
        ...options,
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    [execute],
  );

  const put = useCallback(
    (url: string, body?: any, options: RequestInit = {}) => {
      return execute(url, {
        ...options,
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    [execute],
  );

  const patch = useCallback(
    (url: string, body?: any, options: RequestInit = {}) => {
      return execute(url, {
        ...options,
        method: "PATCH",
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    [execute],
  );

  const deleteMethod = useCallback(
    (url: string, options: RequestInit = {}) => {
      return execute(url, { ...options, method: "DELETE" });
    },
    [execute],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    get,
    post,
    put,
    patch,
    delete: deleteMethod,
    reset,
  };
};
