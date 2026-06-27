"use client";

import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-provider";

export function CartNavButton({
  showLabel = false,
  className
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const { cartCount, openCart } = useCart();

  return (
    <button
      type="button"
      data-testid="cart-nav-button"
      className={cn(
        "theme-transition relative inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-3 text-xs font-black uppercase text-zinc-950 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/15 dark:bg-white/[0.04] dark:text-track-white dark:hover:border-cyan-300/60 dark:hover:text-cyan-200",
        !showLabel && "w-10 px-0",
        className
      )}
      aria-label={`Open cart${cartCount ? ` with ${cartCount} item${cartCount === 1 ? "" : "s"}` : ""}`}
      onClick={openCart}
    >
      <ShoppingCart className="h-4 w-4" />
      {showLabel ? <span>Cart</span> : null}
      {cartCount ? (
        <span className="absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full bg-cyan-500 px-1 text-[0.62rem] font-black text-graphite-950">
          {cartCount}
        </span>
      ) : null}
    </button>
  );
}
