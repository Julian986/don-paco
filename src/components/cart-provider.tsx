"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

type AddCartItemInput = {
  slug: string;
  name: string;
  price: number;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  addItem: (item: AddCartItemInput) => void;
  updateQuantity: (slug: string, delta: number) => void;
  removeItem: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState(false);
  const hideToastTimeoutRef = useRef<number | null>(null);

  const clearToastTimer = () => {
    if (hideToastTimeoutRef.current !== null) {
      window.clearTimeout(hideToastTimeoutRef.current);
      hideToastTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearToastTimer();
  }, []);

  const showToast = useCallback((message: string) => {
    clearToastTimer();
    setToastMessage(message);
    setToastVisible(true);
    hideToastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  }, []);

  const addItem = useCallback(
    (item: AddCartItemInput) => {
      const quantityToAdd = Math.max(1, item.quantity ?? 1);

      setItems((previousItems) => {
        const existingItem = previousItems.find((cartItem) => cartItem.slug === item.slug);
        if (existingItem) {
          return previousItems.map((cartItem) =>
            cartItem.slug === item.slug
              ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
              : cartItem,
          );
        }
        return [
          ...previousItems,
          { slug: item.slug, name: item.name, price: item.price, quantity: quantityToAdd },
        ];
      });
      showToast(
        quantityToAdd > 1
          ? `${item.name} x${quantityToAdd} se agrego al carrito`
          : `${item.name} se agrego al carrito`,
      );
    },
    [showToast],
  );

  const updateQuantity = useCallback((slug: string, delta: number) => {
    setItems((previousItems) =>
      previousItems
        .map((item) => (item.slug === slug ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((previousItems) => previousItems.filter((item) => item.slug !== slug));
  }, []);

  const totalQuantity = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0),
    [items],
  );

  const contextValue = useMemo(
    () => ({
      items,
      totalQuantity,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
    }),
    [items, totalQuantity, subtotal, addItem, updateQuantity, removeItem],
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[80]">
        <div
          className={`min-w-[280px] max-w-sm rounded-xl border border-[#d8eae9] bg-white/95 p-4 shadow-xl backdrop-blur transition-all duration-300 ${
            toastVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#029f9c] text-white">
              ✓
            </span>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#029f9c]">
                Producto agregado
              </p>
              <p className="mt-1 text-sm text-[#666]">{toastMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}
