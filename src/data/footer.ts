import type { ReactNode } from 'react';

/**
 * Footer configuration data
 */

export interface FooterLink {
    label: string;
    to: string;
}

export interface SocialLink {
    name: string;
    icon: ReactNode;
    href: string;
}

// Footer navigation links
export const FOOTER_LINKS: Record<string, { title: string; links: FooterLink[] }> = {
    company: {
        title: 'Company',
        links: [
            { label: 'About', to: '/about' },
            { label: 'Features', to: '/features' },
            { label: 'Works', to: '/works' },
            { label: 'Career', to: '/career' },
        ],
    },
    help: {
        title: 'Help',
        links: [
            { label: 'Customer Support', to: '/support' },
            { label: 'Delivery Details', to: '/delivery' },
            { label: 'Terms & Conditions', to: '/terms' },
            { label: 'Privacy Policy', to: '/privacy' },
        ],
    },
    faq: {
        title: 'FAQ',
        links: [
            { label: 'Account', to: '/faq/account' },
            { label: 'Manage Deliveries', to: '/faq/deliveries' },
            { label: 'Orders', to: '/faq/orders' },
            { label: 'Payments', to: '/faq/payments' },
        ],
    },
    resources: {
        title: 'Resources',
        links: [
            { label: 'Free eBooks', to: '/resources/ebooks' },
            { label: 'Development Tutorial', to: '/resources/tutorials' },
            { label: 'How to - Blog', to: '/blog' },
            { label: 'Youtube Playlist', to: '/resources/youtube' },
        ],
    },
};

// Payment method badges
export const PAYMENT_METHODS = [
    { name: 'Visa', image: '/payments/visa.svg' },
    { name: 'Mastercard', image: '/payments/mastercard.svg' },
    { name: 'PayPal', image: '/payments/paypal.svg' },
    { name: 'Apple Pay', image: '/payments/applepay.svg' },
    { name: 'Google Pay', image: '/payments/googlepay.svg' },
];
