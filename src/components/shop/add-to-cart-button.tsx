"use client";

import { Check, MessageSquare, ShoppingCart } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import type { ShopProduct } from "@/content/shop-products";
import {
  getCartActionLabel,
  getMaxCartQuantity,
  isCartEligibleProduct,
  needsPriceConfirmation
} from "@/lib/shop/cart";
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

  if (!isEligible && needsPriceConfirmation(product)) {
    return (
      <ButtonLink href={product.ctaHref} variant={variant} className={cn("gap-2", className)}>
        <MessageSquare className="h-4 w-4" />
        {label}
      </ButtonLink>
    );
  }

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
