import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import {
  CartItem,
  OrderRecord,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  toggleWishlistId,
  calculateCartTotals,
} from '../utils/storeLogic';

interface StoreContextValue {
  cart: CartItem[];
  wishlistIds: string[];
  orders: OrderRecord[];
  isCartDrawerOpen: boolean;
  isWishlistDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openWishlistDrawer: () => void;
  closeWishlistDrawer: () => void;
  addToCart: (product: Product, quantity?: number, showDrawer?: boolean) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, showDrawer?: boolean) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
  placeOrder: (
    customer: {
      customerName: string;
      phone: string;
      governorate: string;
      address: string;
      notes?: string;
      paymentMethod: 'cod' | 'wallet';
    }
  ) => OrderRecord;
  totals: ReturnType<typeof calculateCartTotals>;
  toastMessage: string | null;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'juzoor_cart_v1';
const WISHLIST_STORAGE_KEY = 'juzoor_wishlist_v1';
const ORDERS_STORAGE_KEY = 'juzoor_orders_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prod-calceumal', 'prod-magic-mix-top'];
    } catch {
      return ['prod-calceumal', 'prod-magic-mix-top'];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const openCartDrawer = () => {
    setIsWishlistDrawerOpen(false);
    setIsCartDrawerOpen(true);
  };
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const openWishlistDrawer = () => {
    setIsCartDrawerOpen(false);
    setIsWishlistDrawerOpen(true);
  };
  const closeWishlistDrawer = () => setIsWishlistDrawerOpen(false);

  const addToCart = (product: Product, quantity = 1, showDrawer = true) => {
    setCart((prev) => addCartItem(prev, product, quantity));
    showToast(`تمت إضافة "${product.shortTitle}" إلى سلة التسوق`);
    if (showDrawer) {
      setIsWishlistDrawerOpen(false);
      setIsCartDrawerOpen(true);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => updateCartItemQuantity(prev, productId, quantity));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => removeCartItem(prev, productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string, showDrawer = false) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = toggleWishlistId(prev, productId);
      showToast(exists ? 'تمت إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة');
      if (!exists && showDrawer) {
        setIsCartDrawerOpen(false);
        setIsWishlistDrawerOpen(true);
      }
      return next;
    });
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    showToast('تم تفريغ قائمة المفضلة');
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const getCartQuantity = (productId: string) => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const totals = calculateCartTotals(cart);

  const placeOrder = (customer: {
    customerName: string;
    phone: string;
    governorate: string;
    address: string;
    notes?: string;
    paymentMethod: 'cod' | 'wallet';
  }): OrderRecord => {
    const orderNumber = `JZ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: customer.customerName.trim(),
      phone: customer.phone.trim(),
      governorate: customer.governorate,
      address: customer.address.trim(),
      notes: customer.notes?.trim(),
      paymentMethod: customer.paymentMethod,
      items: [...cart],
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      total: totals.total,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: 'تم التأكيد',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartDrawerOpen(false);
    showToast(`تم تأكيد طلبك رقم ${orderNumber} بنجاح`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlistIds,
        orders,
        isCartDrawerOpen,
        isWishlistDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        openWishlistDrawer,
        closeWishlistDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        getCartQuantity,
        placeOrder,
        totals,
        toastMessage,
        dismissToast: () => setToastMessage(null),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
};
