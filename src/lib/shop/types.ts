import type { BookingRequirements, FulfillmentType } from "@/lib/booking/types";

export type ProductCollection =
  | "haltech"
  | "deposits"
  | "consults"
  | "reviews"
  | "wiring-add-ons"
  | "in-house-products"
  | "fuel-injector-clinic"
  | "merch";

export type ProductStatus = "active" | "draft" | "hidden" | "archived";

export type ProductType =
  | "service_deposit"
  | "paid_consultation"
  | "paid_review"
  | "hardware_product"
  | "wiring_add_on"
  | "in_house_product"
  | "merch";

export type PaymentMode = "deposit" | "paid_upfront" | "request_quote" | "coming_soon" | "direct_checkout";

export type ShopProduct = BookingRequirements & {
  slug: string;
  title: string;
  brand: string;
  collection: ProductCollection;
  category: string;
  productType: ProductType;
  paymentMode: PaymentMode;
  fulfillmentType: FulfillmentType;
  status: ProductStatus;
  priceLabel: string;
  amountCents?: number;
  shortDescription: string;
  longDescription: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  notes: string;
  serviceSlug?: string;
};
