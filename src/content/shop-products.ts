import { haltechProducts } from "@/content/haltech-products";
import type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export const shopCollections = [
  {
    slug: "haltech",
    title: "Haltech",
    href: "/shop/haltech",
    summary: "Haltech ECUs, displays, CAN controls, harnesses, and fitment-first support.",
    status: "active"
  },
  {
    slug: "deposits",
    title: "Deposits",
    href: "/shop/deposits",
    summary: "Service deposits that start approved tuning or dyno scheduling without pretending to be full service prices.",
    status: "active"
  },
  {
    slug: "fuel-injector-clinic",
    title: "Fuel Injector Clinic",
    href: "/shop/fuel-injector-clinic",
    summary: "Injector and fuel-system product placeholders that require build details before ordering.",
    status: "draft"
  },
  {
    slug: "merch",
    title: "Merchandise",
    href: "/shop",
    summary: "Brand goods are planned after the service-commerce foundation is complete.",
    status: "hidden"
  }
] as const;

const stagedProductImages: Record<string, string> = {
  "haltech-fitment-review": "/media/gallery/ecu-bench.png",
  "tuning-deposit": "/media/gallery/mainline-hub.png",
  "build-consultation": "/media/gallery/track-notes.png"
};

const productImage = (slug: string) => stagedProductImages[slug] ?? "/media/gallery/ecu-bench.png";
const contactHref = (slug: string) => `/contact?intent=${slug}`;

export const shopProducts: ShopProduct[] = [
  ...haltechProducts,
  {
    slug: "haltech-fitment-review",
    title: "Haltech Fitment Planning",
    brand: "TurboGixxer / Haltech",
    collection: "reviews",
    category: "Fitment Planning",
    productType: "paid_review",
    paymentMode: "paid_upfront",
    fulfillmentType: "async_review",
    tuningDelivery: "support",
    ecuType: "unknown",
    requiresCalendar: false,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    amountCents: 20000,
    shortDescription: "Dealer-backed planning for ECU, IO, sensors, CAN devices, harness needs, and install planning.",
    longDescription:
      "This planning product helps identify the right Haltech hardware before parts are ordered. Add it to the cart before intake details are collected.",
    image: productImage("haltech-fitment-review"),
    ctaLabel: "Add Planning",
    ctaHref: contactHref("haltech-fitment-review"),
    notes: "The $200 planning product is not the full price of dyno tuning or hardware.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "tuning-deposit",
    title: "Tuning Deposit",
    brand: "TurboGixxer",
    collection: "deposits",
    category: "Deposit",
    productType: "service_deposit",
    paymentMode: "deposit",
    fulfillmentType: "service_booking",
    ecuType: "unknown",
    requiresCalendar: true,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    amountCents: 20000,
    shortDescription: "One deposit for approved dyno tuning or remote tuning intake.",
    longDescription:
      "The $200 deposit and selected day are submitted so TurboGixxer can confirm build scope and service timing.",
    image: productImage("tuning-deposit"),
    ctaLabel: "Start Tuning Order",
    ctaHref: contactHref("tuning-deposit"),
    notes: "The $200 deposit applies toward the approved tune; it is not the full dyno or remote tuning price."
  },
  {
    slug: "build-consultation",
    title: "Build Consultation",
    brand: "TurboGixxer",
    collection: "consults",
    category: "Consult",
    productType: "paid_consultation",
    paymentMode: "paid_upfront",
    fulfillmentType: "scheduled_call",
    tuningDelivery: "support",
    ecuType: "unknown",
    requiresCalendar: true,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    amountCents: 20000,
    shortDescription: "Focused technical consult for larger tuning, wiring, or staged build plans.",
    longDescription:
      "A paid consult for scope, priorities, mechanical readiness, electrical readiness, and next steps.",
    image: productImage("build-consultation"),
    ctaLabel: "Add Consult",
    ctaHref: contactHref("build-consultation"),
    notes: "Prepared for checkout and calendar scheduling.",
    serviceSlug: "wiring-harness"
  }
];

export function getVisibleShopCollections() {
  return shopCollections.filter((collection) => collection.status !== "hidden");
}

export function getProductsByCollection(collection: ProductCollection) {
  return shopProducts.filter((product) => product.collection === collection && product.status !== "hidden");
}

export function getProductBySlug(slug: string) {
  return shopProducts.find((product) => product.slug === slug && product.status !== "hidden");
}

export function getProductBySku(sku: string) {
  return shopProducts.find((product) => product.sku === sku && product.status !== "hidden");
}
