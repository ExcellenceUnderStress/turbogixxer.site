"use client";

import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ShopProduct } from "@/content/shop-products";
import { getCartActionLabel, getMaxCartQuantity, isCartEligibleProduct } from "@/lib/shop/cart";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-provider";

export function AddToCartButton({
  product,
  className,
  variant = "primary"
}: {
  product: ShopProduct;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const { addItem, isInCart, openCart } = useCart();
  const isEligible = isCartEligibleProduct(product);
  const isSelected = isInCart(product.slug);
  const maxQuantity = getMaxCartQuantity(product);
  const label = isSelected && maxQuantity === 1 ? "In cart" : isSelected ? "Add another" : getCartActionLabel(product);

  return (
    <Button
      type="button"
      variant={variant}
      data-testid={`add-to-cart-${product.slug}`}
      disabled={!isEligible}
      className={cn("gap-2", className)}
      onClick={() => {
        if (isSelected && maxQuantity === 1) {
          openCart();
          return;
        }

        addItem(product);
      }}
    >
      {isSelected ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {label}
    </Button>
  );
}
