import type { ShopProduct } from "@/lib/shop/types";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripShopProductSku(product: ShopProduct, value: string) {
  if (product.collection !== "haltech" || !product.sku) {
    return value;
  }

  const skuPattern = new RegExp(`\\b${escapeRegExp(product.sku)}\\b`, "gi");
  const stripped = value.replace(skuPattern, "").replace(/\s{2,}/g, " ").trim();

  return stripped || value;
}

export function getShopProductDisplayTitle(product: ShopProduct) {
  return stripShopProductSku(product, product.title);
}

export function getShopProductImageAlt(product: ShopProduct) {
  return stripShopProductSku(product, product.imageAlt ?? product.title);
}

export function shouldShowShopProductSku(product: ShopProduct) {
  return product.collection !== "haltech";
}
