/**
 * Product variant options
 * Since FakeStoreAPI doesn't provide sizes/colors, we define them here
 */

export interface ColorOption {
    name: string;
    value: string; // hex color
}

export interface SizeOption {
    label: string;
    value: string;
}

// Available sizes for products
export const PRODUCT_SIZES: SizeOption[] = [
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' },
    { label: 'X-Large', value: 'XL' },
];

// Available colors for products
export const PRODUCT_COLORS: ColorOption[] = [
    { name: 'Olive', value: '#4A5D23' },
    { name: 'Navy', value: '#1E3A5F' },
    { name: 'Black', value: '#000000' },
];

// Category-specific colors (for more realistic data)
export const CATEGORY_COLORS: Record<string, ColorOption[]> = {
    electronics: [
        { name: 'Black', value: '#000000' },
        { name: 'Silver', value: '#C0C0C0' },
        { name: 'Space Gray', value: '#4A4A4A' },
    ],
    jewelery: [
        { name: 'Gold', value: '#FFD700' },
        { name: 'Silver', value: '#C0C0C0' },
        { name: 'Rose Gold', value: '#B76E79' },
    ],
    "men's clothing": [
        { name: 'Black', value: '#000000' },
        { name: 'Navy', value: '#1E3A5F' },
        { name: 'Olive', value: '#4A5D23' },
        { name: 'Gray', value: '#6B7280' },
    ],
    "women's clothing": [
        { name: 'Black', value: '#000000' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Pink', value: '#FFC0CB' },
        { name: 'Red', value: '#DC143C' },
    ],
};

// Category-specific sizes
export const CATEGORY_SIZES: Record<string, SizeOption[]> = {
    electronics: [], // Electronics don't have sizes
    jewelery: [
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
    ],
    "men's clothing": PRODUCT_SIZES,
    "women's clothing": [
        { label: 'XS', value: 'XS' },
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
    ],
};

/**
 * Get colors for a product category
 */
export function getColorsForCategory(category: string): ColorOption[] {
    return CATEGORY_COLORS[category] || PRODUCT_COLORS;
}

/**
 * Get sizes for a product category
 */
export function getSizesForCategory(category: string): SizeOption[] {
    return CATEGORY_SIZES[category] || PRODUCT_SIZES;
}
