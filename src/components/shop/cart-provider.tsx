"use client";

import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { shopProducts } from "@/content/shop-products";
import type { ShopProduct } from "@/content/shop-products";
import {
  CART_STORAGE_KEY,
  clampCartQuantity,
  formatCartPrice,
  getCartQuantity,
  getCartSubtotalCents,
  resolveCartItems
} from "@/lib/shop/cart";
import type { CartItem, ResolvedCartItem } from "@/lib/shop/cart";

type CartContextValue = {
  items: CartItem[];
  resolvedItems: ResolvedCartItem[];
  cartCount: number;
  subtotalCents: number;
  isOpen: boolean;
  addItem: (product: ShopProduct, quantity?: number) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.flatMap((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "slug" in item &&
        "quantity" in item &&
        typeof item.slug === "string" &&
        typeof item.quantity === "number" &&
        Number.isFinite(item.quantity)
      ) {
        return [{ slug: item.slug, quantity: Math.max(1, Math.trunc(item.quantity)) }];
      }

      return [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      setItems(parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY)));
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const resolvedItems = useMemo(() => resolveCartItems(items, shopProducts), [items]);
  const cartCount = useMemo(() => getCartQuantity(resolvedItems), [resolvedItems]);
  const subtotalCents = useMemo(() => getCartSubtotalCents(resolvedItems), [resolvedItems]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      resolvedItems,
      cartCount,
      subtotalCents,
      isOpen,
      addItem(product, quantity = 1) {
        setItems((current) => {
          const existing = current.find((item) => item.slug === product.slug);
          const requestedQuantity = Math.max(1, Math.trunc(quantity));

          if (existing) {
            return current.map((item) =>
              item.slug === product.slug
                ? { ...item, quantity: clampCartQuantity(product, item.quantity + requestedQuantity) }
                : item
            );
          }

          return [...current, { slug: product.slug, quantity: clampCartQuantity(product, requestedQuantity) }];
        });
        setIsOpen(true);
      },
      updateQuantity(slug, quantity) {
        const product = shopProducts.find((item) => item.slug === slug);

        if (!product) {
          return;
        }

        setItems((current) =>
          current.map((item) =>
            item.slug === slug ? { ...item, quantity: clampCartQuantity(product, quantity) } : item
          )
        );
      },
      removeItem(slug) {
        setItems((current) => current.filter((item) => item.slug !== slug));
      },
      clearCart() {
        setItems([]);
      },
      openCart() {
        setIsOpen(true);
      },
      closeCart() {
        setIsOpen(false);
      },
      isInCart(slug) {
        return items.some((item) => item.slug === slug);
      }
    }),
    [cartCount, isOpen, items, resolvedItems, subtotalCents]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

function QuantityControls({ item }: { item: ResolvedCartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const canAdjust = item.maxQuantity > 1;

  if (!canAdjust) {
    return (
      <div className="inline-flex min-h-9 items-center rounded-md border border-zinc-200 px-3 text-xs font-black uppercase text-zinc-600 dark:border-white/10 dark:text-track-muted">
        Qty 1
      </div>
    );
  }

  return (
    <div className="inline-flex min-h-9 items-center overflow-hidden rounded-md border border-zinc-200 dark:border-white/10">
      <button
        type="button"
        className="theme-transition flex h-9 w-9 items-center justify-center text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-track-white"
        aria-label={`Decrease ${item.product.title} quantity`}
        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-9 text-center text-xs font-black text-zinc-950 dark:text-track-white">{item.quantity}</span>
      <button
        type="button"
        className="theme-transition flex h-9 w-9 items-center justify-center text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-track-white"
        aria-label={`Increase ${item.product.title} quantity`}
        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="theme-transition flex h-9 w-9 items-center justify-center border-l border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-red-600 dark:border-white/10 dark:text-track-muted dark:hover:bg-white/10 dark:hover:text-red-300"
        aria-label={`Remove ${item.product.title}`}
        onClick={() => removeItem(item.product.slug)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function DrawerItem({ item }: { item: ResolvedCartItem }) {
  const { removeItem } = useCart();
  const linePrice = item.lineTotalCents ?? item.product.amountCents;

  return (
    <li className="grid gap-4 border-b border-zinc-200 py-4 last:border-b-0 dark:border-white/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="technical-label text-cyan-700 dark:text-cyan-300">{item.product.category}</p>
          <h3 className="mt-2 text-sm font-black uppercase leading-5 text-zinc-950 dark:text-track-white">
            {item.product.title}
          </h3>
          <p className="mt-2 text-xs font-bold uppercase leading-5 text-zinc-500 dark:text-zinc-400">
            {item.product.paymentMode.replaceAll("_", " ")}
          </p>
        </div>
        <p className="shrink-0 text-sm font-black text-zinc-950 dark:text-track-white">
          {formatCartPrice(linePrice)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <QuantityControls item={item} />
        {item.maxQuantity === 1 ? (
          <button
            type="button"
            className="text-xs font-black uppercase text-zinc-500 transition hover:text-red-600 dark:text-track-muted dark:hover:text-red-300"
            onClick={() => removeItem(item.product.slug)}
          >
            Remove
          </button>
        ) : null}
      </div>
    </li>
  );
}

function CartDrawer() {
  const { cartCount, clearCart, closeCart, isOpen, resolvedItems, subtotalCents } = useCart();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
        onClick={closeCart}
      />
      <aside
        data-testid="cart-drawer"
        className="theme-transition absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-graphite-925"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-white/10">
          <div>
            <p className="technical-label text-cyan-700 dark:text-cyan-300">Cart</p>
            <h2 className="mt-2 text-xl font-black uppercase text-zinc-950 dark:text-track-white">
              {cartCount ? `${cartCount} selected` : "Empty cart"}
            </h2>
          </div>
          <button
            type="button"
            className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:text-track-muted dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
            aria-label="Close cart"
            onClick={closeCart}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {resolvedItems.length ? (
            <ul>
              {resolvedItems.map((item) => (
                <DrawerItem key={item.product.slug} item={item} />
              ))}
            </ul>
          ) : (
            <div className="grid min-h-80 place-items-center text-center">
              <div>
                <ShoppingCart className="mx-auto h-10 w-10 text-cyan-700 dark:text-cyan-300" />
                <p className="mt-4 text-sm font-bold uppercase leading-6 text-zinc-600 dark:text-track-muted">
                  Add Haltech hardware, deposits, reviews, or consults from the Shop.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 p-5 dark:border-white/10">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase text-zinc-500 dark:text-track-muted">Payable subtotal</p>
            <p className="text-xl font-black text-zinc-950 dark:text-track-white">{formatCartPrice(subtotalCents)}</p>
          </div>
          <div className="mt-4 grid gap-3">
            <Link
              href="/cart"
              data-testid="review-cart-link"
              className="theme-transition inline-flex min-h-11 items-center justify-center rounded-md border border-cyan-500 bg-cyan-500 px-5 py-3 text-center text-xs font-black uppercase leading-none text-graphite-950 shadow-cyan hover:border-cyan-400 hover:bg-cyan-400"
              onClick={closeCart}
            >
              Review cart
            </Link>
            <Link
              href="/shop"
              className="theme-transition inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-center text-xs font-black uppercase leading-none text-zinc-950 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/20 dark:bg-white/[0.04] dark:text-track-white dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
              onClick={closeCart}
            >
              Continue shopping
            </Link>
            {resolvedItems.length ? (
              <Button variant="ghost" className="w-full" onClick={clearCart}>
                Clear cart
              </Button>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
