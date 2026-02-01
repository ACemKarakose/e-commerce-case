/**
 * API Hooks
 * 
 * Bu dosya OpenAPI codegen'den generate edilen hooks için
 * temiz, okunabilir wrapper'lar sağlar.
 * 
 * Generated dosyaları düzenleme - bunun yerine:
 *   npm run codegen
 * 
 * @see openapi.json - API şeması
 * @see src/api/generated - Auto-generated code (dokunma!)
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { ProductsService } from './generated/requests/services/ProductsService';
import type { Product } from './generated/requests/models/Product';

// Re-export Product type
export type { Product };

// ============ Query Keys ============

export const queryKeys = {
    products: {
        all: ['products'] as const,
        list: (options?: { limit?: number; sort?: 'asc' | 'desc' }) =>
            [...queryKeys.products.all, 'list', options] as const,
        detail: (id: number) => [...queryKeys.products.all, 'detail', id] as const,
        byCategory: (category: string) => [...queryKeys.products.all, 'category', category] as const,
    },
    categories: ['categories'] as const,
};

// ============ Hooks ============

export interface GetAllProductsOptions {
    limit?: number;
    sort?: 'asc' | 'desc';
}

/**
 * Tüm ürünleri getir
 */
export function useGetAllProducts(
    options?: GetAllProductsOptions,
    queryOptions?: Omit<UseQueryOptions<Product[], Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<Product[], Error> {
    return useQuery({
        queryKey: queryKeys.products.list(options),
        queryFn: () => ProductsService.getAllProducts(options?.limit, options?.sort),
        ...queryOptions,
    });
}

/**
 * ID ile tek ürün getir
 */
export function useGetProductById(
    id: number,
    queryOptions?: Omit<UseQueryOptions<Product, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<Product, Error> {
    return useQuery({
        queryKey: queryKeys.products.detail(id),
        queryFn: () => ProductsService.getProductById(id),
        enabled: !!id,
        ...queryOptions,
    });
}

/**
 * Tüm kategorileri getir
 */
export function useGetAllCategories(
    queryOptions?: Omit<UseQueryOptions<string[], Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<string[], Error> {
    return useQuery({
        queryKey: queryKeys.categories,
        queryFn: () => ProductsService.getAllCategories(),
        ...queryOptions,
    });
}

/**
 * Kategoriye göre ürünleri getir
 */
export function useGetProductsByCategory(
    category: string,
    queryOptions?: Omit<UseQueryOptions<Product[], Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<Product[], Error> {
    return useQuery({
        queryKey: queryKeys.products.byCategory(category),
        queryFn: () => ProductsService.getProductsByCategory(category),
        enabled: !!category,
        ...queryOptions,
    });
}
