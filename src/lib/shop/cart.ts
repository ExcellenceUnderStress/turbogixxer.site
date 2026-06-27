import type { ShopProduct } from "@/content/shop-products";

export type CartItem = {
  slug: string;
  quantity: number;
};

export type ResolvedCartItem = {
  product: ShopProduct;
  quantity: number;
  lineTotalCents: number | null;
  maxQuantity: number;
};

export const CART_STORAGE_KEY = "turbogixxer-cart-v1";

export function isCartEligibleProduct(product: ShopProduct) {
  return product.status === "active" && product.paymentMode !== "coming_soon";
}

export function getCartActionLabel(product: ShopProduct) {
  if (!isCartEligibleProduct(product)) {
    return "Staged";
  }

  return "Add to cart";
}

export function getCartProductDescriptor(product: ShopProduct) {
  switch (product.productType) {
    case "service_deposit":
      return "Deposit";
    case "paid_consultation":
      return "Consult";
    case "paid_review":
      return "Planning product";
    case "hardware_product":
      return "Hardware";
    case "wiring_add_on":
      return "Wiring add-on";
    case "in_house_product":
      return "In-house product";
    case "merch":
      return "Merch";
    default:
      return "Shop item";
  }
}

export function getMaxCartQuantity(product: ShopProduct) {
  return product.productType === "hardware_product" || product.productType === "merch" ? 99 : 1;
}

export function clampCartQuantity(product: ShopProduct, quantity: number) {
  const maxQuantity = getMaxCartQuantity(product);
  return Math.min(Math.max(Math.trunc(quantity), 1), maxQuantity);
}

export function resolveCartItems(items: CartItem[], products: ShopProduct[]): ResolvedCartItem[] {
  const productMap = new Map(products.map((product) => [product.slug, product]));

  return items.flatMap((item) => {
    const product = productMap.get(item.slug);

    if (!product || !isCartEligibleProduct(product)) {
      return [];
    }

    const quantity = clampCartQuantity(product, item.quantity);
    const lineTotalCents = product.amountCents ? product.amountCents * quantity : null;

    return [
      {
        product,
        quantity,
        lineTotalCents,
        maxQuantity: getMaxCartQuantity(product)
      }
    ];
  });
}

export function getCartSubtotalCents(items: ResolvedCartItem[]) {
  return items.reduce((total, item) => total + (item.lineTotalCents ?? 0), 0);
}

export function getCartQuantity(items: Array<{ quantity: number }>) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function formatCartPrice(amountCents?: number | null) {
  if (!amountCents) {
    return "Price at checkout";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amountCents / 100);
}
