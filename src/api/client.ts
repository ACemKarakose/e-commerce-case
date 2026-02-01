// Custom API client without @hey-api/client-fetch dependency
const BASE_URL = import.meta.env.VITE_API_URL;

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
    headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// ============ Types ============

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface GetAllProductsOptions {
    limit?: number;
    sort?: 'asc' | 'desc';
}

// ============ API Functions ============

/**
 * Get all products
 */
export async function getAllProducts(options?: GetAllProductsOptions): Promise<Product[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.sort) params.append('sort', options.sort);

    const query = params.toString();
    return request<Product[]>(`/products${query ? `?${query}` : ''}`);
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number): Promise<Product> {
    return request<Product>(`/products/${id}`);
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<string[]> {
    return request<string[]>('/products/categories');
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
    return request<Product[]>(`/products/category/${encodeURIComponent(category)}`);
}
