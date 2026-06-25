import type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export type { ProductCollection, ShopProduct } from "@/lib/shop/types";

export const shopCollections = [
  {
    slug: "haltech",
    title: "Haltech",
    href: "/shop/haltech",
    summary: "Haltech ECUs, displays, CAN controls, widebands, and fitment-first support paths.",
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
    summary: "Paid fitment and build-review paths that happen before parts or scheduling decisions.",
    status: "active"
  },
  {
    slug: "wiring-add-ons",
    title: "Wiring Add-ons",
    href: "/shop/wiring-add-ons",
    summary: "Harness, sensor, relay, and CAN planning add-ons for wiring and ECU projects.",
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
    title: "Merch later",
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
  "booking-deposit": "/media/gallery/mainline-hub.png",
  "remote-tune-deposit": "/media/gallery/logging-pass.png",
  "dyno-session-deposit": "/media/gallery/mainline-hub.png",
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
    shortDescription: "Compact Nexus hardware path for builds that need ECU control, power distribution, and CAN expansion.",
    longDescription:
      "Haltech hardware belongs in Shop, but selection still follows fitment, IO, sensors, wiring scope, and calibration readiness.",
    image: productImage("haltech-nexus-r3"),
    ctaLabel: "Request Fitment",
    ctaHref: contactHref("haltech-nexus-r3"),
    notes: "Hardware quote path. Not a tuning service category.",
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
      "Built for larger projects where product selection should follow engine package, wiring architecture, expansion devices, and validation plan.",
    image: productImage("haltech-nexus-r5"),
    ctaLabel: "Request Fitment",
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
    shortDescription: "Standalone ECU hardware path for calibrated street, strip, and motorsport applications.",
    longDescription:
      "Standalone ECU is a platform type inside tuning. This Shop item represents hardware selection and support, not a separate top-level service.",
    image: productImage("haltech-elite-2500"),
    ctaLabel: "Plan ECU",
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
    ctaLabel: "Ask About Display",
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
    ctaLabel: "Discuss Controls",
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
      "Wideband planning should account for exhaust layout, CAN integration, ECU support, sensor placement, and calibration workflow.",
    image: productImage("haltech-wb1-wideband"),
    ctaLabel: "Review Setup",
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
    shortDescription: "Dealer-backed planning review for ECU, IO, sensors, CAN devices, harness needs, and install path.",
    longDescription:
      "This review helps identify the right Haltech hardware path before parts are ordered. The current CTA routes to intake while future checkout is prepared.",
    image: productImage("haltech-fitment-review"),
    ctaLabel: "Start Review",
    ctaHref: contactHref("haltech-fitment-review"),
    notes: "The $200 review is not the full price of dyno tuning or hardware.",
    serviceSlug: "haltech-fitment"
  },
  {
    slug: "booking-deposit",
    title: "Booking Deposit",
    brand: "TurboGixxer",
    collection: "deposits",
    category: "Deposit",
    productType: "service_deposit",
    paymentMode: "deposit",
    fulfillmentType: "service_booking",
    tuningDelivery: "dyno",
    ecuType: "unknown",
    requiresCalendar: true,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    shortDescription: "Approved service scheduling after intake review.",
    longDescription: "Applied toward approved service. This is a scheduling deposit, not the full dyno tuning price.",
    image: productImage("booking-deposit"),
    ctaLabel: "Start Intake",
    ctaHref: contactHref("booking-deposit"),
    notes: "Dyno tuning starts at $750; do not present this deposit as the full service price.",
    serviceSlug: "dyno-tuning"
  },
  {
    slug: "remote-tune-deposit",
    title: "Remote Tune Deposit",
    brand: "TurboGixxer",
    collection: "deposits",
    category: "Deposit",
    productType: "service_deposit",
    paymentMode: "deposit",
    fulfillmentType: "manual_followup",
    tuningDelivery: "remote",
    ecuType: "unknown",
    requiresCalendar: false,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    shortDescription: "Mechanically ready builds that can provide complete logs.",
    longDescription:
      "Routes remote-ready builds into log review before payment, revision scope, or scheduling. Remote tuning starts at $500 before final scope.",
    image: productImage("remote-tune-deposit"),
    ctaLabel: "Request Review",
    ctaHref: contactHref("remote-tune-deposit"),
    notes: "The deposit is applied toward approved service and is not the full remote tuning price.",
    serviceSlug: "remote-tuning"
  },
  {
    slug: "dyno-session-deposit",
    title: "Dyno Session Deposit",
    brand: "TurboGixxer",
    collection: "deposits",
    category: "Deposit",
    productType: "service_deposit",
    paymentMode: "deposit",
    fulfillmentType: "service_booking",
    tuningDelivery: "dyno",
    ecuType: "unknown",
    requiresCalendar: true,
    requiresIntake: true,
    status: "active",
    priceLabel: "$200",
    shortDescription: "Sorted cars ready for a scheduled hub dyno session.",
    longDescription: "Applied toward approved dyno tuning. Dyno tuning starts at $750 before final scope.",
    image: productImage("dyno-session-deposit"),
    ctaLabel: "Reserve Slot",
    ctaHref: contactHref("dyno-session-deposit"),
    notes: "The $200 booking deposit must not be presented as the full dyno tuning price.",
    serviceSlug: "dyno-tuning"
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
      "A paid consult path for scope, priorities, mechanical readiness, electrical readiness, and next steps.",
    image: productImage("build-consultation"),
    ctaLabel: "Book Consult",
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
