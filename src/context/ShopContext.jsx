import { useEffect, useMemo, useState } from 'react';
import { products as fallbackProducts } from '../assets/assets';
import { API_URL } from '../config/api';
import { ShopContext as ShopContextValue } from './ShopContextDefinition';

export { ShopContextValue as ShopContext };

const CART_STORAGE_KEY = 'shop-cart';
const ORDER_STORAGE_KEY = 'shop-orders';

const readStoredValue = (key, fallback) => {
    if (typeof window === 'undefined') return fallback;

    try {
        const rawValue = window.localStorage.getItem(key);
        return rawValue ? JSON.parse(rawValue) : fallback;
    } catch {
        return fallback;
    }
};

const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState(fallbackProducts);
    const [cartItems, setCartItems] = useState(() => readStoredValue(CART_STORAGE_KEY, {}));
    const [orders, setOrders] = useState(() => readStoredValue(ORDER_STORAGE_KEY, []));
    const currency = '$';
    const delivery_fee = 10;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/product/list`);
                const result = await response.json();

                if (result.success && Array.isArray(result.products)) {
                    setProducts(result.products);
                }
            } catch {
                // Keep bundled products visible when the API is unavailable.
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    }, [orders]);

    const addToCart = (itemId, itemSize = '') => {
        const key = `${itemId}_${itemSize}`;

        setCartItems((prev) => ({
            ...prev,
            [key]: {
                itemId,
                size: itemSize,
                quantity: (prev[key]?.quantity || 0) + 1,
            },
        }));
    };

    const removeFromCart = (itemId, itemSize = '') => {
        const key = `${itemId}_${itemSize}`;

        setCartItems((prev) => {
            const next = { ...prev };

            if (!next[key]) return prev;

            if (next[key].quantity <= 1) {
                delete next[key];
                return next;
            }

            next[key].quantity -= 1;
            return next;
        });
    };

    const updateQuantity = (itemId, itemSize = '', diff) => {
        const key = `${itemId}_${itemSize}`;

        setCartItems((prev) => {
            const next = { ...prev };
            const current = next[key];

            if (!current) return prev;

            const updatedQuantity = current.quantity + diff;

            if (updatedQuantity <= 0) {
                delete next[key];
                return next;
            }

            next[key].quantity = updatedQuantity;
            return next;
        });
    };

    const clearCart = () => setCartItems({});

    const addOrder = (newOrder) => {
        setOrders((prev) => [{
            id: newOrder.id || `ORD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...newOrder,
        }, ...prev]);
    };

    const cartCount = useMemo(
        () => Object.values(cartItems).reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    );

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        cartCount,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        addOrder,
        clearCart,
    };

    return (
        <ShopContextValue.Provider value={value}>
            {children}
        </ShopContextValue.Provider>
    );
};

export default ShopContextProvider;