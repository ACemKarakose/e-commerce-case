import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory,
    type Product,
    type GetAllProductsOptions,
} from './client';

// Query Keys Factory - for cache management
export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (filters?: GetAllProductsOptions) =>
        [...productKeys.lists(), filters] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
    categories: () => [...productKeys.all, 'categories'] as const,
    byCategory: (category: string) =>
        [...productKeys.all, 'category', category] as const,
};

// ============ Products Hooks ============

/**
 * Hook to fetch all products
 */
export function useGetAllProducts(
    options?: GetAllProductsOptions,
    queryOptions?: Omit<
        UseQueryOptions<Product[], Error>,
        'queryKey' | 'queryFn'
    >
) {
    return useQuery({
        queryKey: productKeys.list(options),
        queryFn: () => getAllProducts(options),
        ...queryOptions,
    });
}

/**
 * Hook to fetch a single product by ID
 */
export function useGetProductById(
    id: number,
    queryOptions?: Omit<
        UseQueryOptions<Product, Error>,
        'queryKey' | 'queryFn'
    >
) {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => getProductById(id),
        enabled: !!id,
        ...queryOptions,
    });
}

// ============ Categories Hooks ============

/**
 * Hook to fetch all categories
 */
export function useGetAllCategories(
    queryOptions?: Omit<
        UseQueryOptions<string[], Error>,
        'queryKey' | 'queryFn'
    >
) {
    return useQuery({
        queryKey: productKeys.categories(),
        queryFn: () => getAllCategories(),
        ...queryOptions,
    });
}

/**
 * Hook to fetch products by category
 */
export function useGetProductsByCategory(
    category: string,
    queryOptions?: Omit<
        UseQueryOptions<Product[], Error>,
        'queryKey' | 'queryFn'
    >
) {
    return useQuery({
        queryKey: productKeys.byCategory(category),
        queryFn: () => getProductsByCategory(category),
        enabled: !!category,
        ...queryOptions,
    });
}

// Re-export types and functions
export type { Product, GetAllProductsOptions };
export { getAllProducts, getProductById, getAllCategories, getProductsByCategory };
