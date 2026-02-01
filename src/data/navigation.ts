/**
 * Header navigation configuration
 */

export interface NavLink {
    label: string;
    to: string;
    hasDropdown?: boolean;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'Shop', to: '/products', hasDropdown: true },
    { label: 'On Sale', to: '/products?sale=true' },
    { label: 'New Arrivals', to: '/products?new=true' },
    { label: 'Brands', to: '/products' },
];
