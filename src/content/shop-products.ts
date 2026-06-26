import type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export const shopCollections = [
  {
    slug: "haltech",
    title: "Haltech",
    href: "/shop/haltech",
    summary: "Haltech ECUs, displays, CAN controls, widebands, and fitment-first support.",
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
    slug: "consults",
    title: "Consults",
    href: "/shop/consults",
    summary: "Paid technical consults for scope, readiness, priorities, and next steps.",
    status: "active"
  },
  {
    slug: "reviews",
    title: "Reviews",
    href: "/shop/reviews",
    summary: "Paid fitment and build reviews before parts or scheduling decisions.",
    status: "active"
  },
  {
    slug: "wiring-add-ons",
    title: "Wiring Add-ons",
    href: "/shop/wiring-add-ons",
    summary: "Harness, sensor, relay, and CAN planning add-ons for wiring and ECU builds.",
    status: "draft"
  },
  {
    slug: "in-house-products",
    title: "In-House Products",
    href: "/shop/in-house-products",
    summary: "TurboGixxer-built parts and service starters prepared for future direct checkout.",
    status: "draft"
  },
  {
    slug: "fuel-injector-clinic",
    title: "Fuel Injector Clinic",
    href: "/shop/fuel-injector-clinic",
    summary: "Injector and fuel-system product placeholders that require build review before ordering.",
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
  "haltech-nexus-r3": "/media/gallery/ecu-bench.png",
  "haltech-nexus-r5": "/media/gallery/ecu-bench.png",
  "haltech-elite-2500": "/media/gallery/ecu-bench.png",
  "haltech-ic-7-display": "/media/gallery/logging-pass.png",
  "haltech-can-keypad": "/media/gallery/harness-inspection.png",
  "haltech-wb1-wideband": "/media/gallery/logging-pass.png",
  "haltech-fitment-review": "/media/gallery/ecu-bench.png",
  "tuning-deposit": "/media/gallery/mainline-hub.png",
  "build-consultation": "/media/gallery/track-notes.png"
};

const productImage = (slug: string) => stagedProductImages[slug] ?? "/media/gallery/ecu-bench.png";
const contactHref = (slug: string) => `/contact?intent=${slug}`;

export const shopProducts: ShopProduct[] = [
  {
    slug: "haltech-nexus-r3",
    title: "Haltech Nexus R3",
    brand: "Haltech",
    collection: "haltech",
    category: "VCU / ECU",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Fitment first",
    shortDescription: "Compact Nexus hardware for builds that need ECU control, power distribution, and CAN expansion.",
    longDescription:
      "Haltech hardware belongs in Shop, but selection still follows fitment, IO, sensors, wiring scope, and calibration readiness.",
    image: productImage("haltech-nexus-r3"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-nexus-r3"),
    notes: "Hardware quote request. Not a tuning service category.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-nexus-r5",
    title: "Haltech Nexus R5",
    brand: "Haltech",
    collection: "haltech",
    category: "VCU / ECU",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Fitment first",
    shortDescription: "Higher-capability Nexus placeholder for advanced IO, power management, CAN, and motorsport wiring plans.",
    longDescription:
      "Built for larger builds where product selection should follow engine package, wiring architecture, expansion devices, and validation plan.",
    image: productImage("haltech-nexus-r5"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-nexus-r5"),
    notes: "Final product price and checkout behavior will be added later.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-elite-2500",
    title: "Haltech Elite 2500",
    brand: "Haltech",
    collection: "haltech",
    category: "Standalone ECU",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Quote after review",
    shortDescription: "Standalone ECU hardware for calibrated street, strip, and motorsport applications.",
    longDescription:
      "Standalone ECU is a platform type inside tuning. This Shop item represents hardware selection and support, not a separate top-level service.",
    image: productImage("haltech-elite-2500"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-elite-2500"),
    notes: "Use quote-first sales mode until direct product ordering is enabled.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-ic-7-display",
    title: "Haltech IC-7 Display",
    brand: "Haltech",
    collection: "haltech",
    category: "Display",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Contact for quote",
    shortDescription: "CAN display placeholder for monitored data, warnings, and clean driver feedback.",
    longDescription:
      "Display selection and setup should match ECU platform, CAN layout, sensor channels, warning strategy, and mounting constraints.",
    image: productImage("haltech-ic-7-display"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-ic-7-display"),
    notes: "Future detail page can include mounting and CAN setup options.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-can-keypad",
    title: "Haltech CAN Keypad",
    brand: "Haltech",
    collection: "haltech",
    category: "CAN Control",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Contact for quote",
    shortDescription: "CAN keypad placeholder for boost, launch, fan, pump, lighting, and auxiliary control strategies.",
    longDescription:
      "TurboGixxer can map keypad needs into the wiring and ECU strategy so controls support real vehicle use instead of adding clutter.",
    image: productImage("haltech-can-keypad"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-can-keypad"),
    notes: "Requires wiring and configuration review.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-wb1-wideband",
    title: "Haltech WB1 Wideband",
    brand: "Haltech",
    collection: "haltech",
    category: "Sensor / Wideband",
    productType: "hardware_product",
    paymentMode: "request_quote",
    fulfillmentType: "manual_followup",
    tuningDelivery: "support",
    ecuType: "standalone_ecu",
    requiresCalendar: false,
    requiresIntake: false,
    status: "active",
    priceLabel: "Contact for quote",
    shortDescription: "Wideband controller placeholder for calibration feedback and monitored safety data.",
    longDescription:
      "Wideband planning should account for exhaust layout, CAN integration, ECU support, sensor placement, and calibration data.",
    image: productImage("haltech-wb1-wideband"),
    ctaLabel: "Shop Haltech",
    ctaHref: contactHref("haltech-wb1-wideband"),
    notes: "Future checkout can separate sensor kits from installation and setup labor.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "haltech-fitment-review",
    title: "Haltech Fitment Review",
    brand: "TurboGixxer / Haltech",
    collection: "reviews",
    category: "Fitment Review",
    productType: "paid_review",
    paymentMode: "paid_upfront",
    fulfillmentType: "async_review",
    tuningDelivery: "support",
    ecuType: "unknown",
    requiresCalendar: false,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    shortDescription: "Dealer-backed planning review for ECU, IO, sensors, CAN devices, harness needs, and install planning.",
    longDescription:
      "This review helps identify the right Haltech hardware before parts are ordered. The current CTA routes to intake while future checkout is prepared.",
    image: productImage("haltech-fitment-review"),
    ctaLabel: "Request a Build Review",
    ctaHref: contactHref("haltech-fitment-review"),
    notes: "The $200 review is not the full price of dyno tuning or hardware.",
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
    shortDescription: "One deposit for approved dyno tuning or remote tuning intake.",
    longDescription:
      "The $200 deposit and selected day are submitted before TurboGixxer reviews the build, confirms scope, and approves the service.",
    image: productImage("tuning-deposit"),
    ctaLabel: "Request Tuning",
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
    shortDescription: "Focused technical consult for larger tuning, wiring, or staged build plans.",
    longDescription:
      "A paid consult for scope, priorities, mechanical readiness, electrical readiness, and next steps.",
    image: productImage("build-consultation"),
    ctaLabel: "Request a Build Review",
    ctaHref: contactHref("build-consultation"),
    notes: "Prepared for future checkout and calendar scheduling.",
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
