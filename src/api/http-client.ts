import { createUrl } from './create-url';

type HttpClientOptions = RequestInit;

interface GetRequest {
  url: string;
  options?: HttpClientOptions;
}

interface PostRequest<T = unknown> {
  url: string;
  body?: T;
  options?: HttpClientOptions;
}

interface PutRequest<T = unknown> {
  url: string;
  body?: T;
  options?: HttpClientOptions;
}

interface PatchRequest<T = unknown> {
  url: string;
  body?: T;
  options?: HttpClientOptions;
}

interface DeleteRequest {
  url: string;
  options?: HttpClientOptions;
}

const checkResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `네트워크 응답이 정상적이지 않습니다: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }
  return response;
};

export const httpClient = {
  get: async ({ url, options }: GetRequest): Promise<Response> => {
    const resolvedUrl = createUrl(url);
    const token = localStorage.getItem('AccessToken');
    const headers = {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(resolvedUrl, {
      ...options,
      method: 'GET',
      headers,
    });

    return await checkResponse(response);
  },

  post: async <T = unknown>({
    url,
    body,
    options,
  }: PostRequest<T>): Promise<Response> => {
    const resolvedUrl = createUrl(url);
    const token = localStorage.getItem('AccessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(resolvedUrl, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });

    return await checkResponse(response);
  },

  put: async <T = unknown>({
    url,
    body,
    options,
  }: PutRequest<T>): Promise<Response> => {
    const resolvedUrl = createUrl(url);
    const token = localStorage.getItem('AccessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(resolvedUrl, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });

    return await checkResponse(response);
  },

  patch: async <T = unknown>({
    url,
    body,
    options,
  }: PatchRequest<T>): Promise<Response> => {
    const resolvedUrl = createUrl(url);
    const token = localStorage.getItem('AccessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(resolvedUrl, {
      ...options,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers,
    });

    return await checkResponse(response);
  },

  delete: async ({ url, options }: DeleteRequest): Promise<Response> => {
    const resolvedUrl = createUrl(url);
    const token = localStorage.getItem('AccessToken');
    const headers = {
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(resolvedUrl, {
      ...options,
      method: 'DELETE',
      headers,
    });

    return await checkResponse(response);
  },
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const customHttpClient = async <T>(
  url: string,
  options: RequestInit & { method: HttpMethod },
): Promise<T> => {
  const { method, body, ...restOptions } = options;
  const lowerMethod = method.toLowerCase() as Lowercase<HttpMethod>;

  const args =
    body !== undefined
      ? { url, body, options: restOptions }
      : { url, options: restOptions };

  return httpClient[lowerMethod](args).then(async (response) => {
    const status = response.status;

    const text = [204, 205, 304].includes(status)
      ? null
      : await response.text();

    const data: T = text ? JSON.parse(text) : ({} as T);
    return data;
  });
};
