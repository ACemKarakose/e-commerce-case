import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';



export interface CartItem {
    id: string;
    productId: number;
    img: string;
    name: string;
    size: string;
    color: string;
    price: number;
    discount: number;
    quantity: number;
}

export interface CartSummary {
    totalItems: number;
    subtotal: number;
    totalDiscount: number;
    total: number;
}

interface CartState {
    items: CartItem[];
}

interface CartActions {
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getSummary: () => CartSummary;
}

type CartStore = CartState & CartActions;




const generateCartItemId = (
    productId: number,
    size: string,
    color: string
): string => {
    return `${productId}-${size}-${color}`;
};


const calculateSummary = (items: CartItem[]): CartSummary => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalDiscount = items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        const discountAmount = (itemTotal * item.discount) / 100;
        return sum + discountAmount;
    }, 0);

    const total = subtotal - totalDiscount;

    return {
        totalItems,
        subtotal: Math.round(subtotal * 100) / 100,
        totalDiscount: Math.round(totalDiscount * 100) / 100,
        total: Math.round(total * 100) / 100,
    };
};



export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            immer((set, get) => ({

                items: [],


                addItem: (itemData) => {
                    const id = generateCartItemId(
                        itemData.productId,
                        itemData.size,
                        itemData.color
                    );

                    set((state) => {
                        const existingItemIndex = state.items.findIndex(
                            (item) => item.id === id
                        );

                        if (existingItemIndex !== -1) {
                            state.items[existingItemIndex].quantity += itemData.quantity;
                        } else {
                            state.items.push({ ...itemData, id });
                        }
                    });
                },

                removeItem: (id) => {
                    set((state) => {
                        state.items = state.items.filter((item) => item.id !== id);
                    });
                },

                updateQuantity: (id, quantity) => {
                    set((state) => {
                        const item = state.items.find((item) => item.id === id);
                        if (item) {
                            if (quantity <= 0) {
                                state.items = state.items.filter((i) => i.id !== id);
                            } else {
                                item.quantity = quantity;
                            }
                        }
                    });
                },

                clearCart: () => {
                    set((state) => {
                        state.items = [];
                    });
                },

                getSummary: () => {
                    return calculateSummary(get().items);
                },
            })),
            {
                name: 'cart-storage',
                partialize: (state) => ({ items: state.items }),
            }
        ),
        { name: 'CartStore' }
    )
);



export const selectCartItems = (state: CartStore) => state.items;
export const selectCartItemCount = (state: CartStore) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: CartStore) =>
    state.getSummary().total;
