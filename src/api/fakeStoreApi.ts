import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new ApiError('Network error — please check your connection and try again.');
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}. Please try again.`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export const fakeStoreApi = {
  getProducts: () => request<Product[]>('/products'),

  getProduct: (id: number | string) => request<Product>(`/products/${id}`),

  getCategories: () => request<string[]>('/products/categories'),

  getProductsByCategory: (category: string) =>
    request<Product[]>(`/products/category/${encodeURIComponent(category)}`),

  login: (username: string, password: string) =>
    request<{ token: string }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
};

export { ApiError };
