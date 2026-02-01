/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductsService {

    /**
     * Get all products
     * Retrieve a list of all available products.
     * @param limit Limit the number of products returned
     * @param sort Sort order
     * @returns Product Success
     * @throws ApiError
     */
    public static getAllProducts(
        limit?: number,
        sort?: 'asc' | 'desc',
    ): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products',
            query: {
                'limit': limit,
                'sort': sort,
            },
        });
    }

    /**
     * Get a single product
     * Retrieve details of a specific product by ID.
     * @param id
     * @returns Product Success
     * @throws ApiError
     */
    public static getProductById(
        id: number,
    ): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get all categories
     * Retrieve a list of all product categories.
     * @returns string Success
     * @throws ApiError
     */
    public static getAllCategories(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/categories',
        });
    }

    /**
     * Get products by category
     * Retrieve all products in a specific category.
     * @param category
     * @returns Product Success
     * @throws ApiError
     */
    public static getProductsByCategory(
        category: string,
    ): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/category/{category}',
            path: {
                'category': category,
            },
        });
    }

}
